import { useTranslations } from "next-intl";
import { FileText, TrendingUp, Settings } from "lucide-react";

export function BlogPreviewRow() {
  const t = useTranslations("BlogPreview");

  const CARDS = [
    { key: "card1", href: "#audit", icon: FileText },
    { key: "card2", href: "#case-studies", icon: TrendingUp },
    { key: "card3", href: "#how-it-works", icon: Settings },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map(({ key, href, icon: Icon }) => (
            <a
              key={key}
              href={href}
              className="group glass-card flex flex-col rounded-2xl border border-cyan-500/20 p-6 transition-all hover:border-cyan-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]"
            >
              <Icon className="h-10 w-10 text-cyan-400" />
              <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-cyan-400">
                {t(`${key}Title`)}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {t(`${key}Desc`)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
