import type { MetadataRoute } from "next";
import { siteUrl, locales, pageRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Last real deployment / content update date
  const siteLastModified = new Date("2026-03-13");

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
  const today = new Date().toISOString().slice(0, 10);
  const blogPosts = [
    { slug: "ai-automation-2026", date: "2026-02-28", dateModified: "2026-04-15" },
    { slug: "website-cost-guide", date: "2026-02-20", dateModified: "2026-04-15" },
    { slug: "whatsapp-ai-automation", date: "2026-02-12", dateModified: "2026-04-15" },
    { slug: "local-seo-guide", date: "2026-02-05", dateModified: "2026-04-15" },
    { slug: "ai-crm-small-business", date: "2026-03-12" },
    { slug: "ai-marketing-small-business", date: "2026-03-19" },
    { slug: "small-business-automation-ideas", date: "2026-03-26" },
    { slug: "choose-web-design-agency", date: "2026-04-02" },
    { slug: "ai-chatbot-for-business", date: "2026-04-09" },
    { slug: "n8n-automation-tutorial", date: "2026-04-16" },
    { slug: "lead-generation-service-business", date: "2026-04-23" },
    { slug: "ecommerce-website-guide", date: "2026-04-30" },
    { slug: "restaurant-ai-automation", date: "2026-05-07" },
    { slug: "dental-clinic-marketing", date: "2026-05-14" },
    { slug: "conversion-rate-optimization", date: "2026-05-21" },
    { slug: "social-media-automation", date: "2026-05-28" },
    { slug: "ai-email-marketing", date: "2026-06-04" },
    { slug: "business-website-checklist", date: "2026-06-11" },
    { slug: "real-estate-ai-marketing", date: "2026-06-18" },
    { slug: "gym-fitness-automation", date: "2026-06-25" },
  ].filter((post) => post.date <= today);

  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date((post as { dateModified?: string }).dateModified || post.date),
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
