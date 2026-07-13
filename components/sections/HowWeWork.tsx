"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { howWeWork } from "@/lib/content";

/**
 * Lera-style "How We Work" section with clip-path color filling transition.
 */

function StepCard({
  step,
  index,
  clipPath,
  total,
}: {
  step: (typeof howWeWork)[number];
  index: number;
  clipPath: MotionValue<string>;
  total: number;
}) {
  return (
    <motion.div
      className="absolute inset-x-0 w-full top-6 sm:top-8 bottom-3 sm:bottom-4 flex flex-col will-change-[clip-path]"
      style={{
        zIndex: 3 + index,
        clipPath: clipPath,
      }}
    >
      {/* Header — sits above card, color-filled by step.bg, z-10 to sit above card frame */}
      <div className="w-full flex justify-center pointer-events-none mb-2 relative z-10">
        <span
          className="hww-bg-text"
          style={{
            color: step.bg,
          }}
        >
          HOW WE WORK
        </span>
      </div>

      {/* Content Card container — inset-x margins applied here instead of parent */}
      <div
        className="flex-1 mx-2 sm:mx-4 lg:mx-6 rounded-[30px] overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative z-10"
        style={{ backgroundColor: step.bg }}
      >
        {/* Noise texture overlay — decorative only, dropped on mobile since
            clip-path animation + mix-blend-overlay compositing is expensive
            on low-power mobile GPUs */}
        <div className="noise hidden sm:block pointer-events-none absolute inset-0 rounded-[30px] opacity-[0.04] mix-blend-overlay" />

        {/* Corner accent dots */}
        <div
          className="absolute top-6 left-6 h-3.5 w-3.5 rounded-full z-10"
          style={{ backgroundColor: step.dot }}
        />
        <div
          className="absolute top-6 right-6 h-3.5 w-3.5 rounded-full z-10"
          style={{ backgroundColor: step.dot }}
        />

        {/* Content area — centered on mobile to avoid empty space, bottom-anchored on larger screens */}
        <div className="relative z-10 flex-1 flex flex-col justify-center sm:justify-end max-w-full sm:max-w-[80%] overflow-x-hidden">
          {/* Giant title — Montserrat ExtraBold, uppercase, size adjusted dynamically to never overflow/clip */}
          <h3
            className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-cream"
            style={{
              fontSize: "clamp(1.8rem, 5.8vw, 6rem)",
            }}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg text-cream/90 leading-relaxed">
            {step.desc}
          </p>
        </div>

        {/* Large faded step label in bottom-right */}
        <span
          className="absolute bottom-4 right-6 sm:right-10 font-display font-extrabold not-italic leading-none pointer-events-none select-none"
          style={{
            fontSize: "clamp(8rem, 34vw, 14rem)",
            color: "rgba(248,235,211,0.12)",
          }}
        >
          {step.label}
        </span>

        {/* Spinning badge on the last card */}
        {index === total - 1 && (
          <div className="absolute top-20 right-10 sm:right-20 lg:right-32 z-10 hidden sm:block">
            <div className="relative h-28 w-28 lg:h-36 lg:w-36">
              {/* Rotating outer ring text */}
              <svg
                className="hww-badge absolute inset-0 h-full w-full"
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="hww-circle"
                    d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
                  />
                </defs>
                <text
                  fill={step.dot}
                  fontSize="15"
                  fontFamily="var(--font-display)"
                  fontWeight="600"
                  letterSpacing="3"
                >
                  <textPath href="#hww-circle">
                    PAUSE — TAKE A BREATH — PAUSE — TAKE A BREATH —{" "}
                  </textPath>
                </text>
              </svg>
              {/* Center label */}
              <span
                className="absolute inset-0 flex items-center justify-center font-display font-bold text-sm lg:text-base"
                style={{ color: step.dot }}
              >
                AND...
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const SHOWN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
// Desktop: collapsed at the right edge → wipes left. Mobile: collapsed at the
// bottom edge → wipes upward (bottom-to-top).
const HIDDEN_DESKTOP = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
const HIDDEN_MOBILE = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value so the clip-path reveals glide instead of
  // tracking every scroll tick. Skipped on mobile: Lenis already smooths the
  // underlying scroll globally, and stacking this spring on top of it lags
  // behind fast touch flicks enough that the last card can't catch up before
  // the section unpins.
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.0005,
  });
  const progress = isMobile ? scrollYProgress : springProgress;

  const hidden = isMobile ? HIDDEN_MOBILE : HIDDEN_DESKTOP;

  // Card 1: reveals from 0.05 to 0.35
  const clipPath0 = useTransform(
    progress,
    [0.0, 0.05, 0.35, 1.0],
    [hidden, hidden, SHOWN, SHOWN],
  );

  // Card 2: reveals from 0.38 to 0.68
  const clipPath1 = useTransform(
    progress,
    [0.0, 0.38, 0.68, 1.0],
    [hidden, hidden, SHOWN, SHOWN],
  );

  // Card 3: reveals from 0.71 to 0.90 (wider settle buffer than the other
  // cards' tails so it reliably finishes before the section unpins)
  const clipPath2 = useTransform(
    progress,
    [0.0, 0.71, 0.90, 1.0],
    [hidden, hidden, SHOWN, SHOWN],
  );

  const clipPaths = [clipPath0, clipPath1, clipPath2];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative"
      style={{ height: isMobile ? "350svh" : "500svh" }}
    >
      {/* Sticky viewport — fills screen, clips content */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
        {/* ── Intro Card (always behind) ── */}
        <div className="absolute inset-x-0 w-full top-6 sm:top-8 bottom-3 sm:bottom-4 flex flex-col z-[2]">
          {/* Header — sits above Content Card top edge */}
          <div className="w-full flex justify-center pointer-events-none mb-2 relative z-10">
            <span className="hww-bg-text">HOW WE WORK</span>
          </div>

          {/* Content Card — margins applied directly here */}
          <div
            className="flex-1 mx-2 sm:mx-4 lg:mx-6 rounded-[30px] overflow-hidden flex flex-col justify-center sm:justify-end p-8 sm:p-12 lg:p-16 relative z-10"
            style={{ backgroundColor: "#2f2f2f" }}
          >
            {/* Noise texture overlay — decorative only, dropped on mobile */}
            <div className="noise hidden sm:block pointer-events-none absolute inset-0 rounded-[30px] opacity-[0.04] mix-blend-overlay" />

            <div className="relative z-10">
              {/* Decorative corner dots */}
              <div className="absolute top-6 left-6 h-3 w-3 rounded-full bg-cream/40" />
              <div className="absolute top-6 right-6 h-3 w-3 rounded-full bg-cream/40" />

              <h2
                className="font-display font-extrabold text-cream uppercase leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 7.5vw, 7rem)" }}
              >
                BEST CAMPAIGNS<br />
                REVOLVE AROUND<br />
                THREE <span className="text-coral">EASY</span> THINGS
              </h2>
            </div>
          </div>
        </div>

        {/* ── Step Cards ── */}
        {howWeWork.map((step, i) => (
          <StepCard
            key={step.title}
            step={step}
            index={i}
            clipPath={clipPaths[i]}
            total={howWeWork.length}
          />
        ))}
      </div>
    </section>
  );
}
