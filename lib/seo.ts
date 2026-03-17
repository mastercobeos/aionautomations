/**
 * SEO config: base URL for canonical, OG, sitemap.
 * Set NEXT_PUBLIC_SITE_URL in .env.local (e.g. https://www.aionautomations.com)
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aionautomations.io";

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
  alternateName: "AION",
  url: siteUrl,
  description:
    "Web design agency and AI automation for small businesses. Custom websites, WhatsApp chatbots, workflow automation, and digital marketing. Agencia de diseño web y automatización con IA para pymes.",
  slogan: "Automate. Accelerate. Dominate.",
  foundingDate: "2024",
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/favicon.png`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/og-image-en.jpg`,
  telephone: process.env.NEXT_PUBLIC_PHONE || "+52 341 168 7566",
  email: "info@aionautomations.io",
  priceRange: "$$",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_PHONE || "+52 341 168 7566",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
    {
      "@type": "ContactPoint",
      email: "info@aionautomations.io",
      contactType: "sales",
      availableLanguage: ["Spanish", "English"],
    },
  ],
  serviceType: [
    "Web Design",
    "Custom Website Development",
    "AI Automation Agency",
    "Business Process Automation",
    "WhatsApp Chatbot Development",
    "AI Marketing",
    "Ecommerce Website Design",
    "Workflow Automation",
    "Diseño de páginas web",
    "Automatización con IA",
    "Chatbot para empresas",
    "Marketing digital con IA",
  ],
  areaServed: [
    { "@type": "Continent", name: "South America" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "Europe" },
  ],
  availableLanguage: ["Spanish", "English"],
  knowsAbout: [
    "Web Design",
    "Custom Website Development",
    "AI Automation",
    "Business Process Automation",
    "Lead Generation",
    "CRM Integration",
    "CRM Automation",
    "WhatsApp Business Automation",
    "WhatsApp Chatbot Development",
    "Digital Marketing",
    "AI Chatbot Development",
    "Workflow Automation",
    "Ecommerce Website Design",
    "Small Business Web Design",
    "SEO Optimization",
    "Landing Page Design",
    "n8n Automation",
    "Make.com Automation",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "8",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Maria Gonzalez" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "In 3 weeks we increased appointments by 65%. The WhatsApp system books patients on its own, even at 2 AM.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Pablo Ruiz" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "The new site converts 3x more than the old one. And the WhatsApp bot books property tours without anyone watching the phone.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Andrea Mendez" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "We went from losing 40% of leads to capturing 90%. AION integrated everything: website, CRM, and automated flows.",
    },
  ],
  sameAs: [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "",
  ].filter(Boolean),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "14:00",
    },
  ],
  potentialAction: {
    "@type": "CommunicateAction",
    target: `${siteUrl}/en/contact`,
    name: "Request a free consultation",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Web Design",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Website Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ecommerce Website" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Page Design" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "AI Automation",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Chatbot" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workflow Automation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM Integration" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "AI Marketing",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Optimization" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Marketing" } },
        ],
      },
    ],
  },
};

export const websiteSchema = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AION Automations",
  url: siteUrl,
  description:
    locale === "es"
      ? "Agencia de diseño web profesional y automatización con IA para pymes. Chatbots WhatsApp, CRM, flujos de trabajo automatizados y marketing digital con inteligencia artificial."
      : "Professional web design agency and AI automation for small businesses. WhatsApp chatbots, CRM, workflow automation, and AI-powered digital marketing.",
  inLanguage: locale === "es" ? "es" : "en",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/${locale}/blog?q={search_term_string}`,
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
  name: locale === "es" ? "Diseño Web, Automatización con IA y Marketing Digital" : "Web Design, AI Automation & Digital Marketing",
  description:
    locale === "es"
      ? "Diseño de páginas web profesionales para pymes. Automatización de procesos con IA, chatbots WhatsApp, integración CRM y marketing digital con inteligencia artificial."
      : "Professional web design for small businesses. AI process automation, WhatsApp chatbots, CRM integration, and AI-powered digital marketing.",
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

/** Blog posting schema (with speakable for AI/voice search) */
export function blogPostSchema(opts: {
  locale: string;
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  const url = `${siteUrl}/${opts.locale}/blog/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    image: opts.image || `${siteUrl}/og-image-${opts.locale === "es" ? "es" : "en"}.jpg`,
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
      logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.png`, width: 512, height: 512 },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article h2", "article p"],
    },
  };
}

