"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({
  items,
  title,
}: {
  items: FaqItem[];
  title?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {title && (
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
            {title}
          </h2>
        )}
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium text-foreground">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
