import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CaseCard } from "@/components/ui/Cards";
import { listPublishedCaseStudies } from "@/lib/db/queries";
import { isDbConfigured } from "@/lib/db";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Campaigns that became conversations — gamified promotions, app-led loyalty, missed-call sampling and voice engagement for India's biggest brands.",
};

/** Rebuild at most once a minute; publishing from the admin revalidates on demand. */
export const revalidate = 60;

export default async function CaseStudiesPage() {
  let caseStudies: Awaited<ReturnType<typeof listPublishedCaseStudies>> = [];

  if (isDbConfigured()) {
    try {
      caseStudies = await listPublishedCaseStudies();
    } catch (error) {
      console.error("[case-studies] failed to load:", error);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Campaigns that became conversations."
        highlight={["conversations."]}
        intro="Challenge, mechanic, technology and measurable results — a selection of the engagement experiences we've shipped."
      />
      <section className="gutter pb-24 sm:pb-32">
        <div className="grid gap-5 lg:grid-cols-2">
          {caseStudies.map((study, i) => (
            <CaseCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
