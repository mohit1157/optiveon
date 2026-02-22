import { NextRequest, NextResponse } from "next/server";
import { getMarketSnapshot } from "@/lib/market-data";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per IP per minute
  const ip = getClientIp(request);
  const { success } = rateLimit(`market_${ip}`, {
    maxRequests: 30,
    windowMs: 60000,
  });

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const snapshot = await getMarketSnapshot();
  const status = snapshot.ok ? 200 : 503;
  return NextResponse.json(snapshot, { status });
}
