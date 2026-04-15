import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Zap, Check } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FaqAccordion } from '@/components/faq-accordion';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { PricingTabs } from '@/components/pricing-tabs';
import { webPageSchema, breadcrumbSchema, faqSchema, siteUrl, ogMeta } from '@/lib/seo';
import { Link } from '@/i18n/routing';

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PricingPage' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  const keywords = locale === 'es'
    ? ['precios diseño web', 'costo página web', 'paquetes automatización IA', 'precios marketing digital']
    : ['web design pricing', 'website cost', 'AI automation packages', 'digital marketing pricing'];
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}/pricing`,
      languages: { en: `${siteUrl}/en/pricing`, es: `${siteUrl}/es/pricing`, "x-default": `${siteUrl}/en/pricing` },
    },
    ...ogMeta({ locale, title, description, path: '/pricing' }),
  };
}

/* ─── Page ─── */

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PricingPage' });

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbPricing') },
  ];

  const faqItems = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq7Q'), answer: t('faq7A') },
    { question: t('faq8Q'), answer: t('faq8A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
    { question: t('faq6Q'), answer: t('faq6A') },
  ];

  const schemas = [
    webPageSchema({
      locale,
      title: t('metaTitle'),
      description: t('metaDesc'),
      path: '/pricing',
    }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbPricing'), url: `${siteUrl}/${locale}/pricing` },
    ]),
    faqSchema(faqItems),
  ];

  return (
    <main id="main-content" className="relative min-h-screen animate-page-in">
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

        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                {t('badge')}
              </span>

              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t('title')}
              </h1>

              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Service Tabs + Tiers */}
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PricingTabs />

            {/* Bundle Card */}
            <div className="relative mt-10 rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent p-6 md:p-8">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {t('bundleBadge')}
              </span>

              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30">
                      <Zap className="h-6 w-6 text-cyan-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{t('bundleName')}</h2>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <span className="text-lg text-muted-foreground line-through">{t('bundleOriginal')}</span>
                    <span className="text-3xl font-bold text-cyan-400">{t('bundlePrice')}</span>
                    <span className="rounded-full bg-green-500/15 border border-green-400/30 px-2.5 py-1 text-xs font-semibold text-green-400">
                      {t('bundleSavings')}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t('bundleDesc')}</p>
                  <div className="mt-5">
                    <Link
                      href="/contact"
                      className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                    >
                      {t('bundleButton')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <ul className="space-y-3">
                  {['bundleFeat1','bundleFeat2','bundleFeat3','bundleFeat4','bundleFeat5','bundleFeat6'].map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-cyan-400" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              {t('note')}
            </p>
          </div>
        </section>

        <div className="section-divider-gradient" />

        {/* FAQ */}
        <FaqAccordion items={faqItems} title={t('faqTitle')} />

        <div className="section-divider-gradient" />

        {/* Bottom CTA */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t('ctaDesc')}
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              >
                {t('ctaButton')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <FloatingSocialButtons />

      <PageSchema schemas={schemas} />
    </main>
  );
}
