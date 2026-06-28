"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;
const HOLD_MS = 900;

/**
 * Page-transition splash: a single blue field that reads as the brand panel,
 * then cracks down the middle and slides apart to reveal the page. Keyed off
 * the pathname so it replays on every route change, not just the first load.
 */
export default function Splash() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"loading" | "exiting">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setPhase("loading");
    setProgress(0);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / HOLD_MS) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const timer = setTimeout(() => setPhase("exiting"), HOLD_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname]);

  if (!visible) return null;

  const exiting = phase === "exiting";

  return (
    <div aria-hidden className="fixed inset-0 z-[200] flex">
      {/* left half */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: exiting ? "-100%" : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative h-full w-1/2 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(to left, #0999D5 0%, #06547a 100%)" }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </motion.div>

      {/* right half */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: exiting ? "100%" : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        onAnimationComplete={() => {
          if (exiting) {
            setVisible(false);
            document.body.style.overflow = "";
          }
        }}
        className="relative h-full w-1/2 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(to right, #0999D5 0%, #06547a 100%)" }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </motion.div>

      {/* seam, fades just before the halves slide apart */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-0"
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cream/30" />
        <span className="display tabular-nums absolute bottom-7 right-7 text-huge text-cream sm:bottom-10 sm:right-10 lg:bottom-14 lg:right-14">
          {progress}
        </span>
      </motion.div>
    </div>
  );
}
