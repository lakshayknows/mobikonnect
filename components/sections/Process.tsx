"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { process } from "@/lib/content";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = track.scrollWidth - window.innerWidth + 75; // gutter slack
      setDistance(d > 0 ? d : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="process" ref={sectionRef} style={{ height: `${distance + 900}px` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="gutter mb-10 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="eyebrow text-coral">04</span>
              <span className="h-px w-8 bg-cream-line" />
              <span className="eyebrow">How we work</span>
            </div>
            <h2 className="display mt-5 text-huge max-w-[16ch]">
              End-to-end, under one roof.
            </h2>
          </div>
          <span className="hidden text-sm text-cream-dim lg:block">
            Scroll → conceptualization to disbursement
          </span>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-5 pl-6 sm:pl-10 lg:pl-[75px]">
          {process.map((step) => (
            <article
              key={step.no}
              className="group relative flex h-[360px] w-[78vw] shrink-0 flex-col justify-between rounded-card border border-cream-line bg-ink-soft/40 p-8 transition-colors duration-500 hover:border-blue/50 sm:w-[400px]"
            >
              <div className="flex items-start justify-between">
                <span className="display text-7xl text-cream-faint transition-colors duration-500 group-hover:text-blue">
                  {step.no}
                </span>
                <span className="text-xs text-cream-faint">
                  Step {step.no} / {process.length.toString().padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="display text-2xl">{step.title}</h3>
                <p className="mt-3 text-cream-dim">{step.desc}</p>
              </div>
            </article>
          ))}
          {/* closing CTA card */}
          <a
            href="#contact"
            data-cursor="hover"
            className="group flex h-[360px] w-[78vw] shrink-0 flex-col justify-between rounded-card bg-blue p-8 text-cream transition-colors duration-500 hover:bg-blue-deep sm:w-[400px]"
          >
            <ArrowUpRight className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div>
              <h3 className="display text-3xl">Let&apos;s build yours.</h3>
              <p className="mt-3 text-cream/85">
                From the first idea to the last gift delivered.
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
