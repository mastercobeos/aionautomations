import { ArrowRight } from "lucide-react"
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function AuditSection() {
  const t = useTranslations('AuditSection');

  return (
    <section id="audit" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-white/[0.04] to-transparent p-10 text-center backdrop-blur-sm md:p-16 shadow-[0_0_80px_rgba(59,130,246,0.06)]">
          {/* Top glow line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent rounded-t-3xl" />

          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {t('subtitle')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/35 hover:scale-[1.02]"
            >
              {t('button')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
