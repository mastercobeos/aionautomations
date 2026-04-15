"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { ArrowRight, TrendingUp, Clock, DollarSign, Target } from "lucide-react"

const CLOSE_RATE_UPLIFT = 1.4
const HOURS_REDUCTION = 0.7
const STARTER_INVESTMENT = 897
const GROWTH_INVESTMENT = 2497

const fmtMoney = (n: number, locale: string) => {
  return new Intl.NumberFormat(locale === "es" ? "es-MX" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)))
}

export function RoiCalculator({ locale }: { locale: string }) {
  const t = useTranslations("RoiCalculator")

  const [leads, setLeads] = useState(50)
  const [closeRate, setCloseRate] = useState(15)
  const [ticket, setTicket] = useState(500)
  const [hours, setHours] = useState(10)

  const results = useMemo(() => {
    const currentRev = leads * (closeRate / 100) * ticket
    const newCloseRate = Math.min(closeRate * CLOSE_RATE_UPLIFT, 100)
    const projectedRev = leads * (newCloseRate / 100) * ticket
    const extraMonthly = projectedRev - currentRev
    const extraYearly = extraMonthly * 12
    const hoursRecoveredMonth = hours * HOURS_REDUCTION * 4
    const monthsToPayoff = extraMonthly > 0 ? STARTER_INVESTMENT / extraMonthly : 0
    const roi12 =
      extraYearly > 0
        ? ((extraYearly - GROWTH_INVESTMENT) / GROWTH_INVESTMENT) * 100
        : 0
    return {
      currentRev,
      projectedRev,
      extraMonthly,
      extraYearly,
      hoursRecoveredMonth,
      monthsToPayoff,
      roi12,
      newCloseRate,
    }
  }, [leads, closeRate, ticket, hours])

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="lg:col-span-2 rounded-2xl border border-cyan-500/20 bg-white/[0.03] p-6 md:p-8">
        <h2 className="text-lg font-semibold text-foreground">{t("inputsTitle")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("inputsDesc")}</p>

        <div className="mt-6 space-y-6">
          <SliderInput
            label={t("leadsLabel")}
            value={leads}
            onChange={setLeads}
            min={5}
            max={500}
            step={5}
            suffix=""
          />
          <SliderInput
            label={t("closeRateLabel")}
            value={closeRate}
            onChange={setCloseRate}
            min={1}
            max={80}
            step={1}
            suffix="%"
          />
          <SliderInput
            label={t("ticketLabel")}
            value={ticket}
            onChange={setTicket}
            min={50}
            max={10000}
            step={50}
            prefix="$"
            suffix=" USD"
          />
          <SliderInput
            label={t("hoursLabel")}
            value={hours}
            onChange={setHours}
            min={1}
            max={40}
            step={1}
            suffix={` ${t("hoursUnit")}`}
          />
        </div>

        <div className="mt-6 rounded-lg border border-border/50 bg-background/40 p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t("assumptionNote")}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3 space-y-4">
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent p-6 md:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
            <TrendingUp className="h-3 w-3" />
            {t("resultsBadge")}
          </span>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ResultCard
              icon={<DollarSign className="h-5 w-5 text-cyan-400" />}
              label={t("extraMonthlyLabel")}
              value={fmtMoney(results.extraMonthly, locale)}
              emphasis
            />
            <ResultCard
              icon={<TrendingUp className="h-5 w-5 text-green-400" />}
              label={t("extraYearlyLabel")}
              value={fmtMoney(results.extraYearly, locale)}
              emphasis
              accent="green"
            />
            <ResultCard
              icon={<Clock className="h-5 w-5 text-purple-400" />}
              label={t("hoursRecoveredLabel")}
              value={`${Math.round(results.hoursRecoveredMonth)} ${t("hoursUnit")}`}
            />
            <ResultCard
              icon={<Target className="h-5 w-5 text-cyan-400" />}
              label={t("payoffLabel")}
              value={
                results.monthsToPayoff > 0 && results.monthsToPayoff < 100
                  ? `${results.monthsToPayoff.toFixed(1)} ${t("monthsUnit")}`
                  : "—"
              }
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-white/[0.02] p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat
              label={t("currentRevLabel")}
              value={fmtMoney(results.currentRev, locale)}
            />
            <Stat
              label={t("projectedRevLabel")}
              value={fmtMoney(results.projectedRev, locale)}
              highlight
            />
            <Stat
              label={t("roi12Label")}
              value={
                results.roi12 > 0
                  ? `${Math.round(results.roi12)}%`
                  : "—"
              }
              highlight
            />
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6">
          <h3 className="text-lg font-bold text-foreground">{t("ctaTitle")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("ctaDesc")}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-white/5 hover:border-cyan-500/40"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-sm font-semibold text-cyan-300 tabular-nums">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-cyan-400"
      />
    </div>
  )
}

function ResultCard({
  icon,
  label,
  value,
  emphasis,
  accent = "cyan",
}: {
  icon: React.ReactNode
  label: string
  value: string
  emphasis?: boolean
  accent?: "cyan" | "green"
}) {
  const valueColor =
    accent === "green"
      ? "text-green-400"
      : emphasis
      ? "text-cyan-400"
      : "text-foreground"
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-4">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className={`mt-2 text-2xl font-bold tabular-nums ${valueColor}`}>
        {value}
      </p>
    </div>
  )
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1 text-lg font-bold tabular-nums ${
          highlight ? "text-cyan-300" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  )
}
