import { Shield, Infinity, Zap, ArrowRight, CheckCircle2, TrendingUp, Bell } from "lucide-react"
import { useTranslations } from 'next-intl';
import { HeroParticles } from './hero-particles';
import { GlobeWorld } from './globe-world';

export function Hero() {
  const t = useTranslations('Hero');

  const TRUST_ITEMS = [
    { icon: Shield, label: t('trustSecure') },
    { icon: Infinity, label: t('trustScale') },
    { icon: Zap, label: t('trustAi') },
  ]

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="hero-bg-slide" aria-hidden="true" />
        <div className="hero-grid-bg" aria-hidden="true" />
        {/* Interactive particles */}
        <HeroParticles />
        {/* Ambient glow orbs */}
        <div className="hero-glow-orb hero-glow-orb-cyan" style={{ top: '10%', left: '15%' }} aria-hidden="true" />
        <div className="hero-glow-orb hero-glow-orb-purple" style={{ top: '40%', right: '10%' }} aria-hidden="true" />
        <div className="hero-glow-orb hero-glow-orb-cyan" style={{ top: '60%', right: '25%', opacity: 0.08 }} aria-hidden="true" />
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-10 lg:px-8">
        <div className="grid grid-cols-1 gap-4 items-center md:grid-cols-2 lg:gap-4">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Badge — NO TOCAR */}
            <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/50 px-4 py-1.5 text-sm text-cyan-400 shadow-[0_0_15px_rgba(34,212,254,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {t('badge')}
            </div>

            {/* H1 */}
            <h1 className="animate-fade-up text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-5xl">
              {t('title1')}{" "}
              {t('title2')}{" "}
              <br className="hidden sm:block" />
              <span className="gradient-text-animated">
                {t('titleHighlight')}
              </span>{" "}
              {t('title3')}
            </h1>

            {/* Subtexto */}
            <p className="animate-fade-up-delay-1 mt-4 text-pretty text-lg leading-[1.5] text-foreground/85 md:text-xl" style={{ maxWidth: '550px' }}>
              {t('subtitle')}
            </p>

            {/* CTAs — NO TOCAR */}
            <div className="animate-fade-up-delay-2 mt-6">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#contact"
                  className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3 text-base font-semibold text-white transition-all hover:scale-[1.02]"
                >
                  {t('quoteCta')}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2 rounded-xl border border-foreground/20 px-6 py-3 text-base font-semibold text-foreground/90 transition-all hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5"
                >
                  {t('casesCta')}
                </a>
              </div>
              {/* Microcopy — NO TOCAR texto */}
              <p className="mt-3 text-xs text-foreground/85">{t('ctaMini')}</p>
              {/* [NOTA: Ajustar "2 semanas" al tiempo real de entrega antes de publicar] */}
              <p className="mt-1 text-xs text-foreground/85">{t('ctaDelivery')}</p>
            </div>

            {/* Social proof - stat based, no fake testimonials */}
            <div className="animate-fade-up-delay-3 mt-5">
              <p className="text-xs text-foreground/60 max-w-[500px] mx-auto lg:mx-0">
                {t('socialProofStat')}
              </p>
            </div>

            {/* Trust Row — NO TOCAR texto */}
            <ul className="animate-fade-up-delay-3 mt-6 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 list-none m-0 p-0">
              {TRUST_ITEMS.map((item) => (
                <li key={item.label} className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <div className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/15 shadow-[0_0_10px_rgba(34,212,254,0.2)]" aria-hidden="true">
                    <item.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-cyan-300 drop-shadow-[0_0_4px_rgba(34,212,254,0.6)]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground/80">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Interactive Globe + Floating Cards (hidden on mobile to fit viewport) */}
          <div className="animate-fade-up-delay-1 hidden md:flex justify-center lg:justify-center lg:-mt-40">
            <div className="relative">
              <GlobeWorld ariaLabel={t('globeAlt')} />

              {/* Floating cards */}
              <div className="hero-floating-card hero-floating-card-1 hidden md:flex" aria-hidden="true">
                <span className="hero-floating-card-icon hero-floating-card-icon--green">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span>{t('card1')}</span>
                <span className="hero-floating-card-dot hero-floating-card-dot--green" />
              </div>
              <div className="hero-floating-card hero-floating-card-2 hidden md:flex" aria-hidden="true">
                <span className="hero-floating-card-icon hero-floating-card-icon--cyan">
                  <TrendingUp className="h-3.5 w-3.5" />
                </span>
                <span>{t('card2')}</span>
                <span className="hero-floating-card-dot hero-floating-card-dot--cyan" />
              </div>
              <div className="hero-floating-card hero-floating-card-3 hidden md:flex" aria-hidden="true">
                <span className="hero-floating-card-icon hero-floating-card-icon--purple">
                  <Bell className="h-3.5 w-3.5" />
                </span>
                <span>{t('card3')}</span>
                <span className="hero-floating-card-dot hero-floating-card-dot--purple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
