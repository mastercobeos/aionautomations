"use client"

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Globe, Workflow, TrendingUp, ArrowRight } from 'lucide-react'

const SERVICES = [
  { icon: Globe, nameKey: 'webName' as const, rangeKey: 'webRange' as const, descKey: 'webDesc' as const },
  { icon: Workflow, nameKey: 'autoName' as const, rangeKey: 'autoRange' as const, descKey: 'autoDesc' as const },
  { icon: TrendingUp, nameKey: 'mktName' as const, rangeKey: 'mktRange' as const, descKey: 'mktDesc' as const },
]

export function PricingOverview() {
  const t = useTranslations('PricingOverview')

  return (
    <section id="pricing" className="relative py-24 md:py-32">
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

        {/* 3 Service Price Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 items-stretch">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.nameKey}
              className={`reveal reveal-delay-${i + 1} gradient-border-static shimmer-card relative flex flex-col rounded-xl p-6 md:p-8`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
                <svc.icon className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t(svc.nameKey)}</h3>
              <p className="mt-2 text-2xl font-bold text-cyan-400">{t(svc.rangeKey)}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(svc.descKey)}</p>
              <div className="mt-auto pt-6">
                <Link
                  href="/pricing"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/50 px-4 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/5 hover:border-cyan-500/30"
                >
                  {t('viewAll')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-10 text-center text-sm text-muted-foreground">
          {t('note')}
        </p>
      </div>
    </section>
  )
}
