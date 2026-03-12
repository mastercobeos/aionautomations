import type { MetadataRoute } from "next";
import { siteUrl, locales, pageRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Last real deployment / content update date
  const siteLastModified = new Date("2026-03-06");

  for (const route of pageRoutes) {
    for (const locale of locales) {
      const path = route === "/" ? "" : route;
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: siteLastModified,
        changeFrequency: route === "/blog" ? "daily" : route === "/privacy" || route === "/terms" ? "yearly" : "weekly",
        priority: route === "/" ? 1.0 : route === "/pricing" ? 0.9 : route.startsWith("/services") ? 0.9 : route === "/privacy" || route === "/terms" ? 0.3 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${siteUrl}/${loc}${path}`])
          ),
        },
      });
    }
  }

  // Blog posts with their real publish dates
  const blogPosts = [
    { slug: "ai-automation-2026", date: "2026-02-28" },
    { slug: "website-cost-guide", date: "2026-02-20" },
    { slug: "whatsapp-ai-automation", date: "2026-02-12" },
    { slug: "local-seo-guide", date: "2026-02-05" },
  ];

  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${siteUrl}/${loc}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
