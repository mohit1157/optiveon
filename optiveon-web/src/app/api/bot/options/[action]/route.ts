import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BOT_API_URL = process.env.OPTIONS_BOT_API_URL || "http://localhost:8001";

const ADMIN_EMAILS = [
    "admin@optiveon.com",
    "mohit@optiveon.com",
    "balmiki@optiveon.com",
];

const OFFLINE_STATUS = {
    running: false,
    mode: "paper",
    positions: 0,
    todayPnl: "$0.00",
    totalTrades: 0,
    symbols: [],
    error: null,
    recentLogs: [],
};

async function verifyAdmin() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return false;
        return (
            session.user.role === "ADMIN" ||
            ADMIN_EMAILS.includes(session.user.email)
        );
    } catch {
        return false;
    }
}

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ action: string }> }
) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await context.params;

    if (action === "status") {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const res = await fetch(`${BOT_API_URL}/status`, {
                cache: "no-store",
                signal: controller.signal,
            });
            clearTimeout(timeout);
            if (res.ok) {
                const data = await res.json();
                return NextResponse.json(data);
            }
            return NextResponse.json(OFFLINE_STATUS);
        } catch {
            return NextResponse.json(OFFLINE_STATUS);
        }
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function POST(
    _req: NextRequest,
    context: { params: Promise<{ action: string }> }
) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await context.params;

    if (action === "start" || action === "stop") {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);
            const res = await fetch(`${BOT_API_URL}/${action}`, {
                method: "POST",
                cache: "no-store",
                signal: controller.signal,
            });
            clearTimeout(timeout);
            if (res.ok) {
                const data = await res.json();
                return NextResponse.json(data);
            }
            const text = await res.text().catch(() => "");
            return NextResponse.json(
                { error: `Failed to ${action} bot: ${text || res.statusText}` },
                { status: res.status }
            );
        } catch {
            return NextResponse.json(
                { error: "Bot API unreachable — the options bot container may not be running on the server yet. Check deployment status." },
                { status: 503 }
            );
        }
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
