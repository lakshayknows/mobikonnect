import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillarCard } from "@/components/ui/Cards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Mobikonnect — build engagement experiences and the technology behind them for India's biggest brands.",
};

const values = [
  { no: "01", title: "One team, no handoffs", blurb: "Strategy, tech and delivery sit together. You'll own outcomes, not slices." },
  { no: "02", title: "Build to measure", blurb: "Every campaign ships with dashboards. We optimise on data, not opinions." },
  { no: "03", title: "Ship fast, learn faster", blurb: "Real campaigns, real audiences, real stakes — and the room to experiment." },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build experiences brands remember."
        highlight={["experiences", "remember."]}
        intro="We're an engagement platform powered by people who love mechanics, technology and measurable impact. Come build with us."
      />

      <section className="gutter pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <PillarCard key={v.no} no={v.no} title={v.title} blurb={v.blurb} index={i} />
          ))}
        </div>
      </section>

      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          eyebrow="Open roles"
          title="No open roles right now."
          highlight={["right", "now."]}
        />
        <p className="mt-8 max-w-xl text-ink/65">
          We&apos;re always glad to meet people who build great engagement
          experiences. Send your work to{" "}
          <a href="mailto:team@mobikonnect.com" className="text-coral link-underline">
            team@mobikonnect.com
          </a>
          .
        </p>
      </section>

      <Contact />
    </>
  );
}
