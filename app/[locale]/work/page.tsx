import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { InternalNav } from '@/components/internal-nav';
import { webPageSchema, breadcrumbSchema, siteUrl } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WorkPage' });

  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: `${siteUrl}/${locale}/work`,
      languages: {
        en: `${siteUrl}/en/work`,
        es: `${siteUrl}/es/work`,
      },
    },
  };
}

/* ─── Solutions data ─── */

const SOLUTIONS = [
  { titleKey: 'solution1Title', descKey: 'solution1Desc', tagKey: 'solution1Tag' },
  { titleKey: 'solution2Title', descKey: 'solution2Desc', tagKey: 'solution2Tag' },
  { titleKey: 'solution3Title', descKey: 'solution3Desc', tagKey: 'solution3Tag' },
  { titleKey: 'solution4Title', descKey: 'solution4Desc', tagKey: 'solution4Tag' },
  { titleKey: 'solution5Title', descKey: 'solution5Desc', tagKey: 'solution5Tag' },
  { titleKey: 'solution6Title', descKey: 'solution6Desc', tagKey: 'solution6Tag' },
] as const;

/* ─── Page Component ─── */

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WorkPage' });

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbWork') },
  ];

  const schemas = [
    webPageSchema({
      locale,
      title: t('metaTitle'),
      description: t('metaDesc'),
      path: '/work',
    }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbWork'), url: `${siteUrl}/${locale}/work` },
    ]),
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

        {/* Hero / Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                {t('badge')}
              </span>

              {/* H1 */}
              <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t('title')}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider-gradient" />

        {/* Solutions Grid */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SOLUTIONS.map((sol) => (
                <div
                  key={sol.titleKey}
                  className="gradient-border-static shimmer-card group rounded-2xl p-6 md:p-8 transition-all duration-300"
                >
                  {/* Tag badge */}
                  <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                    {t(sol.tagKey)}
                  </span>

                  {/* Title */}
                  <h2 className="mt-4 text-xl font-semibold text-foreground">
                    {t(sol.titleKey)}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(sol.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider-gradient" />

        {/* Bottom CTA Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t('ctaDesc')}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              >
                {t('ctaButton')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <InternalNav locale={locale} exclude={['/blog']} />
        <Footer />
      </div>

      <FloatingSocialButtons />

      <PageSchema schemas={schemas} />
    </main>
  );
}
