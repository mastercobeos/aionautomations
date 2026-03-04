"use client"

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

export function FinalCTA() {
  const t = useTranslations('FinalCTA');

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal-scale relative mx-auto max-w-3xl gradient-border-card overflow-hidden px-8 py-16 text-center md:px-12 md:py-20">
          {/* Top gradient line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t('title')}
            <span className="gradient-text-animated">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {t('description')}
          </p>

          <a
            href="https://wa.me/13028188842?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(34,212,254,0.3)]"
          >
            <MessageCircle className="h-5 w-5" />
            {t('bookCall')}
          </a>

          <p className="mt-3 text-xs text-muted-foreground/60">
            {t('noCommitment')}
          </p>
        </div>
      </div>
    </section>
  )
}
