"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="gutter">
          <div
            className={cn(
              "mt-4 flex items-center justify-between rounded-pill px-4 py-2.5 transition-all duration-500 ease-out-expo sm:px-5",
              scrolled
                ? "border border-ink/10 bg-cream/70 backdrop-blur-xl"
                : "border border-transparent bg-transparent",
            )}
          >
            <Link href="/" aria-label="Mobikonnect home" data-cursor="hover">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="hover"
                  className="rounded-pill px-4 py-2 text-sm text-ink/65 transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                data-cursor="hover"
                className="hidden items-center gap-1.5 rounded-pill bg-coral px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-coral-deep sm:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="grid h-11 w-11 place-items-center rounded-pill border border-ink/15 text-ink lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <div className="gutter flex items-center justify-between pt-6">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-pill border border-ink/15 text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="gutter mt-12 flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block border-b border-ink/10 py-5 text-4xl text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="gutter mt-12">
              <p className="eyebrow">Get in touch</p>
              <a
                href={`mailto:${site.email}`}
                className="display mt-2 block text-2xl text-coral"
              >
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
