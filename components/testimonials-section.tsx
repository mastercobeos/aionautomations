"use client";

import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");

  // Current starting index of the carousel
  const [current, setCurrent] = useState(0);
  // How many cards are visible at once (responds to screen width)
  const [visibleCount, setVisibleCount] = useState(3);
  // Pause auto-slide while user hovers
  const [paused, setPaused] = useState(false);

  const ITEMS = [
    { quote: t("quote1"), name: t("name1"), role: t("role1"), initials: "AT", rating: 5 },
    { quote: t("quote2"), name: t("name2"), role: t("role2"), initials: "SE", rating: 5 },
    { quote: t("quote3"), name: t("name3"), role: t("role3"), initials: "AH", rating: 5 },
    { quote: t("quote4"), name: t("name4"), role: t("role4"), initials: "LD", rating: 5 },
  ];

  const N = ITEMS.length;
  // Maximum index so the last visible card is always the last item
  const maxIndex = N - visibleCount;

  // Update visible card count on window resize
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Clamp index when visibleCount changes (e.g. on resize)
  useEffect(() => {
    setCurrent((c) => Math.min(c, Math.max(0, N - visibleCount)));
  }, [visibleCount, N]);

  const prev = useCallback(() => {
    setCurrent((c) => (c <= 0 ? N - visibleCount : c - 1));
  }, [N, visibleCount]);

  const next = useCallback(() => {
    setCurrent((c) => (c >= N - visibleCount ? 0 : c + 1));
  }, [N, visibleCount]);

  // Auto-slide every 4 seconds, pauses on hover
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  // Track width as % of container: each card = 1/visibleCount of container = 1/N of track
  // Track total width = N/visibleCount * 100% of container
  // translateX offset = current/N * 100% of track  (moves exactly 1 card per step)
  const trackWidthPct = (N / visibleCount) * 100;
  const translatePct = (current / N) * 100;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {t("subtitle")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
        </div>
      </div>

      {/* Carousel wrapper — pauses auto-slide on hover */}
      <div
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label={t("prevTestimonial")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-background/80 text-cyan-400 shadow-lg backdrop-blur-sm transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label={t("nextTestimonial")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-background/80 text-cyan-400 shadow-lg backdrop-blur-sm transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Viewport: clips the overflowing track */}
        <div className="overflow-hidden px-12">
          {/* Sliding track: wide enough to hold all cards side by side */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${trackWidthPct}%`,
              transform: `translateX(-${translatePct}%)`,
            }}
          >
            {ITEMS.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                style={{ width: `${100 / N}%` }}
                className="px-2"
              >
                <div className="gradient-border-static shimmer-card rounded-xl p-4 h-full">
                  {/* Star rating */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: item.rating }).map((_, si) => (
                      <Star key={si} className="h-3 w-3 star-filled fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/25 to-purple-500/25 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,212,254,0.15)]">
                      <span className="text-[10px] font-semibold text-cyan-300 drop-shadow-[0_0_4px_rgba(34,212,254,0.5)]">{item.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-xs">{item.name}</p>
                      <p className="text-[10px] text-cyan-400">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators — one dot per possible starting position */}
        <div className="mt-6 flex justify-center gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`${t("goToTestimonial")} ${i + 1}`}
              className="flex items-center justify-center h-10 w-10 rounded-full"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-5 bg-cyan-400"
                  : "w-1.5 bg-cyan-400/30 hover:bg-cyan-400/60"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
