"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

/** Generic fade-and-rise reveal for blocks of content. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </MotionTag>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

/**
 * Word-by-word masked headline reveal. Splits on spaces and wraps each word
 * in an overflow-hidden mask so words slide up into view on scroll.
 */
export function RevealText({
  text,
  className,
  delay = 0,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** words listed here render in the coral accent */
  highlight?: string[];
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delayChildren: delay }}
    >
      {words.map((w, i) => {
        const isHi = highlight?.includes(w.replace(/[.,]/g, ""));
        return (
          <span
            key={i}
            className="inline-flex overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span
              variants={word}
              className={cn("inline-block will-change-transform", isHi && "text-coral")}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
