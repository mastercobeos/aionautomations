"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Bot, Send, Sparkles } from "lucide-react"

type Msg = { role: "user" | "bot"; textKey: string }

const SCRIPT: Msg[] = [
  { role: "user", textKey: "msg1User" },
  { role: "bot", textKey: "msg1Bot" },
  { role: "user", textKey: "msg2User" },
  { role: "bot", textKey: "msg2Bot" },
  { role: "user", textKey: "msg3User" },
  { role: "bot", textKey: "msg3Bot" },
  { role: "user", textKey: "msg4User" },
  { role: "bot", textKey: "msg4Bot" },
]

export function ChatbotDemo() {
  const t = useTranslations("ChatbotDemo")
  const [shown, setShown] = useState<number>(0)
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // Start when visible
  useEffect(() => {
    if (started || typeof window === "undefined") return
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  // Drive the script
  useEffect(() => {
    if (!started || shown >= SCRIPT.length) return
    const next = SCRIPT[shown]
    const typingDelay = next.role === "bot" ? 1100 : 700
    const showDelay = next.role === "bot" ? 1800 : 1000

    const t1 = setTimeout(() => setTyping(true), typingDelay)
    const t2 = setTimeout(() => {
      setTyping(false)
      setShown((n) => n + 1)
    }, showDelay)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [started, shown])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [shown, typing])

  const handleRestart = () => {
    setShown(0)
    setTyping(false)
  }

  return (
    <div ref={rootRef} className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-background via-background to-cyan-500/[0.03] shadow-[0_0_60px_rgba(34,212,254,0.08)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600">
              <Bot className="h-5 w-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{t("botName")}</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                {t("online")}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-3 w-3" />
            {t("poweredBy")}
          </span>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="h-[420px] overflow-y-auto px-4 py-4 space-y-3 bg-[radial-gradient(circle_at_top,rgba(34,212,254,0.04),transparent_60%)]"
        >
          {SCRIPT.slice(0, shown).map((m, i) => (
            <MessageBubble key={i} role={m.role} text={t(m.textKey)} />
          ))}
          {typing && shown < SCRIPT.length && (
            <TypingIndicator role={SCRIPT[shown].role} />
          )}

          {shown >= SCRIPT.length && (
            <div className="pt-3 text-center">
              <button
                type="button"
                onClick={handleRestart}
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t("replay")}
              </button>
            </div>
          )}
        </div>

        {/* Input (visual only) */}
        <div className="border-t border-border/50 bg-white/[0.02] p-3">
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/60 px-3 py-2">
            <input
              type="text"
              readOnly
              placeholder={t("inputPlaceholder")}
              className="flex-1 bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground/60 outline-none cursor-not-allowed"
            />
            <button
              type="button"
              disabled
              aria-label="Send"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 text-white opacity-60 cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ role, text }: { role: "user" | "bot"; text: string }) {
  const isBot = role === "bot"
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? "bg-white/[0.06] text-foreground rounded-tl-sm"
            : "bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-tr-sm"
        }`}
      >
        {text}
      </div>
    </div>
  )
}

function TypingIndicator({ role }: { role: "user" | "bot" }) {
  const isBot = role === "bot"
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex items-center gap-1 rounded-2xl px-4 py-3 ${
          isBot ? "bg-white/[0.06] rounded-tl-sm" : "bg-gradient-to-br from-cyan-500/80 to-purple-600/80 rounded-tr-sm"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-bounce [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-bounce [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  )
}
