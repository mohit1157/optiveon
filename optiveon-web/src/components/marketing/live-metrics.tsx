"use client";

import { useEffect, useMemo, useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface MarketSnapshot {
  ok: boolean;
  provider: string;
  updatedAt: string;
  items: MarketItem[];
  error?: string;
}

interface LiveMetricsProps {
  className?: string;
  limit?: number;
}

const fallbackItems: MarketItem[] = [
  { symbol: "SPY", name: "S&P 500 ETF", price: 0, change: 0, changePercent: 0 },
  {
    symbol: "QQQ",
    name: "Nasdaq 100 ETF",
    price: 0,
    change: 0,
    changePercent: 0,
  },
  { symbol: "GLD", name: "Gold", price: 0, change: 0, changePercent: 0 },
  { symbol: "USO", name: "Crude Oil", price: 0, change: 0, changePercent: 0 },
];

export function LiveMetrics({ className, limit = 3 }: LiveMetricsProps) {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const response = await fetch("/api/market/overview");
        const data = (await response.json()) as MarketSnapshot;
        if (!isMounted) return;
        setSnapshot(data);
        setError(data.ok ? null : data.error || "Market data unavailable");
      } catch (err) {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Market data unavailable"
        );
      }
    };

    load();
    const interval = window.setInterval(load, 60_000);
    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const items = snapshot?.items?.length ? snapshot.items : fallbackItems;
  const updatedAt = snapshot?.updatedAt
    ? new Date(snapshot.updatedAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  const subtitle = useMemo(() => {
    if (error) return "Connect a market data provider.";
    if (updatedAt) return `Updated ${updatedAt}`;
    return "Updating...";
  }, [error, updatedAt]);

  const displayItems = items.slice(0, limit);

  return (
    <div
      className={cn(
        "absolute top-24 right-6 w-[240px] rounded-2xl border border-border bg-background/85 p-lg shadow-lg backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.2em] text-foreground-muted">
        <span>Market Snapshot</span>
        <span>{subtitle}</span>
      </div>

      <div className="mt-md space-y-md">
        {displayItems.map((item) => {
          const isUp = item.changePercent > 0;
          const isDown = item.changePercent < 0;
          const deltaClass = isUp
            ? "text-success"
            : isDown
              ? "text-error"
              : "text-foreground-muted";

          return (
            <div
              key={item.symbol}
              className="flex items-center justify-between gap-md"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.symbol}
                </p>
                <p className="text-xs text-foreground-muted">{item.name}</p>
              </div>
              <div className="text-right">
                <p className={cn("text-sm font-semibold", deltaClass)}>
                  {formatCurrency(item.price || 0)}
                </p>
                <p
                  className={cn(
                    "text-xs flex items-center justify-end",
                    deltaClass
                  )}
                >
                  {isUp && <ArrowUpRight className="w-3 h-3" />}
                  {isDown && <ArrowDownRight className="w-3 h-3" />}
                  {!isUp && !isDown && <span className="w-3" />}
                  {item.changePercent >= 0 ? "+" : ""}
                  {item.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="mt-md text-[0.7rem] text-warning leading-relaxed">
          {error}. Add `ALPHAVANTAGE_API_KEY` or `POLYGON_API_KEY`.
        </p>
      )}
    </div>
  );
}
