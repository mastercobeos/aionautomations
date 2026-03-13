import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteUrl, webPageSchema, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FaqAccordion } from '@/components/faq-accordion';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { MessageCircle, Check } from 'lucide-react';
import { siteConfig } from "@/lib/site-config"
import { Link } from '@/i18n/routing';
import { InternalNav } from '@/components/internal-nav';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LegalPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: `${siteUrl}/${locale}/industries/legal`,
      languages: { en: `${siteUrl}/en/industries/legal`, es: `${siteUrl}/es/industries/legal`, "x-default": `${siteUrl}/en/industries/legal` },
    },
  };
}

export default async function LegalIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LegalPage' });

  const features = [
    { title: t('feat1Title'), desc: t('feat1Desc') },
    { title: t('feat2Title'), desc: t('feat2Desc') },
    { title: t('feat3Title'), desc: t('feat3Desc') },
    { title: t('feat4Title'), desc: t('feat4Desc') },
  ];

  const faqs = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
    { question: t('faq6Q'), answer: t('faq6A') },
  ];

  return (
    <main className="relative min-h-screen bg-background">
      {/* Cosmic space background */}
      <div className="cosmic-bg" aria-hidden="true">
        <div className="cosmic-bg-base" />
        <div className="cosmic-stars" />
        <div className="cosmic-nebula-1" />
        <div className="cosmic-nebula-2" />
        <div className="cosmic-nebula-3" />
      </div>
      <div className="relative z-10">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-8">
        <Breadcrumbs
          items={[
            { label: t('breadcrumbHome'), href: '/' },
            { label: t('breadcrumbIndustries'), href: '/industries' },
            { label: t('breadcrumbLegal') },
          ]}
        />

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {t('badge')}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((feat) => (
            <div key={feat.title} className="gradient-border-static shimmer-card rounded-2xl p-6 md:p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)]">
                <Check className="h-5 w-5 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{feat.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <FaqAccordion items={faqs} title={t('faqTitle')} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t('ctaTitle')}</h2>
          <p className="mt-3 text-muted-foreground">{t('ctaDesc')}</p>
          <a
            href={`${siteConfig.whatsapp.link}?text=${encodeURIComponent('Hola, me interesa una página web para mi despacho')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="h-4 w-4" />
            {t('ctaButton')}
          </a>
        </div>
      </section>

      <InternalNav locale={locale} exclude={['/industries']} />
      <Footer />
      <FloatingSocialButtons />
      <PageSchema schemas={[
        webPageSchema({ locale, title: t('metaTitle'), description: t('metaDesc'), path: '/industries/legal' }),
        breadcrumbSchema([
          { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
          { name: t('breadcrumbIndustries'), url: `${siteUrl}/${locale}/industries` },
          { name: t('breadcrumbLegal'), url: `${siteUrl}/${locale}/industries/legal` },
        ]),
        faqSchema(faqs),
      ]} />
      </div>
    </main>
  );
}
