import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillarCard } from "@/components/ui/Cards";
import Contact from "@/components/sections/Contact";
import { resources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Blogs, whitepapers, guides and tools on experiential marketing, loyalty, trade promotions, gamification and engagement ROI.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Ideas, guides and benchmarks."
        highlight={["benchmarks."]}
        intro="What we're learning about engagement — from loyalty design to gamification mechanics and measurable ROI."
      />
      <section className="gutter pb-24 sm:pb-32">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => (
            <PillarCard key={r.title} no={r.type} title={r.title} blurb={r.desc} index={i} />
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}
