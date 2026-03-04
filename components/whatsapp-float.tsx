"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFloat() {
  const t = useTranslations("Hero");

  return (
    <a
      href={siteConfig.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/50 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-background"
      aria-label={t("chatWhatsApp")}
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
