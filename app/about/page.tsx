import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TextGradientScroll } from "@/components/ui/TextGradientScroll";
import PhotoReveal from "@/components/sections/PhotoReveal";
import Founders from "@/components/sections/Founders";
import Faqs from "@/components/sections/Faqs";
import { aboutPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mobikonnect — India's experiential marketing & customer engagement technology platform, engineering measurable engagement for 20+ years.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        highlight={[...aboutPage.highlight]}
        intro={aboutPage.intro}
      />

      {/* Gradient scroll-reveal story */}
      <section className="gutter py-20 sm:py-28">
        <TextGradientScroll
          text={aboutPage.story}
          type="letter"
          textOpacity="soft"
          className="display mx-auto max-w-5xl text-big leading-[1.3] sm:text-[2.2rem] sm:leading-[1.32]"
        />
      </section>

      {/* Values + milestones */}
      <section className="gutter py-20 sm:py-28">
        <SectionHeader
          index="·"
          eyebrow="What we stand for"
          title="Built to make engagement measurable."
          align="center"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-frame border border-cream-line bg-cream-line sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {aboutPage.values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.08}
              className="bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft sm:p-10"
            >
              <span className="display text-lg text-coral">{v.title}</span>
              <p className="mt-3 text-sm text-cream-dim">{v.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-px grid gap-px overflow-hidden rounded-frame border border-cream-line bg-cream-line sm:grid-cols-2 lg:grid-cols-4">
          {aboutPage.milestones.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.08}
              className="bg-ink p-8 text-center sm:p-10"
            >
              <span className="display block text-big text-cream">{m.value}</span>
              <p className="mt-2 text-sm text-cream-dim">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mouse-follow team photo reveal (marquee on touch) */}
      <PhotoReveal />

      {/* Meet our best experts */}
      <Founders />

      {/* FAQs */}
      <Faqs />
    </>
  );
}
