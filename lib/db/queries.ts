import { and, asc, count, desc, eq, gt, ilike, inArray, lte, ne, or, sql } from "drizzle-orm";
import { getDb } from "./index";
import {
  adminUsers,
  caseStudies,
  caseStudyRevisions,
  categories,
  postRevisions,
  posts,
  postTags,
  tags,
  type CaseStudyStatus,
  type NewCaseStudyRow,
  type NewPost,
  type PostStatus,
} from "./schema";
import { POSTS_PER_PAGE } from "@/lib/blog";

/**
 * Every query in the app lives here. Public reads are gated on
 * `isLive` — status published AND publish time reached — so scheduled posts go
 * live on their own without a cron job.
 */
const isLive = () => and(eq(posts.status, "published"), lte(posts.publishedAt, sql`now()`));

const postWith = {
  author: { columns: { id: true, name: true } },
  category: true,
  postTags: { with: { tag: true } },
} as const;

export type PostWithRelations = Awaited<ReturnType<typeof getPostBySlug>>;

/* ──────────────────────────────── Public reads ────────────────────────────── */

export async function listPublishedPosts(opts: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
  tagSlug?: string;
} = {}) {
  const db = getDb();
  const page = Math.max(1, opts.page ?? 1);
  const perPage = opts.perPage ?? POSTS_PER_PAGE;

  let categoryId: string | undefined;
  if (opts.categorySlug) {
    const cat = await db.query.categories.findFirst({
      where: eq(categories.slug, opts.categorySlug),
      columns: { id: true },
    });
    if (!cat) return { posts: [], total: 0, page, perPage, totalPages: 0 };
    categoryId = cat.id;
  }

  let postIds: string[] | undefined;
  if (opts.tagSlug) {
    const rows = await db
      .select({ postId: postTags.postId })
      .from(postTags)
      .innerJoin(tags, eq(tags.id, postTags.tagId))
      .where(eq(tags.slug, opts.tagSlug));
    postIds = rows.map((r) => r.postId);
    if (postIds.length === 0) return { posts: [], total: 0, page, perPage, totalPages: 0 };
  }

  const where = and(
    isLive(),
    categoryId ? eq(posts.categoryId, categoryId) : undefined,
    postIds ? inArray(posts.id, postIds) : undefined,
  );

  const [rows, [{ value: total }]] = await Promise.all([
    db.query.posts.findMany({
      where,
      with: postWith,
      orderBy: [desc(posts.publishedAt)],
      limit: perPage,
      offset: (page - 1) * perPage,
    }),
    db.select({ value: count() }).from(posts).where(where),
  ]);

  return { posts: rows, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getPostBySlug(slug: string) {
  const db = getDb();
  return db.query.posts.findFirst({
    where: and(eq(posts.slug, slug), isLive()),
    with: postWith,
  });
}

/** All live slugs — drives generateStaticParams and the sitemap. */
export async function listPublishedSlugs() {
  const db = getDb();
  return db
    .select({ slug: posts.slug, updatedAt: posts.updatedAt })
    .from(posts)
    .where(isLive())
    .orderBy(desc(posts.publishedAt));
}

/** The most recent live post flagged as featured, for the blog index hero. */
export async function getFeaturedPost() {
  const db = getDb();
  return db.query.posts.findFirst({
    where: and(isLive(), eq(posts.featured, true)),
    with: postWith,
    orderBy: [desc(posts.publishedAt)],
  });
}

/** Same category first, most recent, excluding the post itself. */
export async function listRelatedPosts(postId: string, categoryId: string | null, limit = 2) {
  const db = getDb();
  return db.query.posts.findMany({
    where: and(
      isLive(),
      ne(posts.id, postId),
      categoryId ? eq(posts.categoryId, categoryId) : undefined,
    ),
    with: postWith,
    orderBy: [desc(posts.publishedAt)],
    limit,
  });
}

export async function getAdjacentPosts(publishedAt: Date) {
  const db = getDb();
  const [previous, next] = await Promise.all([
    db.query.posts.findFirst({
      where: and(isLive(), sql`${posts.publishedAt} < ${publishedAt}`),
      orderBy: [desc(posts.publishedAt)],
      columns: { slug: true, title: true },
    }),
    db.query.posts.findFirst({
      where: and(isLive(), gt(posts.publishedAt, publishedAt)),
      orderBy: [asc(posts.publishedAt)],
      columns: { slug: true, title: true },
    }),
  ]);
  return { previous, next };
}

/** Categories that actually have at least one live post, with counts. */
export async function listCategoriesWithCounts() {
  const db = getDb();
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      postCount: count(posts.id),
    })
    .from(categories)
    .innerJoin(posts, and(eq(posts.categoryId, categories.id), isLive()))
    .groupBy(categories.id, categories.name, categories.slug)
    .orderBy(asc(categories.name));
}

