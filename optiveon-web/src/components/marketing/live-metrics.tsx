"use client";

import { useEffect, useMemo, useState } from "react";
import { MetricsGrid } from "./metrics-grid";

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

export function LiveMetrics() {
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
        setError(err instanceof Error ? err.message : "Market data unavailable");
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
  const metrics = items.map((item) => ({
    label: item.name,
    value: item.price,
    prefix: "$",
    decimals: 2,
    deltaLabel: `${item.change >= 0 ? "+" : ""}${item.change.toFixed(2)} (${
      item.changePercent >= 0 ? "+" : ""
    }${item.changePercent.toFixed(2)}%)`,
  }));

  const updatedAt = snapshot?.updatedAt
    ? new Date(snapshot.updatedAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  const subtitle = useMemo(() => {
    if (error) return "Connect a market data provider to display live prices.";
    if (updatedAt) return `Updated ${updatedAt}`;
    return "Live pricing snapshots refreshed every minute.";
  }, [error, updatedAt]);

  return (
    <section className="py-[120px] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-dark">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 10% 0%, rgba(27, 53, 89, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 90% 20%, rgba(214, 179, 106, 0.06) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="container">
        <div className="max-w-[760px] mb-4xl text-center mx-auto">
          <span className="section-tag mb-lg">Market Pulse</span>
          <h2 className="text-section-title mb-lg text-balance">
            Live Market <span className="gradient-text">Signals</span>
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed text-balance">
            {subtitle}
          </p>
          {error && (
            <p className="text-sm text-warning mt-md">
              {error}. Add `ALPHAVANTAGE_API_KEY` or `POLYGON_API_KEY` in your
              environment.
            </p>
          )}
        </div>

        <MetricsGrid items={metrics} />
      </div>
    </section>
  );
}
