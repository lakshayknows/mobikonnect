import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { TagCloud } from "@/components/ui/Cards";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) return { title: "Case Study" };
  return {
    title: `${study.brand} — ${study.title}`,
    description: study.summary,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) notFound();

  const blocks = [
    { label: "Challenge", body: study.challenge },
    { label: "Objective", body: study.objective },
    { label: "Solution", body: study.solution },
  ];

  return (
    <>
      <header className="gutter pt-36 pb-12 sm:pt-44">
        <Reveal>
          <Link
            href="/CaseStudies"
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" />
            All case studies
          </Link>
        </Reveal>
        <p className="eyebrow mt-8">{study.category}</p>
        <h1 className="display mt-4 text-[clamp(2rem,7vw,7rem)] max-w-[16ch] break-words uppercase tracking-[-0.02em]">
          {study.title}
        </h1>
        <p className="mt-4 text-lg uppercase tracking-label text-cream-dim">{study.brand}</p>
      </header>

      {/* Hero media — real campaign asset when available, placeholder otherwise */}
      <section className="gutter pb-16">
        {study.media ? (
          <div className="frame relative aspect-[16/7] overflow-hidden bg-ink-soft">
            {study.media.endsWith(".mp4") ? (
              <video
                src={study.media}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- animated GIF, next/image would freeze it
              <img
                src={study.media}
                alt={`${study.brand} — ${study.title} campaign showcase`}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ) : (
          <div
            className="frame relative flex aspect-[16/7] items-center justify-center"
            style={{
              backgroundImage:
                study.accent === "coral"
                  ? "linear-gradient(135deg, #D05E62 0%, #b84a4e 100%)"
                  : "linear-gradient(135deg, #0999D5 0%, #0a7bac 100%)",
            }}
          >
            <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
            <span className="display text-cream/80 text-sm uppercase tracking-label">
              Campaign film — coming soon
            </span>
          </div>
        )}
      </section>

      {/* Metrics */}
      <section className="gutter pb-16">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {study.metrics.map((m) => (
            <div key={m.label} className="rounded-card border border-cream-line bg-ink-soft/40 p-6">
              <div className="display text-3xl sm:text-4xl">{m.value}</div>
              <div className="mt-2 text-sm text-cream-dim">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge / Objective / Solution */}
      <section className="gutter pb-16">
        <div className="grid gap-px overflow-hidden rounded-frame border border-cream-line bg-cream-line lg:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.label} className="bg-ink p-8 sm:p-10">
              <p className="eyebrow text-coral">{b.label}</p>
              <p className="mt-4 text-cream-dim">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech used + Results */}
      <section className="gutter pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Technology used</p>
            <div className="mt-6">
              <TagCloud items={study.techUsed} />
            </div>
          </div>
          <div>
            <p className="eyebrow">Results</p>
            <ul className="mt-6 space-y-3">
              {study.results.map((r) => (
                <li key={r} className="flex items-start gap-3 text-cream-dim">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
