"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { work } from "@/lib/content";
import { cn } from "@/lib/cn";

export default function Work() {
  return (
    <section id="work" className="gutter py-24 sm:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          index="06"
          eyebrow="Selected work"
          title="Campaigns that became conversations."
          highlight={["conversations."]}
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-ink/65">
            From scanning Oreos to shouting at Panasonic — a few of the ideas
            we&apos;ve shipped for India&apos;s biggest brands.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {work.map((c, i) => {
          const isCoral = c.accent === "coral";
          return (
            <motion.article
              key={c.brand + c.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              data-cursor="hover"
              className={cn(
                "group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-frame border p-8 sm:p-10",
                "transition-colors duration-500",
                isCoral
                  ? "border-coral/25 bg-coral/[0.07] hover:border-coral/60"
                  : "border-blue/25 bg-blue/[0.07] hover:border-blue/60",
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                  isCoral ? "bg-coral/20 opacity-40" : "bg-blue/20 opacity-40",
                )}
              />
              <div className="relative flex items-start justify-between">
                <span
                  className={cn(
                    "rounded-pill border px-3 py-1 text-xs",
                    isCoral ? "border-coral/40 text-coral" : "border-blue/40 text-blue",
                  )}
                >
                  {c.category}
                </span>
                <ArrowUpRight
                  className={cn(
                    "h-6 w-6 transition-all duration-300 group-hover:rotate-45",
                    isCoral ? "text-coral" : "text-blue",
                  )}
                />
              </div>

              <div className="relative">
                <p className="text-sm uppercase tracking-label text-ink/55">{c.brand}</p>
                <h3 className="display mt-2 text-3xl sm:text-4xl">{c.title}</h3>
                <p className="mt-4 max-w-md text-ink/65">{c.summary}</p>

                <div className="mt-7 flex gap-10 border-t border-ink/10 pt-5">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="display text-2xl text-ink sm:text-3xl">{m.value}</div>
                      <div className="mt-1 text-xs text-ink/65">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
