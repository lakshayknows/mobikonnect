import { notFound } from "next/navigation";
import {
  getCaseStudyById,
  listCaseStudyCategories,
  listCaseStudyRevisions,
} from "@/lib/db/queries";
import { CaseStudyEditor } from "@/components/admin/CaseStudyEditor";

export const metadata = { title: "Edit case study" };
export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; restored?: string };
}) {
  const study = await getCaseStudyById(params.id).catch(() => null);
  if (!study) notFound();

  const [categories, revisions] = await Promise.all([
    listCaseStudyCategories().catch(() => []),
    listCaseStudyRevisions(study.id).catch(() => []),
  ]);

  const notice = searchParams.restored
    ? "Revision restored."
    : searchParams.saved
      ? "Case study created."
      : undefined;

  return (
    <CaseStudyEditor
      study={{
        id: study.id,
        slug: study.slug,
        brand: study.brand,
        title: study.title,
        category: study.category,
        summary: study.summary,
        challenge: study.challenge,
        objective: study.objective,
        solution: study.solution,
        techUsed: study.techUsed,
        results: study.results,
        metrics: study.metrics,
        accent: study.accent,
        mediaUrl: study.mediaUrl,
        mediaKind: study.mediaKind,
        status: study.status,
        sortOrder: study.sortOrder,
        seoTitle: study.seoTitle,
        seoDescription: study.seoDescription,
        seoKeywords: study.seoKeywords,
        ogImageUrl: study.ogImageUrl,
      }}
      categories={categories}
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
