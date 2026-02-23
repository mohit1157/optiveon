import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BOT_API_URL = process.env.OPTIONS_BOT_API_URL || "http://localhost:8001";

const ADMIN_EMAILS = [
    "admin@optiveon.com",
    "mohit@optiveon.com",
    "balmiki@optiveon.com",
];

async function verifyAdmin() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return false;
    return (
        session.user.role === "ADMIN" ||
        ADMIN_EMAILS.includes(session.user.email)
    );
}

export async function GET(
    _req: NextRequest,
    { params }: { params: { action: string } }
) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const action = params.action;

    if (action === "status") {
        try {
            const res = await fetch(`${BOT_API_URL}/status`, {
                cache: "no-store",
            });
            if (res.ok) {
                const data = await res.json();
                return NextResponse.json(data);
            }
            return NextResponse.json(
                { running: false, mode: "paper", positions: 0, todayPnl: "$0.00", totalTrades: 0, symbols: [] },
                { status: 200 }
            );
        } catch {
            // Bot not reachable — return offline status
            return NextResponse.json(
                { running: false, mode: "paper", positions: 0, todayPnl: "$0.00", totalTrades: 0, symbols: [] },
                { status: 200 }
            );
        }
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function POST(
    _req: NextRequest,
    { params }: { params: { action: string } }
) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const action = params.action;

    if (action === "start" || action === "stop") {
        try {
            const res = await fetch(`${BOT_API_URL}/${action}`, {
                method: "POST",
                cache: "no-store",
            });
            if (res.ok) {
                const data = await res.json();
                return NextResponse.json(data);
            }
            return NextResponse.json(
                { error: `Failed to ${action} bot` },
                { status: res.status }
            );
        } catch {
            return NextResponse.json(
                { error: "Bot API unreachable" },
                { status: 503 }
            );
        }
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
