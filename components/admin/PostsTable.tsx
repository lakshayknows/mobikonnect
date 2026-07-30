"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Trash2, Upload, FileDown } from "lucide-react";
import { bulkPostAction } from "@/app/(admin)/admin/actions";
import { Button, Input, Select, StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/cn";

type Row = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "scheduled" | "published";
  category: string | null;
  author: string | null;
  date: string | null;
  updated: string;
};

export function PostsTable({
  posts,
  categories,
  total,
  page,
  totalPages,
  filters,
}: {
  posts: Row[];
  categories: { id: string; name: string }[];
  total: number;
  page: number;
  totalPages: number;
  filters: { q: string; status: string; category: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page"); // any filter change resets pagination
    router.push(`/admin/posts${params.toString() ? `?${params}` : ""}`);
  };

  const pageHref = (n: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (n > 1) params.set("page", String(n));
    else params.delete("page");
    return `/admin/posts${params.toString() ? `?${params}` : ""}`;
  };

  const allSelected = posts.length > 0 && selected.length === posts.length;

  return (
    <>
      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <form
          className="relative min-w-[220px] flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            setParam("q", new FormData(e.currentTarget).get("q") as string);
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-faint" />
          <Input name="q" defaultValue={filters.q} placeholder="Search titles and slugs…" className="pl-9" />
        </form>

        <Select
          value={filters.status}
          onChange={(e) => setParam("status", e.target.value)}
          className="w-auto min-w-[150px]"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Draft</option>
        </Select>

        <Select
          value={filters.category}
          onChange={(e) => setParam("category", e.target.value)}
          className="w-auto min-w-[160px]"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <form
          action={bulkPostAction}
          className="mb-4 flex flex-wrap items-center gap-3 rounded-card border border-coral/30 bg-coral/5 px-4 py-3"
          onSubmit={(e) => {
            const op = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
            if (
              op?.value === "delete" &&
              !window.confirm(`Delete ${selected.length} post${selected.length === 1 ? "" : "s"}? This cannot be undone.`)
            ) {
              e.preventDefault();
            }
          }}
        >
          {selected.map((id) => (
            <input key={id} type="hidden" name="ids" value={id} />
          ))}
          <span className="text-sm text-cream">
            {selected.length} selected
          </span>
          <div className="ml-auto flex flex-wrap gap-2">
            <Button type="submit" name="operation" value="publish" variant="secondary" size="sm">
              <Upload className="h-3.5 w-3.5" />
              Publish
            </Button>
            <Button type="submit" name="operation" value="draft" variant="secondary" size="sm">
              <FileDown className="h-3.5 w-3.5" />
              Move to draft
            </Button>
            <Button type="submit" name="operation" value="delete" variant="danger" size="sm">
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </form>
      )}

      {/* Table */}
      {posts.length === 0 ? (
        <div className="rounded-card border border-dashed border-cream-line bg-ink-soft/20 px-6 py-14 text-center">
          <p className="text-sm text-cream-dim">No posts match those filters.</p>
          <Link href="/admin/posts" className="mt-3 inline-block text-sm text-coral hover:underline">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-cream-line">
          <div className="hidden items-center gap-4 border-b border-cream-line bg-ink-soft/40 px-5 py-3 text-[0.68rem] uppercase tracking-label text-cream-faint sm:flex">
            <input
              type="checkbox"
              aria-label="Select all posts"
              checked={allSelected}
              onChange={(e) => setSelected(e.target.checked ? posts.map((p) => p.id) : [])}
              className="h-4 w-4 cursor-pointer rounded border-cream-line bg-ink-deep accent-coral"
            />
            <span className="flex-1">Title</span>
            <span className="w-28">Status</span>
            <span className="w-36">Category</span>
            <span className="w-32">Published</span>
          </div>

          {posts.map((post, i) => {
            const checked = selected.includes(post.id);
            return (
              <div
                key={post.id}
                className={cn(
                  "flex flex-col gap-3 bg-ink-soft/20 px-5 py-4 transition-colors duration-200 hover:bg-ink-soft/50 sm:flex-row sm:items-center sm:gap-4",
                  i > 0 && "border-t border-cream-line",
                  checked && "bg-coral/[0.06]",
                )}
              >
                <input
                  type="checkbox"
                  aria-label={`Select ${post.title}`}
                  checked={checked}
                  onChange={(e) =>
                    setSelected((prev) =>
                      e.target.checked ? [...prev, post.id] : prev.filter((id) => id !== post.id),
                    )
                  }
                  className="h-4 w-4 shrink-0 cursor-pointer rounded border-cream-line bg-ink-deep accent-coral"
                />

                <Link href={`/admin/posts/${post.id}`} className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-cream">{post.title}</p>
                  <p className="mt-0.5 truncate text-xs text-cream-faint">
                    /blog/{post.slug}
                    {post.author ? ` · ${post.author}` : ""}
                    <span className="sm:hidden"> · edited {post.updated}</span>
                  </p>
                </Link>

                <div className="w-28 shrink-0">
                  <StatusBadge status={post.status} />
                </div>
                <span className="hidden w-36 shrink-0 truncate text-xs text-cream-dim sm:block">
                  {post.category ?? "—"}
                </span>
                <span className="hidden w-32 shrink-0 text-xs text-cream-dim sm:block">
                  {post.date ?? "—"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-cream-dim">
        <span>
          {total} post{total === 1 ? "" : "s"}
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-3">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className="transition-colors hover:text-cream">
                Previous
              </Link>
            ) : (
              <span className="text-cream-faint">Previous</span>
            )}
            <span className="text-xs text-cream-faint">
              {page} / {totalPages}
            </span>
            {page < totalPages ? (
              <Link href={pageHref(page + 1)} className="transition-colors hover:text-cream">
                Next
              </Link>
            ) : (
              <span className="text-cream-faint">Next</span>
            )}
          </div>
        )}
      </div>
    </>
  );
}
