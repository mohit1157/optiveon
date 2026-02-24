"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
    ArrowLeft,
    Play,
    Square,
    RefreshCw,
    Activity,
    TrendingUp,
    Shield,
    AlertTriangle,
    Clock,
    ServerOff,
    Terminal,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TradePosition {
    symbol: string;
    type: "call" | "put" | "stock";
    side: "long" | "short";
    qty: number;
    entryPrice: number;
    currentPrice: number;
    pnl: number;
    pnlPct: number;
    expDate?: string;
    strikePrice?: number;
    timestamp: string;
}

interface BotStatus {
    running: boolean;
    mode: "paper" | "live";
    uptime?: string;
    positions: number;
    todayPnl: string;
    totalTrades: number;
    symbols: string[];
    lastUpdate?: string;
    trades?: TradePosition[];
    recentActivity?: string[];
    recentLogs?: string[];
    error?: string;
}

const DEFAULT_STATUS: BotStatus = {
    running: false,
    mode: "paper",
    positions: 0,
    todayPnl: "$0.00",
    totalTrades: 0,
    symbols: [],
    trades: [],
    recentActivity: [],
};

export default function OptionsPage() {
    const [status, setStatus] = useState<BotStatus>(DEFAULT_STATUS);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<"start" | "stop" | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [botDeployed, setBotDeployed] = useState(true);

    const fetchStatus = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/bot/options/status");
            if (res.ok) {
                const data = await res.json();
                setStatus(data);
                setBotDeployed(true);
                // Surface crash errors from the status endpoint
                if (data.error) {
                    setError(data.error);
                } else {
                    setError(null);
                }
            } else if (res.status === 503) {
                setBotDeployed(false);
                setError(null);
            } else {
                setError("Failed to fetch bot status");
            }
        } catch {
            setBotDeployed(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 10000);
        return () => clearInterval(interval);
    }, [fetchStatus]);

    const handleAction = async (action: "start" | "stop") => {
        try {
            setActionLoading(action);
            setError(null);
            const res = await fetch(`/api/bot/options/${action}`, { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                // Small delay before status check so the bot has time to
                // either stabilise or crash (crash output needs time to flush)
                await new Promise((r) => setTimeout(r, 2000));
                await fetchStatus();
            } else {
                // Parse FastAPI error detail if present
                const msg = data.detail || data.error || `Failed to ${action} bot`;
                setError(msg);
            }
        } catch {
            setError(`Failed to ${action} bot — server may be unreachable`);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <section className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-background" />

            <div className="container max-w-6xl">
                {/* Header */}
                <div className="flex items-center gap-md mb-xl">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <div className="flex items-center gap-md flex-wrap">
                            <h1 className="text-2xl font-bold">Options Trade Bot</h1>
                            <Badge
                                variant={status.running ? "success" : "muted"}
                                className="text-xs"
                            >
                                {status.running ? "Running" : "Stopped"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {status.mode === "paper" ? "📝 Paper Trading" : "🔴 Live Trading"}
                            </Badge>
                            {!botDeployed && (
                                <Badge variant="error" className="text-xs">
                                    Not Deployed
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-foreground-muted mt-1">
                            3-min EMA pop-pullback-hold options strategy via Alpaca
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="gap-2 flex-shrink-0"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>

                {/* Deployment Warning */}
                {!botDeployed && (
                    <div className="rounded-xl border border-warning/30 bg-warning/5 p-lg mb-xl flex items-start gap-md">
                        <ServerOff className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-foreground mb-1">Bot Container Not Deployed</p>
                            <p className="text-sm text-foreground-secondary leading-relaxed">
                                The options bot is not running on the server yet. To deploy it:
                            </p>
                            <ol className="text-sm text-foreground-secondary mt-2 space-y-1 list-decimal list-inside">
                                <li>Add <code className="text-xs bg-background-elevated px-1 py-0.5 rounded">OPTIONS_BOT_ENV_FILE</code> secret to GitHub repo settings</li>
                                <li>Push to main branch to trigger deployment</li>
                                <li>Wait for the Docker build to complete on EC2</li>
                            </ol>
                        </div>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-lg mb-xl flex items-center gap-md">
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <p className="text-sm text-foreground-secondary flex-1">{error}</p>
                        <button
                            onClick={() => setError(null)}
                            className="text-foreground-muted hover:text-foreground text-sm"
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
                                disabled={status.running || !!actionLoading || !botDeployed}
                                className="gap-2"
                            >
                                <Play className="w-4 h-4" />
                                {actionLoading === "start" ? "Starting..." : "Start Bot"}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleAction("stop")}
                                disabled={!status.running || !!actionLoading}
                                className="gap-2"
                            >
                                <Square className="w-4 h-4" />
                                {actionLoading === "stop" ? "Stopping..." : "Stop Bot"}
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
                            <p className="text-xs text-foreground-muted mt-lg flex items-center gap-1">
                                <Clock className="w-3 h-3" />
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
                                : ["QQQ", "TSLA", "AAPL", "NVDA", "PLTR", "AMD", "AMZN", "HOOD", "GOOGL"]
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

                {/* Positions Table */}
                <div className="rounded-2xl border border-border bg-background-card p-xl mb-xl">
                    <h2 className="text-sm uppercase tracking-[0.15em] text-foreground-muted mb-lg">
                        Positions &amp; Trade History
                    </h2>
                    {(status.trades && status.trades.length > 0) ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border text-left">
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">Symbol</th>
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">Type</th>
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">Side</th>
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">Qty</th>
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">Strike</th>
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">Exp Date</th>
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">Entry</th>
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">Current</th>
                                        <th className="pb-3 pr-4 text-xs uppercase tracking-wider text-foreground-muted font-medium">P&amp;L</th>
                                        <th className="pb-3 text-xs uppercase tracking-wider text-foreground-muted font-medium">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {status.trades.map((trade, i) => (
                                        <tr key={i} className="border-b border-border/50 last:border-0">
                                            <td className="py-3 pr-4 font-mono font-semibold">{trade.symbol}</td>
                                            <td className="py-3 pr-4">
                                                <Badge
                                                    variant={trade.type === "call" ? "success" : trade.type === "put" ? "error" : "outline"}
                                                    className="text-[0.65rem]"
                                                >
                                                    {trade.type.toUpperCase()}
                                                </Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-foreground-secondary">{trade.side}</td>
                                            <td className="py-3 pr-4 font-mono">{trade.qty}</td>
                                            <td className="py-3 pr-4 font-mono">
                                                {trade.strikePrice ? `$${trade.strikePrice.toFixed(2)}` : "—"}
                                            </td>
                                            <td className="py-3 pr-4 text-foreground-secondary">{trade.expDate || "—"}</td>
                                            <td className="py-3 pr-4 font-mono">${trade.entryPrice.toFixed(2)}</td>
                                            <td className="py-3 pr-4 font-mono">${trade.currentPrice.toFixed(2)}</td>
                                            <td className={cn("py-3 pr-4 font-mono font-semibold", trade.pnl >= 0 ? "text-green-400" : "text-red-400")}>
                                                {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)} ({trade.pnlPct >= 0 ? "+" : ""}{trade.pnlPct.toFixed(1)}%)
                                            </td>
                                            <td className="py-3 text-xs text-foreground-muted whitespace-nowrap">{trade.timestamp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Activity className="w-8 h-8 text-foreground-muted mx-auto mb-md" />
                            <p className="text-sm text-foreground-muted">
                                {status.running
                                    ? "No positions yet — bot is scanning for signals..."
                                    : "Start the bot to begin trading"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                {status.recentActivity && status.recentActivity.length > 0 && (
                    <div className="rounded-2xl border border-border bg-background-card p-xl mb-xl">
                        <h2 className="text-sm uppercase tracking-[0.15em] text-foreground-muted mb-lg">
                            Recent Activity
                        </h2>
                        <div className="space-y-2">
                            {status.recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center gap-md text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                    <span className="text-foreground-secondary">{activity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bot Logs */}
                {status.recentLogs && status.recentLogs.length > 0 && (
                    <div className="rounded-2xl border border-border bg-background-card p-xl mb-xl">
                        <h2 className="text-sm uppercase tracking-[0.15em] text-foreground-muted mb-lg flex items-center gap-2">
                            <Terminal className="w-4 h-4" />
                            Bot Logs
                        </h2>
                        <div className="bg-background rounded-lg border border-border p-md overflow-x-auto max-h-64 overflow-y-auto">
                            <pre className="text-xs font-mono text-foreground-secondary leading-relaxed whitespace-pre-wrap">
                                {status.recentLogs.join("\n")}
                            </pre>
                        </div>
                    </div>
                )}

                {/* Strategy Info */}
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
