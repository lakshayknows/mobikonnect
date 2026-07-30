import { notFound } from "next/navigation";
import { getPostById, listCategories, listRevisions, listTags } from "@/lib/db/queries";
import { PostEditor } from "@/components/admin/PostEditor";

export const metadata = { title: "Edit post" };
export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; restored?: string };
}) {
  const post = await getPostById(params.id).catch(() => null);
  if (!post) notFound();

  const [categories, tags, revisions] = await Promise.all([
    listCategories().catch(() => []),
    listTags().catch(() => []),
    listRevisions(post.id).catch(() => []),
  ]);

  const notice = searchParams.restored
    ? "Revision restored."
    : searchParams.saved
      ? "Post created."
      : undefined;

  return (
    <PostEditor
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        bodyJson: post.bodyJson,
        bodyHtml: post.bodyHtml,
        coverImageUrl: post.coverImageUrl,
        coverImageAlt: post.coverImageAlt,
        status: post.status,
        publishedAt: post.publishedAt,
        categoryId: post.categoryId,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords,
        ogImageUrl: post.ogImageUrl,
        featured: post.featured,
        accent: post.accent,
        tagIds: post.postTags?.map((pt) => pt.tagId) ?? [],
      }}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      tags={tags.map((t) => ({ id: t.id, name: t.name }))}
      revisions={revisions.map((r) => ({
        id: r.id,
        title: r.title,
        createdAt: r.createdAt,
        author: r.author ? { name: r.author.name } : null,
      }))}
      notice={notice}
    />
  );
}
