import Image from "next/image";
import logoImg from "@/logo.png";
import logoHorizontal from "@/assets/image.png";
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

/** Full lockup: Displays the Mobikonnect horizontal brand logo image. */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center select-none", className)}>
      <Image
        src={logoHorizontal}
        alt="Mobikonnect logo"
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  );
}
