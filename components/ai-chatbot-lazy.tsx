"use client";

import dynamic from "next/dynamic";

const AiChatbot = dynamic(
  () => import("@/components/ai-chatbot").then((m) => ({ default: m.AiChatbot })),
  { ssr: false },
);

export function AiChatbotLazy() {
  return <AiChatbot />;
}
