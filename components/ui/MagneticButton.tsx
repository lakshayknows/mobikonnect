"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "coral" | "cream" | "outline";
  className?: string;
};

/** A button/link that subtly leans toward the cursor on hover. */
export default function MagneticButton({
  children,
  href = "#contact",
  variant = "coral",
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 170, damping: 15, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    coral: "bg-coral text-cream hover:bg-coral-deep",
    cream: "bg-cream text-ink hover:bg-white",
    outline: "border border-cream/30 text-cream hover:border-cream/70",
  }[variant];

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-pill px-7 py-3.5 text-sm font-medium",
        "transition-colors duration-300",
        styles,
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
