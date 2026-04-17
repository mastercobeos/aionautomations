"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import {
  BookOpen,
  Bot,
  Building,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Dumbbell,
  Globe,
  Heart,
  Image,
  Layout,
  MessageSquare,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Type,
  Users,
  Workflow,
  Zap,
} from "lucide-react"

const SCENE_DURATION_MS = 6000
const SCENE_COUNT = 4
const CHAT_VARIANTS = 15
const DASH_VARIANTS = 100
const WEB_VARIANTS = 15
const WF_VARIANTS = 15

function randExclude(max: number, exclude: number) {
  if (max <= 1) return 0
  let v: number
  do { v = Math.floor(Math.random() * max) } while (v === exclude)
  return v
}

export function HeroProductMockup() {
  const t = useTranslations("HeroMockup")
  const [tick, setTick] = useState(() => Math.floor(Math.random() * SCENE_COUNT))
  const paused = useRef(false)

  const scene = (tick % SCENE_COUNT) as 0 | 1 | 2 | 3
  const [variants, setVariants] = useState<[number, number, number, number]>(() => [
    Math.floor(Math.random() * WEB_VARIANTS),
    Math.floor(Math.random() * CHAT_VARIANTS),
    Math.floor(Math.random() * DASH_VARIANTS),
    Math.floor(Math.random() * WF_VARIANTS),
  ])

  useEffect(() => {
    const maxes = [WEB_VARIANTS, CHAT_VARIANTS, DASH_VARIANTS, WF_VARIANTS]
    setVariants((prev) => {
      const next = [...prev] as [number, number, number, number]
      next[scene] = randExclude(maxes[scene], prev[scene])
      return next
    })
  }, [tick, scene])

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) {
        setTick((t) => t + 1)
      }
    }, SCENE_DURATION_MS)
    return () => clearInterval(id)
  }, [])

  const handleEnter = useCallback(() => { paused.current = true }, [])
  const handleLeave = useCallback(() => { paused.current = false }, [])

  const sceneLabels = [
    { icon: Globe, label: t("scene4Label") },
    { icon: MessageSquare, label: t("scene1Label") },
    { icon: TrendingUp, label: t("scene2Label") },
    { icon: Workflow, label: t("scene3Label") },
  ]

  return (
    <div
      className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px]"
      aria-label={t("ariaLabel")}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Device frame */}
      <div className="relative rounded-[28px] border border-cyan-500/30 bg-gradient-to-br from-background via-background to-cyan-500/[0.04] p-3 shadow-[0_0_80px_rgba(34,212,254,0.15)]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle,rgba(34,212,254,0.2),transparent_70%)] blur-2xl" aria-hidden="true" />

        {/* Top bar */}
        <div className="flex items-center justify-between rounded-t-2xl border-b border-border/40 bg-white/[0.02] px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-3 w-3" />
            {t("liveBadge")}
          </span>
        </div>

        {/* Scene viewport */}
        <div className="relative h-[320px] sm:h-[360px] overflow-hidden rounded-b-2xl bg-[radial-gradient(circle_at_top,rgba(34,212,254,0.06),transparent_60%)]">
          <SceneWebsite active={scene === 0} variant={variants[0]} />
          <SceneWhatsApp active={scene === 1} variant={variants[1]} />
          <SceneDashboard active={scene === 2} variant={variants[2]} />
          <SceneWorkflow active={scene === 3} variant={variants[3]} />
        </div>
      </div>

      {/* Scene indicator */}
      <div className="mt-4 flex items-center justify-center gap-2" role="tablist">
        {sceneLabels.map((s, i) => {
          const Icon = s.icon
          const active = scene === i
          return (
            <button
              key={i}
              type="button"
              onClick={() => setTick((prev) => prev - (prev % SCENE_COUNT) + i)}
              role="tab"
              aria-selected={active}
              aria-label={s.label}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${
                active
                  ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                  : "border-border/50 bg-white/[0.02] text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3 w-3" />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────── Scene 0: Websites ──────────── */

const SITE_VARIANTS = [
  {
    titleKey: "v1_siteTitle",
    subtitleKey: "v1_siteSub",
    cards: ["v1_siteCard1", "v1_siteCard2", "v1_siteCard3"],
    ctaKey: "v1_siteCta",
    scorePerf: 98,
    scoreSeo: 100,
    heroGradient: "from-cyan-500/15 via-purple-500/5 to-transparent",
    heroBorder: "border-cyan-500/20",
    ctaGradient: "from-cyan-500 to-purple-600",
    cardColors: [
      { bg: "bg-cyan-500/20", border: "border-cyan-500/30", icon: Layout, iconColor: "text-cyan-400" },
      { bg: "bg-purple-500/20", border: "border-purple-500/30", icon: Zap, iconColor: "text-purple-400" },
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: TrendingUp, iconColor: "text-green-400" },
    ],
  },
  {
    titleKey: "v2_siteTitle",
    subtitleKey: "v2_siteSub",
    cards: ["v2_siteCard1", "v2_siteCard2", "v2_siteCard3"],
    ctaKey: "v2_siteCta",
    scorePerf: 96,
    scoreSeo: 100,
    heroGradient: "from-purple-500/15 via-pink-500/5 to-transparent",
    heroBorder: "border-purple-500/20",
    ctaGradient: "from-purple-500 to-pink-600",
    cardColors: [
      { bg: "bg-purple-500/20", border: "border-purple-500/30", icon: Globe, iconColor: "text-purple-400" },
      { bg: "bg-pink-500/20", border: "border-pink-500/30", icon: Check, iconColor: "text-pink-400" },
      { bg: "bg-cyan-500/20", border: "border-cyan-500/30", icon: Workflow, iconColor: "text-cyan-400" },
    ],
  },
  {
    titleKey: "v3_siteTitle",
    subtitleKey: "v3_siteSub",
    cards: ["v3_siteCard1", "v3_siteCard2", "v3_siteCard3"],
    ctaKey: "v3_siteCta",
    scorePerf: 99,
    scoreSeo: 100,
    heroGradient: "from-green-500/15 via-emerald-500/5 to-transparent",
    heroBorder: "border-green-500/20",
    ctaGradient: "from-green-500 to-emerald-600",
    cardColors: [
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: Users, iconColor: "text-green-400" },
      { bg: "bg-amber-500/20", border: "border-amber-500/30", icon: Layout, iconColor: "text-amber-400" },
      { bg: "bg-cyan-500/20", border: "border-cyan-500/30", icon: MessageSquare, iconColor: "text-cyan-400" },
    ],
  },
  {
    titleKey: "v4_siteTitle",
    subtitleKey: "v4_siteSub",
    cards: ["v4_siteCard1", "v4_siteCard2", "v4_siteCard3"],
    ctaKey: "v4_siteCta",
    scorePerf: 97,
    scoreSeo: 100,
    heroGradient: "from-blue-500/15 via-cyan-500/5 to-transparent",
    heroBorder: "border-blue-500/20",
    ctaGradient: "from-blue-500 to-cyan-600",
    cardColors: [
      { bg: "bg-blue-500/20", border: "border-blue-500/30", icon: Users, iconColor: "text-blue-400" },
      { bg: "bg-cyan-500/20", border: "border-cyan-500/30", icon: MessageSquare, iconColor: "text-cyan-400" },
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: Check, iconColor: "text-green-400" },
    ],
  },
  {
    titleKey: "v5_siteTitle",
    subtitleKey: "v5_siteSub",
    cards: ["v5_siteCard1", "v5_siteCard2", "v5_siteCard3"],
    ctaKey: "v5_siteCta",
    scorePerf: 99,
    scoreSeo: 100,
    heroGradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    heroBorder: "border-amber-500/20",
    ctaGradient: "from-amber-500 to-orange-600",
    cardColors: [
      { bg: "bg-amber-500/20", border: "border-amber-500/30", icon: Globe, iconColor: "text-amber-400" },
      { bg: "bg-orange-500/20", border: "border-orange-500/30", icon: Image, iconColor: "text-orange-400" },
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: TrendingUp, iconColor: "text-green-400" },
    ],
  },
  {
    titleKey: "v6_siteTitle",
    subtitleKey: "v6_siteSub",
    cards: ["v6_siteCard1", "v6_siteCard2", "v6_siteCard3"],
    ctaKey: "v6_siteCta",
    scorePerf: 98,
    scoreSeo: 100,
    heroGradient: "from-red-500/15 via-orange-500/5 to-transparent",
    heroBorder: "border-red-500/20",
    ctaGradient: "from-red-500 to-orange-600",
    cardColors: [
      { bg: "bg-red-500/20", border: "border-red-500/30", icon: Dumbbell, iconColor: "text-red-400" },
      { bg: "bg-orange-500/20", border: "border-orange-500/30", icon: Calendar, iconColor: "text-orange-400" },
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: TrendingUp, iconColor: "text-green-400" },
    ],
  },
  {
    titleKey: "v7_siteTitle",
    subtitleKey: "v7_siteSub",
    cards: ["v7_siteCard1", "v7_siteCard2", "v7_siteCard3"],
    ctaKey: "v7_siteCta",
    scorePerf: 97,
    scoreSeo: 100,
    heroGradient: "from-teal-500/15 via-cyan-500/5 to-transparent",
    heroBorder: "border-teal-500/20",
    ctaGradient: "from-teal-500 to-cyan-600",
    cardColors: [
      { bg: "bg-teal-500/20", border: "border-teal-500/30", icon: Building, iconColor: "text-teal-400" },
      { bg: "bg-cyan-500/20", border: "border-cyan-500/30", icon: Star, iconColor: "text-cyan-400" },
      { bg: "bg-amber-500/20", border: "border-amber-500/30", icon: Calendar, iconColor: "text-amber-400" },
    ],
  },
  {
    titleKey: "v8_siteTitle",
    subtitleKey: "v8_siteSub",
    cards: ["v8_siteCard1", "v8_siteCard2", "v8_siteCard3"],
    ctaKey: "v8_siteCta",
    scorePerf: 99,
    scoreSeo: 100,
    heroGradient: "from-pink-500/15 via-rose-500/5 to-transparent",
    heroBorder: "border-pink-500/20",
    ctaGradient: "from-pink-500 to-rose-600",
    cardColors: [
      { bg: "bg-pink-500/20", border: "border-pink-500/30", icon: Heart, iconColor: "text-pink-400" },
      { bg: "bg-rose-500/20", border: "border-rose-500/30", icon: Calendar, iconColor: "text-rose-400" },
      { bg: "bg-purple-500/20", border: "border-purple-500/30", icon: Star, iconColor: "text-purple-400" },
    ],
  },
  {
    titleKey: "v9_siteTitle",
    subtitleKey: "v9_siteSub",
    cards: ["v9_siteCard1", "v9_siteCard2", "v9_siteCard3"],
    ctaKey: "v9_siteCta",
    scorePerf: 97,
    scoreSeo: 100,
    heroGradient: "from-slate-500/15 via-indigo-500/5 to-transparent",
    heroBorder: "border-slate-500/20",
    ctaGradient: "from-slate-600 to-indigo-600",
    cardColors: [
      { bg: "bg-slate-500/20", border: "border-slate-500/30", icon: Shield, iconColor: "text-slate-400" },
      { bg: "bg-indigo-500/20", border: "border-indigo-500/30", icon: BookOpen, iconColor: "text-indigo-400" },
      { bg: "bg-cyan-500/20", border: "border-cyan-500/30", icon: Users, iconColor: "text-cyan-400" },
    ],
  },
  {
    titleKey: "v10_siteTitle",
    subtitleKey: "v10_siteSub",
    cards: ["v10_siteCard1", "v10_siteCard2", "v10_siteCard3"],
    ctaKey: "v10_siteCta",
    scorePerf: 98,
    scoreSeo: 100,
    heroGradient: "from-indigo-500/15 via-violet-500/5 to-transparent",
    heroBorder: "border-indigo-500/20",
    ctaGradient: "from-indigo-500 to-violet-600",
    cardColors: [
      { bg: "bg-indigo-500/20", border: "border-indigo-500/30", icon: BookOpen, iconColor: "text-indigo-400" },
      { bg: "bg-violet-500/20", border: "border-violet-500/30", icon: Users, iconColor: "text-violet-400" },
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: Calendar, iconColor: "text-green-400" },
    ],
  },
  {
    titleKey: "v11_siteTitle",
    subtitleKey: "v11_siteSub",
    cards: ["v11_siteCard1", "v11_siteCard2", "v11_siteCard3"],
    ctaKey: "v11_siteCta",
    scorePerf: 99,
    scoreSeo: 100,
    heroGradient: "from-lime-500/15 via-green-500/5 to-transparent",
    heroBorder: "border-lime-500/20",
    ctaGradient: "from-lime-500 to-green-600",
    cardColors: [
      { bg: "bg-lime-500/20", border: "border-lime-500/30", icon: Heart, iconColor: "text-lime-400" },
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: Calendar, iconColor: "text-green-400" },
      { bg: "bg-cyan-500/20", border: "border-cyan-500/30", icon: MessageSquare, iconColor: "text-cyan-400" },
    ],
  },
  {
    titleKey: "v12_siteTitle",
    subtitleKey: "v12_siteSub",
    cards: ["v12_siteCard1", "v12_siteCard2", "v12_siteCard3"],
    ctaKey: "v12_siteCta",
    scorePerf: 97,
    scoreSeo: 100,
    heroGradient: "from-violet-500/15 via-purple-500/5 to-transparent",
    heroBorder: "border-violet-500/20",
    ctaGradient: "from-violet-500 to-purple-600",
    cardColors: [
      { bg: "bg-violet-500/20", border: "border-violet-500/30", icon: TrendingUp, iconColor: "text-violet-400" },
      { bg: "bg-purple-500/20", border: "border-purple-500/30", icon: Globe, iconColor: "text-purple-400" },
      { bg: "bg-cyan-500/20", border: "border-cyan-500/30", icon: Zap, iconColor: "text-cyan-400" },
    ],
  },
  {
    titleKey: "v13_siteTitle",
    subtitleKey: "v13_siteSub",
    cards: ["v13_siteCard1", "v13_siteCard2", "v13_siteCard3"],
    ctaKey: "v13_siteCta",
    scorePerf: 99,
    scoreSeo: 100,
    heroGradient: "from-neutral-500/15 via-zinc-500/5 to-transparent",
    heroBorder: "border-neutral-500/20",
    ctaGradient: "from-neutral-600 to-zinc-700",
    cardColors: [
      { bg: "bg-neutral-500/20", border: "border-neutral-500/30", icon: Camera, iconColor: "text-neutral-400" },
      { bg: "bg-zinc-500/20", border: "border-zinc-500/30", icon: Image, iconColor: "text-zinc-400" },
      { bg: "bg-amber-500/20", border: "border-amber-500/30", icon: Star, iconColor: "text-amber-400" },
    ],
  },
  {
    titleKey: "v14_siteTitle",
    subtitleKey: "v14_siteSub",
    cards: ["v14_siteCard1", "v14_siteCard2", "v14_siteCard3"],
    ctaKey: "v14_siteCta",
    scorePerf: 98,
    scoreSeo: 100,
    heroGradient: "from-sky-500/15 via-blue-500/5 to-transparent",
    heroBorder: "border-sky-500/20",
    ctaGradient: "from-sky-500 to-blue-600",
    cardColors: [
      { bg: "bg-sky-500/20", border: "border-sky-500/30", icon: Zap, iconColor: "text-sky-400" },
      { bg: "bg-blue-500/20", border: "border-blue-500/30", icon: Layout, iconColor: "text-blue-400" },
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: TrendingUp, iconColor: "text-green-400" },
    ],
  },
  {
    titleKey: "v15_siteTitle",
    subtitleKey: "v15_siteSub",
    cards: ["v15_siteCard1", "v15_siteCard2", "v15_siteCard3"],
    ctaKey: "v15_siteCta",
    scorePerf: 98,
    scoreSeo: 100,
    heroGradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    heroBorder: "border-emerald-500/20",
    ctaGradient: "from-emerald-500 to-teal-600",
    cardColors: [
      { bg: "bg-emerald-500/20", border: "border-emerald-500/30", icon: Heart, iconColor: "text-emerald-400" },
      { bg: "bg-teal-500/20", border: "border-teal-500/30", icon: Globe, iconColor: "text-teal-400" },
      { bg: "bg-green-500/20", border: "border-green-500/30", icon: Users, iconColor: "text-green-400" },
    ],
  },
] as const

