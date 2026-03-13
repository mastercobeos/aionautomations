"use client";

import dynamic from "next/dynamic";

const Starfield = dynamic(
  () => import("@/components/starfield").then((m) => m.Starfield),
  { ssr: false }
);

export function LazyStarfield() {
  return <Starfield />;
}
