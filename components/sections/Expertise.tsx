"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { expertise } from "@/lib/content";

const BLUE = "linear-gradient(135deg, #0999D5 0%, #06547a 100%)";
const CORAL = "linear-gradient(135deg, #D05E62 0%, #b84a4e 100%)";

/**
 * "What we do" — the eight expertise pillars as a sticky scroll-stacking deck.
 * Each card sticks below the previous one (with a small peek) and the next card
 * slides up to stack over it, alternating the blue and coral brand colors.
 */
export default function Expertise() {
  return (
    <section id="expertise" className="gutter py-24 sm:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          index="02"
          eyebrow="What we do"
          title="A full stack of engagement expertise."
          highlight={["engagement", "expertise."]}
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-cream-dim">
            Six pillars, one operator. We design the mechanic, build the tech and
            deliver the reward — without handoffs.
          </p>
        </Reveal>
      </div>

      {/* Sticky-stack deck */}
      <div className="relative mt-12 sm:mt-16">
        {expertise.map((e, i) => {
          const isCoral = i % 2 === 1;
          return (
            <article
              key={e.no}
              style={{
                top: `calc(5rem + ${i * 1.5}rem)`,
                backgroundImage: isCoral ? CORAL : BLUE,
              }}
              className="frame sticky flex min-h-[400px] flex-col justify-between overflow-hidden p-7 shadow-2xl sm:min-h-[480px] sm:p-12 lg:p-16"
            >
              <div className="noise pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />

              <div className="relative flex items-start justify-between">
                <span className="display text-2xl text-cream/80 sm:text-3xl">{e.no}</span>
                <ArrowUpRight className="h-6 w-6 text-cream/80 sm:h-7 sm:w-7" />
              </div>

              <div className="relative">
                <h3 className="display text-[clamp(1.9rem,6vw,4rem)] leading-[0.95] text-cream">
                  {e.title}
                </h3>
                <p className="mt-4 max-w-xl text-cream/90 sm:text-lg">{e.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-cream/20 pt-5">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-cream/85">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cream/70" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
