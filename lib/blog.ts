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
