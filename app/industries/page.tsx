import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TagCloud } from "@/components/ui/Cards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Contact from "@/components/sections/Contact";
import { industries, campaignTypes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Engagement experiences for FMCG, consumer durables, automobile, building materials, paints, retail, BFSI, healthcare, e-commerce and more.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Built for the brands that build India."
        highlight={["build", "India."]}
        intro="Two decades of engagement work across categories — each with its own audience, channel mix and reward economics."
      />

      <section className="gutter pb-20">
        <TagCloud items={industries} />
      </section>

      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          eyebrow="Campaign types"
          title="Mechanics that fit every category."
          highlight={["every", "category."]}
        />
        <div className="mt-12">
          <TagCloud items={campaignTypes} />
        </div>
      </section>

      <Contact />
    </>
  );
}
