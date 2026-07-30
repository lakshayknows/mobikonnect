"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { faqs as defaultFaqs, type Faq } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Faqs({
  items = defaultFaqs,
  eyebrow = "FAQs",
  title = "The questions we get most.",
}: {
  items?: readonly Faq[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="gutter py-24 sm:py-32">
      <SectionHeader
        index="·"
        eyebrow={eyebrow}
        title={title}
        align="center"
      />

      <div className="mx-auto mt-14 max-w-3xl sm:mt-20">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="border-b border-cream-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  data-cursor="hover"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="display text-lg text-cream sm:text-xl">
                    {f.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-coral transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-cream-dim">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
