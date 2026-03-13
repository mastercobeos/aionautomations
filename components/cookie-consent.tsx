"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const t = useTranslations("CookieConsent")

  useEffect(() => {
    // Delay check to avoid any render impact
    const timer = setTimeout(() => {
      if (!localStorage.getItem("cookie-consent")) {
        setShow(true)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShow(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="mx-auto max-w-4xl px-4 pb-4">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-background/95 backdrop-blur-md px-5 py-4 shadow-xl sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            {t("message")}{" "}
            <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
              {t("learnMore")}
            </Link>
          </p>
          <button
            onClick={accept}
            className="shrink-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:scale-[1.02]"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  )
}
