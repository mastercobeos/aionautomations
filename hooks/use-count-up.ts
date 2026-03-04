"use client"

import { useEffect, useRef, useState } from "react"

export function useCountUp(target: number, duration = 2000) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLElement | null>(null)
    const started = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true
                    const startTime = performance.now()

                    const tick = (now: number) => {
                        const elapsed = now - startTime
                        const progress = Math.min(elapsed / duration, 1)
                        // easeOutExpo
                        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
                        setCount(Math.floor(eased * target))
                        if (progress < 1) requestAnimationFrame(tick)
                    }

                    requestAnimationFrame(tick)
                }
            },
            { threshold: 0.5 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [target, duration])

    return { count, ref }
}
