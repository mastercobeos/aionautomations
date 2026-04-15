"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { List } from "lucide-react"

export function BlogToc({ sections }: { sections: { id: string; title: string }[] }) {
  const t = useTranslations("BlogToc")
  const [active, setActive] = useState<string | null>(sections[0]?.id ?? null)

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

  if (sections.length < 2) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: "smooth" })
      setActive(id)
    }
  }

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-28 w-64">
        <div className="rounded-xl border border-border/50 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <List className="h-3.5 w-3.5" />
            {t("title")}
          </div>
          <nav className="mt-4">
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
    </aside>
  )
}
