import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillarCard, TagCloud } from "@/components/ui/Cards";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Technology from "@/components/sections/Technology";
import Faqs from "@/components/sections/Faqs";
import { consumerPromotionsPage, process, industries } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Consumer Promotion Agency India | Scratch & Scan & Win | Mobikonnect",
  },
  description:
    "Drive sales with Scratch & Win, Scan & Win, WhatsApp Promotions, QR Campaigns, Cashback Offers & Consumer Reward Programs by Mobikonnect.",
};

export default function ConsumerPromotionsPage() {
  return (
    <>
      <PageHeader
        eyebrow={consumerPromotionsPage.eyebrow}
        title={consumerPromotionsPage.title}
        highlight={[...consumerPromotionsPage.highlight]}
        intro={consumerPromotionsPage.intro}
      />

      {/* Consumer Promotion Solutions */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          index="01"
          eyebrow="Solutions"
          title="Consumer Promotion Solutions"
          highlight={["Solutions"]}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {consumerPromotionsPage.solutions.map((s, i) => (
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
              title="Why Choose Mobikonnect for Consumer Promotions?"
              highlight={["Consumer", "Promotions?"]}
            />
          </div>
          <ul>
            {consumerPromotionsPage.whyChoose.map((b, i) => (
              <Reveal key={b.no} delay={i * 0.06} as="li">
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

      {/* How Our Consumer Promotion Process Works */}
      <section className="gutter py-24 sm:py-32">
        <SectionHeader
          index="03"
          eyebrow="Process"
          title="How Our Consumer Promotion Process Works"
          highlight={["Process", "Works"]}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-frame border border-cream-line bg-cream-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal
              key={p.no}
              delay={i * 0.06}
              className="bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft sm:p-10"
            >
              <span className="display text-lg text-coral">{p.no}</span>
              <h3 className="display mt-2 text-xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-cream-dim">{p.desc}</p>
            </Reveal>
          ))}
          <Reveal
            delay={process.length * 0.06}
            className="flex flex-col justify-center bg-coral/[0.08] p-8 transition-colors duration-500 hover:bg-coral/[0.14] sm:p-10"
          >
            <p className="display text-xl leading-snug text-coral">
              One team, start to finish.
            </p>
            <p className="mt-3 text-sm text-cream-dim">
              No handoffs, no black boxes — every step above is run in-house.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          index="04"
          eyebrow="Industries"
          title="Industries We Serve"
          highlight={["Serve"]}
        />
        <div className="mt-12">
          <TagCloud items={industries} />
        </div>
      </section>

      {/* Technology That Powers Every Campaign */}
      <Technology />

      {/* Frequently Asked Questions */}
      <Faqs
        items={consumerPromotionsPage.faqs}
        eyebrow="FAQs"
        title="Frequently Asked Questions"
      />

      {/* Ready to Launch Your Next Consumer Promotion? */}
      <section className="gutter pb-24 sm:pb-32">
        <div className="rounded-frame border border-cream-line bg-ink-soft/30 px-7 py-14 text-center sm:px-12 sm:py-20">
          <p className="eyebrow text-coral">Let&apos;s talk</p>
          <h2 className="display mx-auto mt-5 max-w-[16ch] break-words text-[clamp(2rem,7vw,5.5rem)]">
            <RevealText
              text="Ready to launch your next consumer promotion?"
              highlight={["promotion?"]}
            />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-cream-dim">
            Tell us the business problem — we&apos;ll design the mechanic, the
            technology and the reward economics to solve it.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="coral">
              Talk to our promotions team
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
