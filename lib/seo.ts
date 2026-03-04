/**
 * SEO config: base URL for canonical, OG, sitemap.
 * Set NEXT_PUBLIC_SITE_URL in .env.local (e.g. https://www.aionautomations.com)
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.aionautomations.com";

export const defaultLocale = "en";
export const locales = ["en", "es"] as const;

/**
 * ProfessionalService schema — main organization schema.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organization`,
  name: "AION Automations",
  url: siteUrl,
  description:
    "Agencia de diseño de páginas web, automatización y marketing con inteligencia artificial",
  logo: `${siteUrl}/LOGO.svg`,
  image: `${siteUrl}/LOGO.svg`,
  telephone: process.env.NEXT_PUBLIC_PHONE || "+52 341 168 7566",
  email: "aionautomations@gmail.com",
  priceRange: "$$",
  serviceType: [
    "Diseño de páginas web",
    "Automatización con IA",
    "Marketing digital con IA",
    "Web Design",
    "AI Automation",
    "AI Marketing",
  ],
  areaServed: [
    { "@type": "Continent", name: "South America" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "Europe" },
  ],
  availableLanguage: ["Spanish", "English"],
  knowsAbout: [
    "Web Design",
    "AI Automation",
    "Lead Generation",
    "CRM Integration",
    "WhatsApp Business Automation",
    "Digital Marketing",
  ],
  sameAs: [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "",
  ].filter(Boolean),
  potentialAction: {
    "@type": "ContactAction",
    target: `${siteUrl}/#contact`,
    "http://schema.org/contactType": "customer service",
  },
};

export const websiteSchema = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AION Automations",
  url: siteUrl,
  description:
    locale === "es"
      ? "Páginas web, automatizaciones y marketing IA. Diseño web, automatización de procesos y marketing con inteligencia artificial."
      : "Web pages, automations and AI marketing. Website design, process automation and artificial intelligence marketing.",
  inLanguage: locale === "es" ? "es" : "en",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/${locale}#contact` },
    "query-input": "required name=search_term_string",
  },
});

/** Servicios principales para SEO y schema (tres pilares) */
export const coreServices = {
  es: ["Páginas Web", "Automatizaciones", "Marketing IA"],
  en: ["Web Pages", "Automations", "AI Marketing"],
} as const;

/** Schema de servicios para JSON-LD (tres pilares) */
export const serviceSchema = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: locale === "es" ? "Páginas Web, Automatizaciones y Marketing IA" : "Web Pages, Automations & AI Marketing",
  description:
    locale === "es"
      ? "Diseño de páginas web profesionales, automatizaciones a medida y marketing con inteligencia artificial."
      : "Professional web page design, custom automations, and artificial intelligence marketing.",
  provider: {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: "AION Automations",
    url: siteUrl,
  },
  areaServed: [
    { "@type": "Continent", name: "South America" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "Europe" },
  ],
});

/* ─── Page-specific schema helpers ─── */

/** Breadcrumb schema for any page */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** FAQ schema for pages with FAQ sections */
export function faqSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/** WebPage schema for interior pages */
export function webPageSchema(opts: {
  locale: string;
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.title,
    description: opts.description,
    url: `${siteUrl}/${opts.locale}${opts.path}`,
    inLanguage: opts.locale === "es" ? "es" : "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "AION Automations",
    },
    publisher: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
    },
  };
}

/** Blog posting schema */
export function blogPostSchema(opts: {
  locale: string;
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: `${siteUrl}/${opts.locale}/blog/${opts.slug}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    image: opts.image || `${siteUrl}/LOGO.svg`,
    inLanguage: opts.locale === "es" ? "es" : "en",
    author: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "AION Automations",
    },
    publisher: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "AION Automations",
      logo: { "@type": "ImageObject", url: `${siteUrl}/LOGO.svg` },
    },
  };
}

/** All page routes for sitemap generation */
export const pageRoutes = [
  "/",
  "/pricing",
  "/services/web",
  "/services/automations",
  "/services/marketing",
  "/industries",
  "/industries/dental",
  "/industries/real-estate",
  "/industries/restaurants",
  "/industries/tours",
  "/industries/gyms",
  "/industries/salons",
  "/industries/schools",
  "/industries/vets",
  "/industries/legal",
  "/industries/hotels",
  "/work",
  "/about",
  "/contact",
  "/blog",
] as const;
