"use client";

import dynamic from "next/dynamic";

const ExitIntentPopup = dynamic(
  () => import("@/components/exit-intent-popup").then((m) => ({ default: m.ExitIntentPopup })),
  { ssr: false },
);

export function ExitIntentPopupLazy() {
  return <ExitIntentPopup />;
}
