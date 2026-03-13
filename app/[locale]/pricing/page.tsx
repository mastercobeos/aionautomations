import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Globe, Workflow, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FaqAccordion } from '@/components/faq-accordion';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { webPageSchema, breadcrumbSchema, faqSchema, siteUrl } from '@/lib/seo';
import { Link } from '@/i18n/routing';

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PricingPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: `${siteUrl}/${locale}/pricing`,
      languages: { en: `${siteUrl}/en/pricing`, es: `${siteUrl}/es/pricing`, "x-default": `${siteUrl}/en/pricing` },
    },
  };
}

/* ─── Service overview config ─── */

const SERVICES = [
  {
    icon: Globe,
    nameKey: 'webName',
    rangeKey: 'webRange',
    descKey: 'webDesc',
    hrefKey: 'webHref',
  },
  {
    icon: Workflow,
    nameKey: 'autoName',
    rangeKey: 'autoRange',
    descKey: 'autoDesc',
    hrefKey: 'autoHref',
  },
  {
    icon: TrendingUp,
    nameKey: 'mktName',
    rangeKey: 'mktRange',
    descKey: 'mktDesc',
    hrefKey: 'mktHref',
  },
];

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

        {/* 3 Service Overview Cards */}
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3 items-stretch">
              {SERVICES.map((svc) => (
                <div
                  key={svc.nameKey}
                  className="gradient-border-static shimmer-card relative flex flex-col rounded-xl p-6 md:p-8 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] mb-5">
                    <svc.icon className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
                  </div>

                  {/* Name */}
                  <h2 className="text-xl font-bold text-foreground">
                    {t(svc.nameKey)}
                  </h2>

                  {/* Price range */}
                  <p className="mt-2 text-2xl font-bold text-cyan-400">
                    {t(svc.rangeKey)}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(svc.descKey)}
                  </p>

                  {/* CTA */}
                  <div className="mt-auto pt-6">
                    <Link
                      href={t(svc.hrefKey) as '/services/web' | '/services/automations' | '/services/marketing'}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/50 px-4 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/5 hover:border-cyan-500/30"
                    >
                      {t('viewPackages')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
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
