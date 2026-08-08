/**
 * CMS schema — blog posts and case studies.
 *
 * The rest of the marketing site's copy still lives in `lib/content.ts`. These
 * two content types are authored through the admin portal instead, because they
 * change often enough that shipping a deploy for each edit is the wrong shape.
 */

import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin", "editor"]);
export const postStatus = pgEnum("post_status", ["draft", "scheduled", "published"]);
/**
 * The site-wide blue/coral alternation used by cards and panels. Named
 * `post_accent` for historical reasons — case studies share it, since it is the
 * brand palette rather than anything blog-specific.
 */
export const postAccent = pgEnum("post_accent", ["blue", "coral"]);
/** Case studies publish or don't — no scheduling, unlike posts. */
export const caseStudyStatus = pgEnum("case_study_status", ["draft", "published"]);
/**
 * Stored explicitly rather than sniffed from the file extension: Vercel Blob
 * appends a random suffix to uploads, so extension matching is not reliable.
 */
export const mediaKind = pgEnum("media_kind", ["image", "video"]);

/* ───────────────────────────── Users & sessions ───────────────────────────── */

export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    /** Always stored lowercased — the unique index is the real constraint. */
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    name: text("name").notNull(),
    role: userRole("role").notNull().default("editor"),
    isActive: boolean("is_active").notNull().default(true),
    failedAttempts: integer("failed_attempts").notNull().default(0),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    emailIdx: uniqueIndex("admin_users_email_idx").on(t.email),
  }),
);

export const sessions = pgTable(
  "sessions",
  {
    /** SHA-256 of the raw session token. The raw token only ever lives in the cookie. */
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    userAgent: text("user_agent"),
  },
  (t) => ({
    userIdx: index("sessions_user_idx").on(t.userId),
    expiresIdx: index("sessions_expires_idx").on(t.expiresAt),
  }),
);

/* ─────────────────────────────── Taxonomy ─────────────────────────────────── */

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: uniqueIndex("categories_slug_idx").on(t.slug),
  }),
);

export const tags = pgTable(
  "tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: uniqueIndex("tags_slug_idx").on(t.slug),
  }),
);

/* ────────────────────────────────── Posts ─────────────────────────────────── */

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    /** Tiptap document — the source of truth when re-opening a post in the editor. */
    bodyJson: jsonb("body_json"),
    /** Sanitized HTML rendered on the public page. Never trust this without sanitizing on write. */
    bodyHtml: text("body_html").notNull().default(""),
    coverImageUrl: text("cover_image_url"),
    coverImageAlt: text("cover_image_alt"),
    status: postStatus("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    authorId: uuid("author_id").references(() => adminUsers.id, { onDelete: "set null" }),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    readingMinutes: integer("reading_minutes").notNull().default(1),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    seoKeywords: text("seo_keywords"),
    ogImageUrl: text("og_image_url"),
    featured: boolean("featured").notNull().default(false),
    accent: postAccent("accent").notNull().default("blue"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    slugIdx: uniqueIndex("posts_slug_idx").on(t.slug),
    feedIdx: index("posts_status_published_idx").on(t.status, t.publishedAt),
    categoryIdx: index("posts_category_idx").on(t.categoryId),
  }),
);

export const postTags = pgTable(
  "post_tags",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.tagId] }),
    tagIdx: index("post_tags_tag_idx").on(t.tagId),
  }),
);

/** Snapshot written on every save, so an editor can roll a post back. */
export const postRevisions = pgTable(
  "post_revisions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    bodyJson: jsonb("body_json"),
    bodyHtml: text("body_html").notNull().default(""),
    authorId: uuid("author_id").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    postIdx: index("post_revisions_post_idx").on(t.postId, t.createdAt),
  }),
);

/* ──────────────────────────────── Case studies ────────────────────────────── */

/**
 * Mirrors the `CaseStudy` type in lib/content.ts one-for-one, so the public
 * pages render identically whether a row came from the seed or the editor.
 *
 * challenge/objective/solution are plain text, not HTML — the detail page
 * renders them as `<p>{body}</p>`, so there is no rich text and nothing on a
 * case study is ever passed to dangerouslySetInnerHTML.
 */
