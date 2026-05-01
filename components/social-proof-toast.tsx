"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

const PROOF_COUNT = 12;
const MAX_DISPLAYS_PER_SESSION = 3;

export function SocialProofToast() {
  const t = useTranslations("SocialProof");
  const [current, setCurrent] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const usedRef = useRef<Set<number>>(new Set());
  const shownCountRef = useRef<number>(0);

  useEffect(() => {
    let showTimeout: ReturnType<typeof setTimeout>;
    let hideTimeout: ReturnType<typeof setTimeout>;
    let nextTimeout: ReturnType<typeof setTimeout>;

    const pickRandom = (): number => {
      if (usedRef.current.size >= PROOF_COUNT) usedRef.current.clear();
      let idx: number;
      do {
        idx = Math.floor(Math.random() * PROOF_COUNT) + 1;
      } while (usedRef.current.has(idx));
      usedRef.current.add(idx);
      return idx;
    };

    const scheduleNext = () => {
      if (shownCountRef.current >= MAX_DISPLAYS_PER_SESSION) return;
      const delay = 90000 + Math.random() * 30000; // 90-120s
      nextTimeout = setTimeout(() => {
        setCurrent(pickRandom());
        setFading(false);
        shownCountRef.current += 1;

        hideTimeout = setTimeout(() => {
          setFading(true);
          showTimeout = setTimeout(() => {
            setCurrent(null);
            scheduleNext();
          }, 400); // fade-out duration
        }, 5000);
      }, delay);
    };

    // Start after 20 seconds on page
    const initialDelay = setTimeout(() => {
      scheduleNext();
    }, 20000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, []);

  if (current === null) return null;

  return (
    <div
      className={`fixed bottom-20 left-6 z-40 max-w-xs transition-all duration-400 ${
        fading
          ? "-translate-x-full opacity-0"
          : "translate-x-0 opacity-100 animate-in slide-in-from-left"
      }`}
    >
      <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-[#0D0B1E]/95 p-4 shadow-xl shadow-cyan-500/5 backdrop-blur-sm">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
        <div>
          <p className="text-sm font-medium text-foreground">
            {t(`proof${current}` as any)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{t("timeAgo")}</p>
        </div>
      </div>
    </div>
  );
}
