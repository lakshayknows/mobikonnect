import { Reveal, RevealText } from "@/components/ui/Reveal";

/**
 * Shared top-of-page header: indexed eyebrow + a big masked headline reveal +
 * optional intro. Reuses the same motion language as the homepage sections.
 */
export function PageHeader({
  eyebrow,
  title,
  highlight,
  intro,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  intro?: string;
}) {
  return (
    <header className="gutter pt-36 pb-12 text-center sm:pt-44 sm:pb-16">
      <Reveal>
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-cream-line" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-8 bg-cream-line" />
        </div>
      </Reveal>
      <h1 className="display text-[clamp(2rem,7vw,7rem)] mt-6 max-w-[18ch] mx-auto break-words uppercase tracking-[-0.02em]">
        <RevealText text={title} highlight={highlight} />
      </h1>
      {intro && (
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl mx-auto text-lg text-cream-dim">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
