"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { del, list, put } from "@vercel/blob";
import {
  attemptLogin,
  destroySession,
  getSessionUser,
  hashPassword,
  requireApiUser,
  revokeUserSessions,
  verifyPassword,
} from "@/lib/auth";
import { excerptFrom, readingMinutes, slugify } from "@/lib/blog";
import { sanitizeHtml, sanitizeText } from "@/lib/sanitize";
import * as q from "@/lib/db/queries";

/**
 * Every action begins with an auth check. Server Actions are addressable POST
 * endpoints, so the guard has to live inside the action itself — being rendered
 * behind an authenticated page is not protection.
 */

export type ActionState = { error?: string; success?: string } | undefined;

/** Refresh every surface a post can appear on. */
function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/blog/rss.xml");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
  revalidatePath("/admin");
}

/* ──────────────────────────────── Auth ────────────────────────────────────── */

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) return { error: "Enter your email and password." };

  const result = await attemptLogin(email, password, headers().get("user-agent"));
  if (!result.ok) return { error: result.error };

  // Only allow same-origin relative paths — never bounce to an attacker's URL.
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function changeOwnPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireApiUser();
  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");

  if (next.length < 10) return { error: "New password must be at least 10 characters." };
  if (!(await verifyPassword(current, user.passwordHash))) {
    return { error: "Your current password is incorrect." };
  }

  await q.updateUser(user.id, { passwordHash: await hashPassword(next) });
  // Keep this device signed in, drop every other session.
  await revokeUserSessions(user.id, true);
  return { success: "Password updated. Other devices have been signed out." };
}

/* ──────────────────────────────── Posts ───────────────────────────────────── */

function parsePostForm(formData: FormData) {
  const title = sanitizeText(String(formData.get("title") ?? "")).slice(0, 200);
  const bodyHtml = sanitizeHtml(String(formData.get("bodyHtml") ?? ""));

  let bodyJson: unknown = null;
  const rawJson = String(formData.get("bodyJson") ?? "");
  if (rawJson) {
    try {
      bodyJson = JSON.parse(rawJson);
    } catch {
      bodyJson = null;
    }
  }

  const status = String(formData.get("status") ?? "draft") as "draft" | "scheduled" | "published";
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  let publishedAt: Date | null = publishedAtRaw ? new Date(publishedAtRaw) : null;
  if (publishedAt && Number.isNaN(publishedAt.getTime())) publishedAt = null;
  // Publishing without an explicit date means "now".
  if (status === "published" && !publishedAt) publishedAt = new Date();

  const excerpt = sanitizeText(String(formData.get("excerpt") ?? "")).slice(0, 400);

  return {
    title,
    bodyHtml,
    bodyJson,
    status,
    publishedAt,
    excerpt: excerpt || excerptFrom(bodyHtml),
    coverImageUrl: String(formData.get("coverImageUrl") ?? "").trim() || null,
    coverImageAlt: sanitizeText(String(formData.get("coverImageAlt") ?? "")) || null,
    categoryId: String(formData.get("categoryId") ?? "").trim() || null,
    seoTitle: sanitizeText(String(formData.get("seoTitle") ?? "")).slice(0, 200) || null,
    seoDescription: sanitizeText(String(formData.get("seoDescription") ?? "")).slice(0, 400) || null,
    seoKeywords: sanitizeText(String(formData.get("seoKeywords") ?? "")).slice(0, 300) || null,
    ogImageUrl: String(formData.get("ogImageUrl") ?? "").trim() || null,
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    accent: (String(formData.get("accent") ?? "blue") === "coral" ? "coral" : "blue") as "blue" | "coral",
    readingMinutes: readingMinutes(bodyHtml),
    tagIds: formData.getAll("tagIds").map(String).filter(Boolean),
  };
}

