"use client"

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FaqAccordion } from '@/components/faq-accordion'
import {
  X,
  ArrowRight,
  Check,
  Target,
  Eye,
  BarChart3,
  Zap,
  Cpu,
  HeadphonesIcon,
  Globe,
  Workflow,
  TrendingUp,
  Stethoscope,
  Building2,
  UtensilsCrossed,
  MapPin,
  Dumbbell,
  Scissors,
  GraduationCap,
  PawPrint,
  Scale,
  Hotel,
} from 'lucide-react'

/* ─── Helper ─── */
function openModalEvent(id: string) {
  window.dispatchEvent(new CustomEvent('open-modal', { detail: id }))
}

export { openModalEvent }

/* ─── Types ─── */
type ModalId =
  | 'dental' | 'real-estate' | 'restaurants' | 'tours'
  | 'gyms' | 'salons' | 'schools' | 'vets' | 'legal' | 'hotels'
  | 'industries' | 'about' | 'work' | 'pricing'
  | null

/* ─── Shell ─── */
function ModalShell({ open, onClose, title, children }: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-background/95 backdrop-blur-xl border-border/50 sm:max-w-5xl max-h-[92vh] overflow-y-auto p-0"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border/50 bg-background/80 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl text-center">
              {title}
            </DialogTitle>
          </DialogHeader>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Industry Modal ─── */
const INDUSTRY_NAMESPACES = {
  dental: 'DentalPage',
  'real-estate': 'RealEstatePage',
  restaurants: 'RestaurantsPage',
  tours: 'ToursPage',
  gyms: 'GymPage',
  salons: 'SalonPage',
  schools: 'SchoolPage',
  vets: 'VetPage',
  legal: 'LegalPage',
  hotels: 'HotelPage',
} as const

type IndustryKey = keyof typeof INDUSTRY_NAMESPACES

function IndustryModal({ industryKey, open, onClose }: {
  industryKey: IndustryKey
  open: boolean
  onClose: () => void
}) {
  const ns = INDUSTRY_NAMESPACES[industryKey]
  const t = useTranslations(ns)

  const features = [
    { title: t('feat1Title'), desc: t('feat1Desc') },
    { title: t('feat2Title'), desc: t('feat2Desc') },
    { title: t('feat3Title'), desc: t('feat3Desc') },
    { title: t('feat4Title'), desc: t('feat4Desc') },
  ]

  const faqs = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
    { question: t('faq6Q'), answer: t('faq6A') },
  ]

  return (
    <ModalShell open={open} onClose={onClose} title={t('title')}>
      <p className="text-center text-muted-foreground mb-6">{t('subtitle')}</p>

      {/* Features */}
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feat) => (
          <div key={feat.title} className="gradient-border-static shimmer-card rounded-xl p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)]">
              <Check className="h-5 w-5 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{feat.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-6">
        <FaqAccordion items={faqs} title={t('faqTitle')} />
      </div>

      {/* CTA */}
      <div className="mt-4 text-center">
        <Link
          href="/contact"
          className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
        >
          {t('ctaButton')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </ModalShell>
  )
}

/* ─── Industries Hub Modal ─── */
const INDUSTRIES = [
  { key: 'restaurants' as const, icon: UtensilsCrossed, titleKey: 'restaurantsTitle', descKey: 'restaurantsDesc' },
  { key: 'dental' as const, icon: Stethoscope, titleKey: 'dentalTitle', descKey: 'dentalDesc' },
  { key: 'real-estate' as const, icon: Building2, titleKey: 'realEstateTitle', descKey: 'realEstateDesc' },
  { key: 'salons' as const, icon: Scissors, titleKey: 'salonsTitle', descKey: 'salonsDesc' },
  { key: 'gyms' as const, icon: Dumbbell, titleKey: 'gymsTitle', descKey: 'gymsDesc' },
  { key: 'hotels' as const, icon: Hotel, titleKey: 'hotelsTitle', descKey: 'hotelsDesc' },
  { key: 'tours' as const, icon: MapPin, titleKey: 'toursTitle', descKey: 'toursDesc' },
  { key: 'vets' as const, icon: PawPrint, titleKey: 'vetsTitle', descKey: 'vetsDesc' },
  { key: 'schools' as const, icon: GraduationCap, titleKey: 'schoolsTitle', descKey: 'schoolsDesc' },
  { key: 'legal' as const, icon: Scale, titleKey: 'legalTitle', descKey: 'legalDesc' },
]

function IndustriesHubModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('IndustriesPage')

  return (
    <ModalShell open={open} onClose={onClose} title={t('title')}>
      <p className="text-center text-muted-foreground mb-6">{t('subtitle')}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.key}
            onClick={() => { onClose(); setTimeout(() => openModalEvent(ind.key), 200) }}
            className="gradient-border-static shimmer-card rounded-xl p-5 text-left transition-all hover:bg-white/5 cursor-pointer"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] mb-4">
              <ind.icon className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{t(ind.titleKey)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(ind.descKey)}</p>
          </button>
        ))}
      </div>
    </ModalShell>
  )
}

