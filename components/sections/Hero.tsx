"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Monogram } from "@/components/ui/Logo";
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
  const yShapeB = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" className="gutter pt-24 sm:pt-28">
      <div
        ref={ref}
        className="frame relative flex min-h-[90vh] flex-col justify-between bg-blue p-7 sm:p-10 lg:p-14"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 80% 0%, rgba(248,235,211,0.18) 0%, rgba(9,153,213,0) 55%), linear-gradient(180deg, #0999D5 0%, #0a7bac 100%)",
        }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

        {/* decorative parallax shapes */}
        <motion.div
          style={{ y: yShapeA }}
          className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 rounded-full bg-cream/10 blur-2xl sm:h-96 sm:w-96"
        />
        <motion.div
          style={{ y: yShapeB }}
          aria-hidden
          className="pointer-events-none absolute right-10 top-1/2 -mt-16 hidden lg:block"
        >
          <Monogram className="h-32 w-32 opacity-90 drop-shadow-2xl animate-float" />
        </motion.div>
        <motion.div
          style={{ y: yShapeB }}
          className="pointer-events-none absolute bottom-28 right-14 hidden h-24 w-24 rounded-full border border-cream/40 lg:block animate-spin-slow"
        />

        {/* top row */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 flex items-center justify-between"
        >
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-pill border border-cream/30 bg-cream/10 px-4 py-2 text-xs text-cream backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Experiential · Loyalty · Engagement Technology
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden max-w-[22ch] text-right text-sm text-cream/80 sm:block"
          >
            {site.legal}
          </motion.span>
        </motion.div>

        {/* headline */}
        <motion.div style={{ y: contentY }} className="relative z-10 py-10">
          <h1 className="display text-mega text-cream">
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
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="mt-8 max-w-xl text-base text-cream/90 sm:text-lg"
          >
            {site.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
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
