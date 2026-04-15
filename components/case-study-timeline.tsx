"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { CheckCircle2, TrendingUp, Zap, Clock } from "lucide-react"

const STEPS = [
  { key: "step1", icon: Zap },
  { key: "step2", icon: Clock },
  { key: "step3", icon: TrendingUp },
  { key: "step4", icon: CheckCircle2 },
]

export function CaseStudyTimeline() {
  const t = useTranslations("CaseStudyTimeline")
  const [visible, setVisible] = useState<boolean[]>(Array(STEPS.length).fill(false))
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    const observers: IntersectionObserver[] = []
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setVisible((prev) => {
              if (prev[i]) return prev
              const next = [...prev]
              next[i] = true
              return next
            })
            obs.disconnect()
          }
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
            {t("badge")}
          </span>
          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10 md:space-y-16">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              const isEven = i % 2 === 0
              const isVisible = visible[i]
              return (
                <li
                  key={s.key}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  className={`relative ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  } transition-all duration-700`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`md:grid md:grid-cols-2 md:gap-12 md:items-center ${
                      isEven ? "" : "md:[&>*:first-child]:col-start-2 md:[&>*:first-child]:row-start-1"
                    }`}
                  >
                    <div className={`${isEven ? "md:text-right md:pr-8" : "md:pl-8"} pl-16 md:pl-0`}>
                      <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                        {t(`${s.key}Time`)}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
                        {t(`${s.key}Title`)}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {t(`${s.key}Desc`)}
                      </p>

                      <div className={`mt-4 inline-flex items-baseline gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1.5 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <span className="text-lg font-bold tabular-nums text-green-400">
                          {t(`${s.key}Metric`)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t(`${s.key}MetricLabel`)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Node */}
                  <div
                    className={`absolute left-6 top-0 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      isVisible
                        ? "border-cyan-400 bg-gradient-to-br from-cyan-500 to-purple-600 shadow-[0_0_30px_rgba(34,212,254,0.5)]"
                        : "border-border/50 bg-background"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors ${
                        isVisible ? "text-white" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
