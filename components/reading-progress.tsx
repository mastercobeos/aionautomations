"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector("article")
      if (!article) return

      const scrollY = window.scrollY
      const articleTop = article.offsetTop
      const articleHeight = article.offsetHeight
      const viewportHeight = window.innerHeight

      setVisible(scrollY > 100)

      const raw = ((scrollY - articleTop) / (articleHeight - viewportHeight)) * 100
      setProgress(Math.min(100, Math.max(0, raw)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-full z-[60] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
