import type { MetadataRoute } from "next";
import { siteUrl, locales, pageRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of pageRoutes) {
    for (const locale of locales) {
      const path = route === "/" ? "" : route;
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: route === "/blog" ? "daily" : "weekly",
        priority: route === "/" ? 1 : route === "/pricing" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${siteUrl}/${loc}${path}`])
          ),
        },
      });
    }
  }

  // Blog posts (static slugs)
  const blogSlugs = [
    "ai-automation-2026",
    "website-cost-guide",
    "whatsapp-ai-automation",
    "local-seo-guide",
  ];

  for (const slug of blogSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${siteUrl}/${loc}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
