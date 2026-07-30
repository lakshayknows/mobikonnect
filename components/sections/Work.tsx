"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CaseCard } from "@/components/ui/Cards";
import { work } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="gutter py-14 sm:py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          index="06"
          eyebrow="Selected work"
          title="Campaigns that became conversations."
          highlight={["conversations."]}
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-cream-dim">
            From scanning Oreos to shouting at Panasonic — a few of the ideas
            we&apos;ve shipped for India&apos;s biggest brands.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {work.slice(0, 6).map((c, i) => (
          <CaseCard key={c.slug} study={c} index={i} />
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <a
          href="/CaseStudies"
          data-cursor="hover"
          className="group inline-flex items-center gap-2 rounded-pill border border-cream/40 px-7 py-4 text-sm font-medium text-cream transition-colors duration-300 hover:border-cream"
        >
          All case studies
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
