import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillarCard } from "@/components/ui/Cards";
import Contact from "@/components/sections/Contact";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "We don't sell services — we solve business problems. Repeat purchase, new product launches, channel rewards, employee engagement and more.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Start with the business problem."
        highlight={["business", "problem."]}
        intro="Every engagement we build maps to an outcome — more repeat purchase, a stronger launch, rewarded partners, motivated teams. Tell us the goal; we'll engineer the experience."
      />
      <section className="gutter pb-24 sm:pb-32">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <PillarCard key={s.no} no={s.no} title={s.title} blurb={s.desc} index={i} />
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}
