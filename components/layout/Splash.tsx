"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const HOLD_MS = 900;
const EXIT_MS = 900;

/**
 * Page-transition splash: a blue field that splits down the middle and slides
 * apart to reveal the page. Keyed off the pathname so it replays on every route
 * change. The slide uses CSS transitions (compositor-driven, so it can't stall)
 * and a guaranteed timer unmounts the overlay and restores scroll — it can
 * never get stuck covering the page.
 */
export default function Splash() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(false);
      document.body.style.overflow = "";
      return;
    }

    setVisible(true);
    setExiting(false);
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

    const exitTimer = setTimeout(() => {
      setProgress(100);
      setExiting(true);
    }, HOLD_MS);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, HOLD_MS + EXIT_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  if (!visible) return null;

  const slide = "transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform";

  return (
    <div aria-hidden className="fixed inset-0 z-[200] flex">
      {/* left half */}
      <div
        className={`relative h-full w-1/2 overflow-hidden ${slide} ${exiting ? "-translate-x-full" : "translate-x-0"}`}
        style={{ backgroundImage: "linear-gradient(to left, #0999D5 0%, #06547a 100%)" }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </div>

      {/* right half */}
      <div
        className={`relative h-full w-1/2 overflow-hidden ${slide} ${exiting ? "translate-x-full" : "translate-x-0"}`}
        style={{ backgroundImage: "linear-gradient(to right, #0999D5 0%, #06547a 100%)" }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </div>

      {/* seam + counter, fades just before the halves slide apart */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${exiting ? "opacity-0" : "opacity-100"}`}
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cream/30" />
        <span className="display tabular-nums absolute bottom-6 right-6 text-[clamp(2.5rem,12vw,4.25rem)] text-cream sm:bottom-10 sm:right-10 lg:bottom-14 lg:right-14">
          {progress}
        </span>
      </div>
    </div>
  );
}
