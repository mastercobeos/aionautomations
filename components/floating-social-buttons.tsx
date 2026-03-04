"use client";

import { MessageCircle, Instagram, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";

const socials = [
  {
    key: "whatsapp" as const,
    href: siteConfig.whatsapp.link,
    icon: MessageCircle,
  },
  {
    key: "instagram" as const,
    href: siteConfig.instagram.url,
    icon: Instagram,
  },
  {
    key: "facebook" as const,
    href: siteConfig.facebook.pageUrl,
    icon: Facebook,
  },
];

export function FloatingSocialButtons() {
  const t = useTranslations("FloatingSocial");

  return (
    <div
      className="fixed top-20 right-4 z-40 flex flex-col gap-2 sm:right-6 lg:right-8"
      aria-label={t("ariaLabel")}
    >
      {socials.map(({ key, href, icon: Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(key)}
          className="floating-social-btn flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,212,254,0.1)] transition-all hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,212,254,0.25)] hover:text-cyan-300"
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={2} />
        </a>
      ))}
    </div>
  );
}
