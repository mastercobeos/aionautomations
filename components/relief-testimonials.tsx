"use client";

import { useTranslations } from "next-intl";

export function ReliefTestimonials() {
  const t = useTranslations("Relief");

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {t("testimonialsTitle")}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 border-dashed bg-white p-6 text-center"
            >
              <p className="text-sm italic text-gray-400">
                {t("testimonialPlaceholder")}
              </p>
              <p className="mt-4 font-medium text-gray-500">
                — {t("testimonialAuthorPlaceholder")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
