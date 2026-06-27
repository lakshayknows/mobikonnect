import Image from "next/image";
import logoImg from "@/logo.png";
import { cn } from "@/lib/cn";

/**
 * Monogram — Displays the Mobikonnect brand logo image.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src={logoImg}
        alt="Mobikonnect monogram"
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

/** Full lockup: Displays the Mobikonnect brand logo image. */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center select-none", className)}>
      <Image
        src={logoImg}
        alt="Mobikonnect logo"
        className="h-10 w-auto object-contain"
        priority
      />
    </div>
  );
}
