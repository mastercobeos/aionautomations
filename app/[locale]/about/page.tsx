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
import { ArrowRight, BarChart3, Zap, Cpu, HeadphonesIcon } from 'lucide-react';

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: {
        en: `${siteUrl}/en/about`,
        es: `${siteUrl}/es/about`,
      },
    },
  };
}

/* ─── Values data ─── */

const VALUES = [
  { titleKey: 'value1Title', descKey: 'value1Desc', icon: BarChart3 },
  { titleKey: 'value2Title', descKey: 'value2Desc', icon: Zap },
  { titleKey: 'value3Title', descKey: 'value3Desc', icon: Cpu },
  { titleKey: 'value4Title', descKey: 'value4Desc', icon: HeadphonesIcon },
] as const;

/* ─── Page Component ─── */

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbAbout') },
  ];

  const schemas = [
    webPageSchema({
      locale,
      title: t('metaTitle'),
      description: t('metaDesc'),
      path: '/about',
    }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbAbout'), url: `${siteUrl}/${locale}/about` },
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

        {/* Mission & Vision Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Mission */}
              <div className="gradient-border-static shimmer-card rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {t('missionTitle')}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t('missionDesc')}
                </p>
              </div>

              {/* Vision */}
              <div className="gradient-border-static shimmer-card rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {t('visionTitle')}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t('visionDesc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider-gradient" />

        {/* Values Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t('valuesTitle')}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t('valuesSubtitle')}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {VALUES.map((value) => (
                <div
                  key={value.titleKey}
                  className="gradient-border-static shimmer-card group rounded-2xl p-6 md:p-8 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] mb-5 transition-colors duration-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40">
                    <value.icon className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(value.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(value.descKey)}
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
