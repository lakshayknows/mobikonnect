import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { TagCloud } from "@/components/ui/Cards";
import { Reveal } from "@/components/ui/Reveal";
import Contact from "@/components/sections/Contact";
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
            href="/case-studies"
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            All case studies
          </Link>
        </Reveal>
        <p className="eyebrow mt-8">{study.category}</p>
        <h1 className="display mt-4 text-giant max-w-[16ch]">{study.title}</h1>
        <p className="mt-4 text-lg uppercase tracking-label text-ink/55">{study.brand}</p>
      </header>

      {/* Placeholder hero media — swap for real photo/video later */}
      <section className="gutter pb-16">
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
      </section>

      {/* Metrics */}
      <section className="gutter pb-16">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {study.metrics.map((m) => (
            <div key={m.label} className="rounded-card border border-ink/10 bg-white p-6">
              <div className="display text-3xl sm:text-4xl">{m.value}</div>
              <div className="mt-2 text-sm text-ink/65">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge / Objective / Solution */}
      <section className="gutter pb-16">
        <div className="grid gap-px overflow-hidden rounded-frame border border-ink/10 bg-ink/10 lg:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.label} className="bg-white p-8 sm:p-10">
              <p className="eyebrow text-coral">{b.label}</p>
              <p className="mt-4 text-ink/75">{b.body}</p>
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
                <li key={r} className="flex items-start gap-3 text-ink/75">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
