import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillarCard, TagCloud } from "@/components/ui/Cards";
import Technology from "@/components/sections/Technology";
import {
  services,
  solutions,
  techOfferings,
  industries,
  campaignTypes,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Experiential marketing and engagement technology, end to end — promotions, loyalty, activations and a martech platform built in-house, mapped to the business outcomes that matter.",
};

const servicePageHrefs: Record<string, string> = {
  "Consumer Promotions": "/consumer-promotions",
  "Trade Promotions": "/trade-promotions",
  "Loyalty Programs": "/loyalty-programs",
  "Experiential Marketing": "/experiential-marketing",
  "Customer Engagement": "/customer-engagement",
  "Martech & Engagement Technology": "/martech-platform",
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Engagement, engineered end to end."
        highlight={["end", "end."]}
        intro="From the first mechanic to the last gift delivered, we design, build and run engagement experiences across promotions, loyalty, activations and the technology that powers them."
      />

      {/* Services — the six pillars */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          index="01"
          eyebrow="Services"
          title="Six pillars of engagement, one operator."
          highlight={["operator."]}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <PillarCard
              key={s.no}
              no={s.no}
              title={s.title}
              blurb={s.blurb}
              points={s.points}
              index={i}
              href={servicePageHrefs[s.title]}
            />
          ))}
        </div>
      </section>

      {/* Solutions — start with the business problem */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          index="02"
          eyebrow="Solutions"
          title="Start with the business problem."
          highlight={["problem."]}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <PillarCard key={s.no} no={s.no} title={s.title} blurb={s.desc} index={i} />
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="gutter pb-8">
        <SectionHeader
          index="03"
          eyebrow="Technology"
          title="The martech behind every experience."
          highlight={["experience."]}
        />
      </section>
      <Technology />
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          eyebrow="Future-ready offerings"
          title="What puts us ahead of traditional agencies."
          highlight={["ahead"]}
        />
        <div className="mt-12">
          <TagCloud items={techOfferings} />
        </div>
      </section>

      {/* Industries + campaign types */}
      <section className="gutter pb-24 sm:pb-32">
        <SectionHeader
          index="04"
          eyebrow="Industries"
          title="Built for the brands that build India."
          highlight={["India."]}
        />
        <div className="mt-12">
          <TagCloud items={industries} />
        </div>
        <div className="mt-16">
          <SectionHeader
            eyebrow="Campaign types"
            title="Mechanics that fit every category."
            highlight={["category."]}
          />
          <div className="mt-12">
            <TagCloud items={campaignTypes} />
          </div>
        </div>
      </section>
    </>
  );
}
