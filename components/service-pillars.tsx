"use client"

import { useState, useEffect } from "react"
import { Globe, Workflow, TrendingUp, ArrowRight, Check, X, Monitor, Smartphone, Search, BarChart3, MessageSquare, Zap, Mail, Users, Bot, Target, PieChart } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ServiceKey = 'web' | 'auto' | 'mkt'

const SERVICES: {
  icon: typeof Globe
  titleKey: string
  descKey: string
  ctaKey: string
  serviceKey: ServiceKey
}[] = [
  { icon: Globe, titleKey: 'webTitle', descKey: 'webDesc', ctaKey: 'webCta', serviceKey: 'web' },
  { icon: Workflow, titleKey: 'autoTitle', descKey: 'autoDesc', ctaKey: 'autoCta', serviceKey: 'auto' },
  { icon: TrendingUp, titleKey: 'mktTitle', descKey: 'mktDesc', ctaKey: 'mktCta', serviceKey: 'mkt' },
]

const TIERS = [
  {
    nameKey: 'starterName',
    priceKey: 'starterPrice',
    descKey: 'starterDesc',
    featKeys: ['starterFeat1', 'starterFeat2', 'starterFeat3', 'starterFeat4', 'starterFeat5'],
    highlighted: false,
  },
  {
    nameKey: 'growthName',
    priceKey: 'growthPrice',
    descKey: 'growthDesc',
    featKeys: ['growthFeat1', 'growthFeat2', 'growthFeat3', 'growthFeat4', 'growthFeat5', 'growthFeat6', 'growthFeat7'],
    highlighted: true,
  },
  {
    nameKey: 'enterpriseName',
    priceKey: 'enterprisePrice',
    descKey: 'enterpriseDesc',
    featKeys: ['enterpriseFeat1', 'enterpriseFeat2', 'enterpriseFeat3', 'enterpriseFeat4', 'enterpriseFeat5', 'enterpriseFeat6', 'enterpriseFeat7'],
    highlighted: false,
  },
]

const NAMESPACE_MAP: Record<ServiceKey, string> = {
  web: 'WebServicePage',
  auto: 'AutomationsServicePage',
  mkt: 'MarketingServicePage',
}

/* ── Visual mockup per service type ── */

function WebMockup({ tierIndex }: { tierIndex: number }) {
  const pages = tierIndex === 0 ? 1 : tierIndex === 1 ? 5 : 15
  const gradients = ['from-cyan-500/20 to-cyan-500/5', 'from-cyan-500/20 to-purple-500/10', 'from-purple-500/20 to-cyan-500/10']
  const icons = [
    [Monitor, Smartphone],
    [Monitor, Search, BarChart3],
    [Monitor, Search, BarChart3, Zap],
  ]

  return (
    <div className="rounded-lg border border-white/10 bg-black/40 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/5">
        <div className="h-2 w-2 rounded-full bg-red-500/60" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
        <div className="h-2 w-2 rounded-full bg-green-500/60" />
        <div className="ml-2 flex-1 h-4 rounded-full bg-white/10 flex items-center px-2">
          <span className="text-[8px] text-white/30 truncate">www.tunegocio.com</span>
        </div>
      </div>
      <div className={`p-4 bg-gradient-to-br ${gradients[tierIndex]} min-h-[90px] flex flex-col items-center justify-center gap-3`}>
        <div className="flex items-center gap-2">
          {icons[tierIndex].map((Icon, i) => (
            <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
              <Icon className="h-4 w-4 text-cyan-400" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(pages, 5) }).map((_, i) => (
            <div key={i} className={`rounded-sm ${i === 0 ? 'h-3 w-6 bg-cyan-500/40' : 'h-3 w-3 bg-white/10'}`} />
          ))}
          {pages > 5 && <span className="text-[8px] text-white/30 ml-0.5">+{pages - 5}</span>}
        </div>
        <span className="text-[10px] font-medium text-white/50">
          {tierIndex === 0 ? '1 página' : tierIndex === 1 ? 'Hasta 5 páginas' : 'Hasta 15+ páginas'}
        </span>
      </div>
    </div>
  )
}

