import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ContactPhoneCTA() {
  const t = useTranslations("ContactPhone");

  const phone = process.env.NEXT_PUBLIC_PHONE || "";
  const displayPhone = phone || t("placeholderPhone");

  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/20 px-6 py-3.5 text-base font-semibold text-cyan-400 ring-1 ring-cyan-500/30 transition-all hover:bg-cyan-500/30 hover:ring-cyan-500/50"
            >
              <Phone className="h-5 w-5" />
              {displayPhone}
            </a>
          )}
          <a
            href={siteConfig.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366]/20 px-6 py-3.5 text-base font-semibold text-[#25D366] ring-1 ring-[#25D366]/30 transition-all hover:bg-[#25D366]/30"
          >
            <MessageCircle className="h-5 w-5" />
            {t("whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
