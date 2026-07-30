import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillarCard, TagCloud } from "@/components/ui/Cards";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Faqs from "@/components/sections/Faqs";
import { influencerMarketingPage } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: `${influencerMarketingPage.metaTitle}` },
  description: influencerMarketingPage.metaDescription,
};

export default function InfluencerMarketingPage() {
  return (
    <>
      <PageHeader
        eyebrow={influencerMarketingPage.eyebrow}
        title={influencerMarketingPage.title}
        highlight={[...influencerMarketingPage.highlight]}
        intro={influencerMarketingPage.intro}
        cta={influencerMarketingPage.cta}
      />

      {/* Solutions */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          index="01"
          eyebrow="Solutions"
          title="Our Influencer Marketing Solutions"
          highlight={["Solutions"]}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {influencerMarketingPage.solutions.map((s, i) => (
            <PillarCard key={s.no} no={s.no} title={s.title} blurb={s.desc} index={i} />
          ))}
        </div>
      </section>

      {/* Why Choose Mobikonnect */}
      <section className="gutter py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              index="02"
              eyebrow="Why Mobikonnect"
              title="Why Choose Mobikonnect?"
              highlight={["Mobikonnect?"]}
            />
          </div>
          <ul>
            {influencerMarketingPage.whyChoose.map((b, i) => (
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

      {/* Platforms We Cover */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader index="03" eyebrow="Platforms" title="Platforms We Cover" highlight={["Cover"]} />
        <div className="mt-12">
          <TagCloud items={influencerMarketingPage.platforms} />
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader index="04" eyebrow="Industries" title="Industries We Serve" highlight={["Serve"]} />
        <div className="mt-12">
          <TagCloud items={influencerMarketingPage.industries} />
        </div>
      </section>

      {/* How It Works */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader index="05" eyebrow="How it works" title="Identify. Collaborate. Create. Amplify. Measure." />
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-6 sm:gap-x-5">
          {influencerMarketingPage.howItWorks.steps.map((step, i) => (
            <div key={step} className="flex items-center gap-3 sm:gap-5">
              <Reveal delay={i * 0.08} className="rounded-pill border border-cream-line bg-ink-soft/40 px-6 py-3 text-sm text-cream sm:px-8 sm:py-4 sm:text-base">
                {step}
              </Reveal>
              {i < influencerMarketingPage.howItWorks.steps.length - 1 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-cream-faint sm:h-5 sm:w-5" />
              )}
            </div>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-cream-dim">
            {influencerMarketingPage.howItWorks.desc}
          </p>
        </Reveal>
      </section>

      {/* Related Solutions */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader index="06" eyebrow="Related" title="Related Solutions" highlight={["Solutions"]} />
        <div className="mt-12 flex flex-wrap gap-3">
          {influencerMarketingPage.relatedSolutions.map((r) => (
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
        items={influencerMarketingPage.faqs}
        eyebrow="FAQs"
        title="Frequently Asked Questions"
      />

      {/* Final CTA */}
      <section className="gutter pb-24 sm:pb-32">
        <div className="rounded-frame border border-cream-line bg-ink-soft/30 px-7 py-14 text-center sm:px-12 sm:py-20">
          <p className="eyebrow text-coral">Let&apos;s talk</p>
          <h2 className="display mx-auto mt-5 max-w-[18ch] break-words text-[clamp(2rem,7vw,5.5rem)]">
            <RevealText text={influencerMarketingPage.finalCtaTitle} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-cream-dim">{influencerMarketingPage.finalCtaDesc}</p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="coral">
              {influencerMarketingPage.finalCtaLabel}
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
