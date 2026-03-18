"use client"

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ExternalLink, ArrowRight, Construction } from 'lucide-react';
import { Link } from '@/i18n/routing';

const PROJECTS = [
  { titleKey: 'project1Title', descKey: 'project1Desc', tagKey: 'project1Tag', industryKey: 'project1Industry', url: 'https://axelstourspdc.com/', image: '/project-axels.png' },
  { titleKey: 'project2Title', descKey: 'project2Desc', tagKey: 'project2Tag', industryKey: 'project2Industry', url: 'https://stareventrentaltx.com/', image: '/project-star.png' },
  { titleKey: 'project3Title', descKey: 'project3Desc', tagKey: 'project3Tag', industryKey: 'project3Industry', url: 'https://ahomeqroo.com/', image: '/project-ahome.png' },
  { titleKey: 'project4Title', descKey: 'project4Desc', tagKey: 'project4Tag', industryKey: 'project4Industry', url: null, image: null },
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
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <div
              key={project.titleKey}
              className={`reveal reveal-delay-${Math.min(i + 1, 3)} gradient-border-static shimmer-card rounded-2xl overflow-hidden flex flex-col`}
            >
              {/* Site Preview */}
              <div className="relative w-full overflow-hidden bg-black/40 border-b border-white/10">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/10">
                  <div className="h-2 w-2 rounded-full bg-red-500/60" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                  <div className="h-2 w-2 rounded-full bg-green-500/60" />
                  <div className="ml-2 flex-1 h-4 rounded-full bg-white/10 flex items-center px-2">
                    <span className="text-[9px] text-white/30 truncate">
                      {project.url ? project.url.replace('https://', '') : '...'}
                    </span>
                  </div>
                </div>

                {/* Screenshot or placeholder */}
                {project.image ? (
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={project.image}
                      alt={t(project.titleKey)}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center aspect-[16/9] bg-gradient-to-br from-yellow-500/5 to-transparent">
                    <div className="text-center">
                      <Construction className="h-8 w-8 text-yellow-400/50 mx-auto mb-2" />
                      <span className="text-xs text-yellow-400/60 font-medium">{t('inProgress')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-1">
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
                <h3 className="mt-2.5 text-lg font-bold text-foreground">
                  {t(project.titleKey)}
                </h3>

                {/* Description */}
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
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
