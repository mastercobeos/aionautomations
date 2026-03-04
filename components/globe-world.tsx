"use client"

import { useRef, useEffect, useCallback, useState } from 'react'

const SIZE   = 280
const TWO_PI = Math.PI * 2

// ─── Filament helpers ─────────────────────────────────────────────────────────
function filamentBasis(nx: number, ny: number, nz: number) {
  const l = Math.sqrt(nx * nx + ny * ny + nz * nz)
  nx /= l; ny /= l; nz /= l
  let ux: number, uy: number, uz: number
  if (Math.abs(nx) < 0.9) { ux = 0; uy = -nz; uz = ny }
  else                     { ux = nz; uy = 0;  uz = -nx }
  const ul = Math.sqrt(ux * ux + uy * uy + uz * uz)
  ux /= ul; uy /= ul; uz /= ul
  return {
    ux, uy, uz,
    vx: ny * uz - nz * uy,
    vy: nz * ux - nx * uz,
    vz: nx * uy - ny * ux,
  }
}

// ─── Filament data (pre-computed once) ────────────────────────────────────────
interface FilCache {
  nx: number; ny: number; nz: number
  ux: number; uy: number; uz: number
  vx: number; vy: number; vz: number
  cr: number; cg: number; cb: number
  speed: number; pulses: number
}

const FILAMENTS_RAW = [
  { n: [0, 1, 0]          as const, c: [34, 212, 254] as const, speed: 0.35, pulses: 3 },
  { n: [1, 0, 0]          as const, c: [30, 190, 255] as const, speed: 0.28, pulses: 2 },
  { n: [0, 0, 1]          as const, c: [50, 180, 255] as const, speed: 0.32, pulses: 2 },
  { n: [0.707, 0, 0.707]  as const, c: [34, 212, 254] as const, speed: 0.40, pulses: 3 },
  { n: [-0.707, 0, 0.707] as const, c: [40, 200, 255] as const, speed: 0.25, pulses: 2 },
  { n: [0, 0.707, 0.707]  as const, c: [34, 212, 254] as const, speed: 0.30, pulses: 2 },
  { n: [0.577, 0.577, 0.577]  as const, c: [150, 80, 255]  as const, speed: 0.22, pulses: 2 },
  { n: [0.610, 0.560, 0.560]  as const, c: [170, 60, 255]  as const, speed: 0.26, pulses: 2 },
]

const FIL: FilCache[] = FILAMENTS_RAW.map(f => {
  const b = filamentBasis(f.n[0], f.n[1], f.n[2])
  return {
    nx: f.n[0], ny: f.n[1], nz: f.n[2], ...b,
    cr: f.c[0], cg: f.c[1], cb: f.c[2],
    speed: f.speed, pulses: f.pulses,
  }
})
const FIL_COUNT = FIL.length
const FIL_CORE  = 0.012
const FIL_GLOW  = 0.045

// Energy node positions
const NODES: [number, number, number][] = [
  [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1],
  [0.707, 0.707, 0], [-0.707, 0.707, 0], [0.707, -0.707, 0],
  [0.577, 0.577, 0.577], [-0.577, 0.577, 0.577],
  [0.577, -0.577, 0.577], [-0.577, -0.577, 0.577],
  [0.707, 0, 0.707], [-0.707, 0, 0.707], [0.577, 0.577, -0.577],
]
const NODE_RADIUS = 0.009

