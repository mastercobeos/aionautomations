import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageSchema } from '@/components/page-schema'
import { FloatingSocialButtons } from '@/components/floating-social-buttons'
import { InternalNav } from '@/components/internal-nav'
import { webPageSchema, breadcrumbSchema, siteUrl } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' })

  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: {
        en: `${siteUrl}/en/privacy`,
        es: `${siteUrl}/es/privacy`,
        "x-default": `${siteUrl}/en/privacy`,
      },
    },
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' })

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbPrivacy') },
  ]

  const schemas = [
    webPageSchema({ locale, title: t('metaTitle'), description: t('metaDesc'), path: '/privacy' }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbPrivacy'), url: `${siteUrl}/${locale}/privacy` },
    ]),
  ]

  const sections = [
    { title: t('section1Title'), text: t('section1Text') },
    { title: t('section2Title'), text: t('section2Text') },
    { title: t('section3Title'), text: t('section3Text') },
    { title: t('section4Title'), text: t('section4Text') },
    { title: t('section5Title'), text: t('section5Text') },
    { title: t('section6Title'), text: t('section6Text') },
  ]

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
        <section className="mx-auto max-w-3xl px-6 pt-32 pb-16 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{t('lastUpdated')}</p>
          <p className="mt-6 text-base leading-relaxed text-foreground/85">{t('intro')}</p>

          <div className="mt-8 space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-foreground/80">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
        <InternalNav locale={locale} exclude={['/blog', '/industries']} />
        <Footer />
      </div>
      <FloatingSocialButtons />
      <PageSchema schemas={schemas} />
    </main>
  )
}