export const caseStudies = pgTable(
  "case_studies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    brand: text("brand").notNull(),
    title: text("title").notNull(),
    /** Free text ("Gamified Consumer Promotion"), deliberately not the blog's categories table. */
    category: text("category").notNull(),
    summary: text("summary").notNull(),
    challenge: text("challenge").notNull().default(""),
    objective: text("objective").notNull().default(""),
    solution: text("solution").notNull().default(""),
    techUsed: jsonb("tech_used").$type<string[]>().notNull().default([]),
    results: jsonb("results").$type<string[]>().notNull().default([]),
    metrics: jsonb("metrics").$type<{ value: string; label: string }[]>().notNull().default([]),
    accent: postAccent("accent").notNull().default("blue"),
    /** Campaign film or still. Empty means the brand-gradient placeholder renders. */
    mediaUrl: text("media_url"),
    mediaKind: mediaKind("media_kind"),
    status: caseStudyStatus("status").notNull().default("draft"),
    /** Ascending. Seeded in tens so new entries can slot between existing ones. */
    sortOrder: integer("sort_order").notNull().default(0),
    /** Optional overrides; blank falls back to "{brand} — {title}" and the summary. */
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    seoKeywords: text("seo_keywords"),
    ogImageUrl: text("og_image_url"),
    authorId: uuid("author_id").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    slugIdx: uniqueIndex("case_studies_slug_idx").on(t.slug),
    /** The only ordering the public pages use. */
    listIdx: index("case_studies_status_order_idx").on(t.status, t.sortOrder),
  }),
);

/** Snapshot written on every save, so an editor can roll a case study back. */
export const caseStudyRevisions = pgTable(
  "case_study_revisions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    caseStudyId: uuid("case_study_id")
      .notNull()
      .references(() => caseStudies.id, { onDelete: "cascade" }),
    /** Whole-row snapshot of the editable fields, kept loose so the shape can evolve. */
    snapshot: jsonb("snapshot").notNull(),
    title: text("title").notNull(),
    authorId: uuid("author_id").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    caseStudyIdx: index("case_study_revisions_case_study_idx").on(t.caseStudyId, t.createdAt),
  }),
);

/* ─────────────────────────────── Relations ────────────────────────────────── */

export const adminUsersRelations = relations(adminUsers, ({ many }) => ({
  posts: many(posts),
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(adminUsers, { fields: [sessions.userId], references: [adminUsers.id] }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(adminUsers, { fields: [posts.authorId], references: [adminUsers.id] }),
  category: one(categories, { fields: [posts.categoryId], references: [categories.id] }),
  postTags: many(postTags),
  revisions: many(postRevisions),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, { fields: [postTags.postId], references: [posts.id] }),
  tag: one(tags, { fields: [postTags.tagId], references: [tags.id] }),
}));

export const postRevisionsRelations = relations(postRevisions, ({ one }) => ({
  post: one(posts, { fields: [postRevisions.postId], references: [posts.id] }),
  author: one(adminUsers, { fields: [postRevisions.authorId], references: [adminUsers.id] }),
}));

export const caseStudiesRelations = relations(caseStudies, ({ one, many }) => ({
  author: one(adminUsers, { fields: [caseStudies.authorId], references: [adminUsers.id] }),
  revisions: many(caseStudyRevisions),
}));

export const caseStudyRevisionsRelations = relations(caseStudyRevisions, ({ one }) => ({
  caseStudy: one(caseStudies, {
    fields: [caseStudyRevisions.caseStudyId],
    references: [caseStudies.id],
  }),
  author: one(adminUsers, { fields: [caseStudyRevisions.authorId], references: [adminUsers.id] }),
}));

/* ─────────────────────────────── Inferred types ───────────────────────────── */

export type AdminUser = typeof adminUsers.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type PostRevision = typeof postRevisions.$inferSelect;
export type PostStatus = (typeof postStatus.enumValues)[number];
export type PostAccent = (typeof postAccent.enumValues)[number];
export type UserRole = (typeof userRole.enumValues)[number];

export type CaseStudyRow = typeof caseStudies.$inferSelect;
export type NewCaseStudyRow = typeof caseStudies.$inferInsert;
export type CaseStudyRevision = typeof caseStudyRevisions.$inferSelect;
export type CaseStudyStatus = (typeof caseStudyStatus.enumValues)[number];
export type MediaKind = (typeof mediaKind.enumValues)[number];
