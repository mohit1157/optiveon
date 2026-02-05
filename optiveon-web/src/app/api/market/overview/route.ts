import { NextResponse } from "next/server";
import { getMarketSnapshot } from "@/lib/market-data";

export async function GET() {
  const snapshot = await getMarketSnapshot();
  const status = snapshot.ok ? 200 : 503;
  return NextResponse.json(snapshot, { status });
}
