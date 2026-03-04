import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'
import { siteUrl } from '@/lib/seo'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  // Title: 55 chars ES, 52 chars EN — fits Google SERP
  const title = isEs
    ? 'Diseño de Páginas Web y Automatización con IA | AION'
    : 'Web Design & AI Automation | AION Automations';
  // Description: 147 chars ES, 139 chars EN — under 155 limit
  const description = isEs
    ? 'Páginas web rápidas que convierten visitantes en clientes. Automatización y marketing con IA. Tu sitio listo en semanas. Solicita cotización hoy.'
    : 'Fast websites that turn visitors into customers. AI automation and marketing. Your site ready in weeks. Request a quote today.';
  const canonicalUrl = `${siteUrl}/${locale}`;
  // [NOTA: Crear DOS imágenes OG de 1200x630px si contienen texto — og-image-es.jpg y og-image-en.jpg]
  const ogImage = isEs ? `${siteUrl}/og-image-es.jpg` : `${siteUrl}/og-image-en.jpg`;

  const keywordsEs = [
    'páginas web',
    'automatizaciones',
    'marketing IA',
    'diseño de páginas web',
    'automatización empresarial',
    'marketing con inteligencia artificial',
    'sitios web profesionales',
    'flujos de trabajo',
    'CRM',
    'WhatsApp automatización',
  ];
  const keywordsEn = [
    'web pages',
    'automations',
    'AI marketing',
    'website design',
    'business automation',
    'artificial intelligence marketing',
    'professional websites',
    'workflows',
    'CRM',
    'WhatsApp automation',
  ];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: '%s | AION Automations',
    },
    description,
    keywords: isEs ? keywordsEs : keywordsEn,
    authors: [{ name: 'AION Automations', url: siteUrl }],
    creator: 'AION Automations',
    icons: { icon: '/favicon.png', apple: '/favicon.png' },
    manifest: '/manifest.json',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en`,
        es: `${siteUrl}/es`,
        'x-default': siteUrl,
      },
    },
    openGraph: {
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_ES',
      url: canonicalUrl,
      title,
      description,
      siteName: 'AION Automations',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#0D0B1E',
  width: 'device-width',
  initialScale: 1,
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { JsonLd } from '@/components/json-ld';
import { PageLoader } from '@/components/page-loader';
import { Starfield } from '@/components/starfield';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Google Analytics — agrega tu ID real en lugar de G-XXXXXXXXXX */}
      </head>
      <body className="font-sans antialiased">
        <JsonLd locale={locale} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          {locale === 'es' ? 'Ir al contenido' : 'Skip to content'}
        </a>
        <Starfield />
        <NextIntlClientProvider messages={messages}>
          <PageLoader />
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
