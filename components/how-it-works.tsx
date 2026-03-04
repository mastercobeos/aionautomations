import { useTranslations } from 'next-intl';

export function HowItWorks() {
  const t = useTranslations('HowItWorks');

  const STEPS = [
    {
      number: "01",
      title: t('step1Title'),
      description: t('step1Desc'),
    },
    {
      number: "02",
      title: t('step2Title'),
      description: t('step2Desc'),
    },
    {
      number: "03",
      title: t('step3Title'),
      description: t('step3Desc'),
    },
    {
      number: "04",
      title: t('step4Title'),
      description: t('step4Desc'),
    },
  ]

  return (
    <section id="how-it-works" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {t('sectionSubtitle')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('sectionDesc')}
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.number} className={`reveal reveal-delay-${index + 1} relative flex items-start`}>
              {/* Animated connector line (desktop) */}
              {index < STEPS.length - 1 && (
                <div className="absolute top-10 left-[calc(100%+2px)] hidden h-0.5 w-[calc(100%-8px)] lg:block z-10">
                  <div className="timeline-connector h-full bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
                </div>
              )}

              <div className="gradient-border-static shimmer-card w-full rounded-2xl p-6 md:p-8 transition-all duration-300">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 mb-4">
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