/* ─── About Modal ─── */
const VALUES = [
  { titleKey: 'value1Title' as const, descKey: 'value1Desc' as const, icon: BarChart3 },
  { titleKey: 'value2Title' as const, descKey: 'value2Desc' as const, icon: Zap },
  { titleKey: 'value3Title' as const, descKey: 'value3Desc' as const, icon: Cpu },
  { titleKey: 'value4Title' as const, descKey: 'value4Desc' as const, icon: HeadphonesIcon },
]

function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('AboutPage')

  return (
    <ModalShell open={open} onClose={onClose} title={t('title')}>
      <p className="text-center text-muted-foreground mb-6">{t('subtitle')}</p>

      {/* Mission & Vision */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="gradient-border-static shimmer-card rounded-xl p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] mb-3">
            <Target className="h-5 w-5 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
          </div>
          <h3 className="text-lg font-bold text-foreground">{t('missionTitle')}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('missionDesc')}</p>
        </div>
        <div className="gradient-border-static shimmer-card rounded-xl p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] mb-3">
            <Eye className="h-5 w-5 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
          </div>
          <h3 className="text-lg font-bold text-foreground">{t('visionTitle')}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('visionDesc')}</p>
        </div>
      </div>

      {/* Values */}
      <h3 className="mt-8 mb-4 text-xl font-bold text-foreground text-center">{t('valuesTitle')}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {VALUES.map((val) => (
          <div key={val.titleKey} className="gradient-border-static shimmer-card rounded-xl p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] mb-3">
              <val.icon className="h-5 w-5 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{t(val.titleKey)}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(val.descKey)}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <Link
          href="/contact"
          className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
        >
          {t('ctaButton')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </ModalShell>
  )
}

/* ─── Work Modal ─── */
const PROJECTS = [
  { titleKey: 'project1Title', descKey: 'project1Desc', tagKey: 'project1Tag' },
  { titleKey: 'project2Title', descKey: 'project2Desc', tagKey: 'project2Tag' },
  { titleKey: 'project3Title', descKey: 'project3Desc', tagKey: 'project3Tag' },
  { titleKey: 'project4Title', descKey: 'project4Desc', tagKey: 'project4Tag' },
] as const

function WorkModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('WorkPage')

  return (
    <ModalShell open={open} onClose={onClose} title={t('title')}>
      <p className="text-center text-muted-foreground mb-6">{t('subtitle')}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((proj) => (
          <div key={proj.titleKey} className="gradient-border-static shimmer-card rounded-xl p-5">
            <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
              {t(proj.tagKey)}
            </span>
            <h3 className="mt-3 text-base font-semibold text-foreground">{t(proj.titleKey)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(proj.descKey)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/contact"
          className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
        >
          {t('ctaButton')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </ModalShell>
  )
}

/* ─── Pricing Modal ─── */
const PRICING_SERVICES = [
  { icon: Globe, nameKey: 'webName' as const, rangeKey: 'webRange' as const, descKey: 'webDesc' as const },
  { icon: Workflow, nameKey: 'autoName' as const, rangeKey: 'autoRange' as const, descKey: 'autoDesc' as const },
  { icon: TrendingUp, nameKey: 'mktName' as const, rangeKey: 'mktRange' as const, descKey: 'mktDesc' as const },
]

function PricingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('PricingPage')

  const faqItems = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
    { question: t('faq6Q'), answer: t('faq6A') },
  ]

  return (
    <ModalShell open={open} onClose={onClose} title={t('title')}>
      <p className="text-center text-muted-foreground mb-6">{t('subtitle')}</p>

      <div className="grid gap-4 md:grid-cols-3">
        {PRICING_SERVICES.map((svc) => (
          <div key={svc.nameKey} className="gradient-border-static shimmer-card rounded-xl p-5 flex flex-col">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,212,254,0.15),0_0_40px_rgba(34,212,254,0.05)] mb-4">
              <svc.icon className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,212,254,0.6)]" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{t(svc.nameKey)}</h3>
            <p className="mt-1 text-xl font-bold text-cyan-400">{t(svc.rangeKey)}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(svc.descKey)}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">{t('note')}</p>

      <div className="mt-4">
        <FaqAccordion items={faqItems} title={t('faqTitle')} />
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/contact"
          className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
        >
          {t('ctaButton')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </ModalShell>
  )
}

/* ─── Global Modals Controller ─── */
export function GlobalModals() {
  const [activeModal, setActiveModal] = useState<ModalId>(null)

  useEffect(() => {
    function handler(e: Event) {
      const id = (e as CustomEvent).detail as string
      setActiveModal(id as ModalId)
    }
    window.addEventListener('open-modal', handler)
    return () => window.removeEventListener('open-modal', handler)
  }, [])

  const close = () => setActiveModal(null)

  return (
    <>
      {/* Industry modals */}
      {(['dental', 'real-estate', 'restaurants', 'tours', 'gyms', 'salons', 'schools', 'vets', 'legal', 'hotels'] as const).map((key) => (
        <IndustryModal
          key={key}
          industryKey={key}
          open={activeModal === key}
          onClose={close}
        />
      ))}

      {/* Industries hub */}
      <IndustriesHubModal open={activeModal === 'industries'} onClose={close} />

      {/* About */}
      <AboutModal open={activeModal === 'about'} onClose={close} />

      {/* Work */}
      <WorkModal open={activeModal === 'work'} onClose={close} />

      {/* Pricing */}
      <PricingModal open={activeModal === 'pricing'} onClose={close} />
    </>
  )
}
