import Link from "next/link";
import { Plus } from "lucide-react";
import { listCaseStudiesForAdmin } from "@/lib/db/queries";
import { Button, EmptyState } from "@/components/admin/ui";
import { CaseStudiesTable } from "@/components/admin/CaseStudiesTable";
import type { CaseStudyStatus } from "@/lib/db/schema";

export const metadata = { title: "Case Studies" };
export const dynamic = "force-dynamic";

const STATUSES: CaseStudyStatus[] = ["draft", "published"];

export default async function AdminCaseStudiesPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; page?: string };
}) {
  const status = STATUSES.includes(searchParams.status as CaseStudyStatus)
    ? (searchParams.status as CaseStudyStatus)
    : undefined;

  const result = await listCaseStudiesForAdmin({
    search: searchParams.q,
    status,
    page: Number(searchParams.page) || 1,
  }).catch(() => ({ caseStudies: [], total: 0, page: 1, perPage: 25, totalPages: 0 }));

  const rows = result.caseStudies.map((s) => ({
    id: s.id,
    slug: s.slug,
    brand: s.brand,
    title: s.title,
    category: s.category,
    status: s.status,
    accent: s.accent,
    sortOrder: s.sortOrder,
    hasMedia: Boolean(s.mediaUrl),
    mediaKind: s.mediaKind,
  }));

  const unfiltered = !searchParams.q && !status;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-cream-dim">Content</p>
          <h1 className="display mt-2 text-3xl text-cream">Case Studies</h1>
          <p className="mt-2 text-sm text-cream-dim">
            Ordered by display order — the homepage shows the first six published.
          </p>
        </div>
        <Link href="/admin/case-studies/new">
          <Button>
            <Plus className="h-4 w-4" />
            New case study
          </Button>
        </Link>
      </div>

      {result.total === 0 && unfiltered ? (
        <EmptyState
          title="No case studies yet"
          description="Run `npm run db:seed:case-studies` to import the 20 existing ones, or create a new one here."
          action={
            <Link href="/admin/case-studies/new">
              <Button>
                <Plus className="h-4 w-4" />
                New case study
              </Button>
            </Link>
          }
        />
      ) : (
        <CaseStudiesTable
          studies={rows}
          total={result.total}
          page={result.page}
          totalPages={result.totalPages}
          filters={{ q: searchParams.q ?? "", status: status ?? "" }}
        />
      )}
    </>
  );
}
