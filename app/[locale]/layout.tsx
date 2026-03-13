import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
  // Description: under 155 chars — keyword-rich for SERP
  const description = isEs
    ? 'Agencia de diseño web y automatización con IA para pymes. Páginas web profesionales, chatbots WhatsApp y marketing digital. Consulta gratis hoy.'
    : 'Web design agency & AI automation for small businesses. Custom websites, WhatsApp chatbots, and digital marketing. Free consultation today.';
  const canonicalUrl = `${siteUrl}/${locale}`;
  const ogImage = isEs ? `${siteUrl}/og-image-es.jpg` : `${siteUrl}/og-image-en.jpg`;

  const keywordsEs = [
    'diseño de páginas web',
    'agencia de automatización con IA',
    'automatización de procesos',
    'marketing con inteligencia artificial',
    'páginas web profesionales',
    'chatbot para WhatsApp',
    'agencia de diseño web',
    'automatización de negocios',
    'diseño web para pymes',
    'tienda online',
    'CRM automatización',
    'agencia de transformación digital',
    'flujos de trabajo automatizados',
    'chatbot para empresas',
    'diseño web profesional SEO',
  ];
  const keywordsEn = [
    'web design agency',
    'AI automation agency',
    'business process automation',
    'custom website design',
    'professional websites',
    'WhatsApp chatbot for business',
    'AI chatbot development',
    'small business web design',
    'workflow automation',
    'CRM automation',
    'hire web developer',
    'ecommerce website design',
    'lead generation automation',
    'AI integration services',
    'web design and SEO',
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
    icons: { icon: '/favicon.png', apple: '/apple-icon.png' },
    manifest: '/manifest.json',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en`,
        es: `${siteUrl}/es`,
        'x-default': `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_ES',
      siteName: 'AION Automations',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
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
        <meta name="msvalidate.01" content="178D0590652682BBEF864F25A14CE9CE" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6GW9VD5REP" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-6GW9VD5REP');`}
        </Script>
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
