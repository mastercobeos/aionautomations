import { useTranslations } from "next-intl";

export function ContentBlockCTA() {
  const t = useTranslations("ContentBlock");

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {t("paragraph")}
        </p>
        <a
          href="#contact"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-[1.02]"
        >
          {t("cta")}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
        </a>
      </div>
    </section>
  );
}
