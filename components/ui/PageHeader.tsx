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
    <header className="gutter pt-36 pb-12 sm:pt-44 sm:pb-16">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-ink/20" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <h1 className="display text-giant mt-6 max-w-[16ch]">
        <RevealText text={title} highlight={highlight} />
      </h1>
      {intro && (
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-lg text-ink/65">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
