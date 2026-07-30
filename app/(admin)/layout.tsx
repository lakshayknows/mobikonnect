import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Mobikonnect Admin", template: "%s · Mobikonnect Admin" },
  // The admin host also sends X-Robots-Tag from middleware; this covers the tag too.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Admin shell. Intentionally omits the marketing chrome — no Lenis smooth
 * scroll, no custom cursor, no navbar or footer — because they fight a
 * data-entry UI. Design tokens stay identical to the site.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-ink text-cream">{children}</div>;
}
