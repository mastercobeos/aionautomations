"use client"

import { useEffect, useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import { List, X } from "lucide-react"

export function BlogTocMobile({ sections }: { sections: { id: string; title: string }[] }) {
  const t = useTranslations("BlogToc")
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(sections[0]?.id ?? null)

  /* Scroll-spy (same logic as blog-toc.tsx) */
  useEffect(() => {
    if (typeof window === "undefined") return
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [sections])

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setOpen(false)
    // Small delay to allow drawer to close before scrolling
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top, behavior: "smooth" })
        setActive(id)
      }
    }, 150)
  }, [])

  if (sections.length < 2) return null

  return (
    <div className="xl:hidden">
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label={t("title")}
        className="fixed bottom-20 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/90 text-cyan-400 shadow-lg backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_16px_rgba(6,182,212,0.2)]"
      >
        <List className="h-5 w-5" />
      </button>

      {/* Backdrop + Drawer */}
      {open && (
        <div className="fixed inset-0 z-[70]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[40vh] overflow-y-auto rounded-t-2xl border-t border-border/50 bg-background p-5 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <List className="h-3.5 w-3.5" />
                {t("title")}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav>
              <ol className="space-y-2 text-sm">
                {sections.map((s, i) => {
                  const isActive = active === s.id
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => handleClick(e, s.id)}
                        className={`flex items-start gap-2 border-l-2 py-1 pl-3 transition-colors ${
                          isActive
                            ? "border-cyan-400 text-cyan-300 font-medium"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        <span className="text-[11px] tabular-nums text-muted-foreground/70 pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="line-clamp-2">{s.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
