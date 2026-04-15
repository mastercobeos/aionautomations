"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { ArrowRight, ArrowLeft, Check, RotateCcw, Sparkles } from "lucide-react"

type Answer = "web" | "auto" | "mkt"

const QUESTIONS: { key: string; options: { labelKey: string; weight: Answer }[] }[] = [
  {
    key: "q1",
    options: [
      { labelKey: "q1o1", weight: "web" },
      { labelKey: "q1o2", weight: "auto" },
      { labelKey: "q1o3", weight: "mkt" },
    ],
  },
  {
    key: "q2",
    options: [
      { labelKey: "q2o1", weight: "web" },
      { labelKey: "q2o2", weight: "auto" },
      { labelKey: "q2o3", weight: "mkt" },
    ],
  },
  {
    key: "q3",
    options: [
      { labelKey: "q3o1", weight: "auto" },
      { labelKey: "q3o2", weight: "mkt" },
      { labelKey: "q3o3", weight: "web" },
    ],
  },
  {
    key: "q4",
    options: [
      { labelKey: "q4o1", weight: "web" },
      { labelKey: "q4o2", weight: "mkt" },
      { labelKey: "q4o3", weight: "auto" },
    ],
  },
  {
    key: "q5",
    options: [
      { labelKey: "q5o1", weight: "web" },
      { labelKey: "q5o2", weight: "auto" },
      { labelKey: "q5o3", weight: "mkt" },
    ],
  },
]

const RESULT_ROUTES: Record<Answer, "/services/web" | "/services/automations" | "/services/marketing"> = {
  web: "/services/web",
  auto: "/services/automations",
  mkt: "/services/marketing",
}

export function DiagnosticQuiz() {
  const t = useTranslations("DiagnosticQuiz")
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<(Answer | null)[]>(Array(QUESTIONS.length).fill(null))
  const [finished, setFinished] = useState(false)

  const progress = useMemo(() => {
    if (finished) return 100
    return Math.round((step / QUESTIONS.length) * 100)
  }, [step, finished])

  const handleSelect = (weight: Answer) => {
    const next = [...answers]
    next[step] = weight
    setAnswers(next)
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1)
      } else {
        setFinished(true)
      }
    }, 180)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers(Array(QUESTIONS.length).fill(null))
    setFinished(false)
  }

  const result = useMemo<Answer>(() => {
    const counts: Record<Answer, number> = { web: 0, auto: 0, mkt: 0 }
    answers.forEach((a) => {
      if (a) counts[a]++
    })
    let winner: Answer = "web"
    let max = -1
    ;(["auto", "web", "mkt"] as Answer[]).forEach((k) => {
      if (counts[k] > max) {
        max = counts[k]
        winner = k
      }
    })
    return winner
  }, [answers])

  if (finished) {
    const prefix = result === "auto" ? "resultAuto" : result === "mkt" ? "resultMkt" : "resultWeb"
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent p-6 md:p-10">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            {t("resultBadge")}
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
          {t(`${prefix}Title`)}
        </h2>

        <p className="mt-4 text-muted-foreground leading-relaxed">
          {t(`${prefix}Desc`)}
        </p>

        <ul className="mt-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10">
                <Check className="h-3 w-3 text-cyan-400" />
              </div>
              {t(`${prefix}Point${i}`)}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={RESULT_ROUTES[result]}
            className="btn-glow inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          >
            {t("ctaService")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-500/10"
          >
            {t("ctaBookCall")}
          </Link>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            {t("ctaRestart")}
          </button>
        </div>
      </div>
    )
  }

  const currentQ = QUESTIONS[step]

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            {t("stepLabel", { current: step + 1, total: QUESTIONS.length })}
          </span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-cyan-500/20 bg-white/[0.03] p-6 md:p-10">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          {t(`${currentQ.key}Title`)}
        </h2>

        <div className="mt-6 space-y-3">
          {currentQ.options.map((opt) => {
            const selected = answers[step] === opt.weight
            return (
              <button
                key={opt.labelKey}
                type="button"
                onClick={() => handleSelect(opt.weight)}
                className={`group flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all ${
                  selected
                    ? "border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,212,254,0.2)]"
                    : "border-border/50 bg-background/30 hover:border-cyan-500/40 hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-sm font-medium text-foreground">
                  {t(opt.labelKey)}
                </span>
                <ArrowRight
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    selected ? "translate-x-1 text-cyan-400" : "text-muted-foreground group-hover:translate-x-1 group-hover:text-cyan-400"
                  }`}
                />
              </button>
            )
          })}
        </div>

        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </button>
        )}
      </div>
    </div>
  )
}
