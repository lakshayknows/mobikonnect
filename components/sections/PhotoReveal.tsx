"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { teamPhotos } from "@/lib/content";

type TrailItem = { id: number; x: number; y: number; src: string };

const EASE = [0.16, 1, 0.3, 1] as const;
/** Min pointer travel (px) before spawning the next image. */
const SPAWN_DISTANCE = 90;
/** How long each trailed image lives (ms). */
const LIFETIME = 750;

export default function PhotoReveal() {
  const reduce = useReducedMotion();
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      {isFine && !reduce ? <CursorTrail /> : <Marquee animate={!reduce} />}
    </section>
  );
}

/* ───────────────────────── Desktop: cursor image trail ───────────────────────── */

function CursorTrail() {
  const areaRef = useRef<HTMLDivElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const counter = useRef(0);
  const picker = useRef(0);
  const [items, setItems] = useState<TrailItem[]>([]);

  const handleMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const prev = last.current;
    if (prev) {
      const dist = Math.hypot(x - prev.x, y - prev.y);
      if (dist < SPAWN_DISTANCE) return;
    }
    last.current = { x, y };

    const id = counter.current++;
    const src = teamPhotos[picker.current % teamPhotos.length];
    picker.current++;
    setItems((curr) => [...curr, { id, x, y, src }]);
    window.setTimeout(() => {
      setItems((curr) => curr.filter((it) => it.id !== id));
    }, LIFETIME);
  }, []);

  return (
    <div
      ref={areaRef}
      onPointerMove={handleMove}
      onPointerLeave={() => (last.current = null)}
      className="relative flex h-[82vh] min-h-[600px] w-full items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none select-none px-6 text-center">
        <p className="eyebrow text-coral">Behind the campaigns</p>
        <h2 className="display mt-4 text-huge sm:text-giant">
          The people who
          <br />
          make it move.
        </h2>
        <p className="mt-5 text-sm text-cream-faint">Move your cursor to meet the team</p>
      </div>

      <AnimatePresence>
        {items.map((it) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ left: it.x, top: it.y }}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="frame relative h-56 w-44 overflow-hidden shadow-2xl sm:h-72 sm:w-56">
              <Image
                src={it.src}
                alt=""
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Mobile / reduced-motion: marquee ───────────────────────── */

function Marquee({ animate }: { animate: boolean }) {
  // Two rows scrolling in opposite directions for a livelier feel.
  const half = Math.ceil(teamPhotos.length / 2);
  const rowA = teamPhotos.slice(0, half);
  const rowB = teamPhotos.slice(half);

  return (
    <div className="space-y-4">
      <div className="mb-8 text-center">
        <p className="eyebrow text-coral">Behind the campaigns</p>
        <h2 className="display mt-3 text-big sm:text-huge">
          The people who make it move.
        </h2>
      </div>
      <MarqueeRow photos={[...rowA, ...rowA]} animate={animate} direction={1} />
      <MarqueeRow photos={[...rowB, ...rowB]} animate={animate} direction={-1} />
    </div>
  );
}

function MarqueeRow({
  photos,
  animate,
  direction,
}: {
  photos: string[];
  animate: boolean;
  direction: 1 | -1;
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max gap-3"
        animate={animate ? { x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] } : undefined}
        transition={
          animate
            ? { duration: 38, ease: "linear", repeat: Infinity }
            : undefined
        }
      >
        {photos.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="frame relative h-36 w-28 shrink-0 overflow-hidden border border-cream-line sm:h-44 sm:w-36"
          >
            <Image src={src} alt="" fill sizes="160px" className="object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
