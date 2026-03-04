"use client"

import { useState } from "react"
import { Send, Loader2, CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/site-config"

export function ContactForm() {
  const t = useTranslations("ContactForm")
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("name") as string
    const email = data.get("email") as string
    const message = data.get("message") as string

    // Build WhatsApp message
    const text = `Hola! Soy ${name} (${email}). ${message}`
    const whatsappUrl = `${siteConfig.whatsapp.link}?text=${encodeURIComponent(text)}`

    setTimeout(() => {
      setStatus("sent")
      window.open(whatsappUrl, "_blank")
      setTimeout(() => setStatus("idle"), 3000)
    }, 600)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-md space-y-4 text-left">
      <div>
        <input
          type="text"
          name="name"
          required
          placeholder={t("name")}
          className="w-full rounded-lg border border-border/50 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          required
          placeholder={t("email")}
          className="w-full rounded-lg border border-border/50 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />
      </div>
      <div>
        <textarea
          name="message"
          required
          rows={3}
          placeholder={t("message")}
          className="w-full resize-none rounded-lg border border-border/50 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />
      </div>
      <button
        type="submit"
        disabled={status !== "idle"}
        className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === "idle" && (
          <>
            {t("send")}
            <Send className="h-4 w-4" />
          </>
        )}
        {status === "sending" && (
          <>
            {t("sending")}
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        )}
        {status === "sent" && (
          <>
            {t("sent")}
            <CheckCircle className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}
