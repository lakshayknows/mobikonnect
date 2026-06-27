"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { expertise } from "@/lib/content";

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
            Eight specialisms, one operator. We design the mechanic, build the
            tech and deliver the reward — without handoffs.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.map((e, i) => (
          <Reveal key={e.no} delay={(i % 4) * 0.07}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
              className="group relative flex h-full min-h-[300px] flex-col justify-between rounded-card border border-cream-line bg-ink-soft/40 p-7 transition-colors duration-500 hover:border-coral/50 hover:bg-ink-soft"
            >
              <div className="flex items-start justify-between">
                <span className="display text-sm text-cream-faint">{e.no}</span>
                <ArrowUpRight className="h-5 w-5 text-cream-faint transition-all duration-300 group-hover:text-coral group-hover:rotate-45" />
              </div>
              <div>
                <h3 className="display text-xl leading-tight">{e.title}</h3>
                <p className="mt-3 text-sm text-cream-dim">{e.blurb}</p>
                <ul className="mt-5 space-y-1.5 border-t border-cream-line pt-4">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-cream-dim">
                      <span className="h-1 w-1 rounded-full bg-coral" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