function AutoMockup({ tierIndex }: { tierIndex: number }) {
  const gradients = ['from-purple-500/15 to-cyan-500/5', 'from-cyan-500/15 to-purple-500/10', 'from-purple-500/15 to-blue-500/10']

  // Workflow nodes per tier
  const flows: { icon: typeof Globe; label: string; color: string }[][] = [
    // Starter: simple flow
    [
      { icon: Users, label: 'Lead', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
      { icon: MessageSquare, label: 'WhatsApp', color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
      { icon: Mail, label: 'Email', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
    ],
    // Growth: AI + CRM + multi-channel
    [
      { icon: Users, label: 'Lead', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
      { icon: Bot, label: 'IA 24/7', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
      { icon: MessageSquare, label: 'WhatsApp', color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
      { icon: BarChart3, label: 'CRM', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
    ],
    // Enterprise: full pipeline
    [
      { icon: Users, label: 'Leads', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
      { icon: Bot, label: 'IA Multi', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
      { icon: Zap, label: 'Flujos', color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
      { icon: BarChart3, label: 'ERP/CRM', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
      { icon: Target, label: 'Escala', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
    ],
  ]

  return (
    <div className="rounded-lg border border-white/10 bg-black/40 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/5">
        <Zap className="h-3 w-3 text-purple-400" />
        <span className="text-[9px] font-medium text-white/40">Flujo de automatización</span>
      </div>
      <div className={`p-4 bg-gradient-to-br ${gradients[tierIndex]} min-h-[90px] flex flex-col items-center justify-center gap-2`}>
        {/* Workflow nodes connected by arrows */}
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {flows[tierIndex].map((node, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${node.color}`}>
                  <node.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[8px] text-white/40">{node.label}</span>
              </div>
              {i < flows[tierIndex].length - 1 && (
                <ArrowRight className="h-3 w-3 text-white/20 mb-3" />
              )}
            </div>
          ))}
        </div>
        {/* Status indicator */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] text-cyan-400/70">
            {tierIndex === 0 ? 'Seguimiento activo' : tierIndex === 1 ? 'IA respondiendo 24/7' : 'Pipeline empresarial activo'}
          </span>
        </div>
      </div>
    </div>
  )
}

function MktMockup({ tierIndex }: { tierIndex: number }) {
  const gradients = ['from-blue-500/15 to-cyan-500/5', 'from-cyan-500/15 to-purple-500/10', 'from-purple-500/15 to-blue-500/10']

  // Channel bars per tier
  const channels: { name: string; pct: number; color: string }[][] = [
    // Starter: 1 channel
    [
      { name: 'Google Ads', pct: 72, color: 'bg-cyan-500' },
    ],
    // Growth: 2-3 channels
    [
      { name: 'Google Ads', pct: 85, color: 'bg-cyan-500' },
      { name: 'Meta Ads', pct: 68, color: 'bg-blue-500' },
      { name: 'Email', pct: 54, color: 'bg-purple-500' },
    ],
    // Enterprise: all channels
    [
      { name: 'Google', pct: 92, color: 'bg-cyan-500' },
      { name: 'Meta', pct: 78, color: 'bg-blue-500' },
      { name: 'LinkedIn', pct: 65, color: 'bg-indigo-500' },
      { name: 'TikTok', pct: 58, color: 'bg-violet-500' },
      { name: 'Email', pct: 71, color: 'bg-purple-500' },
    ],
  ]

  return (
    <div className="rounded-lg border border-white/10 bg-black/40 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <PieChart className="h-3 w-3 text-cyan-400" />
          <span className="text-[9px] font-medium text-white/40">Dashboard de campañas</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[8px] text-cyan-400/60">Live</span>
        </div>
      </div>
      <div className={`p-3 bg-gradient-to-br ${gradients[tierIndex]} min-h-[90px] flex flex-col justify-center gap-1.5`}>
        {/* Channel performance bars */}
        {channels[tierIndex].map((ch, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[8px] text-white/40 w-12 text-right truncate">{ch.name}</span>
            <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
              <div
                className={`h-full rounded-full ${ch.color}/60`}
                style={{ width: `${ch.pct}%` }}
              />
            </div>
            <span className="text-[8px] font-medium text-white/50 w-7">{ch.pct}%</span>
          </div>
        ))}
        {/* KPI row */}
        <div className="flex items-center justify-center gap-3 mt-1.5 pt-1.5 border-t border-white/5">
          <div className="text-center">
            <p className="text-[10px] font-bold text-cyan-400">{tierIndex === 0 ? '2.4x' : tierIndex === 1 ? '3.8x' : '5.2x'}</p>
            <p className="text-[7px] text-white/30">ROAS</p>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-blue-400">{tierIndex === 0 ? '+45%' : tierIndex === 1 ? '+120%' : '+280%'}</p>
            <p className="text-[7px] text-white/30">Leads</p>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-purple-400">{tierIndex === 0 ? '$12' : tierIndex === 1 ? '$8' : '$5'}</p>
            <p className="text-[7px] text-white/30">CPL</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TierVisual({ tierIndex, serviceKey }: { tierIndex: number; serviceKey: ServiceKey }) {
  if (serviceKey === 'web') return <WebMockup tierIndex={tierIndex} />
  if (serviceKey === 'auto') return <AutoMockup tierIndex={tierIndex} />
  return <MktMockup tierIndex={tierIndex} />
}

/* ── Service Modal ── */
function ServiceModal({
  serviceKey,
  open,
  onClose,
}: {
  serviceKey: ServiceKey
  open: boolean
  onClose: () => void
}) {
  const t = useTranslations(NAMESPACE_MAP[serviceKey])

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-background/95 backdrop-blur-xl border-border/50 sm:max-w-6xl max-h-[92vh] overflow-y-auto p-0"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border/50 bg-background/80 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-4 md:px-6 md:py-4">
          {/* Header - minimal */}
          <DialogHeader className="mb-3">
            <DialogTitle className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl text-center">
              {t('title')}
            </DialogTitle>
          </DialogHeader>

          {/* 3 Tier Rows - text free + separate mockup box */}
          <div className="flex flex-col gap-3">
            {TIERS.map((tier, idx) => {
              // Mockup alternates side: text-left/mockup-right, then reversed
              // Text always left, mockup always right
              const mockupSide = 'md:flex-row'

              return (
                <div
                  key={tier.nameKey}
                  className={`w-full border-b border-white/5 pb-3 last:border-b-0 last:pb-0 md:flex ${idx === 1 ? 'md:justify-center' : idx === 0 ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  <div className={`flex flex-col ${mockupSide} items-center gap-3 md:gap-5 md:max-w-[80%]`}>
                    {/* Text - NO border, NO card, just free text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold text-foreground">{t(tier.nameKey)}</h3>
                        {tier.highlighted && (
                          <span className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-2 py-0.5 text-[8px] font-semibold text-white">
                            {t('mostPopular')}
                          </span>
                        )}
                      </div>
                      <p className="text-xl font-bold text-cyan-400 leading-tight">{t(tier.priceKey)}</p>

                      {/* Features in single column */}
                      <ul className="mt-1.5 flex flex-col gap-0.5">
                        {tier.featKeys.map((featKey) => (
                          <li key={featKey} className="flex items-center gap-1.5">
                            <Check className="h-2.5 w-2.5 shrink-0 text-cyan-400" />
                            <span className="text-sm font-medium leading-tight text-foreground/90">{t(featKey)}</span>
                          </li>
                        ))}
                      </ul>

                    </div>

                    {/* Mockup + CTA below it */}
                    <div className="w-full md:w-[200px] lg:w-[240px] shrink-0 flex flex-col items-center gap-2">
                      <div className="rounded-lg border border-white/10 bg-black/30 p-1.5 shadow-[0_10px_40px_rgba(34,212,254,0.1),0_20px_50px_rgba(0,0,0,0.35)] animate-float">
                        <TierVisual tierIndex={idx} serviceKey={serviceKey} />
                      </div>
                      <Link
                        href="/contact"
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
                          tier.highlighted
                            ? 'btn-glow bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-[1.02]'
                            : 'border border-border/50 text-foreground hover:bg-white/5 hover:border-cyan-500/30'
                        }`}
                      >
                        {t('getStarted')}
                        <ArrowRight className="h-2.5 w-2.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Note */}
          <p className="mt-3 text-center text-[10px] text-muted-foreground">{t('note')}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ServicePillars() {
  const t = useTranslations('ServicePillars')
  const [openModal, setOpenModal] = useState<ServiceKey | null>(null)

  useEffect(() => {
    const EVENT_MAP: Record<string, ServiceKey> = {
      'service-web': 'web',
      'service-auto': 'auto',
      'service-mkt': 'mkt',
    }
    function handler(e: Event) {
      const id = (e as CustomEvent).detail as string
      if (EVENT_MAP[id]) setOpenModal(EVENT_MAP[id])
    }
    window.addEventListener('open-modal', handler)
    return () => window.removeEventListener('open-modal', handler)
  }, [])

  return (
    <>
      <section id="solutions" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              {t('subtitle')}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {t('description')}
            </p>
          </div>

          {/* 3 Service Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3 items-stretch">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.titleKey}
                className={`reveal reveal-delay-${i + 1} gradient-border-premium group relative flex flex-col rounded-xl p-6 md:p-8`}
              >
                {/* Shimmer overlay */}
                <span className="pointer-events-none absolute inset-0 z-[2] overflow-hidden rounded-xl">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-600 ease-in-out group-hover:translate-x-full" />
                </span>
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 mb-5 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] transition-all duration-300">
                  <svc.icon className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground">
                  {t(svc.titleKey)}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(svc.descKey)}
                </p>

                {/* CTA - Opens modal */}
                <div className="mt-auto pt-6">
                  <button
                    onClick={() => setOpenModal(svc.serviceKey)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,212,254,0.1)] cursor-pointer"
                  >
                    {t(svc.ctaKey)}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modals */}
      {openModal && (
        <ServiceModal
          serviceKey={openModal}
          open={true}
          onClose={() => setOpenModal(null)}
        />
      )}
    </>
  )
}
