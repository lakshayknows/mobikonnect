import { cn } from "@/lib/cn";

/**
 * Long-form article body.
 *
 * The repo has no @tailwindcss/typography, so the prose scale is hand-built
 * from the existing tokens — Montserrat headings, cream-dim body copy,
 * cream-line rules, coral accents. `postBodyClass` is shared with the editor so
 * what an author types looks like what ships.
 *
 * HTML is sanitized on write (lib/sanitize.ts) — never render unsanitized input here.
 */
export const postBodyClass = cn(
  "text-[1.0625rem] leading-[1.75] text-cream-dim",
  // Headings
  "[&_h2]:display [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-[clamp(1.5rem,3.5vw,2.25rem)] [&_h2]:leading-tight [&_h2]:text-cream",
  "[&_h3]:display [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-[clamp(1.25rem,2.5vw,1.6rem)] [&_h3]:leading-tight [&_h3]:text-cream",
  "[&_h4]:display [&_h4]:mt-8 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:text-cream",
  "[&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0",
  // Body
  "[&_p]:my-5",
  "[&_strong]:font-semibold [&_strong]:text-cream",
  "[&_em]:italic",
  "[&_mark]:bg-coral/25 [&_mark]:text-cream [&_mark]:px-1 [&_mark]:rounded-sm",
  // Links — reuses the site's sliding underline
  "[&_a]:link-underline [&_a]:text-cream [&_a]:font-medium hover:[&_a]:text-coral",
  // Lists
  "[&_ul]:my-6 [&_ul]:space-y-2.5 [&_ul]:pl-1",
  "[&_ol]:my-6 [&_ol]:space-y-2.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:marker:text-coral",
  "[&_ul>li]:relative [&_ul>li]:pl-6",
  "[&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.65em] [&_ul>li]:before:h-1 [&_ul>li]:before:w-1 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-coral",
  "[&_li>ul]:my-2 [&_li>ol]:my-2",
  // Quote — coral rule on the left, matching the eyebrow accent language
  "[&_blockquote]:my-9 [&_blockquote]:border-l-2 [&_blockquote]:border-coral [&_blockquote]:pl-6",
  "[&_blockquote]:display [&_blockquote]:text-xl [&_blockquote]:leading-snug [&_blockquote]:text-cream sm:[&_blockquote]:text-2xl",
  "[&_blockquote_p]:my-0",
  // Code
  "[&_code]:rounded [&_code]:bg-ink-soft [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:text-cream",
  "[&_pre]:my-7 [&_pre]:overflow-x-auto [&_pre]:rounded-card [&_pre]:border [&_pre]:border-cream-line [&_pre]:bg-ink-soft/60 [&_pre]:p-5 [&_pre]:text-sm",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
  // Media
  "[&_img]:my-9 [&_img]:w-full [&_img]:rounded-card",
  "[&_figure]:my-9 [&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-cream-faint",
  // Rules
  "[&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-cream-line",
);

export function PostBody({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(postBodyClass, className)}
      // Sanitized server-side in lib/sanitize.ts before it is written to the DB.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
