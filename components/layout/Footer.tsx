import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="gutter pb-10">
      <div className="rounded-frame border border-cream-line bg-ink-soft/30 p-8 sm:p-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-cream-dim">{site.tagline}</p>
            <p className="mt-2 text-sm text-cream-faint">
              A full-service mobile marketing &amp; advertising agency.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      data-cursor="hover"
                      className="text-sm text-cream-dim transition-colors hover:text-cream"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-cream-dim">
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
                    {site.email}
                  </a>
                </li>
                {site.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-cream">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Online</p>
              <ul className="mt-4 space-y-2.5 text-sm text-cream-dim">
                <li>
                  <a href={`https://${site.domain}`} className="transition-colors hover:text-cream">
                    {site.domain}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream-line pt-6 text-sm text-cream-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legal}. All rights reserved.
          </p>
          <p>Designed &amp; built to breathe and live mobile.</p>
        </div>
      </div>
    </footer>
  );
}
