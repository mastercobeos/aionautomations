"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Calculator, Sparkles, BookOpen } from "lucide-react"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslations } from 'next-intl'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const industriesRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Navbar');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
      if (industriesRef.current && !industriesRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false)
      }
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const SERVICE_LINKS = [
    { label: t('webDesignNav'), href: "/services/web" as const },
    { label: t('automationNav'), href: "/services/automations" as const },
    { label: t('marketingNav'), href: "/services/marketing" as const },
  ]

  const INDUSTRY_LINKS = [
    { label: t('restaurants'), href: "/industries/restaurants" as const },
    { label: t('dental'), href: "/industries/dental" as const },
    { label: t('realEstate'), href: "/industries/real-estate" as const },
    { label: t('salons'), href: "/industries/salons" as const },
    { label: t('gyms'), href: "/industries/gyms" as const },
    { label: t('hotels'), href: "/industries/hotels" as const },
    { label: t('tours'), href: "/industries/tours" as const },
    { label: t('vets'), href: "/industries/vets" as const },
    { label: t('schools'), href: "/industries/schools" as const },
    { label: t('legal'), href: "/industries/legal" as const },
  ]

  const RESOURCE_LINKS = [
    { label: t('quiz'), sub: t('quizSub'), href: "/quiz" as const, icon: Sparkles, featured: true },
    { label: t('roiCalculator'), sub: t('roiCalculatorSub'), href: "/roi-calculator" as const, icon: Calculator, featured: true },
    { label: t('blog'), sub: t('blogSub'), href: "/blog" as const, icon: BookOpen, featured: false },
  ]

  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav-scrolled' : 'glass-nav'}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-0 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label={t('logoAriaLabel')}>
          <Image
            src="/LOGO.webp"
            alt="AION Automations"
            width={180}
            height={154}
            className="h-10 w-auto sm:h-12"
            priority
            sizes="(max-width: 640px) 64px, 80px"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {/* Services dropdown */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => { setServicesOpen(!servicesOpen); setIndustriesOpen(false) }}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
            >
              {t('services')}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 rounded-lg border border-border/50 bg-background/95 backdrop-blur-md p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setServicesOpen(false)}
                    className="block w-full rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Industries dropdown */}
          <div ref={industriesRef} className="relative">
            <button
              onClick={() => { setIndustriesOpen(!industriesOpen); setServicesOpen(false) }}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
              aria-expanded={industriesOpen}
              aria-haspopup="menu"
            >
              {t('industries')}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {industriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-border/50 bg-background/95 backdrop-blur-md p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/industries"
                  onClick={() => setIndustriesOpen(false)}
                  className="block w-full rounded-md px-3 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-muted"
                >
                  {t('industries')}
                </Link>
                <div className="my-1 h-px bg-border/50" />
                {INDUSTRY_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIndustriesOpen(false)}
                    className="block w-full rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/work" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap">
            {t('work')}
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap">
            {t('pricing')}
          </Link>

          {/* Resources dropdown */}
          <div ref={resourcesRef} className="relative">
            <button
              onClick={() => { setResourcesOpen(!resourcesOpen); setServicesOpen(false); setIndustriesOpen(false) }}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
              aria-expanded={resourcesOpen}
              aria-haspopup="menu"
            >
              {t('resources')}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {resourcesOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-lg border border-border/50 bg-background/95 backdrop-blur-md p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                {RESOURCE_LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setResourcesOpen(false)}
                      className="group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
                    >
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${link.featured ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30' : 'bg-white/[0.04] border border-border/50'}`}>
                        <Icon className={`h-4 w-4 ${link.featured ? 'text-cyan-400' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-cyan-300 transition-colors">{link.label}</p>
                        <p className="text-xs text-muted-foreground">{link.sub}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap">
            {t('about')}
          </Link>

          <div className="h-5 w-px bg-border shrink-0" aria-hidden />
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="btn-glow inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-[1.02] whitespace-nowrap"
            >
              {t('bookCall')}
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-nav-scrolled border-t border-border/30 lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-0.5 px-4 py-3 sm:px-6">
            {/* Services submenu */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t('services')}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-6 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            {/* Industries submenu */}
            <button
              onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t('industries')}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileIndustriesOpen && (
              <>
                <Link
                  href="/industries"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-6 py-3 text-sm font-medium text-cyan-400 transition-colors hover:bg-muted"
                >
                  {t('industries')}
                </Link>
                {INDUSTRY_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-6 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            <Link
              href="/work"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t('work')}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t('pricing')}
            </Link>

            {/* Resources submenu */}
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t('resources')}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileResourcesOpen && RESOURCE_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-6 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className={`h-4 w-4 ${link.featured ? 'text-cyan-400' : 'text-muted-foreground'}`} />
                  {link.label}
                </Link>
              )
            })}

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t('about')}
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            >
              {t('bookCall')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
