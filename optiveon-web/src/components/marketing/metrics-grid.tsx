"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface MetricItem {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  deltaLabel?: string;
}

interface MetricsGridProps {
  items: MetricItem[];
}

function useCountUp(target: number, isActive: boolean, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let raf = 0;
    const duration = 1200;
    const start = performance.now();
    const factor = Math.pow(10, decimals);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const next = Math.round(target * progress * factor) / factor;
      setValue(next);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, isActive, decimals]);

  return value;
}

export function MetricsGrid({ items }: MetricsGridProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-lg md:grid-cols-2 lg:grid-cols-4",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {items.map((item) => (
        <MetricCard key={item.label} item={item} active={isVisible} />
      ))}
    </div>
  );
}

function MetricCard({ item, active }: { item: MetricItem; active: boolean }) {
  const count = useCountUp(item.value, active, item.decimals || 0);
  const formatted = useMemo(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: item.decimals || 0,
      maximumFractionDigits: item.decimals || 0,
    });
    return `${item.prefix || ""}${formatter.format(count)}${item.suffix || ""}`;
  }, [count, item.decimals, item.prefix, item.suffix]);

  return (
    <div className="rounded-xl border border-border bg-background-card p-xl shadow-md transition-all duration-slow hover:-translate-y-1 hover:shadow-lg">
      <div className="text-3xl font-bold">{formatted}</div>
      <div className="text-sm text-foreground-secondary mt-sm">
        {item.label}
      </div>
      {item.deltaLabel && (
        <div className="text-xs text-foreground-muted mt-sm">
          {item.deltaLabel}
        </div>
      )}
    </div>
  );
}