// ─── Component ────────────────────────────────────────────────────────────────
export function GlobeWorld({ ariaLabel }: { ariaLabel?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const rotY = useRef(0)
  const rotX = useRef(0.12)

  const autoRef = useRef(true)
  const rafRef  = useRef<number>(0)

  const outBuf = useRef<Uint8ClampedArray | null>(null)

  const drag = useRef({
    active: false, wasAuto: true,
    startX: 0, startY: 0,
    startRotY: 0, startRotX: 0,
    hasMoved: false, velX: 0, velY: 0, lastX: 0, lastY: 0,
  })

  const [isGrabbing, setIsGrabbing] = useState(false)
  const [isPaused,   setIsPaused]   = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const r   = SIZE / 2

    outBuf.current = new Uint8ClampedArray(SIZE * SIZE * 4)
    startLoop(ctx, r)

    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─────────────────────────────────────────────────────────────────────────
  // Per-pixel energy filament renderer (no solid sphere)
  // ─────────────────────────────────────────────────────────────────────────
  function render(ctx: CanvasRenderingContext2D, r: number, time: number) {
    const out = outBuf.current
    if (!out) return

    const cosRX = Math.cos(rotX.current)
    const sinRX = Math.sin(rotX.current)
    const cosRY = Math.cos(rotY.current)
    const sinRY = Math.sin(rotY.current)

    // Pre-compute pulse positions for each filament (avoids repeat work per pixel)
    const pulsePos: number[][] = new Array(FIL_COUNT)
    for (let fi = 0; fi < FIL_COUNT; fi++) {
      const f = FIL[fi]
      const pp: number[] = new Array(f.pulses)
      for (let p = 0; p < f.pulses; p++) {
        pp[p] = (time * f.speed + p / f.pulses) % 1
      }
      pulsePos[fi] = pp
    }

    for (let py = 0; py < SIZE; py++) {
      const yN = (py - r) / r
      const yy = yN * yN
      for (let px = 0; px < SIZE; px++) {
        const xN = (px - r) / r
        const z2 = 1 - xN * xN - yy
        const oi = (py * SIZE + px) * 4

        if (z2 < 0) { out[oi] = 0; out[oi + 1] = 0; out[oi + 2] = 0; out[oi + 3] = 0; continue }

        const z = Math.sqrt(z2)

        // Undo rotations → sphere-local coordinates
        const y3 = yN * cosRX - z * sinRX
        const z3 = yN * sinRX + z * cosRX
        const lx = cosRY * xN - sinRY * z3
        const ly = y3
        const lz = sinRY * xN + cosRY * z3

        // Depth fade for back-hemisphere visibility control
        const depthZ = z   // 0 at rim, 1 at center-front

        let eR = 0, eG = 0, eB = 0

        // ── Energy filaments ──────────────────────────────────────
        for (let fi = 0; fi < FIL_COUNT; fi++) {
          const f = FIL[fi]
          const d = Math.abs(lx * f.nx + ly * f.ny + lz * f.nz)

          if (d > FIL_GLOW) continue

          // Angle along filament for energy pulse
          const pu    = lx * f.ux + ly * f.uy + lz * f.uz
          const pv    = lx * f.vx + ly * f.vy + lz * f.vz
          const angle = (Math.atan2(pv, pu) / TWO_PI + 1) % 1

          // Pulse brightness (traveling energy)
          let bright = 0.12
          const pps = pulsePos[fi]
          for (let p = 0; p < f.pulses; p++) {
            const dd   = Math.abs(angle - pps[p])
            const wrap = Math.min(dd, 1 - dd)
            const w2   = wrap * wrap * 200
            // Fast exp approximation: 1/(1+x)^4 ≈ exp(-x) for glow falloff
            const inv  = 1 / (1 + w2)
            bright += inv * inv * 0.88
          }
          bright = Math.min(bright, 1)

          // Distance falloff: core → glow
          const fade = d < FIL_CORE
            ? 1.0
            : 1.0 - (d - FIL_CORE) / (FIL_GLOW - FIL_CORE)

          bright *= fade * Math.min(depthZ * 5, 1)   // dim at extreme rim

          eR += f.cr * bright
          eG += f.cg * bright
          eB += f.cb * bright
        }

        // ── Energy nodes ──────────────────────────────────────────
        for (let ni = 0; ni < NODES.length; ni++) {
          const dx = lx - NODES[ni][0]
          if (dx * dx > NODE_RADIUS) continue
          const dy = ly - NODES[ni][1]
          const dxy = dx * dx + dy * dy
          if (dxy > NODE_RADIUS) continue
          const dz = lz - NODES[ni][2]
          const dist2 = dxy + dz * dz
          if (dist2 > NODE_RADIUS) continue

          const glow = Math.max(0, (1 - Math.sqrt(dist2) / 0.095)
            * (0.7 + 0.3 * Math.sin(time * 2.8 + ni * 1.7)))
            * Math.min(depthZ * 4, 1)

          eR += 230 * glow
          eG += 255 * glow
          eB += 255 * glow
        }

        // ── Output ────────────────────────────────────────────────
        if (eR < 1 && eG < 1 && eB < 1) {
          // No energy here → fully transparent
          out[oi] = 0; out[oi + 1] = 0; out[oi + 2] = 0; out[oi + 3] = 0
        } else {
          // Clamp and compute alpha from brightness
          const maxC = Math.max(eR, eG, eB)
          const alpha = Math.min(maxC / 180, 1)   // brighter = more opaque

          out[oi]     = Math.min(255, eR) | 0
          out[oi + 1] = Math.min(255, eG) | 0
          out[oi + 2] = Math.min(255, eB) | 0
          out[oi + 3] = (alpha * 255) | 0
        }
      }
    }

    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.putImageData(new ImageData(new Uint8ClampedArray(out.buffer as ArrayBuffer), SIZE, SIZE), 0, 0)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RAF loop
  // ─────────────────────────────────────────────────────────────────────────
  function startLoop(ctx: CanvasRenderingContext2D, r: number) {
    const AUTO_SPEED = 0.004
    const DECAY      = 0.91
    const t0 = performance.now()

    const tick = () => {
      const time = (performance.now() - t0) / 1000

      if (!drag.current.active) {
        if (autoRef.current) {
          rotY.current += AUTO_SPEED
        } else {
          const vx = drag.current.velX
          const vy = drag.current.velY
          if (Math.abs(vx) > 0.0003 || Math.abs(vy) > 0.0003) {
            rotY.current += vx
            rotX.current  = Math.max(-0.65, Math.min(0.65, rotX.current + vy))
            drag.current.velX *= DECAY
            drag.current.velY *= DECAY
          } else if (drag.current.wasAuto) {
            drag.current.wasAuto = false
            autoRef.current      = true
          }
        }
      }

      render(ctx, r, time)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Pointer helpers
  // ─────────────────────────────────────────────────────────────────────────
  const getXY = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      const t = (e as React.TouchEvent).touches[0] || (e as React.TouchEvent).changedTouches[0]
      return { x: t.clientX, y: t.clientY }
    }
    return { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY }
  }

  const onDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ('preventDefault' in e && typeof (e as React.MouseEvent).preventDefault === 'function')
      (e as React.MouseEvent).preventDefault()
    const { x, y } = getXY(e)
    drag.current = {
      active: true, wasAuto: autoRef.current,
      startX: x, startY: y,
      startRotY: rotY.current, startRotX: rotX.current,
      hasMoved: false, velX: 0, velY: 0, lastX: x, lastY: y,
    }
    autoRef.current = false
    setIsGrabbing(true)
  }, [])

  const onMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!drag.current.active) return
    const { x, y } = getXY(e)
    const dx = x - drag.current.startX
    const dy = y - drag.current.startY
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.current.hasMoved = true
    drag.current.velX  = (x - drag.current.lastX) * 0.009
    drag.current.velY  = (y - drag.current.lastY) * 0.009
    drag.current.lastX = x
    drag.current.lastY = y
    rotY.current = drag.current.startRotY + dx * 0.009
    rotX.current = Math.max(-0.65, Math.min(0.65, drag.current.startRotX + dy * 0.009))
  }, [])

  const onUp = useCallback(() => {
    if (!drag.current.active) return
    drag.current.active = false
    setIsGrabbing(false)
    if (!drag.current.hasMoved) {
      autoRef.current      = !drag.current.wasAuto
      drag.current.wasAuto = false
      setIsPaused(!autoRef.current)
    }
  }, [])

  return (
    <div
      className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px]"
      role="img"
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
      {/* Diffuse glow behind filaments */}
      <div className="absolute pointer-events-none" style={{
        inset: '-50px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,212,254,0.08) 0%, transparent 65%)',
        filter: 'blur(35px)',
      }} />
      <div className="absolute pointer-events-none" style={{
        inset: '-20px', borderRadius: '50%',
        background: 'radial-gradient(circle at 60% 60%, rgba(120,60,255,0.06) 0%, transparent 50%)',
        filter: 'blur(18px)',
      }} />

      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="absolute inset-0 w-full h-full"
        style={{
          cursor:      isGrabbing ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
        onMouseDown={onDown}
        onTouchStart={onDown}
      />

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background:    'rgba(4,14,40,0.60)',
            border:        '1px solid rgba(34,212,254,0.45)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="rgba(34,212,254,0.95)">
              <polygon points="5,2 16,9 5,16" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
