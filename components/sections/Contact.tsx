"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { RevealText, Reveal } from "@/components/ui/Reveal";
import { Monogram } from "@/components/ui/Logo";
import { site } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="gutter pb-8 pt-12 sm:pt-20">
      <div
        className="frame relative overflow-hidden p-8 sm:p-14 lg:p-20"
        style={{
          backgroundImage:
            "radial-gradient(90% 120% at 100% 0%, rgba(9,153,213,0.16) 0%, rgba(255,255,255,0) 55%), radial-gradient(80% 120% at 0% 100%, rgba(208,94,98,0.16) 0%, rgba(255,255,255,0) 55%)",
          border: "1px solid rgba(0,41,112,0.12)",
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <Monogram className="h-64 w-64 opacity-20 animate-float" />
        </motion.div>

        <Reveal>
          <div className="flex items-center gap-3">
            <span className="eyebrow text-coral">07</span>
            <span className="h-px w-8 bg-ink/20" />
            <span className="eyebrow">Let&apos;s talk</span>
          </div>
        </Reveal>

        <h2 className="display mt-8 max-w-[14ch] text-giant">
          <RevealText text="Let's create something memorable." highlight={["memorable."]} />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md text-ink/65">
            Got a brief, a brand or a big idea? Tell us what you want your
            audience to feel — we&apos;ll engineer the experience that gets them there.
          </p>
        </Reveal>

        <div className="relative mt-12 flex flex-col gap-10 border-t border-ink/10 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Email us</p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="hover"
              className="display link-underline mt-3 block text-3xl text-ink sm:text-5xl"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="eyebrow">Call</p>
                <div className="mt-2 space-y-1">
                  {site.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      data-cursor="hover"
                      className="block text-ink/65 transition-colors hover:text-ink"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow">Visit</p>
                <a
                  href={`https://${site.domain}`}
                  data-cursor="hover"
                  className="mt-2 block text-ink/65 transition-colors hover:text-ink"
                >
                  {site.domain}
                </a>
              </div>
            </div>
          </div>

          <a
            href={`mailto:${site.email}`}
            data-cursor="hover"
            className="group inline-flex items-center gap-3 self-start rounded-pill bg-coral px-8 py-5 text-base font-medium text-cream transition-colors duration-300 hover:bg-coral-deep"
          >
            Start a campaign
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
