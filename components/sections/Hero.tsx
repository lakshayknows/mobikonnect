"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { clients, site } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yShapeA = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" className="gutter pt-20 sm:pt-24">
      <div
        ref={ref}
        className="frame relative flex min-h-[calc(100svh-6.5rem)] flex-col justify-between bg-blue p-6 sm:p-8 lg:p-10"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 80% 0%, rgba(248,235,211,0.18) 0%, rgba(9,153,213,0) 55%), linear-gradient(180deg, #0999D5 0%, #0a7bac 100%)",
        }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

        {/* decorative parallax glow */}
        <motion.div
          style={{ y: yShapeA }}
          className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 rounded-full bg-cream/10 blur-2xl sm:h-96 sm:w-96"
        />

        {/* top row */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 flex items-center justify-end"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden max-w-[22ch] text-right text-sm text-cream/80 sm:block"
          >
            {site.legal}
          </motion.span>
        </motion.div>

        {/* headline (left, big) + supporting copy (right half) */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 flex flex-col gap-8 py-2 sm:py-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <h1 className="display text-cream text-[clamp(2.75rem,min(10vw,15vh),8.5rem)] leading-[0.92] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <RevealText text="Engage." />
            </span>
            <span className="block overflow-hidden">
              <RevealText text="Reward." delay={0.1} />
            </span>
            <span className="block overflow-hidden">
              <RevealText text="Retain." delay={0.2} />
            </span>
            <span className="block overflow-hidden">
              <RevealText text="Grow." delay={0.3} />
            </span>
          </h1>

          <div className="lg:max-w-sm lg:shrink-0 lg:pb-2">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.6 }}
              className="max-w-xl text-base text-cream/90 sm:text-lg lg:ml-auto lg:text-justify"
            >
              {site.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.75 }}
              className="mt-6 flex flex-wrap items-center gap-3 lg:justify-between"
            >
              <a
                href="/contact"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 rounded-pill bg-cream px-7 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white"
              >
                Start a campaign
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#work"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-pill border border-cream/40 px-7 py-4 text-sm font-medium text-cream transition-colors duration-300 hover:border-cream"
              >
                See our work
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* bottom row */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 flex items-end justify-between gap-6"
        >
          <span className="inline-flex items-center gap-2 text-sm text-cream/80">
            <ArrowDown className="h-4 w-4 animate-bounce" />
            Scroll to explore
          </span>
          <div className="hidden text-right text-sm text-cream/80 sm:block">
            <span className="block text-2xl font-display font-bold text-cream">15+</span>
            iconic brands trust us
          </div>
        </motion.div>
      </div>

      {/* client ticker just under the hero frame */}
      <div className="mt-6 overflow-hidden">
        <Marquee>
          {clients.map((c) => (
            <span
              key={c}
              className="display mx-8 text-2xl text-cream/35 transition-colors hover:text-cream sm:text-3xl"
            >
              {c}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
