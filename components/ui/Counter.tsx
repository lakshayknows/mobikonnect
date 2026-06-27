"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

function format(n: number, mode: "in" | "plain") {
  const rounded = Math.round(n);
  return mode === "in"
    ? rounded.toLocaleString("en-IN")
    : rounded.toLocaleString("en-US");
}

/** Counts up to `value` once it scrolls into view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  format: fmt = "plain",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: "in" | "plain";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = format(latest, fmt);
      },
    });
    return () => controls.stop();
  }, [inView, value, mv, fmt]);

  return (
    <span className="tabular-nums">
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
