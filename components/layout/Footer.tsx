import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="gutter pb-10">
      <div className="rounded-frame border border-ink/10 bg-white p-8 sm:p-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-ink/65">{site.tagline}</p>
            <p className="mt-2 text-sm text-ink/45">
              India&apos;s experiential marketing &amp; customer engagement technology platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      data-cursor="hover"
                      className="text-sm text-ink/65 transition-colors hover:text-ink"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/65">
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                    {site.email}
                  </a>
                </li>
                {site.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-ink">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Online</p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/65">
                <li>
                  <a href={`https://${site.domain}`} className="transition-colors hover:text-ink">
                    {site.domain}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-6 text-sm text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legal}. All rights reserved.
          </p>
          <p>Engage. Reward. Retain. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
