"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SectionHeader } from "@/components/layout/section-header";

const TOUR_STEPS = [
  {
    id: "research",
    title: "Research Terminal",
    description:
      "Build multi-asset research stacks with instant correlation, regime, and momentum overlays.",
    bullets: [
      "Multi-timeframe signals",
      "Cross-asset correlation heatmaps",
      "Custom watchlists",
    ],
    highlight: "Signal Confidence 87%",
  },
  {
    id: "signals",
    title: "Signal Builder",
    description:
      "Compose strategies with visual rules, then stress test them across market cycles.",
    bullets: [
      "Rule-based strategy editor",
      "Instant backtesting",
      "Alerts across channels",
    ],
    highlight: "Backtest Sharpe 1.72",
  },
  {
    id: "risk",
    title: "Risk Monitor",
    description:
      "Track exposures, drawdown, and portfolio heat with real-time alerts.",
    bullets: ["Risk limits", "Position sizing", "PnL impact modeling"],
    highlight: "Exposure Limit 92%",
  },
  {
    id: "api",
    title: "API Suite",
    description:
      "Integrate Optiveon into your stack with secure, rate-limited endpoints.",
    bullets: ["Signed webhooks", "Audit trails", "Usage analytics"],
    highlight: "10k calls/day",
  },
];

export function ProductTour() {
  const [active, setActive] = useState(TOUR_STEPS[0].id);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const step = TOUR_STEPS.find((item) => item.id === active) || TOUR_STEPS[0];

  return (
    <section
      id="tour"
      className="py-[120px] relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 0% 50%, rgba(27, 53, 89, 0.18) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 100% 30%, rgba(214, 179, 106, 0.08) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="container" ref={ref}>
        <SectionHeader
          tag="Product Tour"
          title="Experience the"
          highlightedText="Workflow"
          subtitle="A guided look at how research teams move from signals to execution."
        />

        <div
          className={cn(
            "grid lg:grid-cols-[0.9fr_1.1fr] gap-4xl items-stretch",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="flex flex-col gap-md">
            {TOUR_STEPS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={cn(
                  "text-left rounded-xl border px-xl py-lg transition-all duration-normal",
                  active === item.id
                    ? "border-accent bg-accent/10 shadow-accent"
                    : "border-border bg-background-card hover:border-border-hover hover:bg-background-card-hover"
                )}
              >
                <div className="text-sm uppercase tracking-[0.2em] text-foreground-muted">
                  {item.title}
                </div>
                <div className="text-base font-semibold text-foreground mt-sm">
                  {item.description}
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-background-card p-2xl flex flex-col gap-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                  {step.title}
                </p>
                <h3 className="text-2xl font-semibold mt-sm">{step.highlight}</h3>
              </div>
              <div className="text-xs text-foreground-muted">
                Live preview
              </div>
            </div>

            <div className="grid gap-lg sm:grid-cols-2">
              {step.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="rounded-xl border border-border bg-background-elevated p-lg text-sm text-foreground-secondary"
                >
                  {bullet}
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-accent/30 bg-gradient-to-r from-accent/10 via-transparent to-transparent p-lg text-sm text-foreground-secondary">
              <span className="font-semibold text-foreground">Optiveon Lens:</span>{" "}
              {step.description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
