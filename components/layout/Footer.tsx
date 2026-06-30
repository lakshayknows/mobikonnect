import Link from "next/link";
import { nav, site } from "@/lib/content";
import { RevealText } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "Facebook", href: site.socials.facebook },
  { label: "Twitter", href: site.socials.twitter },
  { label: "LinkedIn", href: site.linkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="gutter pb-10">
      <div className="rounded-frame border border-cream-line bg-ink-soft/30 px-7 py-14 sm:px-12 sm:py-20">
        {/* Oversized CTA */}
        <div className="text-center">
          <p className="eyebrow text-coral">Let&apos;s talk</p>
          <h2 className="display text-[clamp(2rem,7vw,6.5rem)] mt-5 mx-auto max-w-[14ch] break-words">
            <RevealText
              text="Let's build something people remember."
              highlight={["remember."]}
            />
          </h2>
          <div className="mt-10 flex justify-center">
            <MagneticButton href={`mailto:${site.email}`} variant="coral">
              {site.email}
            </MagneticButton>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-cream-line pt-12 sm:grid-cols-4 sm:gap-10">
          <div className="sm:col-span-1">
            <p className="text-cream-dim">{site.tagline}</p>
            <p className="mt-2 max-w-xs text-sm text-cream-faint">
              India&apos;s experiential marketing &amp; customer engagement
              technology platform.
            </p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    data-cursor="hover"
                    className="text-sm text-cream-dim transition-colors hover:text-cream"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-dim">
              <li>
                <span className="block font-medium text-cream">{site.legal}</span>
                <span className="mt-1 block max-w-[28ch] text-cream-faint leading-normal">{site.address}</span>
              </li>
              <li className="pt-1.5">
                <a
                  href={`mailto:${site.email}`}
                  className="whitespace-nowrap transition-colors hover:text-cream"
                >
                  {site.email}
                </a>
              </li>
              {site.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:+91${p.replace(/\D/g, "")}`}
                    className="whitespace-nowrap transition-colors hover:text-cream"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Social</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-dim">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="transition-colors hover:text-cream"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-cream-line pt-6 text-sm text-cream-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legal}. All rights reserved.
          </p>
          <p>Engage. Reward. Retain. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
