import { Shield, Zap, Clock, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export function TrustBadges() {
  const t = useTranslations("TrustBadges");

  const BADGES = [
    { icon: Clock, label: t("fast") },
    { icon: Shield, label: t("secure") },
    { icon: Zap, label: t("ai") },
    { icon: Award, label: t("quality") },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      {BADGES.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-4 py-2"
        >
          <badge.icon className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-medium text-muted-foreground">
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );
}
