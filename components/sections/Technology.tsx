"use client";

import {
  Mic,
  Gift,
  QrCode,
  Trophy,
  Video,
  BarChart3,
  Database,
  Shuffle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Monogram } from "@/components/ui/Logo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/lib/content";

const icons = [Mic, Gift, QrCode, Trophy, Video, BarChart3, Database, Shuffle];

export default function Technology() {
  return (
    <section id="technology" className="gutter py-24 sm:py-32">
      <div
        className="frame relative bg-ink-soft/50 p-7 sm:p-12 lg:p-16"
        style={{
          backgroundImage:
            "radial-gradient(90% 120% at 100% 0%, rgba(9,153,213,0.12) 0%, rgba(38,38,38,0) 55%)",
          border: "1px solid rgba(248,235,211,0.10)",
        }}
      >
        <SectionHeader
          index="03"
          eyebrow="Technological capabilities"
          title="One platform powering every campaign."
          highlight={["every", "campaign."]}
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* orbit visual */}
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            <div className="absolute inset-0 rounded-full border border-cream-line" />
            <div className="absolute inset-[14%] rounded-full border border-dashed border-cream-line animate-spin-slow" />
            <div className="absolute inset-[14%] animate-spin-slow">
              {capabilities.map((c, i) => {
                const angle = (i / capabilities.length) * Math.PI * 2 - Math.PI / 2;
                const r = 50; // percent radius
                const left = 50 + Math.cos(angle) * r;
                const top = 50 + Math.sin(angle) * r;
                const Icon = icons[i];
                return (
                  <div
                    key={c.id}
                    className="absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream-line bg-ink"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <div className="animate-spin-slow [animation-direction:reverse]">
                      <Icon className="h-5 w-5 text-blue" />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* center */}
            <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-coral/40 bg-ink">
              <Monogram className="h-12 w-12" />
            </div>
          </div>

          {/* capability list */}
          <ul className="divide-y divide-cream-line">
            {capabilities.map((c, i) => {
              const Icon = icons[i];
              return (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-5 py-4"
                  data-cursor="hover"
                >
                  <span className="display w-7 text-sm text-cream-faint">{c.id}</span>
                  <Icon className="h-5 w-5 shrink-0 text-blue transition-transform duration-300 group-hover:scale-110" />
                  <div className="min-w-0 flex-1">
                    <h3 className="display text-base leading-tight transition-colors group-hover:text-coral">
                      {c.title}
                    </h3>
                  </div>
                  <p className="hidden max-w-[26ch] text-right text-sm text-cream-dim sm:block">
                    {c.desc}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
