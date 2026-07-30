import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TagCloud } from "@/components/ui/Cards";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Faqs from "@/components/sections/Faqs";
import { martechPlatformPage } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Marketing Technology Platform India | Loyalty, Rewards & Promotions | Mobikonnect",
  },
  description:
    "Power your marketing campaigns with Mobikonnect's Martech Platform featuring WhatsApp, QR, IVR, loyalty, rewards, campaign automation, analytics and CRM integration.",
};

export default function MartechPlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow={martechPlatformPage.eyebrow}
        title={martechPlatformPage.title}
        highlight={[...martechPlatformPage.highlight]}
        intro={martechPlatformPage.intro}
        cta={martechPlatformPage.cta}
      />

      {/* Platform Capabilities */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          index="01"
          eyebrow="Capabilities"
          title="Platform Capabilities"
          highlight={["Capabilities"]}
        />
        <div className="mt-12">
          <TagCloud items={martechPlatformPage.capabilities} />
        </div>
      </section>

      {/* Key Features */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader index="02" eyebrow="Features" title="Key Features" highlight={["Features"]} />
        <div className="mt-12">
          <TagCloud items={martechPlatformPage.keyFeatures} />
        </div>
      </section>

      {/* Integrations */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          index="03"
          eyebrow="Integrations"
          title="Integrates With the Systems You Already Run."
          highlight={["Already", "Run."]}
        />
        <div className="mt-12">
          <TagCloud items={martechPlatformPage.integrations} />
        </div>
      </section>

      {/* Why Choose Mobikonnect */}
      <section className="gutter py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              index="04"
              eyebrow="Why Mobikonnect"
              title="Why Choose Mobikonnect?"
              highlight={["Mobikonnect?"]}
            />
          </div>
          <ul>
            {martechPlatformPage.whyChoose.map((b, i) => (
              <Reveal key={b.no} delay={i * 0.05} as="li">
                <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-cream-line py-8 last:border-b sm:gap-10">
                  <span className="display text-3xl text-cream-faint transition-colors duration-500 group-hover:text-coral sm:text-4xl">
                    {b.no}
                  </span>
                  <div>
                    <h3 className="display text-2xl transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                      {b.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-cream-dim">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader index="05" eyebrow="Industries" title="Industries We Serve" highlight={["Serve"]} />
        <div className="mt-12">
          <TagCloud items={martechPlatformPage.industries} />
        </div>
      </section>

      {/* How It Works */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader index="06" eyebrow="How it works" title="Configure. Launch. Engage. Reward. Analyse." />
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-6 sm:gap-x-5">
          {martechPlatformPage.howItWorks.steps.map((step, i) => (
            <div key={step} className="flex items-center gap-3 sm:gap-5">
              <Reveal delay={i * 0.08} className="rounded-pill border border-cream-line bg-ink-soft/40 px-6 py-3 text-sm text-cream sm:px-8 sm:py-4 sm:text-base">
                {step}
              </Reveal>
              {i < martechPlatformPage.howItWorks.steps.length - 1 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-cream-faint sm:h-5 sm:w-5" />
              )}
            </div>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-cream-dim">
            {martechPlatformPage.howItWorks.desc}
          </p>
        </Reveal>
      </section>

      {/* Related Solutions */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader index="07" eyebrow="Related" title="Related Solutions" highlight={["Solutions"]} />
        <div className="mt-12 flex flex-wrap gap-3">
          {martechPlatformPage.relatedSolutions.map((r) => (
            <Link
              key={r.label}
              href={r.href}
              data-cursor="hover"
              className="rounded-pill border border-cream-line bg-ink-soft/40 px-5 py-2.5 text-sm text-cream/80 transition-colors duration-300 hover:border-coral hover:bg-coral/10 hover:text-cream"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <Faqs
        items={martechPlatformPage.faqs}
        eyebrow="FAQs"
        title="Frequently Asked Questions"
      />

      {/* Final CTA */}
      <section className="gutter pb-24 sm:pb-32">
        <div className="rounded-frame border border-cream-line bg-ink-soft/30 px-7 py-14 text-center sm:px-12 sm:py-20">
          <p className="eyebrow text-coral">Let&apos;s talk</p>
          <h2 className="display mx-auto mt-5 max-w-[18ch] break-words text-[clamp(2rem,7vw,5.5rem)]">
            <RevealText
              text="Ready to power smarter marketing campaigns?"
              highlight={["campaigns?"]}
            />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-cream-dim">
            From promotions and loyalty to rewards and analytics, Mobikonnect&apos;s
            Martech Platform helps brands launch faster, engage better and measure
            every campaign with confidence.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="coral">
              Book a Live Platform Demo
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
