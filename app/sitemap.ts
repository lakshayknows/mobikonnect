import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";
import { listPublishedSlugs } from "@/lib/db/queries";
import { isDbConfigured } from "@/lib/db";

const base = "https://mobikonnect.com";

export const revalidate = 3600;

const routes = [
  "",
  "/what-we-do",
  "/consumer-promotions",
  "/trade-promotions",
  "/loyalty-programs",
  "/experiential-marketing",
  "/customer-engagement",
  "/martech-platform",
  "/influencer-marketing",
  "/employee-engagement",
  "/CaseStudies",
  "/blog",
  "/About",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const studies: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${base}/CaseStudies/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Published posts only — drafts and not-yet-due scheduled posts are excluded
  // by listPublishedSlugs.
  let blogPosts: MetadataRoute.Sitemap = [];
  if (isDbConfigured()) {
    try {
      const rows = await listPublishedSlugs();
      blogPosts = rows.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      }));
    } catch (error) {
      console.error("[sitemap] failed to load blog posts:", error);
    }
  }

  return [...pages, ...studies, ...blogPosts];
}
