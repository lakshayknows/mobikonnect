import { cn } from "@/lib/cn";

/**
 * Monogram — a refined vector mark inspired by the original MK logo:
 * two rounded blue pillars (the "M"), a wifi/antenna motif, and a coral
 * chevron (the "K") signalling forward connection.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 110"
      role="img"
      aria-label="Mobikonnect monogram"
      className={cn("block", className)}
    >
      {/* wifi / antenna */}
      <g fill="none" stroke="#0999D5" strokeWidth="5" strokeLinecap="round">
        <path d="M22 26 a14 14 0 0 1 24 0" opacity="0.55" />
        <path d="M28 31 a7 7 0 0 1 12 0" opacity="0.85" />
      </g>
      <rect x="31.5" y="30" width="5" height="12" rx="2.5" fill="#0999D5" />
      {/* the "M" — two rounded pillars */}
      <rect x="14" y="38" width="24" height="58" rx="12" fill="#0999D5" />
      <rect x="44" y="38" width="24" height="58" rx="12" fill="#0999D5" />
      {/* connecting node */}
      <circle cx="74" cy="74" r="11" fill="#D05E62" />
      {/* the "K" chevron */}
      <path
        d="M78 34 L112 64 L78 94"
        fill="none"
        stroke="#D05E62"
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Full lockup: monogram + wordmark, used in the navbar. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 select-none", className)}>
      <Monogram className="h-7 w-auto" />
      <span className="display text-[1.15rem] tracking-tight leading-none">
        <span className="text-cream">Mobi</span>
        <span className="text-coral">konnect</span>
      </span>
    </span>
  );
}
