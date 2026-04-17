"use client";

import dynamic from "next/dynamic";

const SocialProofToast = dynamic(
  () => import("@/components/social-proof-toast").then((m) => ({ default: m.SocialProofToast })),
  { ssr: false },
);

export function SocialProofToastLazy() {
  return <SocialProofToast />;
}
