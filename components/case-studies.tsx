"use client"

import { useTranslations } from 'next-intl';
import { MousePointerClick, Users, Clock } from 'lucide-react';

const BENEFITS = [
  { icon: MousePointerClick, labelKey: 'metric1Label', descKey: 'metric1Desc' },
  { icon: Users, labelKey: 'metric2Label', descKey: 'metric2Desc' },
  { icon: Clock, labelKey: 'metric3Label', descKey: 'metric3Desc' },
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

        {/* Benefit Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <div
              key={benefit.labelKey}
              className={`reveal reveal-delay-${i + 1} gradient-border-static shimmer-card rounded-2xl p-8 text-center md:p-12`}
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)]">
                <benefit.icon className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t(benefit.labelKey)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(benefit.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
