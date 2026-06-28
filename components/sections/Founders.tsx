"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { founders, type Founder } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Founders() {
  return (
    <section className="gutter py-24 sm:py-32">
      <SectionHeader
        index="·"
        eyebrow="Leadership"
        title="Meet our best experts"
        align="center"
      />
      <div className="mt-14 grid gap-6 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:max-w-4xl lg:mx-auto">
        {founders.map((f, i) => (
          <Reveal key={f.name} delay={i * 0.1}>
            <FounderCard founder={f} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FounderCard({ founder }: { founder: Founder }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-cursor="hover"
        className="frame relative block aspect-[4/5] w-full overflow-hidden border border-cream-line bg-ink-soft text-left"
      >
        <Image
          src={founder.image}
          alt={founder.name}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* readability scrim */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

        {/* tap/hover pill */}
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-pill bg-ink/80 px-4 py-2 text-xs font-medium text-cream backdrop-blur-sm transition-colors group-hover:bg-coral">
          {open ? "tap to close ↑" : "tap to read more →"}
        </span>

        {/* expandable bio overlay */}
        <AnimatePresence>
          {open && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0 flex items-end bg-ink/85 p-6 backdrop-blur-sm"
            >
              <span className="block text-sm leading-relaxed text-cream-dim">
                {founder.bio}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <h3 className="display mt-5 text-2xl">{founder.name}</h3>
      <p className="mt-1 text-sm text-coral">{founder.role}</p>
    </article>
  );
}