function SceneWebsite({ active, variant }: { active: boolean; variant: number }) {
  const t = useTranslations("HeroMockup")
  const data = SITE_VARIANTS[variant]

  return (
    <div
      key={active ? `site-on-${variant}` : "site-off"}
      className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Mini browser building itself */}
      <div className="flex-1 overflow-hidden p-3">
        {/* Mini navbar */}
        {active && (
          <div
            className="flex items-center justify-between rounded-lg border border-border/40 bg-white/[0.04] px-3 py-1.5 opacity-0 animate-[fade-in-up_0.4s_ease-out_forwards]"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-gradient-to-br from-cyan-400 to-purple-500" />
              <div className="h-1.5 w-10 rounded-full bg-foreground/20" />
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-6 rounded-full bg-foreground/15" />
              <div className="h-1.5 w-6 rounded-full bg-foreground/15" />
              <div className="h-1.5 w-6 rounded-full bg-foreground/15" />
            </div>
          </div>
        )}

        {/* Mini hero section */}
        {active && (
          <div
            className={`mt-2 rounded-lg border ${data.heroBorder} bg-gradient-to-br ${data.heroGradient} p-3 opacity-0 animate-[fade-in-up_0.4s_ease-out_forwards]`}
            style={{ animationDelay: "600ms" }}
          >
            <div className="flex items-center gap-2">
              <Type className="h-3.5 w-3.5 text-cyan-400" />
              <p className="text-[11px] font-bold text-foreground leading-tight">
                {t(data.titleKey)}
              </p>
            </div>
            <p className="mt-1 text-[9px] text-muted-foreground leading-snug">
              {t(data.subtitleKey)}
            </p>
          </div>
        )}

        {/* Mini feature cards */}
        {active && (
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {data.cards.map((key, i) => {
              const cc = data.cardColors[i]
              const CardIcon = cc.icon
              return (
                <div
                  key={key}
                  className="rounded-md border border-border/40 bg-white/[0.03] p-2 opacity-0 animate-[fade-in-up_0.4s_ease-out_forwards]"
                  style={{ animationDelay: `${1100 + i * 200}ms` }}
                >
                  <div className="flex items-center justify-center">
                    <div className={`h-5 w-5 rounded-md ${cc.bg} border ${cc.border} flex items-center justify-center`}>
                      <CardIcon className={`h-2.5 w-2.5 ${cc.iconColor}`} />
                    </div>
                  </div>
                  <p className="mt-1 text-center text-[8px] font-medium text-foreground leading-tight">
                    {t(key)}
                  </p>
                </div>
              )
            })}
          </div>
        )}

        {/* Mini CTA */}
        {active && (
          <div
            className="mt-2 flex justify-center opacity-0 animate-[fade-in-up_0.4s_ease-out_forwards]"
            style={{ animationDelay: "1900ms" }}
          >
            <div className={`rounded-md bg-gradient-to-r ${data.ctaGradient} px-6 py-1 text-[9px] font-semibold text-white`}>
              {t(data.ctaKey)}
            </div>
          </div>
        )}

        {/* Lighthouse scores */}
        {active && (
          <div
            className="mt-3 flex items-center justify-center gap-3 opacity-0 animate-[fade-in-up_0.5s_ease-out_forwards]"
            style={{ animationDelay: "2500ms" }}
          >
            <ScoreCircle label="Perf" value={data.scorePerf} color="green" active={active} delay={2600} />
            <ScoreCircle label="SEO" value={data.scoreSeo} color="green" active={active} delay={2800} />
            <ScoreCircle label="A11y" value={95} color="green" active={active} delay={3000} />
            <div className="flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/30 px-2 py-0.5 opacity-0 animate-[fade-in_0.4s_ease-out_forwards]" style={{ animationDelay: "3400ms" }}>
              <Image className="h-2.5 w-2.5 text-green-400" />
              <span className="text-[9px] font-semibold text-green-400">Mobile Ready</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ScoreCircle({
  label,
  value,
  color,
  active,
  delay,
}: {
  label: string
  value: number
  color: string
  active: boolean
  delay: number
}) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!active) {
      setDisplayed(0)
      return
    }
    const start = performance.now()
    const startDelay = delay - 2500
    let raf = 0
    const tick = (now: number) => {
      const elapsed = now - start - startDelay
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const t = Math.min(1, elapsed / 800)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayed(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value, delay])

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18" cy="18" r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-white/5"
          />
          <circle
            cx="18" cy="18" r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={`${(displayed / 100) * 94.2} 94.2`}
            strokeLinecap="round"
            className="text-green-400 transition-all duration-300"
          />
        </svg>
        <span className="text-[10px] font-bold tabular-nums text-foreground">
          {displayed}
        </span>
      </div>
      <span className="text-[8px] font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

/* ──────────── Scene 1: WhatsApp ──────────── */

function SceneWhatsApp({ active, variant }: { active: boolean; variant: number }) {
  const t = useTranslations("HeroMockup")
  const v = `v${variant + 1}_` as const
  return (
    <div
      key={active ? `w-on-${variant}` : "w-off"}
      className={`absolute inset-0 flex flex-col p-4 transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-white/[0.03] p-3">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600">
          <Bot className="h-5 w-5 text-white" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-400" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground">AION Assistant</p>
          <p className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="h-1 w-1 rounded-full bg-green-400 animate-pulse" />
            {t("online")}
          </p>
        </div>
      </div>

      {/* Messages */}
      {active && (
        <div className="mt-3 flex-1 space-y-2 overflow-hidden">
          <ChatBubble role="user" delay={300}>
            {t(`${v}msg1User`)}
          </ChatBubble>
          <ChatTyping role="bot" delay={1200} />
          <ChatBubble role="bot" delay={2400}>
            {t(`${v}msg1Bot`)}
          </ChatBubble>
          <ChatBubble role="user" delay={3500}>
            {t(`${v}msg2User`)}
          </ChatBubble>
          <ChatTyping role="bot" delay={4100} />
          <ChatBubble role="bot" delay={5000}>
            {t(`${v}msg2Bot`)}
          </ChatBubble>
        </div>
      )}

      {/* Success toast */}
      {active && (
        <div
          className="mt-2 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-[11px] font-medium text-green-400 opacity-0 animate-[fade-in-up_0.5s_ease-out_5.5s_forwards]"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {t(`${v}toast`)}
        </div>
      )}
    </div>
  )
}

function ChatBubble({
  role,
  children,
  delay,
}: {
  role: "user" | "bot"
  children: React.ReactNode
  delay: number
}) {
  const isBot = role === "bot"
  return (
    <div
      className={`flex ${isBot ? "justify-start" : "justify-end"} opacity-0 translate-y-1 animate-[fade-in-up_0.4s_ease-out_forwards]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-[11px] leading-relaxed ${
          isBot
            ? "bg-white/[0.06] text-foreground rounded-tl-sm"
            : "bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-tr-sm"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function ChatTyping({ role, delay }: { role: "user" | "bot"; delay: number }) {
  const isBot = role === "bot"
  return (
    <div
      className={`flex ${isBot ? "justify-start" : "justify-end"} opacity-0 animate-[fade-in_0.3s_ease-out_forwards]`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <div
        className={`flex items-center gap-1 rounded-2xl px-3 py-2 ${
          isBot ? "bg-white/[0.06]" : "bg-gradient-to-br from-cyan-500/80 to-purple-600/80"
        }`}
      >
        <span className="h-1 w-1 rounded-full bg-current opacity-60 animate-bounce [animation-delay:0ms]" />
        <span className="h-1 w-1 rounded-full bg-current opacity-60 animate-bounce [animation-delay:150ms]" />
        <span className="h-1 w-1 rounded-full bg-current opacity-60 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  )
}

/* ──────────── Scene 2: Dashboard ──────────── */

function generateDashboard(): { leads: number; closeRate: number; revenue: number; timeSaved: number; growth: string; bars: number[] } {
  const leads = 40 + Math.floor(Math.random() * 210)
  const closeRate = 15 + Math.floor(Math.random() * 40)
  const revenue = Math.round(leads * (closeRate / 100) * (100 + Math.floor(Math.random() * 200)))
  const timeSaved = 6 + Math.floor(Math.random() * 18)
  const growth = `+${50 + Math.floor(Math.random() * 200)}%`
  const bars = Array.from({ length: 7 }, (_, i) => 15 + Math.floor(Math.random() * 40) + i * 8).map(v => Math.min(v, 98))
  return { leads, closeRate, revenue, timeSaved, growth, bars }
}

function SceneDashboard({ active, variant }: { active: boolean; variant: number }) {
  const t = useTranslations("HeroMockup")
  const [data, setData] = useState(generateDashboard)
  useEffect(() => { setData(generateDashboard()) }, [variant])
  return (
    <div
      key={`dash-${variant}`}
      className={`absolute inset-0 p-4 transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <MetricCard
          icon={<Users className="h-3.5 w-3.5 text-cyan-400" />}
          label={t("leadsLabel")}
          value={data.leads}
          prefix=""
          active={active}
          delay={100}
        />
        <MetricCard
          icon={<TrendingUp className="h-3.5 w-3.5 text-green-400" />}
          label={t("closeRateLabel")}
          value={data.closeRate}
          suffix="%"
          active={active}
          delay={400}
          accent="green"
        />
      </div>

      <div className="mt-2.5 rounded-xl border border-border/40 bg-white/[0.03] p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {t("revenueLabel")}
            </p>
            <p className="text-xl font-bold tabular-nums text-cyan-300">
              {active && <AnimatedNumber to={data.revenue} prefix="$" />}
            </p>
          </div>
          <div className="rounded-full bg-green-500/10 border border-green-500/30 px-2 py-0.5 text-[10px] font-semibold text-green-400">
            {data.growth}
          </div>
        </div>

        {/* Mini chart */}
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {data.bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-cyan-500 to-purple-500 opacity-0 animate-[grow-up_0.7s_ease-out_forwards]"
              style={{
                height: active ? `${h}%` : "0%",
                animationDelay: `${300 + i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-border/40 bg-white/[0.03] p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {t("timeSavedLabel")}
          </p>
          <p className="mt-1 text-base font-bold text-foreground tabular-nums">
            {active && <AnimatedNumber to={data.timeSaved} suffix={t("timeSavedSuffix")} />}
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-white/[0.03] p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {t("avgResponseLabel")}
          </p>
          <p className="mt-1 text-base font-bold text-foreground">{t("avgResponseValue")}</p>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  prefix = "",
  suffix = "",
  active,
  delay,
  accent = "cyan",
}: {
  icon: React.ReactNode
  label: string
  value: number
  prefix?: string
  suffix?: string
  active: boolean
  delay: number
  accent?: "cyan" | "green"
}) {
  const color = accent === "green" ? "text-green-400" : "text-cyan-300"
  return (
    <div
      className="rounded-xl border border-border/40 bg-white/[0.03] p-3 opacity-0 translate-y-1 animate-[fade-in-up_0.4s_ease-out_forwards]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className={`mt-1 text-xl font-bold tabular-nums ${color}`}>
        {active && <AnimatedNumber to={value} prefix={prefix} suffix={suffix} />}
      </p>
    </div>
  )
}

function AnimatedNumber({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number
  prefix?: string
  suffix?: string
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const duration = 1200
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to])

  return (
    <span>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

/* ──────────── Scene 3: Workflow ──────────── */

function SceneWorkflow({ active, variant }: { active: boolean; variant: number }) {
  const t = useTranslations("HeroMockup")
  const v = `v${variant + 1}_` as const
  const nodes = [
    { label: t(`${v}wfNode1`), icon: Users, color: "cyan" as const, delay: 200 },
    { label: t(`${v}wfNode2`), icon: Bot, color: "purple" as const, delay: 900 },
    { label: t(`${v}wfNode3`), icon: Workflow, color: "cyan" as const, delay: 1600 },
    { label: t(`${v}wfNode4`), icon: Zap, color: "green" as const, delay: 2300 },
  ]

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center p-4 transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-widest text-cyan-400">
        {active ? t("workflowHeader") : ""}
      </p>

      <div className="relative space-y-3">
        {/* Connector line */}
        <div
          className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/60 via-purple-500/60 to-green-500/60"
          aria-hidden="true"
        />

        {nodes.map((n, i) => {
          const Icon = n.icon
          const bg =
            n.color === "cyan"
              ? "from-cyan-500/20 to-cyan-500/5 border-cyan-500/40"
              : n.color === "purple"
              ? "from-purple-500/20 to-purple-500/5 border-purple-500/40"
              : "from-green-500/20 to-green-500/5 border-green-500/40"
          const iconColor =
            n.color === "cyan"
              ? "text-cyan-400"
              : n.color === "purple"
              ? "text-purple-400"
              : "text-green-400"
          return (
            <div
              key={n.label}
              className="relative flex items-center justify-center opacity-0 scale-95 animate-[node-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: active ? `${n.delay}ms` : "0ms" }}
            >
              <div className={`relative flex items-center gap-2.5 rounded-xl border bg-gradient-to-br ${bg} px-4 py-2 backdrop-blur-sm`}>
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-background/40 ${iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-foreground">
                  {n.label}
                </span>
                <div
                  className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500/20 border border-green-500/40 opacity-0 animate-[fade-in_0.3s_ease-out_forwards]"
                  style={{ animationDelay: active ? `${n.delay + 400}ms` : "0ms" }}
                >
                  <Check className="h-2.5 w-2.5 text-green-400" />
                </div>
              </div>

              {/* Pulse indicator */}
              {i < nodes.length - 1 && active && (
                <span
                  className="absolute left-1/2 bottom-[-18px] -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,212,254,0.6)] opacity-0 animate-[pulse-dot_1.2s_ease-in-out_forwards]"
                  style={{ animationDelay: active ? `${n.delay + 300}ms` : "0ms" }}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        {active ? t("workflowFooter") : ""}
      </p>
    </div>
  )
}
