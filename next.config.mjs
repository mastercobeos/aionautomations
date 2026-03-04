import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-intl'],
  // Silencia el warning de webpack cache con next-intl (dynamic import en extractor)
  webpack: (config, { dev }) => {
    if (dev) config.infrastructureLogging = { level: 'error' };
    return config;
  },
};

export default withNextIntl(nextConfig);
