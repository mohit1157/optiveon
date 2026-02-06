import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSiteAssistantReply } from "@/lib/site-assistant";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const chatbotRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .max(10)
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const limiter = rateLimit(`chatbot:${clientIp}`, {
      maxRequests: 20,
      windowMs: 60_000,
    });

    if (!limiter.success) {
      return NextResponse.json(
        {
          error:
            "Rate limit exceeded. Please wait before sending another message.",
          retryAfter: Math.ceil((limiter.resetAt - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((limiter.resetAt - Date.now()) / 1000)
            ),
          },
        }
      );
    }

    const body = await request.json();
    const parsed = chatbotRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { message } = parsed.data;
    const reply = getSiteAssistantReply(message);

    return NextResponse.json(
      {
        ok: true,
        ...reply,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chatbot route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process your message right now.",
      },
      { status: 500 }
    );
  }
}
