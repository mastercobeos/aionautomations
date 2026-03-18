"use client"

import { useState } from "react"
import { Globe, Workflow, TrendingUp, Check, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

type ServiceTab = "web" | "auto" | "mkt"

const TABS: { key: ServiceTab; icon: typeof Globe; labelKey: string }[] = [
  { key: "web", icon: Globe, labelKey: "tabWeb" },
  { key: "auto", icon: Workflow, labelKey: "tabAuto" },
  { key: "mkt", icon: TrendingUp, labelKey: "tabMkt" },
]

const TIERS_CONFIG: Record<
  ServiceTab,
  { prefix: string; featCount: [number, number, number]; highlighted: [boolean, boolean, boolean] }
> = {
  web: { prefix: "web", featCount: [5, 7, 7], highlighted: [false, true, false] },
  auto: { prefix: "auto", featCount: [5, 7, 7], highlighted: [false, true, false] },
  mkt: { prefix: "mkt", featCount: [5, 7, 7], highlighted: [false, true, false] },
}

const TIER_NAMES = ["Starter", "Growth", "Enterprise"] as const

export function PricingTabs() {
  const t = useTranslations("PricingPage")
  const [active, setActive] = useState<ServiceTab>("web")

  const config = TIERS_CONFIG[active]

  return (
    <div>
      {/* Tab bar */}
      <div className="mx-auto flex max-w-lg rounded-xl border border-white/10 bg-white/[0.03] p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              active === tab.key
                ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-[0_0_20px_rgba(34,212,254,0.1)]"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{t(tab.labelKey)}</span>
          </button>
        ))}
      </div>

      {/* Tier cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3 items-stretch">
        {TIER_NAMES.map((tierName, idx) => {
          const tierKey = tierName.toLowerCase()
          const prefix = `${config.prefix}${tierName}_`
          const isHighlighted = config.highlighted[idx]
          const featCount = config.featCount[idx]

          return (
            <div
              key={`${active}-${tierKey}`}
              className={`${
                isHighlighted
                  ? "gradient-border-card shadow-[0_0_80px_rgba(115,120,255,0.12)] hover:shadow-[0_0_120px_rgba(115,120,255,0.18)]"
                  : "gradient-border-static shimmer-card"
              } relative flex flex-col rounded-xl p-6 md:p-8 transition-all duration-300`}
            >
              {isHighlighted && (
                <div className="mb-3 flex justify-center">
                  <span className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_20px_rgba(34,212,254,0.3)]">
                    {t("mostPopular")}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground">
                {t(`${prefix}name`)}
              </h3>

              <p className="mt-2 text-3xl font-bold text-foreground">
                {t(`${prefix}price`)}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`${prefix}desc`)}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {Array.from({ length: featCount }, (_, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10">
                      <Check className="h-3 w-3 text-cyan-400" />
                    </div>
                    <span className="text-sm text-foreground">
                      {t(`${prefix}feat${i + 1}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <Link
                  href="/contact"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                    isHighlighted
                      ? "btn-glow bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-[1.01]"
                      : "border border-border/50 text-foreground hover:bg-white/5 hover:border-cyan-500/30"
                  }`}
                >
                  {t("getStarted")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
