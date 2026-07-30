/**
 * Blog CMS schema.
 *
 * The marketing site's copy still lives in `lib/content.ts` — this covers only
 * the blog, which is authored through the admin portal rather than shipped by a
 * developer.
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
/** Mirrors the blue/coral alternation the site uses for cards and panels. */
export const postAccent = pgEnum("post_accent", ["blue", "coral"]);

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
