"use client"

import { useTranslations } from 'next-intl';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const PROJECTS = [
  { titleKey: 'project1Title', descKey: 'project1Desc', tagKey: 'project1Tag', industryKey: 'project1Industry', url: 'https://axelstourspdc.com/' },
  { titleKey: 'project2Title', descKey: 'project2Desc', tagKey: 'project2Tag', industryKey: 'project2Industry', url: 'https://stareventrentaltx.com/' },
  { titleKey: 'project3Title', descKey: 'project3Desc', tagKey: 'project3Tag', industryKey: 'project3Industry', url: 'https://ahomeqroo.com/' },
  { titleKey: 'project4Title', descKey: 'project4Desc', tagKey: 'project4Tag', industryKey: 'project4Industry', url: null },
]

export function CaseStudies() {
  const t = useTranslations('CaseStudies');

  return (
    <section id="case-studies" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {t('subtitle')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl gradient-text-animated">
            {t('title')}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
        </div>

        {/* Project Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project, i) => (
            <div
              key={project.titleKey}
              className={`reveal reveal-delay-${i + 1} gradient-border-static shimmer-card rounded-2xl p-6 flex flex-col`}
            >
              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-medium text-cyan-400">
                  {t(project.tagKey)}
                </span>
                <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-medium text-purple-400">
                  {t(project.industryKey)}
                </span>
                {!project.url && (
                  <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-medium text-yellow-400">
                    {t('inProgress')}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="mt-3 text-lg font-bold text-foreground">
                {t(project.titleKey)}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(project.descKey)}
              </p>

              {/* Link */}
              {project.url && (
                <div className="mt-auto pt-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    {t('viewProject')}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-cyan-400"
          >
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
