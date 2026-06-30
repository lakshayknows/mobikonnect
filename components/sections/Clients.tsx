"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/lib/content";

export default function Clients() {
  return (
    <section id="clients" className="gutter py-14 sm:py-20">
      <div
        className="frame relative bg-blue py-14 sm:py-20"
        style={{
          backgroundImage:
            "radial-gradient(100% 120% at 50% 0%, rgba(248,235,211,0.16) 0%, rgba(9,153,213,0) 55%), linear-gradient(180deg, #0999D5 0%, #0a7bac 100%)",
        }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        <Reveal className="px-6 text-center sm:px-10">
          <p className="eyebrow text-cream/80">Trusted by</p>
          <h2 className="display mx-auto mt-4 max-w-[18ch] text-huge text-cream">
            Brands you already know &amp; love.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4">
          <Marquee>
            {clients.map((c) => (
              <span key={c} className="display mx-8 text-3xl text-cream/80 sm:text-5xl">
                {c}
              </span>
            ))}
          </Marquee>
          <Marquee reverse>
            {clients.map((c) => (
              <span
                key={c}
                className="mx-8 font-display text-3xl font-bold text-transparent sm:text-5xl"
                style={{ WebkitTextStroke: "1.2px rgba(248,235,211,0.55)" }}
              >
                {c}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
