import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { getTranslations } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { FloatingSocialButtons } from "@/components/floating-social-buttons"
import { ScrollRevealInit } from "@/components/scroll-reveal-init"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CursorGlow } from "@/components/cursor-glow"
import { siteUrl, faqSchema, webPageSchema, breadcrumbSchema, ogMeta } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "HomePage" })

  const title = locale === 'es' ? 'Diseño Web y Automatización IA | AION' : 'Web Design & AI Automation | AION'
  const description = t("metaDesc")
  const keywords = locale === 'es'
    ? ['diseño web', 'automatización IA', 'chatbot WhatsApp', 'marketing digital', 'páginas web profesionales', 'agencia digital']
    : ['web design', 'AI automation', 'WhatsApp chatbot', 'digital marketing', 'professional websites', 'digital agency'];
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        es: `${siteUrl}/es`,
        "x-default": `${siteUrl}/en`,
      },
    },
    ...ogMeta({ locale, title, description, path: '' }),
  }
}

const SectionLoader = () => <div className="min-h-[200px]" />

const ServicePillars = dynamic(() => import("@/components/service-pillars").then(m => ({ default: m.ServicePillars })), { loading: SectionLoader })
const AboutUsPreview = dynamic(() => import("@/components/about-us-preview").then(m => ({ default: m.AboutUsPreview })), { loading: SectionLoader })
const CaseStudies = dynamic(() => import("@/components/case-studies").then(m => ({ default: m.CaseStudies })), { loading: SectionLoader })
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(m => ({ default: m.TestimonialsSection })), { loading: SectionLoader })
const HomeFaq = dynamic(() => import("@/components/home-faq").then(m => ({ default: m.HomeFaq })), { loading: SectionLoader })
const FinalCTA = dynamic(() => import("@/components/final-cta").then(m => ({ default: m.FinalCTA })), { loading: SectionLoader })
const GlobalModals = dynamic(() => import("@/components/global-modals").then(m => ({ default: m.GlobalModals })))

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "HomeFaq" })

  const faqItems = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
    { question: t("faq4Q"), answer: t("faq4A") },
    { question: t("faq5Q"), answer: t("faq5A") },
    { question: t("faq6Q"), answer: t("faq6A") },
    { question: t("faq7Q"), answer: t("faq7A") },
    { question: t("faq8Q"), answer: t("faq8A") },
    { question: t("faq9Q"), answer: t("faq9A") },
    { question: t("faq10Q"), answer: t("faq10A") },
  ]

  const homePageSchema = webPageSchema({
    locale,
    title: locale === "es" ? "Diseño Web y Automatización IA" : "Web Design & AI Automation",
    description: locale === "es"
      ? "Agencia de diseño web profesional y automatización con IA para pymes."
      : "Professional web design agency and AI automation for small businesses.",
    path: "",
  });

  return (
    <main id="main-content" className="relative min-h-screen animate-page-in">
      {/* WebPage + FAQ + Breadcrumb rich snippet schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: locale === "es" ? "Inicio" : "Home", url: `${siteUrl}/${locale}` },
          ])),
        }}
      />
      {/* Cosmic space background */}
      <div className="cosmic-bg" aria-hidden="true">
        <div className="cosmic-bg-base" />
        <div className="cosmic-stars" />
        <div className="cosmic-nebula-1" />
        <div className="cosmic-nebula-2" />
        <div className="cosmic-nebula-3" />
      </div>

      <ScrollRevealInit />
      <CursorGlow />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="section-divider-gradient" />
        <ServicePillars />
        <div className="section-divider-gradient" />
        <AboutUsPreview />
        <div className="section-divider-gradient" />
        <CaseStudies />
        <div className="section-divider-gradient" />
        <TestimonialsSection />
        <div className="section-divider-gradient" />
        <HomeFaq />
        <FinalCTA />
        <Footer />
      </div>
      <FloatingSocialButtons />
      <GlobalModals />
      <ScrollToTop />
    </main>
  )
}
