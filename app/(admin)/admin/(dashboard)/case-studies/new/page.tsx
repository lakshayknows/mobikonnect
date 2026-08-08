import { listCaseStudyCategories, nextCaseStudySortOrder } from "@/lib/db/queries";
import { CaseStudyEditor } from "@/components/admin/CaseStudyEditor";

export const metadata = { title: "New case study" };
export const dynamic = "force-dynamic";

export default async function NewCaseStudyPage() {
  const [categories, nextSortOrder] = await Promise.all([
    listCaseStudyCategories().catch(() => []),
    nextCaseStudySortOrder().catch(() => 10),
  ]);

  return <CaseStudyEditor categories={categories} nextSortOrder={nextSortOrder} />;
}
