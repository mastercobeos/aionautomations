import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export function BenefitsSection() {
  const t = useTranslations("Benefits");

  const items = [
    t("item1"),
    t("item2"),
    t("item3"),
    t("item4"),
    t("item5"),
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <ul className="mx-auto mt-12 max-w-2xl space-y-4">
          {items.map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-pretty text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
