import { useLocale } from "next-intl";
import { coreServices } from "@/lib/seo";

/**
 * Muestra los tres pilares SEO (Páginas Web, Automatizaciones, Marketing IA)
 * en la página para distribución natural de keywords.
 */
export function SEOPillars() {
  const locale = useLocale() as "es" | "en";
  const pillars = coreServices[locale] ?? coreServices.es;

  return (
    <p className="text-center text-sm text-muted-foreground" role="doc-subtitle">
      {pillars.join(" · ")}
    </p>
  );
}
