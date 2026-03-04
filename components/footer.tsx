import { useTranslations } from 'next-intl';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
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
            <img
              src="/LOGO.svg"
              alt="AION Automations"
              className="h-16 w-auto md:h-20"
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('services')}
            </h3>
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('company')}
            </h3>
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('followUs')}
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-transparent p-2 text-muted-foreground transition-all hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,212,254,0.15)]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.facebook.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-transparent p-2 text-muted-foreground transition-all hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,212,254,0.15)]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-transparent p-2 text-muted-foreground transition-all hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,212,254,0.15)]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t('legal')}
            </h3>
            <nav className="mt-4 flex flex-col gap-3" aria-label={t('legal')}>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('privacy')}
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t('terms')}
              </a>
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
