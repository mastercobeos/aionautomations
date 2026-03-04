import { useTranslations } from "next-intl";

export function SpecialistsSection() {
  const t = useTranslations("Specialists");

  const items = [
    t("item1"),
    t("item2"),
    t("item3"),
    t("item4"),
    t("item5"),
    t("item6"),
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {items.map((text, i) => (
            <span
              key={i}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-foreground"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
