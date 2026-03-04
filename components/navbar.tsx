"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link } from "@/i18n/routing"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslations } from 'next-intl'
import { openModalEvent } from './global-modals'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const industriesRef = useRef<HTMLDivElement>(null)
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
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const SERVICE_LINKS = [
    { label: t('webDesignNav'), modalId: "service-web" },
    { label: t('automationNav'), modalId: "service-auto" },
    { label: t('marketingNav'), modalId: "service-mkt" },
  ]

  const INDUSTRY_LINKS = [
    { label: t('restaurants'), modalId: "restaurants" },
    { label: t('dental'), modalId: "dental" },
    { label: t('realEstate'), modalId: "real-estate" },
    { label: t('salons'), modalId: "salons" },
    { label: t('gyms'), modalId: "gyms" },
    { label: t('hotels'), modalId: "hotels" },
    { label: t('tours'), modalId: "tours" },
    { label: t('vets'), modalId: "vets" },
    { label: t('schools'), modalId: "schools" },
    { label: t('legal'), modalId: "legal" },
  ]

  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav-scrolled' : 'glass-nav'}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-0 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="AION Automations - Inicio">
          <img
            src="/LOGO.svg"
            alt=""
            role="presentation"
            className="h-16 w-auto sm:h-20"
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
            >
              {t('services')}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 rounded-lg border border-border/50 bg-background/95 backdrop-blur-md p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                {SERVICE_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => { setServicesOpen(false); openModalEvent(link.modalId) }}
                    className="block w-full text-left rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                  >
                    {link.label}
                  </button>
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
            >
              {t('industries')}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {industriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-border/50 bg-background/95 backdrop-blur-md p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => { setIndustriesOpen(false); openModalEvent('industries') }}
                  className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-muted cursor-pointer"
                >
                  {t('industries')}
                </button>
                <div className="my-1 h-px bg-border/50" />
                {INDUSTRY_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => { setIndustriesOpen(false); openModalEvent(link.modalId) }}
                    className="block w-full text-left rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => openModalEvent('work')} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap cursor-pointer">
            {t('work')}
          </button>
          <button onClick={() => openModalEvent('pricing')} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap cursor-pointer">
            {t('pricing')}
          </button>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap">
            {t('blog')}
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
              <button
                key={link.label}
                onClick={() => { setMobileOpen(false); openModalEvent(link.modalId) }}
                className="rounded-lg px-6 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            {/* Industries submenu */}
            <button
              onClick={() => { setMobileOpen(false); openModalEvent('industries') }}
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-cyan-400 transition-colors hover:bg-muted cursor-pointer"
            >
              {t('industries')}
            </button>
            {INDUSTRY_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => { setMobileOpen(false); openModalEvent(link.modalId) }}
                className="rounded-lg px-6 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => { setMobileOpen(false); openModalEvent('work') }}
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
            >
              {t('work')}
            </button>
            <button
              onClick={() => { setMobileOpen(false); openModalEvent('pricing') }}
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
            >
              {t('pricing')}
            </button>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t('blog')}
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
