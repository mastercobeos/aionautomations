"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { BlogFilter } from "@/components/blog-filter";

export interface BlogPostItem {
  slug: string;
  titleKey: string;
  descKey: string;
  dateKey: string;
  section: string;
}

const CATEGORIES = ["AI Automation", "Web Design", "Marketing", "Industries"];

export function BlogListFiltered({ posts }: { posts: BlogPostItem[] }) {
  const t = useTranslations("BlogPage");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? posts.filter((p) => p.section === activeFilter)
    : posts;

  return (
    <>
      <BlogFilter
        categories={CATEGORIES}
        active={activeFilter}
        onFilter={setActiveFilter}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="gradient-border-static shimmer-card group rounded-2xl p-6 md:p-8 transition-all duration-300 block"
          >
            <time className="text-xs font-medium uppercase tracking-widest text-cyan-400">
              {t(post.dateKey)}
            </time>
            <h2 className="mt-3 text-xl font-semibold text-foreground group-hover:text-cyan-400 transition-colors duration-300">
              {t(post.titleKey)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(post.descKey)}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
              {t("readMore")} <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
