"use client"

import { useEffect, useRef } from "react"

const PARTICLE_COUNT = 56
const REPEL_RADIUS = 150
const REPEL_STRENGTH = 8
const RETURN_SPEED = 0.015

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  baseAlpha: number
  driftSpeed: number
  driftAngle: number
  driftRadius: number
  wanderAngle: number
  wanderStrength: number
}

const COLORS = [
  { r: 34, g: 212, b: 254 },  // cyan
  { r: 34, g: 212, b: 254 },  // cyan (more weight)
  { r: 115, g: 120, b: 255 }, // purple
  { r: 2, g: 137, b: 255 },   // blue
]

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Check reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let w = 0
    let h = 0

    function resize() {
      const dpr = window.devicePixelRatio || 1
      w = canvas!.offsetWidth
      h = canvas!.offsetHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initParticles() {
      const particles: Particle[] = []

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        const size = Math.random() * 4 + 1.5
        const baseAlpha = Math.random() * 0.5 + 0.3
        const x = Math.random() * w
        const y = Math.random() * h

        const speed = Math.random() * 0.6 + 0.3
        const angle = Math.random() * Math.PI * 2

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          color: `${color.r}, ${color.g}, ${color.b}`,
          alpha: baseAlpha,
          baseAlpha,
          driftSpeed: Math.random() * 0.003 + 0.001,
          driftAngle: Math.random() * Math.PI * 2,
          driftRadius: Math.random() * 80 + 40,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderStrength: Math.random() * 0.15 + 0.05,
        })
      }

      particlesRef.current = particles
    }

    function animate() {
      ctx!.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particlesRef.current) {
        // Gentle drift around origin
        p.driftAngle += p.driftSpeed
        const targetX = p.originX + Math.cos(p.driftAngle) * p.driftRadius
        const targetY = p.originY + Math.sin(p.driftAngle * 0.7) * p.driftRadius

        // Random wandering force — keeps particles lively
        p.wanderAngle += (Math.random() - 0.5) * 0.3
        p.vx += Math.cos(p.wanderAngle) * p.wanderStrength
        p.vy += Math.sin(p.wanderAngle) * p.wanderStrength

        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force
          p.vy += Math.sin(angle) * force
          p.alpha = Math.min(1, p.baseAlpha + (1 - dist / REPEL_RADIUS) * 0.5)
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05
        }

        // Spring back to drifting target
        p.vx += (targetX - p.x) * RETURN_SPEED
        p.vy += (targetY - p.y) * RETURN_SPEED

        // Damping
        p.vx *= 0.95
        p.vy *= 0.95

        p.x += p.vx
        p.y += p.vy

        // Draw particle
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx!.fill()

        // Glow
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.3})`)
        gradient.addColorStop(1, `rgba(${p.color}, 0)`)
        ctx!.fillStyle = gradient
        ctx!.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // Track mouse globally so it works even over content/overlay
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    function onMouseLeave() {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    function onTouchMove(e: TouchEvent) {
      const rect = canvas!.getBoundingClientRect()
      const touch = e.touches[0]
      mouseRef.current.x = touch.clientX - rect.left
      mouseRef.current.y = touch.clientY - rect.top
    }

    function onTouchEnd() {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    const onResize = () => { resize(); initParticles() }

    resize()
    initParticles()
    animate()

    // Use window-level events so mouse tracking works through overlapping elements
    window.addEventListener("resize", onResize)
    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onTouchEnd)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
