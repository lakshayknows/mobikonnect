"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="gutter">
          <div className="mt-5 flex items-center justify-between sm:mt-6">
            <Link href="/" aria-label="Mobikonnect home" data-cursor="hover">
              <Logo className="h-9 sm:h-11" />
            </Link>

            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                data-cursor="hover"
                className="hidden items-center gap-2 rounded-pill bg-coral px-6 py-3 text-base font-medium text-cream transition-colors duration-300 hover:bg-coral-deep sm:inline-flex sm:text-lg"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-base font-medium text-cream transition-colors duration-300 hover:text-coral sm:text-lg"
              >
                Menu
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
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 top-0 z-[60] flex h-[100dvh] items-stretch justify-center bg-ink-deep/85 backdrop-blur-md p-0 md:p-6 lg:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid h-full w-full grid-rows-[auto_1fr_auto] gap-y-4 overflow-hidden rounded-none bg-blue px-5 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:px-6 sm:py-6 sm:gap-y-6 md:rounded-[28px] md:p-10 lg:p-12"
              style={{
                backgroundImage:
                  "radial-gradient(120% 90% at 80% 0%, rgba(248,235,211,0.18) 0%, rgba(9,153,213,0) 55%), linear-gradient(180deg, #0999D5 0%, #0a7bac 100%)",
              }}
            >
              {/* Header Row */}
              <div className="relative flex w-full items-center justify-center">
                <motion.button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  data-cursor="hover"
                  whileHover={{ scale: 1.05, color: "#D05E62" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="display text-sm font-bold uppercase tracking-[0.22em] text-cream transition-colors duration-300 sm:text-base"
                >
                  Close
                </motion.button>
              </div>

              {/* Navigation Stack — scrollable fallback keeps every item reachable on short screens */}
              <nav className="no-scrollbar min-h-0 overflow-y-auto overscroll-contain flex flex-col">
                <div className="w-full my-auto py-4 flex flex-col items-center gap-0">
                  {nav.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full text-center"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        data-cursor="hover"
                        className="display block text-center font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-cream transition-colors duration-300 text-[clamp(1.3rem,5.5vw,1.8rem)] sm:text-[clamp(1.8rem,5vh,3.5rem)] md:text-[clamp(2rem,5.8vh,4.2rem)] py-1.5 sm:py-2 whitespace-nowrap"
                      >
                        <motion.span
                          whileHover={{ scale: 1.05, color: "#D05E62" }}
                          transition={{ type: "spring", stiffness: 350, damping: 18 }}
                          className="inline-block"
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Footer Row */}
              <div className="flex items-end justify-between w-full font-sans text-cream pt-2">
                <p className="text-sm font-semibold tracking-[0.1em] sm:text-base">
                  {new Date().getFullYear()}
                </p>
                <div className="flex flex-col items-end text-sm font-semibold sm:text-base">
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="transition-colors duration-300 hover:text-coral"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    data-cursor="hover"
                    className="mt-1 transition-colors duration-300 hover:text-coral"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
