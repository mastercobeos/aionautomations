import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-intl'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Silencia el warning de webpack cache con next-intl (dynamic import en extractor)
  webpack: (config, { dev }) => {
    if (dev) config.infrastructureLogging = { level: 'error' };
    return config;
  },
  async redirects() {
    return [
      // Root → default locale
      { source: '/', destination: '/en', permanent: true },
      // Pages without locale prefix → /en/*
      { source: '/work', destination: '/en/work', permanent: true },
      { source: '/pricing', destination: '/en/pricing', permanent: true },
      { source: '/services', destination: '/en/services/web', permanent: true },
      { source: '/services/automations', destination: '/en/services/automations', permanent: true },
      { source: '/services/web', destination: '/en/services/web', permanent: true },
      { source: '/services/marketing', destination: '/en/services/marketing', permanent: true },
      { source: '/about', destination: '/en/about', permanent: true },
      { source: '/contact', destination: '/en/contact', permanent: true },
      { source: '/blog', destination: '/en/blog', permanent: true },
      { source: '/industries', destination: '/en/industries', permanent: true },
      { source: '/privacy', destination: '/en/privacy', permanent: true },
      { source: '/terms', destination: '/en/terms', permanent: true },
      // Wildcard catches for nested routes
      { source: '/industries/:path*', destination: '/en/industries/:path*', permanent: true },
      { source: '/blog/:path*', destination: '/en/blog/:path*', permanent: true },
      { source: '/services/:path*', destination: '/en/services/:path*', permanent: true },
      // Spanish-style URLs → /es/* (paths are in English internally)
      { source: '/servicios/automatizacion', destination: '/es/services/automations', permanent: true },
      { source: '/servicios/automatizaciones', destination: '/es/services/automations', permanent: true },
      { source: '/servicios/web', destination: '/es/services/web', permanent: true },
      { source: '/servicios/marketing', destination: '/es/services/marketing', permanent: true },
      { source: '/servicios', destination: '/es/services/web', permanent: true },
      { source: '/servicios/:path*', destination: '/es/services/:path*', permanent: true },
      { source: '/industrias', destination: '/es/industries', permanent: true },
      { source: '/industrias/:path*', destination: '/es/industries/:path*', permanent: true },
      { source: '/nosotros', destination: '/es/about', permanent: true },
      { source: '/contacto', destination: '/es/contact', permanent: true },
      { source: '/precios', destination: '/es/pricing', permanent: true },
      { source: '/trabajo', destination: '/es/work', permanent: true },
      { source: '/privacidad', destination: '/es/privacy', permanent: true },
      { source: '/terminos', destination: '/es/terms', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