export async function savePostAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireApiUser();
  const id = String(formData.get("id") ?? "").trim();
  const values = parsePostForm(formData);

  if (!values.title) return { error: "A title is required." };
  if (values.status === "scheduled" && !values.publishedAt) {
    return { error: "Pick a publish date and time for a scheduled post." };
  }

  const requestedSlug = slugify(String(formData.get("slug") ?? "") || values.title);
  const slug = await q.uniqueSlug(requestedSlug, id || undefined);
  const { tagIds, ...postValues } = values;

  let savedSlug = slug;
  let postId = id;

  if (id) {
    const existing = await q.getPostById(id);
    if (!existing) return { error: "That post no longer exists." };

    // Snapshot the previous version before overwriting it.
    await q.saveRevision({
      postId: id,
      title: existing.title,
      excerpt: existing.excerpt,
      bodyJson: existing.bodyJson,
      bodyHtml: existing.bodyHtml,
      authorId: existing.authorId,
    });

    const updated = await q.updatePost(id, { ...postValues, slug });
    savedSlug = updated.slug;
    if (existing.slug !== updated.slug) revalidatePath(`/blog/${existing.slug}`);
  } else {
    const created = await q.createPost({ ...postValues, slug, authorId: user.id });
    postId = created.id;
    savedSlug = created.slug;
  }

  await q.setPostTags(postId, tagIds);
  revalidateBlog(savedSlug);

  if (!id) redirect(`/admin/posts/${postId}?saved=1`);
  return { success: "Saved." };
}

export async function deletePostAction(formData: FormData) {
  await requireApiUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const deleted = await q.deletePost(id);
  revalidateBlog(deleted?.slug);
  redirect("/admin/posts");
}

export async function bulkPostAction(formData: FormData) {
  await requireApiUser();
  const ids = formData.getAll("ids").map(String).filter(Boolean);
  const operation = String(formData.get("operation") ?? "");
  if (ids.length === 0) return;

  if (operation === "delete") {
    const rows = await q.deletePosts(ids);
    rows.forEach((r) => revalidatePath(`/blog/${r.slug}`));
  } else if (operation === "publish") {
    for (const id of ids) {
      const post = await q.getPostById(id);
      if (!post) continue;
      await q.updatePost(id, {
        status: "published",
        publishedAt: post.publishedAt ?? new Date(),
      });
      revalidatePath(`/blog/${post.slug}`);
    }
  } else if (operation === "draft") {
    for (const id of ids) {
      const post = await q.getPostById(id);
      if (!post) continue;
      await q.updatePost(id, { status: "draft" });
      revalidatePath(`/blog/${post.slug}`);
    }
  }

  revalidateBlog();
}

/** Live availability check for the slug field. */
export async function checkSlugAction(slug: string, exceptId?: string) {
  await requireApiUser();
  const normalized = slugify(slug);
  if (!normalized) return { slug: "", available: false };
  return { slug: normalized, available: !(await q.slugTaken(normalized, exceptId)) };
}

export async function restoreRevisionAction(formData: FormData) {
  const user = await requireApiUser();
  const revisionId = String(formData.get("revisionId") ?? "");
  const postId = String(formData.get("postId") ?? "");
  if (!revisionId || !postId) return;

  const [revision, post] = await Promise.all([q.getRevision(revisionId), q.getPostById(postId)]);
  if (!revision || !post) return;

  // The current state becomes a revision too, so a restore is itself undoable.
  await q.saveRevision({
    postId,
    title: post.title,
    excerpt: post.excerpt,
    bodyJson: post.bodyJson,
    bodyHtml: post.bodyHtml,
    authorId: user.id,
  });

  await q.updatePost(postId, {
    title: revision.title,
    excerpt: revision.excerpt ?? "",
    bodyJson: revision.bodyJson,
    bodyHtml: revision.bodyHtml,
    readingMinutes: readingMinutes(revision.bodyHtml),
  });

  revalidateBlog(post.slug);
  redirect(`/admin/posts/${postId}?restored=1`);
}

/* ─────────────────────────────── Taxonomy ─────────────────────────────────── */

export async function saveCategoryAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireApiUser();
  const id = String(formData.get("id") ?? "").trim();
  const name = sanitizeText(String(formData.get("name") ?? "")).slice(0, 80);
  const description = sanitizeText(String(formData.get("description") ?? "")).slice(0, 300);
  if (!name) return { error: "Name is required." };

  const slug = slugify(String(formData.get("slug") ?? "") || name);

  try {
    if (id) await q.updateCategory(id, { name, slug, description: description || null });
    else await q.createCategory({ name, slug, description });
  } catch {
    return { error: "A category with that name or slug already exists." };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/blog");
  return { success: id ? "Category updated." : "Category created." };
}

export async function deleteCategoryAction(formData: FormData) {
  await requireApiUser();
  const id = String(formData.get("id") ?? "");
  if (id) await q.deleteCategory(id);
  revalidatePath("/admin/categories");
  revalidatePath("/blog");
}

