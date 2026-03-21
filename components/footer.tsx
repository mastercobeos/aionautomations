import { useTranslations } from 'next-intl';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-border/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Brand + tagline */}
        <div className="reveal mb-10 text-center">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/LOGO.webp"
              alt="AION Automations"
              width={120}
              height={80}
              className="h-16 w-auto md:h-20"
              loading="lazy"
              sizes="(max-width: 640px) 64px, 80px"
            />
          </Link>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t('tagline')}
          </p>
          <p className="mt-2 text-xs font-medium text-cyan-400/80">
            {t('uspTagline')}
          </p>
        </div>

        {/* Grid: Services, Company, Social, Legal */}
        <div className="grid gap-8 border-t border-border/50 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Services */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('services')}
            </h2>
            <nav className="mt-4 flex flex-col gap-3" aria-label={t('services')}>
              <Link href="/services/web" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('serviceWeb')}
              </Link>
              <Link href="/services/automations" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('serviceAutomations')}
              </Link>
              <Link href="/services/marketing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('serviceMarketing')}
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('company')}
            </h2>
            <nav className="mt-4 flex flex-col gap-3" aria-label={t('company')}>
              <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('aboutUs')}
              </Link>
              <Link href="/work" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('portfolio')}
              </Link>
              <Link href="/industries" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('industries')}
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('blogLink')}
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('pricing')}
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('contact')}
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('followUs')}
            </h2>
            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-3 text-purple-400/80 transition-all hover:border-purple-400/50 hover:bg-purple-500/20 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.facebook.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-400/80 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(34,212,254,0.2)]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 text-cyan-400/80 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(34,212,254,0.2)]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('legal')}
            </h2>
            <nav className="mt-4 flex flex-col gap-3" aria-label={t('legal')}>
              <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('privacy')}
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('terms')}
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8">
          <div className="section-divider-gradient mb-8" />
          <p className="text-center text-sm text-muted-foreground">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
