import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { RoiCalculator } from '@/components/roi-calculator';
import { webPageSchema, breadcrumbSchema, siteUrl, ogMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RoiCalculatorPage' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  const keywords = locale === 'es'
    ? ['calculadora roi automatización', 'cuánto gano con automatización', 'roi marketing digital', 'calcular ventas perdidas']
    : ['automation roi calculator', 'sales automation roi', 'business automation calculator', 'lead conversion calculator'];
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}/roi-calculator`,
      languages: {
        en: `${siteUrl}/en/roi-calculator`,
        es: `${siteUrl}/es/roi-calculator`,
        "x-default": `${siteUrl}/en/roi-calculator`,
      },
    },
    ...ogMeta({ locale, title, description, path: '/roi-calculator' }),
  };
}

export default async function RoiCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RoiCalculatorPage' });

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbTool') },
  ];

  const schemas = [
    webPageSchema({
      locale,
      title: t('metaTitle'),
      description: t('metaDesc'),
      path: '/roi-calculator',
    }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbTool'), url: `${siteUrl}/${locale}/roi-calculator` },
    ]),
  ];

  return (
    <main id="main-content" className="relative min-h-screen animate-page-in">
      <div className="cosmic-bg" aria-hidden="true">
        <div className="cosmic-bg-base" />
        <div className="cosmic-stars" />
        <div className="cosmic-nebula-1" />
        <div className="cosmic-nebula-2" />
        <div className="cosmic-nebula-3" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="pt-32 pb-10 md:pt-40 md:pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                {t('badge')}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t('title')}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <RoiCalculator locale={locale} />
          </div>
        </section>

        <Footer />
      </div>

      <FloatingSocialButtons />
      <PageSchema schemas={schemas} />
    </main>
  );
}