/* ──────────────────────────────── Admin reads ─────────────────────────────── */

export async function listPostsForAdmin(opts: {
  search?: string;
  status?: PostStatus;
  categoryId?: string;
  page?: number;
  perPage?: number;
} = {}) {
  const db = getDb();
  const page = Math.max(1, opts.page ?? 1);
  const perPage = opts.perPage ?? 20;

  const where = and(
    opts.search
      ? or(ilike(posts.title, `%${opts.search}%`), ilike(posts.slug, `%${opts.search}%`))
      : undefined,
    opts.status ? eq(posts.status, opts.status) : undefined,
    opts.categoryId ? eq(posts.categoryId, opts.categoryId) : undefined,
  );

  const [rows, [{ value: total }]] = await Promise.all([
    db.query.posts.findMany({
      where,
      with: postWith,
      orderBy: [desc(posts.updatedAt)],
      limit: perPage,
      offset: (page - 1) * perPage,
    }),
    db.select({ value: count() }).from(posts).where(where),
  ]);

  return { posts: rows, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getPostById(id: string) {
  const db = getDb();
  return db.query.posts.findFirst({ where: eq(posts.id, id), with: postWith });
}

/** Counts for the dashboard tiles. */
export async function getPostCounts() {
  const db = getDb();
  const rows = await db
    .select({ status: posts.status, value: count() })
    .from(posts)
    .groupBy(posts.status);
  const byStatus = Object.fromEntries(rows.map((r) => [r.status, r.value]));
  return {
    draft: byStatus.draft ?? 0,
    scheduled: byStatus.scheduled ?? 0,
    published: byStatus.published ?? 0,
    total: rows.reduce((sum, r) => sum + r.value, 0),
  };
}

export async function listRecentPosts(limit = 5) {
  const db = getDb();
  return db.query.posts.findMany({
    with: postWith,
    orderBy: [desc(posts.updatedAt)],
    limit,
  });
}

/** True when the slug is taken by a different post. */
export async function slugTaken(slug: string, exceptId?: string) {
  const db = getDb();
  const row = await db.query.posts.findFirst({
    where: exceptId ? and(eq(posts.slug, slug), ne(posts.id, exceptId)) : eq(posts.slug, slug),
    columns: { id: true },
  });
  return Boolean(row);
}

/** Appends -2, -3, … until the slug is free. */
export async function uniqueSlug(base: string, exceptId?: string) {
  let candidate = base || "post";
  let n = 2;
  while (await slugTaken(candidate, exceptId)) {
    candidate = `${base}-${n++}`;
  }
  return candidate;
}

/* ──────────────────────────────── Admin writes ────────────────────────────── */

export async function createPost(values: NewPost) {
  const db = getDb();
  const [row] = await db.insert(posts).values(values).returning();
  return row;
}

export async function updatePost(id: string, values: Partial<NewPost>) {
  const db = getDb();
  const [row] = await db.update(posts).set(values).where(eq(posts.id, id)).returning();
  return row;
}

export async function deletePost(id: string) {
  const db = getDb();
  const [row] = await db.delete(posts).where(eq(posts.id, id)).returning({ slug: posts.slug });
  return row;
}

export async function deletePosts(ids: string[]) {
  const db = getDb();
  if (ids.length === 0) return [];
  return db.delete(posts).where(inArray(posts.id, ids)).returning({ slug: posts.slug });
}

export async function setPostTags(postId: string, tagIds: string[]) {
  const db = getDb();
  await db.delete(postTags).where(eq(postTags.postId, postId));
  if (tagIds.length > 0) {
    await db.insert(postTags).values(tagIds.map((tagId) => ({ postId, tagId })));
  }
}

/* ──────────────────────────────── Revisions ───────────────────────────────── */

export async function saveRevision(values: {
  postId: string;
  title: string;
  excerpt?: string | null;
  bodyJson: unknown;
  bodyHtml: string;
  authorId?: string | null;
}) {
  const db = getDb();
  await db.insert(postRevisions).values(values as typeof postRevisions.$inferInsert);
  // Keep the 20 most recent snapshots per post.
  await db.execute(sql`
    delete from post_revisions
    where post_id = ${values.postId}
      and id not in (
        select id from post_revisions
        where post_id = ${values.postId}
        order by created_at desc
        limit 20
      )
  `);
}

export async function listRevisions(postId: string) {
  const db = getDb();
  return db.query.postRevisions.findMany({
    where: eq(postRevisions.postId, postId),
    with: { author: { columns: { id: true, name: true } } },
    orderBy: [desc(postRevisions.createdAt)],
    limit: 20,
  });
}

export async function getRevision(id: string) {
  const db = getDb();
  return db.query.postRevisions.findFirst({ where: eq(postRevisions.id, id) });
}

/* ──────────────────────────────── Taxonomy ────────────────────────────────── */

export async function listCategories() {
  const db = getDb();
  return db.select().from(categories).orderBy(asc(categories.name));
}

export async function listTags() {
  const db = getDb();
  return db.select().from(tags).orderBy(asc(tags.name));
}

export async function createCategory(values: { name: string; slug: string; description?: string }) {
  const db = getDb();
  const [row] = await db.insert(categories).values(values).returning();
  return row;
}

export async function updateCategory(
  id: string,
  values: { name?: string; slug?: string; description?: string | null },
) {
  const db = getDb();
  const [row] = await db.update(categories).set(values).where(eq(categories.id, id)).returning();
  return row;
}

export async function deleteCategory(id: string) {
  const db = getDb();
  await db.delete(categories).where(eq(categories.id, id));
}

export async function createTag(values: { name: string; slug: string }) {
  const db = getDb();
  const [row] = await db.insert(tags).values(values).returning();
  return row;
}

export async function updateTag(id: string, values: { name?: string; slug?: string }) {
  const db = getDb();
  const [row] = await db.update(tags).set(values).where(eq(tags.id, id)).returning();
  return row;
}

export async function deleteTag(id: string) {
  const db = getDb();
  await db.delete(tags).where(eq(tags.id, id));
}

/* ────────────────────────────────── Users ─────────────────────────────────── */

export async function listUsers() {
  const db = getDb();
  return db
    .select({
      id: adminUsers.id,
      email: adminUsers.email,
      name: adminUsers.name,
      role: adminUsers.role,
      isActive: adminUsers.isActive,
      lastLoginAt: adminUsers.lastLoginAt,
      createdAt: adminUsers.createdAt,
    })
    .from(adminUsers)
    .orderBy(asc(adminUsers.createdAt));
}

export async function getUserByEmail(email: string) {
  const db = getDb();
  return db.query.adminUsers.findFirst({ where: eq(adminUsers.email, email.toLowerCase()) });
}

export async function getUserById(id: string) {
  const db = getDb();
  return db.query.adminUsers.findFirst({ where: eq(adminUsers.id, id) });
}

export async function createUser(values: {
  email: string;
  passwordHash: string;
  name: string;
  role?: "admin" | "editor";
}) {
  const db = getDb();
  const [row] = await db
    .insert(adminUsers)
    .values({ ...values, email: values.email.toLowerCase() })
    .returning();
  return row;
}

export async function updateUser(
  id: string,
  values: Partial<{
    name: string;
    role: "admin" | "editor";
    isActive: boolean;
    passwordHash: string;
    failedAttempts: number;
    lockedUntil: Date | null;
    lastLoginAt: Date;
  }>,
) {
  const db = getDb();
  const [row] = await db.update(adminUsers).set(values).where(eq(adminUsers.id, id)).returning();
  return row;
}

export async function deleteUser(id: string) {
  const db = getDb();
  await db.delete(adminUsers).where(eq(adminUsers.id, id));
}

export async function countAdmins() {
  const db = getDb();
  const [{ value }] = await db
    .select({ value: count() })
    .from(adminUsers)
    .where(and(eq(adminUsers.role, "admin"), eq(adminUsers.isActive, true)));
  return value;
}

/* ────────────────────────────── Case studies ──────────────────────────────── */

/**
 * Case studies have no scheduling — published means live. Ordering is always
 * `sortOrder` ascending, which the seed set to today's exact array order.
 */
const caseStudyLive = () => eq(caseStudies.status, "published");

export async function listPublishedCaseStudies(limit?: number) {
  const db = getDb();
  return db
    .select()
    .from(caseStudies)
    .where(caseStudyLive())
    .orderBy(asc(caseStudies.sortOrder), asc(caseStudies.createdAt))
    .limit(limit ?? 500);
}

export async function getCaseStudyBySlug(slug: string) {
  const db = getDb();
  return db.query.caseStudies.findFirst({
    where: and(eq(caseStudies.slug, slug), caseStudyLive()),
  });
}

/** Drives generateStaticParams and the sitemap. */
export async function listPublishedCaseStudySlugs() {
  const db = getDb();
  return db
    .select({ slug: caseStudies.slug, updatedAt: caseStudies.updatedAt })
    .from(caseStudies)
    .where(caseStudyLive())
    .orderBy(asc(caseStudies.sortOrder));
}

/** Distinct category strings, for the editor's datalist. */
export async function listCaseStudyCategories() {
  const db = getDb();
  const rows = await db
    .selectDistinct({ category: caseStudies.category })
    .from(caseStudies)
    .orderBy(asc(caseStudies.category));
  return rows.map((r) => r.category).filter(Boolean);
}

export async function listCaseStudiesForAdmin(
  opts: { search?: string; status?: CaseStudyStatus; page?: number; perPage?: number } = {},
) {
  const db = getDb();
  const page = Math.max(1, opts.page ?? 1);
  const perPage = opts.perPage ?? 25;

  const where = and(
    opts.search
      ? or(
          ilike(caseStudies.title, `%${opts.search}%`),
          ilike(caseStudies.brand, `%${opts.search}%`),
          ilike(caseStudies.slug, `%${opts.search}%`),
        )
      : undefined,
    opts.status ? eq(caseStudies.status, opts.status) : undefined,
  );

  const [rows, [{ value: total }]] = await Promise.all([
    db
      .select()
      .from(caseStudies)
      .where(where)
      .orderBy(asc(caseStudies.sortOrder), asc(caseStudies.createdAt))
      .limit(perPage)
      .offset((page - 1) * perPage),
    db.select({ value: count() }).from(caseStudies).where(where),
  ]);

  return { caseStudies: rows, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getCaseStudyById(id: string) {
  const db = getDb();
  return db.query.caseStudies.findFirst({ where: eq(caseStudies.id, id) });
}

export async function getCaseStudyCounts() {
  const db = getDb();
  const rows = await db
    .select({ status: caseStudies.status, value: count() })
    .from(caseStudies)
    .groupBy(caseStudies.status);
  const byStatus = Object.fromEntries(rows.map((r) => [r.status, r.value]));
  return {
    draft: byStatus.draft ?? 0,
    published: byStatus.published ?? 0,
    total: rows.reduce((sum, r) => sum + r.value, 0),
  };
}

export async function caseStudySlugTaken(slug: string, exceptId?: string) {
  const db = getDb();
  const row = await db.query.caseStudies.findFirst({
    where: exceptId
      ? and(eq(caseStudies.slug, slug), ne(caseStudies.id, exceptId))
      : eq(caseStudies.slug, slug),
    columns: { id: true },
  });
  return Boolean(row);
}

export async function uniqueCaseStudySlug(base: string, exceptId?: string) {
  let candidate = base || "case-study";
  let n = 2;
  while (await caseStudySlugTaken(candidate, exceptId)) {
    candidate = `${base}-${n++}`;
  }
  return candidate;
}

/** Next free slot at the end of the list, in tens. */
export async function nextCaseStudySortOrder() {
  const db = getDb();
  const [row] = await db
    .select({ max: sql<number | null>`max(${caseStudies.sortOrder})` })
    .from(caseStudies);
  return (row?.max ?? 0) + 10;
}

export async function createCaseStudy(values: NewCaseStudyRow) {
  const db = getDb();
  const [row] = await db.insert(caseStudies).values(values).returning();
  return row;
}

export async function updateCaseStudy(id: string, values: Partial<NewCaseStudyRow>) {
  const db = getDb();
  const [row] = await db.update(caseStudies).set(values).where(eq(caseStudies.id, id)).returning();
  return row;
}

export async function deleteCaseStudy(id: string) {
  const db = getDb();
  const [row] = await db
    .delete(caseStudies)
    .where(eq(caseStudies.id, id))
    .returning({ slug: caseStudies.slug });
  return row;
}

export async function deleteCaseStudies(ids: string[]) {
  const db = getDb();
  if (ids.length === 0) return [];
  return db
    .delete(caseStudies)
    .where(inArray(caseStudies.id, ids))
    .returning({ slug: caseStudies.slug });
}

/* ─────────────────────── Case study revisions ─────────────────────────────── */

export async function saveCaseStudyRevision(values: {
  caseStudyId: string;
  title: string;
  snapshot: unknown;
  authorId?: string | null;
}) {
  const db = getDb();
  await db.insert(caseStudyRevisions).values(values as typeof caseStudyRevisions.$inferInsert);
  // Keep the 20 most recent snapshots per case study.
  await db.execute(sql`
    delete from case_study_revisions
    where case_study_id = ${values.caseStudyId}
      and id not in (
        select id from case_study_revisions
        where case_study_id = ${values.caseStudyId}
        order by created_at desc
        limit 20
      )
  `);
}

export async function listCaseStudyRevisions(caseStudyId: string) {
  const db = getDb();
  return db.query.caseStudyRevisions.findMany({
    where: eq(caseStudyRevisions.caseStudyId, caseStudyId),
    with: { author: { columns: { id: true, name: true } } },
    orderBy: [desc(caseStudyRevisions.createdAt)],
    limit: 20,
  });
}

export async function getCaseStudyRevision(id: string) {
  const db = getDb();
  return db.query.caseStudyRevisions.findFirst({ where: eq(caseStudyRevisions.id, id) });
}
