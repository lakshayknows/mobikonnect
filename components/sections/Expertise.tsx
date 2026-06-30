"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { expertise } from "@/lib/content";
import { cn } from "@/lib/cn";

export default function Expertise() {
  return (
    <section id="expertise" className="gutter py-14 sm:py-20">
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

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.map((e, i) => {
          // Alternate brand colours: blue then coral, filling the card on hover.
          const isCoral = i % 2 === 1;
          return (
            <Reveal key={e.no} delay={(i % 4) * 0.07}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                data-cursor="hover"
                style={
                  {
                    "--fill": isCoral
                      ? "linear-gradient(135deg, #D05E62 0%, #b84a4e 100%)"
                      : "linear-gradient(135deg, #0999D5 0%, #06547a 100%)",
                  } as React.CSSProperties
                }
                className={cn(
                  "expertise-card group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-card border border-cream-line bg-ink-soft/40 p-7 transition-colors duration-500",
                  isCoral ? "hover:border-coral" : "hover:border-blue",
                )}
              >
                {/* brand-colour fill that scales in on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-hover:opacity-100"
                  style={{ backgroundImage: "var(--fill)" }}
                />

                <div className="relative flex items-start justify-between">
                  <span className="display text-sm text-cream-faint transition-colors duration-300 group-hover:text-cream">
                    {e.no}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-cream-faint transition-all duration-300 group-hover:rotate-45 group-hover:text-cream" />
                </div>
                <div className="relative">
                  <h3 className="display text-xl leading-tight transition-colors duration-300 group-hover:text-cream">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-sm text-cream-dim transition-colors duration-300 group-hover:text-cream/90">
                    {e.blurb}
                  </p>
                  <ul className="mt-5 space-y-1.5 border-t border-cream-line pt-4 transition-colors duration-300 group-hover:border-cream/30">
                    {e.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-xs text-cream-dim transition-colors duration-300 group-hover:text-cream/90"
                      >
                        <span className="h-1 w-1 rounded-full bg-cream/70" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
