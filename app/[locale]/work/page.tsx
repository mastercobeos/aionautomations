import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { InternalNav } from '@/components/internal-nav';
import { webPageSchema, breadcrumbSchema, siteUrl, ogMeta } from '@/lib/seo';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WorkPage' });

  const title = t('metaTitle');
  const description = t('metaDesc');
  const keywords = locale === 'es'
    ? ['portafolio diseño web', 'proyectos automatización', 'casos de éxito', 'soluciones digitales']
    : ['web design portfolio', 'automation projects', 'case studies', 'digital solutions'];
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}/work`,
      languages: {
        en: `${siteUrl}/en/work`,
        es: `${siteUrl}/es/work`,
        "x-default": `${siteUrl}/en/work`,
      },
    },
    ...ogMeta({ locale, title, description, path: '/work' }),
  };
}

/* ─── Projects data ─── */

const PROJECTS = [
  {
    titleKey: 'project1Title',
    descKey: 'project1Desc',
    tagKey: 'project1Tag',
    industryKey: 'project1Industry',
    locationKey: 'project1Location',
    url: 'https://axelstourspdc.com/',
  },
  {
    titleKey: 'project2Title',
    descKey: 'project2Desc',
    tagKey: 'project2Tag',
    industryKey: 'project2Industry',
    locationKey: 'project2Location',
    url: 'https://stareventrentaltx.com/',
  },
  {
    titleKey: 'project3Title',
    descKey: 'project3Desc',
    tagKey: 'project3Tag',
    industryKey: 'project3Industry',
    locationKey: 'project3Location',
    url: 'https://ahomeqroo.com/',
  },
  {
    titleKey: 'project4Title',
    descKey: 'project4Desc',
    tagKey: 'project4Tag',
    industryKey: 'project4Industry',
    locationKey: 'project4Location',
    url: null,
  },
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

        <div className="section-divider-gradient" />

        {/* Projects Grid */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <div
                  key={project.titleKey}
                  className="gradient-border-static shimmer-card group rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col"
                >
                  {/* Tags row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                      {t(project.tagKey)}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                      {t(project.industryKey)}
                    </span>
                    {!project.url && (
                      <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                        {t('inProgress')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="mt-4 text-2xl font-bold text-foreground">
                    {t(project.titleKey)}
                  </h2>

                  {/* Location */}
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                    {t(project.locationKey)}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(project.descKey)}
                  </p>

                  {/* CTA */}
                  {project.url && (
                    <div className="mt-auto pt-6">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-cyan-500/10 hover:border-cyan-500/40"
                      >
                        {t('viewProject')}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
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
