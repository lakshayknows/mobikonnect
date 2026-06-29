"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Numbered feature card with optional bulleted sub-points. Mirrors the homepage
 * "Selected work" cards: alternating blue/coral gradient tint with a soft glow
 * that intensifies on hover.
 */
export function PillarCard({
  no,
  title,
  blurb,
  points,
  index = 0,
}: {
  no: string;
  title: string;
  blurb: string;
  points?: string[];
  index?: number;
}) {
  const isCoral = index % 2 === 1;
  return (
    <Reveal delay={(index % 3) * 0.07} className="h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease }}
        data-cursor="hover"
        className={cn(
          "group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-card border p-7 transition-colors duration-500",
          isCoral
            ? "border-coral/25 bg-coral/[0.07] hover:border-coral/60"
            : "border-blue/25 bg-blue/[0.07] hover:border-blue/60",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
            isCoral ? "bg-coral/20" : "bg-blue/20",
          )}
        />
        <div className="relative flex items-start justify-between">
          <span className={cn("display text-sm", isCoral ? "text-coral" : "text-blue")}>
            {no}
          </span>
          <ArrowUpRight
            className={cn(
              "h-5 w-5 transition-all duration-300 group-hover:rotate-45",
              isCoral ? "text-coral" : "text-blue",
            )}
          />
        </div>
        <div className="relative">
          <h3 className="display text-xl leading-tight">{title}</h3>
          <p className="mt-3 text-sm text-cream-dim">{blurb}</p>
          {points && points.length > 0 && (
            <ul className="mt-5 space-y-1.5 border-t border-cream-line pt-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-cream-dim">
                  <span
                    className={cn(
                      "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                      isCoral ? "bg-coral" : "bg-blue",
                    )}
                  />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.article>
    </Reveal>
  );
}

/** Linked case-study card — mirrors the homepage Work card, but navigates to the detail page. */
export function CaseCard({ study, index = 0 }: { study: CaseStudy; index?: number }) {
  const isCoral = study.accent === "coral";
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/CaseStudies/${study.slug}`}
        data-cursor="hover"
        className={cn(
          "group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-frame border p-8 transition-colors duration-500 sm:p-10",
          isCoral
            ? "border-coral/25 bg-coral/[0.07] hover:border-coral/60"
            : "border-blue/25 bg-blue/[0.07] hover:border-blue/60",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
            isCoral ? "bg-coral/20" : "bg-blue/20",
          )}
        />
        <div className="relative flex items-start justify-between">
          <span
            className={cn(
              "rounded-pill border px-3 py-1 text-xs",
              isCoral ? "border-coral/40 text-coral" : "border-blue/40 text-blue",
            )}
          >
            {study.category}
          </span>
          <ArrowUpRight
            className={cn(
              "h-6 w-6 transition-all duration-300 group-hover:rotate-45",
              isCoral ? "text-coral" : "text-blue",
            )}
          />
        </div>
        <div className="relative">
          <p className="text-sm uppercase tracking-label text-cream-dim">{study.brand}</p>
          <h3 className="display mt-2 text-3xl sm:text-4xl">{study.title}</h3>
          <p className="mt-4 max-w-md text-cream-dim">{study.summary}</p>
          <div className="mt-7 flex gap-10 border-t border-cream-line pt-5">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <div className="display text-2xl text-cream sm:text-3xl">{m.value}</div>
                <div className="mt-1 text-xs text-cream-dim">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/** A wrapping cloud of pill chips — for industries, campaign types, tech offerings. */
export function TagCloud({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.5, delay: (i % 8) * 0.04, ease }}
          data-cursor="hover"
          className="rounded-pill border border-cream-line bg-ink-soft/40 px-5 py-2.5 text-sm text-cream/80 transition-colors duration-300 hover:border-coral hover:bg-coral/10 hover:text-cream"
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}
