import Link from "next/link";
import { FileText, Plus, Clock, CheckCircle2, PenLine } from "lucide-react";
import { getPostCounts, listRecentPosts } from "@/lib/db/queries";
import { formatPostDate } from "@/lib/blog";
import { AdminCard, Button, EmptyState, SectionTitle, StatusBadge } from "@/components/admin/ui";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [counts, recent] = await Promise.all([
    getPostCounts().catch(() => ({ draft: 0, scheduled: 0, published: 0, total: 0 })),
    listRecentPosts(6).catch(() => []),
  ]);

  const tiles = [
    { label: "Published", value: counts.published, icon: CheckCircle2, href: "/admin/posts?status=published" },
    { label: "Drafts", value: counts.draft, icon: PenLine, href: "/admin/posts?status=draft" },
    { label: "Scheduled", value: counts.scheduled, icon: Clock, href: "/admin/posts?status=scheduled" },
    { label: "All posts", value: counts.total, icon: FileText, href: "/admin/posts" },
  ];

  return (
    <>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-cream-dim">Overview</p>
          <h1 className="display mt-2 text-3xl text-cream">Dashboard</h1>
        </div>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="h-4 w-4" />
            New post
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <AdminCard className="transition-colors duration-300 hover:border-cream/25 hover:bg-ink-soft/50">
              <div className="flex items-start justify-between">
                <span className="eyebrow text-[0.68rem] text-cream-faint">{label}</span>
                <Icon className="h-4 w-4 text-cream-faint" />
              </div>
              <p className="display mt-4 text-4xl text-cream">{value}</p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <SectionTitle
          action={
            <Link href="/admin/posts" className="text-sm text-cream-dim transition-colors hover:text-cream">
              View all
            </Link>
          }
        >
          Recently edited
        </SectionTitle>

        {recent.length === 0 ? (
          <EmptyState
            title="No posts yet"
            description="Write your first post and it will appear on the blog as soon as you publish."
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
          <div className="overflow-hidden rounded-card border border-cream-line">
            {recent.map((post, i) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className={`flex items-center justify-between gap-4 bg-ink-soft/20 px-5 py-4 transition-colors duration-200 hover:bg-ink-soft/50 ${
                  i > 0 ? "border-t border-cream-line" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-cream">{post.title}</p>
                  <p className="mt-1 truncate text-xs text-cream-faint">
                    {post.category?.name ?? "Uncategorised"}
                    {" · "}
                    {post.publishedAt ? formatPostDate(post.publishedAt) : "Not published"}
                  </p>
                </div>
                <StatusBadge status={post.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
