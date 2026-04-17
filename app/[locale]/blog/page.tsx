import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { webPageSchema, breadcrumbSchema, collectionPageSchema, siteUrl, ogMeta } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';
import { BlogListFiltered, type BlogPostItem } from '@/components/blog-list-filtered';

/* ─── Static blog post data ─── */

const BLOG_POSTS: BlogPostItem[] = [
  { slug: 'ai-automation-2026', titleKey: 'post1Title', descKey: 'post1Desc', dateKey: 'post1Date', section: 'AI Automation' },
  { slug: 'website-cost-guide', titleKey: 'post2Title', descKey: 'post2Desc', dateKey: 'post2Date', section: 'Web Design' },
  { slug: 'whatsapp-ai-automation', titleKey: 'post3Title', descKey: 'post3Desc', dateKey: 'post3Date', section: 'AI Automation' },
  { slug: 'local-seo-guide', titleKey: 'post4Title', descKey: 'post4Desc', dateKey: 'post4Date', section: 'Marketing' },
  { slug: 'ai-crm-small-business', titleKey: 'post5Title', descKey: 'post5Desc', dateKey: 'post5Date', section: 'AI Automation' },
  { slug: 'ai-marketing-small-business', titleKey: 'post6Title', descKey: 'post6Desc', dateKey: 'post6Date', section: 'Marketing' },
  { slug: 'small-business-automation-ideas', titleKey: 'post7Title', descKey: 'post7Desc', dateKey: 'post7Date', section: 'AI Automation' },
  { slug: 'choose-web-design-agency', titleKey: 'post8Title', descKey: 'post8Desc', dateKey: 'post8Date', section: 'Web Design' },
  { slug: 'ai-chatbot-for-business', titleKey: 'post9Title', descKey: 'post9Desc', dateKey: 'post9Date', section: 'AI Automation' },
  { slug: 'n8n-automation-tutorial', titleKey: 'post10Title', descKey: 'post10Desc', dateKey: 'post10Date', section: 'AI Automation' },
  { slug: 'lead-generation-service-business', titleKey: 'post11Title', descKey: 'post11Desc', dateKey: 'post11Date', section: 'Marketing' },
  { slug: 'ecommerce-website-guide', titleKey: 'post12Title', descKey: 'post12Desc', dateKey: 'post12Date', section: 'Web Design' },
  { slug: 'restaurant-ai-automation', titleKey: 'post13Title', descKey: 'post13Desc', dateKey: 'post13Date', section: 'Industries' },
  { slug: 'dental-clinic-marketing', titleKey: 'post14Title', descKey: 'post14Desc', dateKey: 'post14Date', section: 'Industries' },
  { slug: 'conversion-rate-optimization', titleKey: 'post15Title', descKey: 'post15Desc', dateKey: 'post15Date', section: 'Web Design' },
  { slug: 'social-media-automation', titleKey: 'post16Title', descKey: 'post16Desc', dateKey: 'post16Date', section: 'Marketing' },
  { slug: 'ai-email-marketing', titleKey: 'post17Title', descKey: 'post17Desc', dateKey: 'post17Date', section: 'Marketing' },
  { slug: 'business-website-checklist', titleKey: 'post18Title', descKey: 'post18Desc', dateKey: 'post18Date', section: 'Web Design' },
  { slug: 'real-estate-ai-marketing', titleKey: 'post19Title', descKey: 'post19Desc', dateKey: 'post19Date', section: 'Industries' },
  { slug: 'gym-fitness-automation', titleKey: 'post20Title', descKey: 'post20Desc', dateKey: 'post20Date', section: 'Industries' },
];

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  const title = t('metaTitle');
  const description = t('metaDesc');
  const keywords = locale === 'es'
    ? ['blog diseño web', 'artículos automatización IA', 'guías marketing digital', 'recursos para pymes']
    : ['web design blog', 'AI automation articles', 'digital marketing guides', 'small business resources'];
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        en: `${siteUrl}/en/blog`,
        es: `${siteUrl}/es/blog`,
        "x-default": `${siteUrl}/en/blog`,
      },
    },
    ...ogMeta({ locale, title, description, path: '/blog' }),
  };
}

/* ─── Page Component ─── */

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbBlog') },
  ];

  const schemas = [
    collectionPageSchema({
      locale,
      title: t('metaTitle'),
      description: t('metaDesc'),
      path: '/blog',
      items: BLOG_POSTS.map((post) => ({
        name: t(post.titleKey),
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
      })),
    }),
    breadcrumbSchema([
      { name: t('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: t('breadcrumbBlog'), url: `${siteUrl}/${locale}/blog` },
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

        {/* Blog Posts Grid */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlogListFiltered posts={BLOG_POSTS} />
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
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              >
                {t('ctaButton')}
                <ArrowRight className="h-4 w-4" />
              </a>
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
