"use client"

import { useTranslations } from 'next-intl'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { openModalEvent } from './global-modals'

export function AboutUsPreview() {
  const t = useTranslations('AboutPreview')

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ]

  const promises = [
    t('promise1'),
    t('promise2'),
    t('promise3'),
  ]

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {t('badge')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
        </div>

        {/* Stats Row */}
        <div className="reveal reveal-delay-1 mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="gradient-border-static shimmer-card rounded-2xl p-6 text-center"
            >
              <p className="text-3xl font-bold text-cyan-400 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Promises */}
        <ul className="reveal reveal-delay-2 mt-10 mx-auto max-w-xl space-y-3 list-none p-0">
          {promises.map((promise) => (
            <li key={promise} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
              <span className="text-base text-foreground/85">{promise}</span>
            </li>
          ))}
        </ul>

        {/* CTA to open About modal */}
        <div className="reveal mt-10 text-center">
          <button
            onClick={() => openModalEvent('about')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-all hover:text-cyan-300 cursor-pointer"
          >
            {t('learnMore')}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
