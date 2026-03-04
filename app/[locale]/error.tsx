"use client"

import { RefreshCw } from "lucide-react"
import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('ErrorPage');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-red-500/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <p className="text-7xl font-bold text-red-400 sm:text-8xl">Error</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        {t('description')}
      </p>
      <button
        onClick={reset}
        className="btn-glow mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
      >
        <RefreshCw className="h-4 w-4" />
        {t('retry')}
      </button>
    </div>
  )
}
