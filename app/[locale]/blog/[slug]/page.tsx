import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageSchema } from '@/components/page-schema';
import { FloatingSocialButtons } from '@/components/floating-social-buttons';
import { blogPostSchema, breadcrumbSchema, siteUrl } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';

/* ─── Static blog post data map ─── */

const BLOG_POSTS: Record<string, { titleKey: string; date: string; namespace: string }> = {
  'ai-automation-2026': { titleKey: 'post1Title', date: '2026-02-28', namespace: 'BlogPage' },
  'website-cost-guide': { titleKey: 'post2Title', date: '2026-02-20', namespace: 'BlogPage' },
  'whatsapp-ai-automation': { titleKey: 'post3Title', date: '2026-02-12', namespace: 'BlogPage' },
  'local-seo-guide': { titleKey: 'post4Title', date: '2026-02-05', namespace: 'BlogPage' },
};

/* ─── Static params for SSG ─── */

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

  if (!post) return { title: 'Post not found' };

  const t = await getTranslations({ locale, namespace: post.namespace });
  const title = t(post.titleKey);

  return {
    title: `${title} | AION Blog`,
    description: t(post.titleKey.replace('Title', 'Desc')),
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      languages: {
        en: `${siteUrl}/en/blog/${slug}`,
        es: `${siteUrl}/es/blog/${slug}`,
      },
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
    return (
      <main id="main-content" className="relative min-h-screen animate-page-in">
        <div className="relative z-10">
          <Navbar />
          <section className="pt-32 pb-16 md:pt-40 md:pb-20">
            <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
              <h1 className="text-4xl font-bold text-foreground">Post not found</h1>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to blog
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

  const breadcrumbItems = [
    { label: tPost('breadcrumbHome'), href: '/' },
    { label: tPost('breadcrumbBlog'), href: '/blog' },
    { label: postTitle },
  ];

  const schemas = [
    blogPostSchema({
      locale,
      title: postTitle,
      description: postDesc,
      slug,
      datePublished: post.date,
    }),
    breadcrumbSchema([
      { name: tPost('breadcrumbHome'), url: `${siteUrl}/${locale}` },
      { name: tPost('breadcrumbBlog'), url: `${siteUrl}/${locale}/blog` },
      { name: postTitle, url: `${siteUrl}/${locale}/blog/${slug}` },
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

        {/* Article */}
        <article className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
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
              <time
                dateTime={post.date}
                className="text-xs font-medium uppercase tracking-widest text-cyan-400"
              >
                {t(post.titleKey.replace('Title', 'Date'))}
              </time>

              <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {postTitle}
              </h1>

              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                {postDesc}
              </p>
            </header>

            {/* Divider */}
            <div className="my-10 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            {/* Placeholder article content */}
            <div className="prose prose-invert prose-cyan max-w-none text-foreground">
              <p className="text-muted-foreground leading-relaxed">
                {tPost('placeholderParagraph1')}
              </p>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                {tPost('placeholderParagraph2')}
              </p>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                {tPost('placeholderParagraph3')}
              </p>
            </div>
          </div>
        </article>

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
