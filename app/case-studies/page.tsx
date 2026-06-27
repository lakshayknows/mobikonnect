import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CaseCard } from "@/components/ui/Cards";
import Contact from "@/components/sections/Contact";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Campaigns that became conversations — gamified promotions, app-led loyalty, missed-call sampling and voice engagement for India's biggest brands.",
};

export default function CaseStudiesPage() {
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
      <Contact />
    </>
  );
}
