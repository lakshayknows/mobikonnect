"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { teamPhotos } from "@/lib/content";

export default function PhotoReveal() {
  const reduce = useReducedMotion();

  // Two rows scrolling in opposite directions for a livelier feel.
  const half = Math.ceil(teamPhotos.length / 2);
  const rowA = teamPhotos.slice(0, half);
  const rowB = teamPhotos.slice(half);

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="gutter mb-8 text-center sm:mb-10">
        <p className="eyebrow text-coral">Behind the campaigns</p>
        <h2 className="display mt-3 text-big sm:text-huge">
          The people who make it move.
        </h2>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <MarqueeRow photos={[...rowA, ...rowA]} animate={!reduce} direction={1} />
        <MarqueeRow photos={[...rowB, ...rowB]} animate={!reduce} direction={-1} />
      </div>
    </section>
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
        className="flex w-max gap-2.5 sm:gap-3"
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
            className="frame relative h-28 w-24 shrink-0 overflow-hidden border border-cream-line sm:h-36 sm:w-28 lg:h-44 lg:w-36"
          >
            <Image src={src} alt="" fill sizes="160px" className="object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
