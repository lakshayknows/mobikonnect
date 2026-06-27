import { cn } from "@/lib/cn";

/**
 * Seamless CSS marquee. Renders the children twice and translates -50% so the
 * loop is gapless. `reverse` flips direction.
 */
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
