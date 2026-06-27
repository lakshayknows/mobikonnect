import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillarCard } from "@/components/ui/Cards";
import Contact from "@/components/sections/Contact";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six pillars of engagement — consumer promotions, trade promotions, loyalty, experiential marketing, customer engagement and martech — delivered end to end.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Six pillars of engagement, one operator."
        highlight={["engagement,", "operator."]}
        intro="From the first mechanic to the last gift delivered, we design, build and run engagement experiences across promotions, loyalty, activations and technology."
      />
      <section className="gutter pb-24 sm:pb-32">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <PillarCard
              key={s.no}
              no={s.no}
              title={s.title}
              blurb={s.blurb}
              points={s.points}
              index={i}
            />
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}
