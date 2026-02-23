"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    ArrowLeft,
    Play,
    Square,
    RefreshCw,
    Activity,
    TrendingUp,
    Shield,
    AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BotStatus {
    running: boolean;
    mode: "paper" | "live";
    uptime?: string;
    positions: number;
    todayPnl: string;
    totalTrades: number;
    symbols: string[];
    lastUpdate?: string;
}

const DEFAULT_STATUS: BotStatus = {
    running: false,
    mode: "paper",
    positions: 0,
    todayPnl: "$0.00",
    totalTrades: 0,
    symbols: [],
};

export default function OptionsPage() {
    const [status, setStatus] = useState<BotStatus>(DEFAULT_STATUS);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStatus = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/bot/options/status");
            if (res.ok) {
                const data = await res.json();
                setStatus(data);
                setError(null);
            } else {
                setError("Failed to fetch bot status");
            }
        } catch {
            setError("Bot API unreachable — it may not be deployed yet");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, [fetchStatus]);

    const handleAction = async (action: "start" | "stop") => {
        try {
            setActionLoading(true);
            const res = await fetch(`/api/bot/options/${action}`, { method: "POST" });
            if (res.ok) {
                await fetchStatus();
            } else {
                const data = await res.json();
                setError(data.error || `Failed to ${action} bot`);
            }
        } catch {
            setError(`Failed to ${action} bot`);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <section className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-background" />

            <div className="container max-w-5xl">
                {/* Header */}
                <div className="flex items-center gap-md mb-xl">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-md">
                            <h1 className="text-2xl font-bold">Options Trade Bot</h1>
                            <Badge
                                variant={status.running ? "success" : "muted"}
                                className="text-xs"
                            >
                                {status.running ? "Running" : "Stopped"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {status.mode === "paper" ? "Paper Trading" : "Live Trading"}
                            </Badge>
                        </div>
                        <p className="text-sm text-foreground-muted mt-1">
                            3-min EMA pop-pullback-hold options strategy via Alpaca
                        </p>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="rounded-xl border border-warning/30 bg-warning/10 p-lg mb-xl flex items-center gap-md">
                        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                        <p className="text-sm text-foreground-secondary">{error}</p>
                        <button
                            onClick={() => setError(null)}
                            className="ml-auto text-foreground-muted hover:text-foreground text-sm"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Controls */}
                <div className="grid sm:grid-cols-2 gap-lg mb-xl">
                    <div className="rounded-2xl border border-border bg-background-card p-xl">
                        <h2 className="text-sm uppercase tracking-[0.15em] text-foreground-muted mb-lg">
                            Bot Controls
                        </h2>
                        <div className="flex flex-wrap gap-md">
                            <Button
                                variant="primary"
                                onClick={() => handleAction("start")}
                                disabled={status.running || actionLoading}
                                className="gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Start Bot
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleAction("stop")}
                                disabled={!status.running || actionLoading}
                                className="gap-2"
                            >
                                <Square className="w-4 h-4" />
                                Stop Bot
                            </Button>
                            <Button
                                variant="outline"
                                onClick={fetchStatus}
                                disabled={loading}
                                className="gap-2"
                            >
                                <RefreshCw
                                    className={cn("w-4 h-4", loading && "animate-spin")}
                                />
                                Refresh
                            </Button>
                        </div>
                        {status.uptime && (
                            <p className="text-xs text-foreground-muted mt-lg">
                                Uptime: {status.uptime}
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-border bg-background-card p-xl">
                        <h2 className="text-sm uppercase tracking-[0.15em] text-foreground-muted mb-lg">
                            Watchlist
                        </h2>
                        <div className="flex flex-wrap gap-sm">
                            {(status.symbols.length > 0
                                ? status.symbols
                                : ["SPY", "QQQ", "AAPL", "TSLA"]
                            ).map((sym) => (
                                <span
                                    key={sym}
                                    className="rounded-full border border-border bg-background-elevated px-md py-xs text-sm font-mono text-foreground-secondary"
                                >
                                    {sym}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-3 gap-lg mb-xl">
                    <div className="rounded-2xl border border-border bg-background-card p-xl">
                        <div className="flex items-center gap-md mb-md">
                            <div className="w-10 h-10 rounded-lg bg-background-elevated border border-border flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-accent" />
                            </div>
                            <p className="text-xs uppercase tracking-[0.15em] text-foreground-muted">
                                Today&apos;s P&amp;L
                            </p>
                        </div>
                        <p className="text-2xl font-bold gradient-text">
                            {status.todayPnl}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background-card p-xl">
                        <div className="flex items-center gap-md mb-md">
                            <div className="w-10 h-10 rounded-lg bg-background-elevated border border-border flex items-center justify-center">
                                <Activity className="w-5 h-5 text-accent" />
                            </div>
                            <p className="text-xs uppercase tracking-[0.15em] text-foreground-muted">
                                Open Positions
                            </p>
                        </div>
                        <p className="text-2xl font-bold">{status.positions}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background-card p-xl">
                        <div className="flex items-center gap-md mb-md">
                            <div className="w-10 h-10 rounded-lg bg-background-elevated border border-border flex items-center justify-center">
                                <Shield className="w-5 h-5 text-accent" />
                            </div>
                            <p className="text-xs uppercase tracking-[0.15em] text-foreground-muted">
                                Total Trades
                            </p>
                        </div>
                        <p className="text-2xl font-bold">{status.totalTrades}</p>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-xl">
                    <h3 className="text-sm font-semibold mb-sm">
                        Strategy: Pop-Pullback-Hold (3-Min EMA)
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                        Detects continuation patterns on 3-minute candles using EMA9. Enters
                        after a pop above/below EMA, a pullback to EMA, and a 1-2 candle
                        hold confirmation. Places bracket orders with stop-loss and
                        take-profit via Alpaca.
                    </p>
                    {status.lastUpdate && (
                        <p className="text-xs text-foreground-muted mt-md">
                            Last updated: {status.lastUpdate}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
