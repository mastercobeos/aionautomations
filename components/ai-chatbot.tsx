"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiChatbot() {
  const t = useTranslations("AiChatbot");
  const locale = useLocale();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const didGreet = useRef(false);

  // Add greeting on first open
  useEffect(() => {
    if (open && !didGreet.current) {
      didGreet.current = true;
      setMessages([{ role: "assistant", content: t("chatGreeting") }]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, t]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const send = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      const text = input.trim();
      if (!text || loading) return;

      const userMsg: Message = { role: "user", content: text };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updated.map((m) => ({ role: m.role, content: m.content })),
            locale,
          }),
        });

        if (res.status === 429) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: t("rateLimited") },
          ]);
          setLoading(false);
          return;
        }

        if (!res.ok || !res.body) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: t("errorMessage") },
          ]);
          setLoading(false);
          return;
        }

        // Stream the response
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          const snapshot = assistantContent;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: snapshot };
            return copy;
          });
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t("errorMessage") },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, locale, t],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ---------- Chat Panel ---------- */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-[calc(100%-2rem)] flex-col overflow-hidden rounded-2xl border border-border/50 bg-[#0D0B1E]/95 shadow-2xl backdrop-blur-xl sm:right-6 sm:w-[380px]"
          style={{ height: "min(500px, calc(100dvh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {t("headerTitle")}
                </p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t("headerOnline")}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("closeChat")}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-cyan-500 to-purple-600 text-white"
                      : "border border-border/50 bg-white/[0.03] text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl border border-border/50 bg-white/[0.03] px-3.5 py-2.5 text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="text-xs">&hellip;</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={send}
            className="flex items-center gap-2 border-t border-border/50 bg-white/[0.03] px-3 py-2.5"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              onKeyDown={handleKeyDown}
              placeholder={t("inputPlaceholder")}
              maxLength={500}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label={t("sendLabel")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white transition-opacity disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Footer */}
          <div className="border-t border-border/50 bg-white/[0.02] px-4 py-1.5 text-center text-[10px] text-muted-foreground">
            {t("poweredBy")}
          </div>
        </div>
      )}

      {/* ---------- Floating Button ---------- */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("closeChat") : t("openChat")}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg transition-transform hover:scale-105 ${
          !open ? "animate-pulse" : ""
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </>
  );
}
