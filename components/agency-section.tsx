import { useTranslations } from "next-intl";
import { Link } from '@/i18n/routing';

export function AgencySection() {
  const t = useTranslations("AgencySection");

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-white/[0.04] to-transparent p-10 text-center backdrop-blur-sm md:p-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            {t("badge")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            {t("description")}
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-[1.02]"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
