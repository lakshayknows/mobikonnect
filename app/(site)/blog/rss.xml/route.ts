import { listPublishedPosts } from "@/lib/db/queries";
import { isDbConfigured } from "@/lib/db";
import { site } from "@/lib/content";

export const revalidate = 300;

const base = `https://${site.domain}`;

/** Minimal XML escaping for text nodes and attribute values. */
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  let posts: Awaited<ReturnType<typeof listPublishedPosts>>["posts"] = [];

  if (isDbConfigured()) {
    try {
      ({ posts } = await listPublishedPosts({ perPage: 50 }));
    } catch (error) {
      console.error("[rss] failed to load posts:", error);
    }
  }

  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <description>${esc(p.excerpt)}</description>
      ${p.publishedAt ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : ""}
      ${p.category ? `<category>${esc(p.category.name)}</category>` : ""}
      ${p.author?.name ? `<dc:creator>${esc(p.author.name)}</dc:creator>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)} — Blog</title>
    <link>${base}/blog</link>
    <description>Points of view on experiential marketing, promotions, loyalty and engagement technology.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
