import { cn } from "@/lib/cn";
import { Reveal, RevealText } from "./Reveal";

/** Shared section heading: an indexed eyebrow + a masked headline reveal. */
export function SectionHeader({
  index,
  eyebrow,
  title,
  highlight,
  align = "left",
  className,
  titleClassName,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  highlight?: string[];
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          {index && <span className="eyebrow text-coral">{index}</span>}
          <span className="h-px w-8 bg-cream-line" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <h2
        className={cn(
          "display text-giant mt-5 max-w-[20ch] uppercase tracking-[-0.02em]",
          align === "center" && "mx-auto",
          titleClassName,
        )}
      >
        <RevealText text={title} highlight={highlight} />
      </h2>
    </div>
  );
}
