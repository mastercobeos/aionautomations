import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

/* ------------------------------------------------------------------ */
/*  Simple in-memory rate limiter: 10 messages per IP per hour        */
/* ------------------------------------------------------------------ */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

// Periodically clean stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}, 10 * 60 * 1000);

/* ------------------------------------------------------------------ */
/*  System prompt                                                     */
/* ------------------------------------------------------------------ */
const SYSTEM_PROMPT = `You are AION Assistant, the AI assistant for AION Automations (aionautomations.io).
You help visitors learn about our services, pricing, and process.

SERVICES:
- Web Design: Starter $497 (1 landing, 1 week), Growth $997 (5 pages, SEO, blog, 2 weeks), Enterprise from $2,497 (15 pages, CMS, 3-4 weeks)
- AI Automations: Starter $897 (lead capture, WhatsApp notifications), Growth $2,497 (AI WhatsApp agent 24/7, CRM, email campaigns), Enterprise from $4,997 (complex workflows, unlimited integrations)
- AI Marketing: Starter $1,497/mo (1 channel), Growth $2,997/mo (2-3 channels, A/B testing), Enterprise from $5,997/mo (all channels, dedicated strategist)
- Bundle: Web + Automation $1,270 (save $224)

PROCESS: Free 20-min strategy call → Quote → Timeline → Delivery → Support
PAYMENT: Bank transfer, credit/debit, PayPal. 50/50 split for projects >$1,500. Prices in USD, no tax included. Mexican invoice with 16% IVA available.

INDUSTRIES: Dental clinics, restaurants, real estate, salons, gyms, hotels, tours, vets, schools, law firms

RULES:
- Be helpful, friendly, concise (2-3 sentences max)
- Answer in the SAME language the user writes in
- For specific quotes, say "I can connect you with our team for a custom quote" and suggest /contact
- NEVER promise discounts or special pricing
- NEVER discuss competitors
- If asked about something outside AION services, politely redirect
- Always offer to schedule a free strategy call when appropriate`;

/* ------------------------------------------------------------------ */
/*  POST handler                                                      */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Chat service is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "rate_limited" }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  // Parse body
  let messages: { role: string; content: string }[];
  let locale: string;
  try {
    const body = await req.json();
    messages = body.messages;
    locale = body.locale ?? "en";
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid messages");
    }
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const anthropic = new Anthropic({ apiKey });

  // Build Anthropic-compatible messages (only "user" and "assistant" roles)
  const anthropicMessages = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

  const localeHint =
    locale === "es"
      ? "\n\nThe user is browsing the Spanish version of the site. Default to Spanish unless they write in another language."
      : "";

  try {
    const stream = anthropic.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT + localeHint,
      messages: anthropicMessages,
    });

    // Convert Anthropic SDK stream → ReadableStream for the browser
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                new TextEncoder().encode(event.delta.text),
              );
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
