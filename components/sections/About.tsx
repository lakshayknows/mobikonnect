"use client";

import { Reveal, RevealText } from "@/components/ui/Reveal";
import { site } from "@/lib/content";

const pillars = [
  { k: "Rewards", v: "Gratification that feels almost like cash." },
  { k: "Technology", v: "Platforms built in-house, end to end." },
  { k: "Insight", v: "Decisions grounded in consumer behaviour." },
];

export default function About() {
  return (
    <section id="about" className="gutter py-24 sm:py-32 lg:py-40">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="eyebrow text-coral">01</span>
            <span className="h-px w-8 bg-cream-line" />
            <span className="eyebrow">About the agency</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm text-cream-dim lg:text-right">
            {site.legal} — engineering consumer engagement since the dawn of
            mobile-first India.
          </p>
        </Reveal>
      </div>

      <h2 className="display mt-12 text-big sm:text-huge lg:text-[3.6rem] lg:leading-[1.08] max-w-[20ch]">
        <RevealText
          text="We turn everyday consumers into loyal fans — with promotions, loyalty and contests that actually move the needle."
          highlight={["loyal", "fans", "move", "needle."]}
        />
      </h2>

      <div className="mt-20 grid gap-px overflow-hidden rounded-frame border border-cream-line bg-cream-line sm:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal
            key={p.k}
            delay={i * 0.1}
            className="bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft sm:p-10"
          >
            <span className="display text-lg text-coral">{p.k}</span>
            <p className="mt-3 text-cream-dim">{p.v}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
