"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { benefits } from "@/lib/content";

export default function WhyBrands() {
  return (
    <section id="why" className="gutter py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            index="05"
            eyebrow="The brand upside"
            title="What's in it for your brand."
            highlight={["your", "brand."]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-sm text-cream-dim">
              Every experience we run is engineered to do five things for the
              brands we partner with.
            </p>
          </Reveal>
        </div>

        <ul>
          {benefits.map((b, i) => (
            <motion.li
              key={b.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-[auto_1fr] gap-6 border-t border-cream-line py-8 last:border-b sm:gap-10"
            >
              <span className="display text-3xl text-cream-faint transition-colors duration-500 group-hover:text-coral sm:text-4xl">
                {b.no}
              </span>
              <div>
                <h3 className="display text-2xl transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                  {b.title}
                </h3>
                <p className="mt-3 max-w-xl text-cream-dim">{b.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
