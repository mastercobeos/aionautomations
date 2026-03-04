import { siteUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*/demo-buttons", "/*/scroll-preview"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/*/demo-buttons", "/*/scroll-preview"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
