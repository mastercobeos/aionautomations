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
      { source: '/work', destination: '/en/work', permanent: true },
      { source: '/pricing', destination: '/en/pricing', permanent: true },
      { source: '/services/automations', destination: '/en/services/automations', permanent: true },
      { source: '/services/web', destination: '/en/services/web', permanent: true },
      { source: '/services/marketing', destination: '/en/services/marketing', permanent: true },
      { source: '/about', destination: '/en/about', permanent: true },
      { source: '/contact', destination: '/en/contact', permanent: true },
      { source: '/blog', destination: '/en/blog', permanent: true },
      { source: '/industries', destination: '/en/industries', permanent: true },
      { source: '/industries/:path*', destination: '/en/industries/:path*', permanent: true },
      { source: '/blog/:path*', destination: '/en/blog/:path*', permanent: true },
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
