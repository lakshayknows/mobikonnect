"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section className="gutter pb-14 sm:pb-20">
      <div
        className="frame relative bg-coral p-8 sm:p-12 lg:p-16"
        style={{
          backgroundImage:
            "radial-gradient(110% 120% at 0% 0%, rgba(248,235,211,0.16) 0%, rgba(208,94,98,0) 50%), linear-gradient(135deg, #D05E62 0%, #b84a4e 100%)",
        }}
      >
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        <Reveal>
          <p className="eyebrow text-cream/80">By the numbers</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="relative">
              <div className="display break-words text-[clamp(1.5rem,5vw,3rem)] leading-tight text-cream sm:whitespace-nowrap">
                {s.text ?? (
                  <Counter
                    value={s.value!}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    format={s.format}
                  />
                )}
              </div>
              <p className="mt-3 max-w-[20ch] text-sm text-cream/85">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
