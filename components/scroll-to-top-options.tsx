"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ChevronUp, ChevronsUp, Rocket, Zap, ArrowUpCircle, MoveUp, ChevronUpCircle } from "lucide-react";

// ─── Shared hook: show button after scrolling 400px ───
function useShowButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return show;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ═══════════════════════════════════════════════════════
// OPTION 1: Minimal Circle — Clean & simple
// ═══════════════════════════════════════════════════════
export function ScrollOption1() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/40 bg-[rgba(5,10,30,0.8)] text-cyan-400 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:scale-110 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 2: Glow Pulse — Pulsating cyan glow
// ═══════════════════════════════════════════════════════
export function ScrollOption2() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,212,254,0.4),0_0_40px_rgba(34,212,254,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,212,254,0.6),0_0_60px_rgba(34,212,254,0.25)] hover:scale-110 animate-[pulse-glow_3s_ease-in-out_infinite] ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ChevronsUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 3: Gradient Border Ring — Rotating gradient border
// ═══════════════════════════════════════════════════════
export function ScrollOption3() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`gradient-border-card fixed bottom-6 left-6 z-50 flex h-13 w-13 items-center justify-center !rounded-full bg-[rgba(5,10,30,0.9)] text-cyan-400 transition-all duration-300 hover:text-white hover:scale-110 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 4: Rocket Launch — Fun rocket icon with trail
// ═══════════════════════════════════════════════════════
export function ScrollOption4() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 group flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/40 bg-[rgba(5,10,30,0.85)] backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:scale-110 hover:shadow-[0_0_30px_rgba(115,120,255,0.3)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <Rocket className="h-5 w-5 text-purple-400 transition-all group-hover:text-purple-300 group-hover:-translate-y-0.5" strokeWidth={2} />
      <span className="absolute -bottom-0.5 h-3 w-3 rounded-full bg-purple-500/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 5: Pill Shape — Horizontal pill with text
// ═══════════════════════════════════════════════════════
export function ScrollOption5() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[rgba(5,10,30,0.85)] px-4 py-2.5 text-sm font-medium text-cyan-400 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:text-white hover:bg-cyan-500/15 hover:shadow-[0_0_25px_rgba(34,212,254,0.2)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2} />
      <span>Top</span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 6: Progress Ring — Shows scroll progress
// ═══════════════════════════════════════════════════════
export function ScrollOption6() {
  const show = useShowButton();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(5,10,30,0.9)] transition-all duration-300 hover:scale-110 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(34,212,254,0.15)" strokeWidth="2" />
        <circle
          cx="24" cy="24" r="20" fill="none"
          stroke="rgba(34,212,254,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-150"
        />
      </svg>
      <ArrowUp className="h-5 w-5 text-cyan-400" strokeWidth={2} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 7: Neon Square — Sharp edged neon look
// ═══════════════════════════════════════════════════════
export function ScrollOption7() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-400/50 bg-[rgba(5,10,30,0.9)] text-cyan-400 shadow-[inset_0_0_12px_rgba(34,212,254,0.1),0_0_15px_rgba(34,212,254,0.15)] transition-all duration-300 hover:border-cyan-300 hover:text-cyan-300 hover:shadow-[inset_0_0_20px_rgba(34,212,254,0.15),0_0_25px_rgba(34,212,254,0.3)] hover:scale-105 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <MoveUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 8: Dual Tone — Cyan-to-purple gradient fill
// ═══════════════════════════════════════════════════════
export function ScrollOption8() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-110 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUpCircle className="h-6 w-6" strokeWidth={1.8} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 9: Lightning Bolt — Zap icon with electric glow
// ═══════════════════════════════════════════════════════
export function ScrollOption9() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 group flex h-13 w-13 items-center justify-center rounded-full border border-yellow-500/30 bg-[rgba(5,10,30,0.85)] backdrop-blur-md transition-all duration-300 hover:border-yellow-400/60 hover:scale-110 hover:shadow-[0_0_20px_rgba(250,204,21,0.2),0_0_40px_rgba(250,204,21,0.1)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <Zap className="h-5 w-5 text-yellow-400 fill-yellow-400/20 transition-all group-hover:fill-yellow-400/40 group-hover:text-yellow-300" strokeWidth={2} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// OPTION 10: Glass Morphism — Frosted glass with blur
// ═══════════════════════════════════════════════════════
export function ScrollOption10() {
  const show = useShowButton();
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-50 flex h-13 w-13 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:scale-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUpCircle className="h-6 w-6" strokeWidth={1.5} />
    </button>
  );
}
