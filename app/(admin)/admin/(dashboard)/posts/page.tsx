import Link from "next/link";
import { Plus } from "lucide-react";
import { listCategories, listPostsForAdmin } from "@/lib/db/queries";
import { formatPostDate } from "@/lib/blog";
import { Button, EmptyState } from "@/components/admin/ui";
import { PostsTable } from "@/components/admin/PostsTable";
import type { PostStatus } from "@/lib/db/schema";

export const metadata = { title: "Posts" };
export const dynamic = "force-dynamic";

const STATUSES: PostStatus[] = ["draft", "scheduled", "published"];

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; category?: string; page?: string };
}) {
  const status = STATUSES.includes(searchParams.status as PostStatus)
    ? (searchParams.status as PostStatus)
    : undefined;

  const [result, categories] = await Promise.all([
    listPostsForAdmin({
      search: searchParams.q,
      status,
      categoryId: searchParams.category,
      page: Number(searchParams.page) || 1,
    }).catch(() => ({ posts: [], total: 0, page: 1, perPage: 20, totalPages: 0 })),
    listCategories().catch(() => []),
  ]);

  const rows = result.posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    status: p.status,
    category: p.category?.name ?? null,
    author: p.author?.name ?? null,
    date: p.publishedAt ? formatPostDate(p.publishedAt) : null,
    updated: formatPostDate(p.updatedAt),
  }));

  const unfiltered = !searchParams.q && !status && !searchParams.category;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-cream-dim">Content</p>
          <h1 className="display mt-2 text-3xl text-cream">Posts</h1>
        </div>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="h-4 w-4" />
            New post
          </Button>
        </Link>
      </div>

      {result.total === 0 && unfiltered ? (
        <EmptyState
          title="No posts yet"
          description="Create your first post — it stays a draft until you publish it."
          action={
            <Link href="/admin/posts/new">
              <Button>
                <Plus className="h-4 w-4" />
                New post
              </Button>
            </Link>
          }
        />
      ) : (
        <PostsTable
          posts={rows}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          total={result.total}
          page={result.page}
          totalPages={result.totalPages}
          filters={{
            q: searchParams.q ?? "",
            status: status ?? "",
            category: searchParams.category ?? "",
          }}
        />
      )}
    </>
  );
}
