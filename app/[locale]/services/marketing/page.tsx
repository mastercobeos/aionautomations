import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Check, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FaqAccordion } from '@/components/faq-accordion';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { InternalNav } from '@/components/internal-nav';
import { webPageSchema, breadcrumbSchema, faqSchema, siteUrl, ogMeta, serviceOfferSchema } from '@/lib/seo';
import { Link } from '@/i18n/routing';

const NAMESPACE = 'MarketingServicePage';
const PATH = '/services/marketing';

const TIERS = [
  {
    nameKey: 'starterName',
    priceKey: 'starterPrice',
    descKey: 'starterDesc',
    featKeys: ['starterFeat1', 'starterFeat2', 'starterFeat3', 'starterFeat4', 'starterFeat5'],
    highlighted: false,
  },
  {
    nameKey: 'growthName',
    priceKey: 'growthPrice',
    descKey: 'growthDesc',
    featKeys: ['growthFeat1', 'growthFeat2', 'growthFeat3', 'growthFeat4', 'growthFeat5', 'growthFeat6', 'growthFeat7'],
    highlighted: true,
  },
  {
    nameKey: 'enterpriseName',
    priceKey: 'enterprisePrice',
    descKey: 'enterpriseDesc',
    featKeys: ['enterpriseFeat1', 'enterpriseFeat2', 'enterpriseFeat3', 'enterpriseFeat4', 'enterpriseFeat5', 'enterpriseFeat6', 'enterpriseFeat7'],
    highlighted: false,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NAMESPACE });
  const title = t('metaTitle');
  const description = t('metaDesc');
  const keywords = locale === 'es'
    ? ['marketing con IA', 'agencia marketing digital', 'automatización redes sociales', 'email marketing IA', 'servicios SEO']
    : ['AI marketing', 'digital marketing agency', 'social media automation', 'email marketing AI', 'SEO services'];
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}${PATH}`,
      languages: { en: `${siteUrl}/en${PATH}`, es: `${siteUrl}/es${PATH}`, "x-default": `${siteUrl}/en${PATH}` },
    },
    ...ogMeta({ locale, title, description, path: PATH }),
  };
}

export default async function MarketingServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NAMESPACE });

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbServices'), href: '/pricing' },
    { label: t('breadcrumbCurrent') },
  ];

  const faqItems = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
  ];

  const schemas = [
    webPageSchema({ locale, title: t('metaTitle'), description: t('metaDesc'), path: PATH }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbServices'), url: `${siteUrl}/${locale}/pricing` },
      { name: t('breadcrumbCurrent'), url: `${siteUrl}/${locale}${PATH}` },
    ]),
    faqSchema(faqItems),
    serviceOfferSchema({
      locale,
      serviceName: t('metaTitle'),
      description: t('metaDesc'),
      path: PATH,
      tiers: TIERS.map((tier) => ({ name: t(tier.nameKey), price: t(tier.priceKey) })),
    }),
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

        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3 items-stretch">
              {TIERS.map((tier) => (
                <div
                  key={tier.nameKey}
                  className={`${
                    tier.highlighted
                      ? 'gradient-border-card shadow-[0_0_80px_rgba(115,120,255,0.12)] hover:shadow-[0_0_120px_rgba(115,120,255,0.18)]'
                      : 'gradient-border-static shimmer-card'
                  } relative flex flex-col rounded-xl p-6 md:p-8 transition-all duration-300`}
                >
                  {tier.highlighted && (
                    <div className="mb-3 flex justify-center">
                      <span className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_20px_rgba(34,212,254,0.3)]">
                        {t('mostPopular')}
                      </span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-foreground">{t(tier.nameKey)}</h2>
                  <p className="mt-2 text-3xl font-bold text-foreground">{t(tier.priceKey)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(tier.descKey)}</p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {tier.featKeys.map((featKey) => (
                      <li key={featKey} className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10">
                          <Check className="h-3 w-3 text-cyan-400" />
                        </div>
                        <span className="text-sm text-foreground">{t(featKey)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Link
                      href="/contact"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                        tier.highlighted
                          ? 'btn-glow bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-[1.01]'
                          : 'border border-border/50 text-foreground hover:bg-white/5 hover:border-cyan-500/30'
                      }`}
                    >
                      {t('getStarted')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-muted-foreground">{t('note')}</p>
          </div>
        </section>

        <div className="section-divider-gradient" />
        <FaqAccordion items={faqItems} title={t('faqTitle')} />
        <div className="section-divider-gradient" />

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

        <InternalNav locale={locale} exclude={['/services/marketing']} />
        <Footer />
      </div>

      <FloatingSocialButtons />
      <PageSchema schemas={schemas} />
    </main>
  );
}
