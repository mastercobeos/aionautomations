import { ArrowLeft } from "lucide-react"
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <meta name="robots" content="noindex, nofollow" />
      <title>{`404 | AION Automations`}</title>
      <Navbar />

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" aria-hidden="true" />

        <p className="text-8xl font-bold gradient-text-animated sm:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          {t('description')}
        </p>
        <Link
          href="/"
          className="btn-glow mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Link>
      </div>

      <Footer />
    </div>
  )
}
