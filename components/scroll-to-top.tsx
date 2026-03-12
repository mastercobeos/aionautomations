"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { useTranslations } from "next-intl"

export function ScrollToTop() {
  const [show, setShow] = useState(false)
  const t = useTranslations("ScrollToTop")

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("ariaLabel")}
      className={`fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/40 bg-[rgba(5,10,30,0.8)] text-cyan-400 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:scale-110 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  )
}
