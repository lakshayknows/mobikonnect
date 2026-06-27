import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TagCloud } from "@/components/ui/Cards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Technology from "@/components/sections/Technology";
import Contact from "@/components/sections/Contact";
import { techOfferings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Our martech & engagement technology — IVR 2.0, interactive video, WhatsApp & voice automation, dynamic QR, AR/WebAR, reward engine, analytics and an AI campaign engine.",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="The martech behind every experience."
        highlight={["martech", "experience."]}
        intro="An omnichannel platform — voice, WhatsApp, QR, video, web and apps — wired to a reward engine and live analytics. Our strongest differentiator."
      />

      <Technology />

      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          eyebrow="Future-ready offerings"
          title="What puts us ahead of traditional agencies."
          highlight={["ahead"]}
        />
        <div className="mt-12">
          <TagCloud items={techOfferings} />
        </div>
      </section>

      <Contact />
    </>
  );
}
