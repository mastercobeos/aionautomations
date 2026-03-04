"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setLoading(true)
    setProgress(30)
    const t1 = setTimeout(() => setProgress(70), 100)
    const t2 = setTimeout(() => setProgress(100), 300)
    const t3 = setTimeout(() => {
      setLoading(false)
      setProgress(0)
    }, 500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [pathname])

  if (!loading && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-500 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px rgba(34,211,238,0.6), 0 0 30px rgba(34,211,238,0.3)",
          opacity: loading ? 1 : 0,
        }}
      />
    </div>
  )
}