/** HowTo schema for tutorial blog posts */
export function howToSchema(opts: {
  locale: string;
  name: string;
  description: string;
  slug: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}/${opts.locale}/blog/${opts.slug}`,
    inLanguage: opts.locale === "es" ? "es" : "en",
    step: opts.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
    provider: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
    },
  };
}

/** CollectionPage schema for listing pages (blog index, industries hub) */
export function collectionPageSchema(opts: {
  locale: string;
  title: string;
  description: string;
  path: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.title,
    description: opts.description,
    url: `${siteUrl}/${opts.locale}${opts.path}`,
    inLanguage: opts.locale === "es" ? "es" : "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

/** SiteNavigationElement schema for main navigation */
export function siteNavigationSchema(locale: string) {
  const nav = [
    { name: locale === "es" ? "Inicio" : "Home", url: `${siteUrl}/${locale}` },
    { name: locale === "es" ? "Páginas Web" : "Web Design", url: `${siteUrl}/${locale}/services/web` },
    { name: locale === "es" ? "Automatizaciones" : "Automations", url: `${siteUrl}/${locale}/services/automations` },
    { name: locale === "es" ? "Marketing" : "Marketing", url: `${siteUrl}/${locale}/services/marketing` },
    { name: locale === "es" ? "Industrias" : "Industries", url: `${siteUrl}/${locale}/industries` },
    { name: locale === "es" ? "Portafolio" : "Portfolio", url: `${siteUrl}/${locale}/work` },
    { name: locale === "es" ? "Precios" : "Pricing", url: `${siteUrl}/${locale}/pricing` },
    { name: "Blog", url: `${siteUrl}/${locale}/blog` },
    { name: locale === "es" ? "Nosotros" : "About", url: `${siteUrl}/${locale}/about` },
    { name: locale === "es" ? "Contacto" : "Contact", url: `${siteUrl}/${locale}/contact` },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: locale === "es" ? "Navegación principal" : "Main navigation",
    url: `${siteUrl}/${locale}`,
    hasPart: nav.map((item) => ({
      "@type": "WebPage",
      name: item.name,
      url: item.url,
    })),
  };
}

/** Reusable OG + Twitter metadata for interior pages */
export function ogMeta(opts: { locale: string; title: string; description: string; path: string }) {
  const url = `${siteUrl}/${opts.locale}${opts.path}`;
  const ogImage = opts.locale === 'es' ? `${siteUrl}/og-image-es.jpg` : `${siteUrl}/og-image-en.jpg`;
  return {
    openGraph: {
      type: 'website' as const,
      url,
      title: opts.title,
      description: opts.description,
      siteName: 'AION Automations',
      locale: opts.locale === 'es' ? 'es_ES' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: opts.title,
      description: opts.description,
      images: [ogImage],
      site: '@aionautomations',
      creator: '@aionautomations',
    },
  };
}

/** Service Offer schema for pricing pages (rich snippets) */
export function serviceOfferSchema(opts: {
  locale: string;
  serviceName: string;
  description: string;
  path: string;
  tiers: { name: string; price: string; currency?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.serviceName,
    description: opts.description,
    url: `${siteUrl}/${opts.locale}${opts.path}`,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "AION Automations",
    },
    offers: opts.tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price,
      priceCurrency: tier.currency || "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/${opts.locale}${opts.path}`,
    })),
  };
}

/** AboutPage schema — specialized WebPage type for "About Us" */
export function aboutPageSchema(opts: {
  locale: string;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: opts.title,
    description: opts.description,
    url: `${siteUrl}/${opts.locale}/about`,
    inLanguage: opts.locale === "es" ? "es" : "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "AION Automations",
    },
    about: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
    },
    publisher: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
    },
  };
}

/** ContactPage schema — specialized WebPage type for "Contact" */
export function contactPageSchema(opts: {
  locale: string;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: opts.title,
    description: opts.description,
    url: `${siteUrl}/${opts.locale}/contact`,
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
  "/privacy",
  "/terms",
] as const;
