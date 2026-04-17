"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { X } from "lucide-react";

export function ExitIntentPopup() {
  const t = useTranslations("ExitIntent");
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem("exitPopupShown", "1");
  }, []);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem("exitPopupShown")) return;

    let armed = false;

    // Arm after 5 seconds on page
    const timer = setTimeout(() => {
      armed = true;
    }, 5000);

    const handleMouseOut = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY < 0) {
        setVisible(true);
        sessionStorage.setItem("exitPopupShown", "1");
        document.removeEventListener("mouseout", handleMouseOut);
      }
    };

    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0D0B1E] to-[#141029] p-8 shadow-2xl shadow-cyan-500/10">
        {/* Gradient border glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-sm" />

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative text-center">
          <h2 className="text-2xl font-bold text-foreground">{t("exitTitle")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("exitSubtitle")}
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25"
            onClick={dismiss}
          >
            {t("exitCta")}
          </Link>

          <button
            onClick={dismiss}
            className="mt-3 w-full rounded-lg border border-border/50 px-6 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            {t("exitDismiss")}
          </button>
        </div>
      </div>
    </div>
  );
}
