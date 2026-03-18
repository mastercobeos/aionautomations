import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { webPageSchema, breadcrumbSchema, collectionPageSchema, siteUrl, ogMeta } from '@/lib/seo';
import {
  ArrowRight,
  Stethoscope,
  Building2,
  UtensilsCrossed,
  MapPin,
  Dumbbell,
  Scissors,
  GraduationCap,
  PawPrint,
  Scale,
  Hotel,
} from 'lucide-react';

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IndustriesPage' });

  const title = t('metaTitle');
  const description = t('metaDesc');
  const keywords = locale === 'es'
    ? ['web por industria', 'automatización por sector', 'diseño web dentistas', 'web restaurantes', 'web inmobiliarias']
    : ['industry web design', 'sector automation', 'dental websites', 'restaurant websites', 'real estate websites'];
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}/industries`,
      languages: {
        en: `${siteUrl}/en/industries`,
        es: `${siteUrl}/es/industries`,
        "x-default": `${siteUrl}/en/industries`,
      },
    },
    ...ogMeta({ locale, title, description, path: '/industries' }),
  };
}

/* ─── Industry data ─── */

const INDUSTRIES = [
  {
    key: 'restaurants',
    icon: UtensilsCrossed,
    titleKey: 'restaurantsTitle' as const,
    descKey: 'restaurantsDesc' as const,
    href: '/industries/restaurants',
  },
  {
    key: 'dental',
    icon: Stethoscope,
    titleKey: 'dentalTitle' as const,
    descKey: 'dentalDesc' as const,
    href: '/industries/dental',
  },
  {
    key: 'realEstate',
    icon: Building2,
    titleKey: 'realEstateTitle' as const,
    descKey: 'realEstateDesc' as const,
    href: '/industries/real-estate',
  },
  {
    key: 'salons',
    icon: Scissors,
    titleKey: 'salonsTitle' as const,
    descKey: 'salonsDesc' as const,
    href: '/industries/salons',
  },
  {
    key: 'gyms',
    icon: Dumbbell,
    titleKey: 'gymsTitle' as const,
    descKey: 'gymsDesc' as const,
    href: '/industries/gyms',
  },
  {
    key: 'hotels',
    icon: Hotel,
    titleKey: 'hotelsTitle' as const,
    descKey: 'hotelsDesc' as const,
    href: '/industries/hotels',
  },
  {
    key: 'tours',
    icon: MapPin,
    titleKey: 'toursTitle' as const,
    descKey: 'toursDesc' as const,
    href: '/industries/tours',
  },
  {
    key: 'vets',
    icon: PawPrint,
    titleKey: 'vetsTitle' as const,
    descKey: 'vetsDesc' as const,
    href: '/industries/vets',
  },
  {
    key: 'schools',
    icon: GraduationCap,
    titleKey: 'schoolsTitle' as const,
    descKey: 'schoolsDesc' as const,
    href: '/industries/schools',
  },
  {
    key: 'legal',
    icon: Scale,
    titleKey: 'legalTitle' as const,
    descKey: 'legalDesc' as const,
    href: '/industries/legal',
  },
] as const;

/* ─── Page Component ─── */

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IndustriesPage' });

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbIndustries') },
  ];

  const schemas = [
    collectionPageSchema({
      locale,
      title: t('metaTitle'),
      description: t('metaDesc'),
      path: '/industries',
      items: INDUSTRIES.map((ind) => ({
        name: t(ind.titleKey),
        url: `${siteUrl}/${locale}${ind.href}`,
      })),
    }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbIndustries'), url: `${siteUrl}/${locale}/industries` },
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

        {/* Industry Cards Grid */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {INDUSTRIES.map((industry, i) => (
                <Link
                  key={industry.key}
                  href={industry.href}
                  className={`gradient-border-static shimmer-card group rounded-2xl p-6 md:p-8 transition-all duration-300 block`}
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] mb-5 transition-colors duration-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40">
                    <industry.icon className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-foreground">
                    {t(industry.titleKey)}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(industry.descKey)}
                  </p>

                  {/* Arrow link hint */}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    {t('learnMore')} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
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

        <Footer />
      </div>

      <FloatingSocialButtons />

      <PageSchema schemas={schemas} />
    </main>
  );
}
