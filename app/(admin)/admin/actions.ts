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

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function uploadMediaAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireApiUser();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file to upload." };
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Only JPEG, PNG, WebP, GIF or AVIF images are allowed." };
  }
  if (file.size > MAX_UPLOAD_BYTES) return { error: "Images must be 10 MB or smaller." };
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { error: "Blob storage is not configured yet. Run `vercel integration add blob`." };
  }

  const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");

  try {
    const blob = await put(`blog/${safeName}.${ext}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    revalidatePath("/admin/media");
    return { url: blob.url };
  } catch (error) {
    console.error("[media] upload failed:", error);
    return { error: "Upload failed. Please try again." };
  }
}

export async function listMediaAction() {
  await requireApiUser();
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { blobs: [] };
  try {
    const { blobs } = await list({ prefix: "blog/", limit: 100 });
    return {
      blobs: blobs
        .map((b) => ({
          url: b.url,
          pathname: b.pathname,
          size: b.size,
          uploadedAt: b.uploadedAt.toISOString(),
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
