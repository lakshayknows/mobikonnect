"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FileDown, Film, Search, Trash2, Upload } from "lucide-react";
import { bulkCaseStudyAction } from "@/app/(admin)/admin/actions";
import { Button, Input, Select } from "@/components/admin/ui";
import { cn } from "@/lib/cn";

type Row = {
  id: string;
  slug: string;
  brand: string;
  title: string;
  category: string;
  status: "draft" | "published";
  accent: "blue" | "coral";
  sortOrder: number;
  hasMedia: boolean;
  mediaKind: "image" | "video" | null;
};

export function CaseStudiesTable({
  studies,
  total,
  page,
  totalPages,
  filters,
}: {
  studies: Row[];
  total: number;
  page: number;
  totalPages: number;
  filters: { q: string; status: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/admin/case-studies${params.toString() ? `?${params}` : ""}`);
  };

  const pageHref = (n: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (n > 1) params.set("page", String(n));
    else params.delete("page");
    return `/admin/case-studies${params.toString() ? `?${params}` : ""}`;
  };

  const allSelected = studies.length > 0 && selected.length === studies.length;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <form
          className="relative min-w-[220px] flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            setParam("q", new FormData(e.currentTarget).get("q") as string);
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-faint" />
          <Input name="q" defaultValue={filters.q} placeholder="Search brand, title or slug…" className="pl-9" />
        </form>

        <Select
          value={filters.status}
          onChange={(e) => setParam("status", e.target.value)}
          className="w-auto min-w-[150px]"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </Select>
      </div>

      {selected.length > 0 && (
        <form
          action={bulkCaseStudyAction}
          className="mb-4 flex flex-wrap items-center gap-3 rounded-card border border-coral/30 bg-coral/5 px-4 py-3"
          onSubmit={(e) => {
            const op = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
            if (
              op?.value === "delete" &&
              !window.confirm(
                `Delete ${selected.length} case ${selected.length === 1 ? "study" : "studies"}? This cannot be undone.`,
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          {selected.map((id) => (
            <input key={id} type="hidden" name="ids" value={id} />
          ))}
          <span className="text-sm text-cream">{selected.length} selected</span>
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

      {studies.length === 0 ? (
        <div className="rounded-card border border-dashed border-cream-line bg-ink-soft/20 px-6 py-14 text-center">
          <p className="text-sm text-cream-dim">No case studies match those filters.</p>
          <Link href="/admin/case-studies" className="mt-3 inline-block text-sm text-coral hover:underline">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-cream-line">
          <div className="hidden items-center gap-4 border-b border-cream-line bg-ink-soft/40 px-5 py-3 text-[0.68rem] uppercase tracking-label text-cream-faint sm:flex">
            <input
              type="checkbox"
              aria-label="Select all case studies"
              checked={allSelected}
              onChange={(e) => setSelected(e.target.checked ? studies.map((s) => s.id) : [])}
              className="h-4 w-4 cursor-pointer rounded border-cream-line bg-ink-deep accent-coral"
            />
            <span className="w-12">Order</span>
            <span className="flex-1">Campaign</span>
            <span className="w-40">Category</span>
            <span className="w-24">Status</span>
          </div>

          {studies.map((study, i) => {
            const checked = selected.includes(study.id);
            return (
              <div
                key={study.id}
                className={cn(
                  "flex flex-col gap-3 bg-ink-soft/20 px-5 py-4 transition-colors duration-200 hover:bg-ink-soft/50 sm:flex-row sm:items-center sm:gap-4",
                  i > 0 && "border-t border-cream-line",
                  checked && "bg-coral/[0.06]",
                )}
              >
                <input
                  type="checkbox"
                  aria-label={`Select ${study.title}`}
                  checked={checked}
                  onChange={(e) =>
                    setSelected((prev) =>
                      e.target.checked ? [...prev, study.id] : prev.filter((id) => id !== study.id),
                    )
                  }
                  className="h-4 w-4 shrink-0 cursor-pointer rounded border-cream-line bg-ink-deep accent-coral"
                />

                <span className="w-12 shrink-0 text-xs tabular-nums text-cream-faint">
                  {study.sortOrder}
                </span>

                <Link href={`/admin/case-studies/${study.id}`} className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate text-sm font-medium text-cream">
                    <span
                      aria-hidden
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        study.accent === "coral" ? "bg-coral" : "bg-blue",
                      )}
                    />
                    <span className="truncate">
                      {study.brand} — {study.title}
                    </span>
                    {study.mediaKind === "video" && (
                      <Film className="h-3.5 w-3.5 shrink-0 text-cream-faint" aria-label="Has video" />
                    )}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-cream-faint">
                    /CaseStudies/{study.slug}
                    <span className="sm:hidden"> · {study.category}</span>
                  </p>
                </Link>

                <span className="hidden w-40 shrink-0 truncate text-xs text-cream-dim sm:block">
                  {study.category}
                </span>

                <div className="w-24 shrink-0">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-pill border px-2.5 py-0.5 text-[0.68rem] uppercase tracking-label",
                      study.status === "published"
                        ? "border-coral/40 bg-coral/10 text-coral"
                        : "border-cream-line bg-ink-soft/60 text-cream-dim",
                    )}
                  >
                    {study.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-cream-dim">
        <span>
          {total} case {total === 1 ? "study" : "studies"}
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
