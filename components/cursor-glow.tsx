"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    // No cursor on mobile — skip entirely
    if (window.innerWidth < 768) return

    let rafId: number
    const onMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        glow.style.left = `${e.clientX}px`
        glow.style.top = `${e.clientY}px`
        glow.style.opacity = "1"
      })
    }

    const onLeave = () => {
      glow.style.opacity = "0"
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500"
      style={{
        zIndex: 1,
        background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, rgba(34,211,238,0.02) 30%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  )
}
