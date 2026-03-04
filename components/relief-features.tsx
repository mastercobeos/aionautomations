"use client";

import { useTranslations } from "next-intl";
import { Monitor, TrendingUp, Search, Heart } from "lucide-react";

export function ReliefFeatures() {
  const t = useTranslations("Relief");

  const features = [
    {
      icon: Monitor,
      title: t("feature1Title"),
      desc: t("feature1Desc"),
    },
    {
      icon: TrendingUp,
      title: t("feature2Title"),
      desc: t("feature2Desc"),
    },
    {
      icon: Search,
      title: t("feature3Title"),
      desc: t("feature3Desc"),
    },
    {
      icon: Heart,
      title: t("feature4Title"),
      desc: t("feature4Desc"),
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
