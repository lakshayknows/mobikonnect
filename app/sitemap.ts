import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";

const base = "https://mobikonnect.com";

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
  "/About",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const studies: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${base}/CaseStudies/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...studies];
}
