import { useTranslations } from "next-intl";

export function SEOSection() {
  const t = useTranslations("SEOSection");

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          {t("paragraph")}
        </p>
      </div>
    </section>
  );
}
