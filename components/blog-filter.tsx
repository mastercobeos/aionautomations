"use client";

import { useTranslations } from "next-intl";

interface BlogFilterProps {
  categories: string[];
  active: string | null;
  onFilter: (category: string | null) => void;
}

export function BlogFilter({ categories, active, onFilter }: BlogFilterProps) {
  const t = useTranslations("BlogPage");

  return (
    <div className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onFilter(null)}
        className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${
          active === null
            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25"
            : "border border-border/50 text-muted-foreground hover:border-cyan-500/30 hover:text-foreground"
        }`}
      >
        {t("filterAll")}
      </button>
      {categories.map((cat) => {
        const labelKey =
          cat === "AI Automation"
            ? "filterAutomation"
            : cat === "Web Design"
              ? "filterWeb"
              : cat === "Marketing"
                ? "filterMarketing"
                : "filterIndustries";
        return (
          <button
            key={cat}
            onClick={() => onFilter(cat)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${
              active === cat
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25"
                : "border border-border/50 text-muted-foreground hover:border-cyan-500/30 hover:text-foreground"
            }`}
          >
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
}