export async function saveTagAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireApiUser();
  const id = String(formData.get("id") ?? "").trim();
  const name = sanitizeText(String(formData.get("name") ?? "")).slice(0, 60);
  if (!name) return { error: "Name is required." };

  const slug = slugify(String(formData.get("slug") ?? "") || name);

  try {
    if (id) await q.updateTag(id, { name, slug });
    else await q.createTag({ name, slug });
  } catch {
    return { error: "A tag with that name or slug already exists." };
  }

  revalidatePath("/admin/tags");
  revalidatePath("/blog");
  return { success: id ? "Tag updated." : "Tag created." };
}

export async function deleteTagAction(formData: FormData) {
  await requireApiUser();
  const id = String(formData.get("id") ?? "");
  if (id) await q.deleteTag(id);
  revalidatePath("/admin/tags");
  revalidatePath("/blog");
}

/* ───────────────────────────────── Media ──────────────────────────────────── */

// Not exported: a "use server" file may only export async functions. The client
// components keep their own copy of the accept string.
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
/** Case-study heroes are campaign films, so video is allowed with a larger cap. */
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

export type UploadResult = { url?: string; kind?: "image" | "video"; error?: string };

export async function uploadMediaAction(formData: FormData): Promise<UploadResult> {
  await requireApiUser();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file to upload." };

  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
  if (!isImage && !isVideo) {
    return { error: "Allowed: JPEG, PNG, WebP, GIF, AVIF images or MP4 / WebM video." };
  }

  const limit = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > limit) {
    return { error: isVideo ? "Video must be 50 MB or smaller." : "Images must be 10 MB or smaller." };
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { error: "Blob storage is not configured yet. Run `vercel integration add blob`." };
  }

  // Folder only groups the library; `folder` comes from the calling screen.
  const folder = String(formData.get("folder") ?? "blog").replace(/[^a-z0-9-]/gi, "") || "blog";
  const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) || (isVideo ? "video" : "image");
  const ext = (file.name.split(".").pop() ?? (isVideo ? "mp4" : "jpg"))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  try {
    const blob = await put(`${folder}/${safeName}.${ext}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    revalidatePath("/admin/media");
    // Kind is returned so it can be stored, rather than sniffed from the URL
    // later — Blob appends a random suffix to the pathname.
    return { url: blob.url, kind: isVideo ? "video" : "image" };
  } catch (error) {
    console.error("[media] upload failed:", error);
    return { error: "Upload failed. Please try again." };
  }
}

export async function listMediaAction() {
  await requireApiUser();
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { blobs: [] };
  try {
    // No prefix — one library shows blog and case-study uploads together.
    const { blobs } = await list({ limit: 100 });
    return {
      blobs: blobs
        .map((b) => ({
          url: b.url,
          pathname: b.pathname,
          size: b.size,
          uploadedAt: b.uploadedAt.toISOString(),
          kind: /\.(mp4|webm|mov)$/i.test(b.pathname) ? ("video" as const) : ("image" as const),
        }))
        .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)),
    };
  } catch (error) {
    console.error("[media] list failed:", error);
    return { blobs: [] };
  }
}

export async function deleteMediaAction(formData: FormData) {
  await requireApiUser();
  const url = String(formData.get("url") ?? "");
  if (!url) return;
  try {
    await del(url);
  } catch (error) {
    console.error("[media] delete failed:", error);
  }
  revalidatePath("/admin/media");
}

/* ───────────────────────────────── Users ──────────────────────────────────── */

export async function saveUserAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const actor = await requireApiUser();
  if (actor.role !== "admin") return { error: "Only admins can manage users." };

  const id = String(formData.get("id") ?? "").trim();
  const name = sanitizeText(String(formData.get("name") ?? "")).slice(0, 120);
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = String(formData.get("role") ?? "editor") === "admin" ? "admin" : "editor";
  const password = String(formData.get("password") ?? "");

  if (!name) return { error: "Name is required." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Enter a valid email address." };

  if (id) {
    const target = await q.getUserById(id);
    if (!target) return { error: "That user no longer exists." };

    // Never let the last active admin lose their own admin rights.
    if (target.role === "admin" && role !== "admin" && (await q.countAdmins()) <= 1) {
      return { error: "This is the only admin — promote someone else first." };
    }

    const patch: Parameters<typeof q.updateUser>[1] = { name, role };
    if (password) {
      if (password.length < 10) return { error: "Password must be at least 10 characters." };
      patch.passwordHash = await hashPassword(password);
    }
    await q.updateUser(id, patch);
    if (password) await revokeUserSessions(id);
  } else {
    if (password.length < 10) return { error: "Password must be at least 10 characters." };
    try {
      await q.createUser({ email, name, role, passwordHash: await hashPassword(password) });
    } catch {
      return { error: "An account with that email already exists." };
    }
  }

  revalidatePath("/admin/users");
  return { success: id ? "User updated." : "User created." };
}

export async function toggleUserActiveAction(formData: FormData) {
  const actor = await requireApiUser();
  if (actor.role !== "admin") return;

  const id = String(formData.get("id") ?? "");
  const target = id ? await q.getUserById(id) : null;
  if (!target) return;

  // Don't let an admin disable themselves or strip the last active admin.
  if (target.id === actor.id) return;
  if (target.isActive && target.role === "admin" && (await q.countAdmins()) <= 1) return;

  await q.updateUser(id, { isActive: !target.isActive });
  if (target.isActive) await revokeUserSessions(id);
  revalidatePath("/admin/users");
}

export async function deleteUserAction(formData: FormData) {
  const actor = await requireApiUser();
  if (actor.role !== "admin") return;

  const id = String(formData.get("id") ?? "");
  if (!id || id === actor.id) return;

  const target = await q.getUserById(id);
  if (!target) return;
  if (target.role === "admin" && (await q.countAdmins()) <= 1) return;

  await q.deleteUser(id);
  revalidatePath("/admin/users");
}

/** Used by the editor's preview pane. */
export async function getCurrentUserAction() {
  return getSessionUser();
}

/* ────────────────────────────── Case studies ──────────────────────────────── */

/**
 * Refresh every surface a case study appears on. Note the route is the
 * lowercase folder `/case-studies` even though the public URL is `/CaseStudies`
 * — next.config.mjs rewrites between them, and revalidatePath takes the route.
 */
function revalidateCaseStudies(slug?: string) {
  revalidatePath("/case-studies");
  if (slug) revalidatePath(`/case-studies/${slug}`);
  revalidatePath("/"); // the homepage "Selected work" grid
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/case-studies");
  revalidatePath("/admin");
}

/** Repeatable fields post one entry per row; blanks are dropped. */
function readList(formData: FormData, name: string): string[] {
  return formData
    .getAll(name)
    .map((v) => sanitizeText(String(v)))
    .filter(Boolean);
}

function parseCaseStudyForm(formData: FormData) {
  // Metric rows post as parallel arrays; pair them up and drop half-filled rows.
  const metricValues = formData.getAll("metricValue").map((v) => sanitizeText(String(v)));
  const metricLabels = formData.getAll("metricLabel").map((v) => sanitizeText(String(v)));
  const metrics = metricValues
    .map((value, i) => ({ value, label: metricLabels[i] ?? "" }))
    .filter((m) => m.value && m.label);

  const sortOrderRaw = Number(formData.get("sortOrder"));
  const kindRaw = String(formData.get("mediaKind") ?? "");

  return {
    brand: sanitizeText(String(formData.get("brand") ?? "")).slice(0, 120),
    title: sanitizeText(String(formData.get("title") ?? "")).slice(0, 200),
    category: sanitizeText(String(formData.get("category") ?? "")).slice(0, 120),
    summary: sanitizeText(String(formData.get("summary") ?? "")).slice(0, 600),
    challenge: sanitizeText(String(formData.get("challenge") ?? "")).slice(0, 1200),
    objective: sanitizeText(String(formData.get("objective") ?? "")).slice(0, 1200),
    solution: sanitizeText(String(formData.get("solution") ?? "")).slice(0, 1200),
    techUsed: readList(formData, "techUsed").slice(0, 12),
    results: readList(formData, "results").slice(0, 12),
    metrics: metrics.slice(0, 4),
    accent: (String(formData.get("accent") ?? "blue") === "coral" ? "coral" : "blue") as
      | "blue"
      | "coral",
    mediaUrl: String(formData.get("mediaUrl") ?? "").trim() || null,
    mediaKind: kindRaw === "video" ? ("video" as const) : kindRaw === "image" ? ("image" as const) : null,
    status: (String(formData.get("status") ?? "draft") === "published" ? "published" : "draft") as
      | "draft"
      | "published",
    sortOrder: Number.isFinite(sortOrderRaw) ? Math.trunc(sortOrderRaw) : 0,
    seoTitle: sanitizeText(String(formData.get("seoTitle") ?? "")).slice(0, 200) || null,
    seoDescription: sanitizeText(String(formData.get("seoDescription") ?? "")).slice(0, 400) || null,
    seoKeywords: sanitizeText(String(formData.get("seoKeywords") ?? "")).slice(0, 300) || null,
    ogImageUrl: String(formData.get("ogImageUrl") ?? "").trim() || null,
  };
}

export async function saveCaseStudyAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireApiUser();
  const id = String(formData.get("id") ?? "").trim();
  const values = parseCaseStudyForm(formData);

  if (!values.brand) return { error: "Brand is required." };
  if (!values.title) return { error: "Title is required." };
  if (!values.category) return { error: "Category is required." };
  if (!values.summary) return { error: "Summary is required — it is the card copy." };

  const requestedSlug = slugify(String(formData.get("slug") ?? "") || values.title);
  const slug = await q.uniqueCaseStudySlug(requestedSlug, id || undefined);

  let savedSlug = slug;
  let savedId = id;

  if (id) {
    const existing = await q.getCaseStudyById(id);
    if (!existing) return { error: "That case study no longer exists." };

    // Snapshot the previous version before overwriting it.
    await q.saveCaseStudyRevision({
      caseStudyId: id,
      title: existing.title,
      snapshot: existing,
      authorId: user.id,
    });

    const updated = await q.updateCaseStudy(id, { ...values, slug });
    savedSlug = updated.slug;
    if (existing.slug !== updated.slug) revalidatePath(`/case-studies/${existing.slug}`);
  } else {
    const sortOrder = values.sortOrder || (await q.nextCaseStudySortOrder());
    const created = await q.createCaseStudy({ ...values, sortOrder, slug, authorId: user.id });
    savedId = created.id;
    savedSlug = created.slug;
  }

  revalidateCaseStudies(savedSlug);

  if (!id) redirect(`/admin/case-studies/${savedId}?saved=1`);
  return { success: "Saved." };
}

export async function deleteCaseStudyAction(formData: FormData) {
  await requireApiUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const deleted = await q.deleteCaseStudy(id);
  revalidateCaseStudies(deleted?.slug);
  redirect("/admin/case-studies");
}

export async function bulkCaseStudyAction(formData: FormData) {
  await requireApiUser();
  const ids = formData.getAll("ids").map(String).filter(Boolean);
  const operation = String(formData.get("operation") ?? "");
  if (ids.length === 0) return;

  if (operation === "delete") {
    const rows = await q.deleteCaseStudies(ids);
    rows.forEach((r) => revalidatePath(`/case-studies/${r.slug}`));
  } else if (operation === "publish" || operation === "draft") {
    for (const id of ids) {
      const study = await q.getCaseStudyById(id);
      if (!study) continue;
      await q.updateCaseStudy(id, { status: operation === "publish" ? "published" : "draft" });
      revalidatePath(`/case-studies/${study.slug}`);
    }
  }

  revalidateCaseStudies();
}

/** Live availability check for the slug field. */
export async function checkCaseStudySlugAction(slug: string, exceptId?: string) {
  await requireApiUser();
  const normalized = slugify(slug);
  if (!normalized) return { slug: "", available: false };
  return { slug: normalized, available: !(await q.caseStudySlugTaken(normalized, exceptId)) };
}

export async function restoreCaseStudyRevisionAction(formData: FormData) {
  const user = await requireApiUser();
  const revisionId = String(formData.get("revisionId") ?? "");
  const caseStudyId = String(formData.get("caseStudyId") ?? "");
  if (!revisionId || !caseStudyId) return;

  const [revision, current] = await Promise.all([
    q.getCaseStudyRevision(revisionId),
    q.getCaseStudyById(caseStudyId),
  ]);
  if (!revision || !current) return;

  // The current state becomes a revision too, so a restore is itself undoable.
  await q.saveCaseStudyRevision({
    caseStudyId,
    title: current.title,
    snapshot: current,
    authorId: user.id,
  });

  const snap = revision.snapshot as Partial<typeof current>;
  await q.updateCaseStudy(caseStudyId, {
    brand: snap.brand ?? current.brand,
    title: snap.title ?? current.title,
    category: snap.category ?? current.category,
    summary: snap.summary ?? current.summary,
    challenge: snap.challenge ?? current.challenge,
    objective: snap.objective ?? current.objective,
    solution: snap.solution ?? current.solution,
    techUsed: snap.techUsed ?? current.techUsed,
    results: snap.results ?? current.results,
    metrics: snap.metrics ?? current.metrics,
  });

  revalidateCaseStudies(current.slug);
  redirect(`/admin/case-studies/${caseStudyId}?restored=1`);
}
