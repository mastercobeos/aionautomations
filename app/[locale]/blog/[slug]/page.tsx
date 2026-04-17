import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { BlogToc } from '@/components/blog-toc';
import { ReadingProgress } from '@/components/reading-progress';
import { BlogShare } from '@/components/blog-share';
import { BlogTocMobile } from '@/components/blog-toc-mobile';
import { blogPostSchema, breadcrumbSchema, howToSchema, siteUrl, ogMeta } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';

/* ─── Static blog post data map ─── */

type BlogPost = { titleKey: string; date: string; dateModified: string; namespace: string; prefix: string; sections: number; links: { href: string; labelKey: string }[]; isTutorial?: boolean; tags: string[]; section: string };

const BLOG_POSTS: Record<string, BlogPost> = {
  'ai-automation-2026': { titleKey: 'post1Title', date: '2026-02-28', dateModified: '2026-04-15', namespace: 'BlogPage', prefix: 'post1', sections: 4, tags: ['AI automation', 'business automation', 'small business'], section: 'AI Automation', links: [{ href: '/services/automations', labelKey: 'linkAuto' }, { href: '/services/web', labelKey: 'linkWeb' }, { href: '/pricing', labelKey: 'linkPricing' }] },
  'website-cost-guide': { titleKey: 'post2Title', date: '2026-02-20', dateModified: '2026-04-15', namespace: 'BlogPage', prefix: 'post2', sections: 4, tags: ['web design', 'website cost', 'pricing'], section: 'Web Design', links: [{ href: '/services/web', labelKey: 'linkWeb' }, { href: '/pricing', labelKey: 'linkPricing' }, { href: '/contact', labelKey: 'linkContact' }] },
  'whatsapp-ai-automation': { titleKey: 'post3Title', date: '2026-02-12', dateModified: '2026-04-15', namespace: 'BlogPage', prefix: 'post3', sections: 4, tags: ['WhatsApp', 'AI chatbot', 'customer service'], section: 'AI Automation', links: [{ href: '/services/automations', labelKey: 'linkAuto' }, { href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/pricing', labelKey: 'linkPricing' }] },
  'local-seo-guide': { titleKey: 'post4Title', date: '2026-02-05', dateModified: '2026-04-15', namespace: 'BlogPage', prefix: 'post4', sections: 4, tags: ['local SEO', 'Google Maps', 'digital marketing'], section: 'Marketing', links: [{ href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/services/web', labelKey: 'linkWeb' }, { href: '/contact', labelKey: 'linkContact' }] },
  'ai-crm-small-business': { titleKey: 'post5Title', date: '2026-03-12', dateModified: '2026-03-13', namespace: 'BlogPage', prefix: 'post5', sections: 3, tags: ['CRM', 'AI', 'lead management', 'small business'], section: 'AI Automation', links: [{ href: '/services/automations', labelKey: 'linkAuto' }, { href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/pricing', labelKey: 'linkPricing' }] },
  'ai-marketing-small-business': { titleKey: 'post6Title', date: '2026-03-19', dateModified: '2026-03-19', namespace: 'BlogPage', prefix: 'post6', sections: 3, tags: ['AI marketing', 'small business', 'digital advertising'], section: 'Marketing', links: [{ href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/services/automations', labelKey: 'linkAuto' }, { href: '/pricing', labelKey: 'linkPricing' }] },
  'small-business-automation-ideas': { titleKey: 'post7Title', date: '2026-03-26', dateModified: '2026-03-26', namespace: 'BlogPage', prefix: 'post7', sections: 3, tags: ['automation', 'small business', 'workflow', 'productivity'], section: 'AI Automation', links: [{ href: '/services/automations', labelKey: 'linkAuto' }, { href: '/services/web', labelKey: 'linkWeb' }, { href: '/pricing', labelKey: 'linkPricing' }] },
  'choose-web-design-agency': { titleKey: 'post8Title', date: '2026-04-02', dateModified: '2026-04-02', namespace: 'BlogPage', prefix: 'post8', sections: 3, tags: ['web design agency', 'hiring', 'web development'], section: 'Web Design', links: [{ href: '/services/web', labelKey: 'linkWeb' }, { href: '/work', labelKey: 'linkWork' }, { href: '/pricing', labelKey: 'linkPricing' }] },
  'ai-chatbot-for-business': { titleKey: 'post9Title', date: '2026-04-09', dateModified: '2026-04-09', namespace: 'BlogPage', prefix: 'post9', sections: 3, isTutorial: true, tags: ['AI chatbot', 'business automation', 'customer support'], section: 'AI Automation', links: [{ href: '/services/automations', labelKey: 'linkAuto' }, { href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/contact', labelKey: 'linkContact' }] },
  'n8n-automation-tutorial': { titleKey: 'post10Title', date: '2026-04-16', dateModified: '2026-04-16', namespace: 'BlogPage', prefix: 'post10', sections: 3, isTutorial: true, tags: ['n8n', 'no-code', 'workflow automation', 'tutorial'], section: 'AI Automation', links: [{ href: '/services/automations', labelKey: 'linkAuto' }, { href: '/pricing', labelKey: 'linkPricing' }, { href: '/contact', labelKey: 'linkContact' }] },
  'lead-generation-service-business': { titleKey: 'post11Title', date: '2026-04-23', dateModified: '2026-04-23', namespace: 'BlogPage', prefix: 'post11', sections: 3, isTutorial: true, tags: ['lead generation', 'service business', 'marketing strategy'], section: 'Marketing', links: [{ href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/services/web', labelKey: 'linkWeb' }, { href: '/contact', labelKey: 'linkContact' }] },
  'ecommerce-website-guide': { titleKey: 'post12Title', date: '2026-04-30', dateModified: '2026-04-30', namespace: 'BlogPage', prefix: 'post12', sections: 3, isTutorial: true, tags: ['ecommerce', 'online store', 'web design', 'selling online'], section: 'Web Design', links: [{ href: '/services/web', labelKey: 'linkWeb' }, { href: '/pricing', labelKey: 'linkPricing' }, { href: '/contact', labelKey: 'linkContact' }] },
  'restaurant-ai-automation': { titleKey: 'post13Title', date: '2026-05-07', dateModified: '2026-05-07', namespace: 'BlogPage', prefix: 'post13', sections: 3, tags: ['restaurant', 'AI automation', 'food industry', 'ordering system'], section: 'Industries', links: [{ href: '/industries/restaurants', labelKey: 'linkRestaurants' }, { href: '/services/automations', labelKey: 'linkAuto' }, { href: '/contact', labelKey: 'linkContact' }] },
  'dental-clinic-marketing': { titleKey: 'post14Title', date: '2026-05-14', dateModified: '2026-05-14', namespace: 'BlogPage', prefix: 'post14', sections: 3, tags: ['dental clinic', 'digital marketing', 'healthcare marketing'], section: 'Industries', links: [{ href: '/industries/dental', labelKey: 'linkDental' }, { href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/contact', labelKey: 'linkContact' }] },
  'conversion-rate-optimization': { titleKey: 'post15Title', date: '2026-05-21', dateModified: '2026-05-21', namespace: 'BlogPage', prefix: 'post15', sections: 3, isTutorial: true, tags: ['CRO', 'conversion optimization', 'web design', 'UX'], section: 'Web Design', links: [{ href: '/services/web', labelKey: 'linkWeb' }, { href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/pricing', labelKey: 'linkPricing' }] },
  'social-media-automation': { titleKey: 'post16Title', date: '2026-05-28', dateModified: '2026-05-28', namespace: 'BlogPage', prefix: 'post16', sections: 3, tags: ['social media', 'automation', 'content marketing', 'AI tools'], section: 'Marketing', links: [{ href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/services/automations', labelKey: 'linkAuto' }, { href: '/contact', labelKey: 'linkContact' }] },
  'ai-email-marketing': { titleKey: 'post17Title', date: '2026-06-04', dateModified: '2026-06-04', namespace: 'BlogPage', prefix: 'post17', sections: 3, tags: ['email marketing', 'AI', 'automation', 'open rates'], section: 'Marketing', links: [{ href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/services/automations', labelKey: 'linkAuto' }, { href: '/pricing', labelKey: 'linkPricing' }] },
  'business-website-checklist': { titleKey: 'post18Title', date: '2026-06-11', dateModified: '2026-06-11', namespace: 'BlogPage', prefix: 'post18', sections: 3, isTutorial: true, tags: ['website checklist', 'web design', 'business website', 'SEO'], section: 'Web Design', links: [{ href: '/services/web', labelKey: 'linkWeb' }, { href: '/pricing', labelKey: 'linkPricing' }, { href: '/contact', labelKey: 'linkContact' }] },
  'real-estate-ai-marketing': { titleKey: 'post19Title', date: '2026-06-18', dateModified: '2026-06-18', namespace: 'BlogPage', prefix: 'post19', sections: 3, tags: ['real estate', 'AI marketing', 'lead generation', 'property'], section: 'Industries', links: [{ href: '/industries/real-estate', labelKey: 'linkRealEstate' }, { href: '/services/marketing', labelKey: 'linkMarketing' }, { href: '/contact', labelKey: 'linkContact' }] },
  'gym-fitness-automation': { titleKey: 'post20Title', date: '2026-06-25', dateModified: '2026-06-25', namespace: 'BlogPage', prefix: 'post20', sections: 3, tags: ['gym', 'fitness', 'AI automation', 'membership'], section: 'Industries', links: [{ href: '/industries/gyms', labelKey: 'linkGyms' }, { href: '/services/automations', labelKey: 'linkAuto' }, { href: '/contact', labelKey: 'linkContact' }] },
};

/* ─── Force dynamic rendering — required for next-intl getTranslations ─── */
export const dynamic = 'force-dynamic';

/* ─── Static params hint ─── */
export function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    const tPost = await getTranslations({ locale, namespace: 'BlogPostPage' });
    return { title: tPost('postNotFound') };
  }

  const t = await getTranslations({ locale, namespace: post.namespace });
  const title = t(post.titleKey);

  const description = t(post.titleKey.replace('Title', 'Desc'));
  const url = `${siteUrl}/${locale}/blog/${slug}`;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/blog/${slug}`,
        es: `${siteUrl}/es/blog/${slug}`,
        "x-default": `${siteUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      section: post.section,
      tags: post.tags,
      authors: ['AION Automations'],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      siteName: 'AION Automations',
      images: [{ url: `${siteUrl}/og-image-${locale === 'es' ? 'es' : 'en'}.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/og-image-${locale === 'es' ? 'es' : 'en'}.jpg`],
      site: '@aionautomations',
      creator: '@aionautomations',
    },
  };
}

/* ─── Page Component ─── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = BLOG_POSTS[slug];

  /* Fallback for unknown slugs */
  if (!post) {
    const tPost = await getTranslations({ locale, namespace: 'BlogPostPage' });
    return (
      <main id="main-content" className="relative min-h-screen animate-page-in">
        <div className="relative z-10">
          <Navbar />
          <section className="pt-32 pb-16 md:pt-40 md:pb-20">
            <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
              <h1 className="text-4xl font-bold text-foreground">{tPost('postNotFound')}</h1>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {tPost('backToBlog')}
              </Link>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    );
  }

  const t = await getTranslations({ locale, namespace: post.namespace });
  const tPost = await getTranslations({ locale, namespace: 'BlogPostPage' });

  const postTitle = t(post.titleKey);
  const postDesc = t(post.titleKey.replace('Title', 'Desc'));

  // Find related posts (share at least one service/industry link)
  const currentLinkHrefs = new Set(post.links.map((l) => l.href));
  const relatedSlugs = Object.entries(BLOG_POSTS)
    .filter(([s, p]) => s !== slug && p.links.some((l) => currentLinkHrefs.has(l.href)))
    .sort((a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime())
    .slice(0, 3);

  const breadcrumbItems = [
    { label: tPost('breadcrumbHome'), href: '/' },
    { label: tPost('breadcrumbBlog'), href: '/blog' },
    { label: postTitle },
  ];

  const schemas: Record<string, unknown>[] = [
    blogPostSchema({
      locale,
      title: postTitle,
      description: postDesc,
      slug,
      datePublished: post.date,
      dateModified: post.dateModified,
    }),
    breadcrumbSchema([
      { name: tPost('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: tPost('breadcrumbBlog'), url: `${siteUrl}/${locale}/blog` },
      { name: postTitle, url: `${siteUrl}/${locale}/blog/${slug}` },
    ]),
  ];

  // Add HowTo schema for tutorial posts (AI Search / voice optimization)
  if (post.isTutorial) {
    const steps = Array.from({ length: post.sections }, (_, i) => ({
      name: t(`${post.prefix}_s${i + 1}Title`),
      text: t(`${post.prefix}_s${i + 1}Text`).slice(0, 200),
    }));
    schemas.push(howToSchema({ locale, name: postTitle, description: postDesc, slug, steps }));
  }

  return (
    <main id="main-content" className="relative min-h-screen animate-page-in">
      <ReadingProgress />

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

        {/* Article */}
        <article className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-12">
            <div className="mx-auto w-full max-w-3xl xl:max-w-none xl:mx-0 min-w-0">
              {/* Back to blog link */}
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {tPost('backToBlog')}
              </Link>

              <Breadcrumbs items={breadcrumbItems} />

              {/* Post header */}
              <header className="mt-4">
                <div className="flex items-center gap-3">
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium uppercase tracking-widest text-cyan-400"
                  >
                    {t(post.titleKey.replace('Title', 'Date'))}
                  </time>
                  <span className="text-border">·</span>
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {tPost('readingTime', { minutes: Math.max(1, Math.ceil(post.sections * 1.5)) })}
                  </span>
                </div>

                <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {postTitle}
                </h1>

                <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                  {postDesc}
                </p>
              </header>

              {/* Divider */}
              <div className="my-10 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

              {/* Article content */}
              <div className="prose prose-invert prose-cyan max-w-none text-foreground">
                {Array.from({ length: post.sections }, (_, i) => {
                  const headingId = `${post.prefix}-s${i + 1}`;
                  return (
                    <section key={i} className={i > 0 ? 'mt-10 scroll-mt-28' : 'scroll-mt-28'}>
                      <h2 id={headingId} className="text-2xl font-bold text-foreground sm:text-3xl scroll-mt-28">
                        {t(`${post.prefix}_s${i + 1}Title`)}
                      </h2>
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        {t(`${post.prefix}_s${i + 1}Text`)}
                      </p>
                    </section>
                  );
                })}

                {/* Internal links */}
                <div className="mt-12 rounded-xl border border-border/50 bg-white/[0.02] p-6">
                  <p className="text-sm font-semibold text-foreground">
                    {tPost('relatedLinks')}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {post.links.map((link, i) => (
                      <span key={link.href} className="contents">
                        {i > 0 && <span className="text-border">·</span>}
                        <Link href={link.href} className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                          {tPost(link.labelKey)}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share buttons */}
                <BlogShare title={postTitle} slug={slug} />
              </div>
            </div>

            {/* Sticky TOC (xl+) */}
            <BlogToc
              sections={Array.from({ length: post.sections }, (_, i) => ({
                id: `${post.prefix}-s${i + 1}`,
                title: t(`${post.prefix}_s${i + 1}Title`),
              }))}
            />
          </div>
        </article>

        {/* Mobile TOC (below xl) */}
        <BlogTocMobile
          sections={Array.from({ length: post.sections }, (_, i) => ({
            id: `${post.prefix}-s${i + 1}`,
            title: t(`${post.prefix}_s${i + 1}Title`),
          }))}
        />

        {/* Related Posts */}
        {relatedSlugs.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <h2 className="text-xl font-bold text-foreground">{tPost('relatedTitle')}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {relatedSlugs.map(([relSlug, relPost]) => (
                  <Link
                    key={relSlug}
                    href={`/blog/${relSlug}`}
                    className="group rounded-xl border border-border/50 bg-white/[0.02] p-4 transition-all hover:border-cyan-500/30 hover:bg-white/[0.04]"
                  >
                    <time dateTime={relPost.date} className="text-xs text-muted-foreground">
                      {t(relPost.titleKey.replace('Title', 'Date'))}
                    </time>
                    <p className="mt-2 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {t(relPost.titleKey)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="section-divider-gradient" />

        {/* Bottom CTA Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {tPost('ctaTitle')}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {tPost('ctaDesc')}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/blog"
                className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              >
                {tPost('ctaButton')}
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
