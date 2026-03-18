"use client"

import { useState } from "react"
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function ContactForm() {
  const t = useTranslations("ContactForm")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get("name") as string
    const email = data.get("email") as string
    const message = data.get("message") as string

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error("Failed to send")

      setStatus("sent")
      form.reset()
      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-md space-y-4 text-left">
      <div>
        <input
          type="text"
          name="name"
          required
          aria-label={t("name")}
          placeholder={t("name")}
          className="w-full rounded-lg border border-border/50 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          required
          aria-label={t("email")}
          placeholder={t("email")}
          className="w-full rounded-lg border border-border/50 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />
      </div>
      <div>
        <textarea
          name="message"
          required
          rows={3}
          aria-label={t("message")}
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
        {status === "error" && (
          <>
            {t("error")}
            <AlertCircle className="h-4 w-4" />
          </>
        )}
      </button>

      {status === "sent" && (
        <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          <CheckCircle className="h-4 w-4 shrink-0" />
          {t("sentConfirmation")}
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {t("errorConfirmation")}
        </div>
      )}
    </form>
  )
}
