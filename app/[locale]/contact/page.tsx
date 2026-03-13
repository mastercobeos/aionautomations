import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { ContactForm } from '@/components/contact-form';
import { webPageSchema, breadcrumbSchema, siteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import {
  ArrowRight,
  MessageCircle,
  Clock,
  Mail,
  Phone,
} from 'lucide-react';

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: {
        en: `${siteUrl}/en/contact`,
        es: `${siteUrl}/es/contact`,
        "x-default": `${siteUrl}/en/contact`,
      },
    },
  };
}

/* ─── Page Component ─── */

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbContact') },
  ];

  const schemas = [
    webPageSchema({
      locale,
      title: t('metaTitle'),
      description: t('metaDesc'),
      path: '/contact',
    }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbContact'), url: `${siteUrl}/${locale}/contact` },
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

        {/* Hero + Form side by side */}
        <section className="pt-24 pb-10 md:pt-28 md:pb-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-start">
              {/* Left Column: Title + WhatsApp + Contact Info */}
              <div>
                {/* Badge */}
                <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  {t('badge')}
                </span>

                {/* H1 */}
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {t('title')}
                </h1>

                {/* Subtitle */}
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t('subtitle')}
                </p>

                {/* WhatsApp CTA Card */}
                <div className="gradient-border-static shimmer-card rounded-2xl p-5 md:p-6 mt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <MessageCircle className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {t('whatsappTitle')}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t('whatsappDesc')}
                      </p>
                    </div>
                  </div>
                  <a
                    href={siteConfig.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                  >
                    {t('whatsappButton')}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Contact details */}
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span className="text-sm text-muted-foreground">{t('emailValue')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span className="text-sm text-muted-foreground">{t('phoneValue')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span className="text-sm text-muted-foreground">{t('responseTime')}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="gradient-border-static shimmer-card rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground">
                  {t('formTitle')}
                </h2>
                <ContactForm />
              </div>
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
