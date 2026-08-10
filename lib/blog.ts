/** Pure helpers shared by the public blog and the admin portal. No deps. */

/** URL-safe slug: lowercase, accents stripped, non-alphanumerics collapsed to single hyphens. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    // drop the combining marks NFKD just split off, so "naïve" → "naive" not "nai-ve"
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Strip tags so we can count words / build a fallback excerpt from rendered HTML. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Reading time in whole minutes at 200 wpm, floored at 1. */
export function readingMinutes(html: string): number {
  const words = htmlToText(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** First N characters of the body, cut on a word boundary — used when no excerpt is given. */
export function excerptFrom(html: string, max = 200): string {
  const text = htmlToText(html);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** "12 July 2026" — matches the site's British-English copy. */
export function formatPostDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(d);
}

/** ISO date for <time datetime> and structured data. */
export function isoDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
}

/** Value for a `datetime-local` input, in IST. */
export function toDateTimeLocal(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  const offsetMs = d.getTime() - d.getTimezoneOffset() * 60_000;
  return new Date(offsetMs).toISOString().slice(0, 16);
}

export const POSTS_PER_PAGE = 9;

/**
 * Absolute URL on the public site.
 *
 * The admin is served from admin.mobikonnect.com, where a relative "/blog" link
 * resolves against the admin host and 404s — middleware maps that host onto the
 * /admin tree. Any "view it live" link from the admin must therefore be absolute.
 *
 * Override with NEXT_PUBLIC_SITE_URL to point local dev at localhost.
 */
export const PUBLIC_SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mobikonnect.com"
).replace(/\/$/, "");

export function publicUrl(path: string): string {
  return `${PUBLIC_SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Whether a case-study hero should render as <video> or <img>.
 *
 * Prefers the stored kind; falls back to the extension for rows seeded before
 * the column existed. Vercel Blob appends a random suffix to uploads, which is
 * why the kind is stored rather than sniffed at render time.
 */
export function isVideoMedia(url?: string | null, kind?: "image" | "video" | null): boolean {
  if (kind) return kind === "video";
  if (!url) return false;
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}
