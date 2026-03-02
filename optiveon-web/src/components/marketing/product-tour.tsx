"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";

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
  const [active, setActive] = useState(TOUR_STEPS[0]?.id ?? "research");
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const step = TOUR_STEPS.find((item) => item.id === active) ?? TOUR_STEPS[0]!;

  return (
    <section
      id="tour"
      className="py-16 md:py-[120px] relative overflow-hidden bg-background"
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
                  "motion-card text-left rounded-xl border px-xl py-lg transition-all duration-normal",
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

          <div className="motion-card rounded-2xl border border-border bg-background-card p-xl md:p-2xl flex flex-col gap-xl relative overflow-hidden group">
            {/* Background ambient glow based on active step */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl",
              active === "research" ? "bg-blue-500" : active === "signals" ? "bg-emerald-500" : active === "risk" ? "bg-warning" : "bg-purple-500"
            )} />

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                  {step.title}
                </p>
                <h3 className="text-2xl font-semibold mt-sm">
                  {step.highlight}
                </h3>
              </div>
              <div className="text-xs text-foreground-muted flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
                Live Preview
              </div>
            </div>

            {/* Dynamic Interactive UI Preview */}
            <div className="relative z-10 bg-background-dark/80 border border-border/50 rounded-xl p-lg min-h-[220px] flex items-center justify-center">
              {active === "research" && (
                <div className="w-full space-y-md animate-fade-in-up">
                  <div className="flex justify-between text-xs text-foreground-secondary mb-2">
                    <span>BTC/USD • 1D</span>
                    <span className="text-emerald-400">Long Setup</span>
                  </div>
                  <div className="h-24 w-full flex items-end gap-1 px-4 border-b border-border/30 pb-4">
                    {[40, 60, 45, 75, 55, 80, 65, 90, 85].map((h, i) => (
                      <div key={i} className={cn("w-full rounded-t-sm", i > 6 ? "bg-emerald-500/80" : "bg-background-elevated")} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-500/10 text-blue-400 border-none">Momentum: High</Badge>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none">Order Block: Tested</Badge>
                  </div>
                </div>
              )}
              {active === "signals" && (
                <div className="w-full space-y-sm animate-fade-in-up">
                  <div className="bg-background-elevated p-3 rounded-lg border border-emerald-500/20 flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-400">IF</span>
                    <span className="text-sm">RSI(14) &lt; 30</span>
                  </div>
                  <div className="flex justify-center text-foreground-muted text-xs">AND</div>
                  <div className="bg-background-elevated p-3 rounded-lg border border-emerald-500/20 flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-400">IF</span>
                    <span className="text-sm">Price touches Lower Bollinger Band</span>
                  </div>
                  <div className="flex justify-center text-foreground-muted text-xs">THEN</div>
                  <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/40 flex justify-center text-emerald-400 text-sm font-semibold shadow-[0_0_15px_rgba(5,150,105,0.1)]">
                    Execute Market Buy (2% Risk)
                  </div>
                </div>
              )}
              {active === "risk" && (
                <div className="w-full flex gap-xl items-center animate-fade-in-up">
                  {/* Fake Gauge */}
                  <div className="relative w-32 h-32 rounded-full border-[8px] border-background-elevated flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="50%" cy="50%" r="56" fill="none" strokeWidth="8" stroke="#d97706" strokeDasharray="351" strokeDashoffset="40" className="opacity-80 drop-shadow-[0_0_8px_rgba(217,119,6,0.6)]" />
                    </svg>
                    <div className="text-center">
                      <span className="block text-xl font-bold text-warning">88%</span>
                      <span className="text-[10px] text-foreground-muted uppercase">Utilized</span>
                    </div>
                  </div>
                  <div className="space-y-sm flex-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-foreground-secondary">Max Drawdown</span>
                      <span className="text-error font-mono">-$4,250</span>
                    </div>
                    <div className="h-1.5 w-full bg-background-elevated rounded-full overflow-hidden">
                      <div className="h-full bg-error w-[75%]" />
                    </div>
                    <div className="flex justify-between text-xs pt-2">
                      <span className="text-foreground-secondary">Margin Health</span>
                      <span className="text-warning font-mono">Warning</span>
                    </div>
                    <div className="h-1.5 w-full bg-background-elevated rounded-full overflow-hidden">
                      <div className="h-full bg-warning w-[88%]" />
                    </div>
                  </div>
                </div>
              )}
              {active === "api" && (
                <div className="w-full font-mono text-xs text-foreground-secondary space-y-1 animate-fade-in-up bg-[#090e17] p-4 rounded-lg">
                  <p><span className="text-green-400">POST</span> /v1/trading/signals</p>
                  <p className="pl-4 text-blue-300">{"{"}</p>
                  <p className="pl-8">&quot;api_key&quot;: <span className="text-amber-300">&quot;sk_live_...&quot;</span>,</p>
                  <p className="pl-8">&quot;webhook_id&quot;: <span className="text-amber-300">&quot;wh_9f82&quot;</span>,</p>
                  <p className="pl-8">&quot;payload&quot;: {"{"}</p>
                  <p className="pl-12 text-foreground-muted">...</p>
                  <p className="pl-8">{"}"}</p>
                  <p className="pl-4 text-blue-300">{"}"}</p>
                  <p className="pt-2 text-emerald-400">→ 200 OK (8ms)</p>
                </div>
              )}
            </div>

            <div className="grid gap-lg sm:grid-cols-2 relative z-10">
              {step.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="motion-card rounded-xl border border-border/50 bg-background-elevated/50 p-lg text-sm text-foreground-secondary backdrop-blur-sm"
                >
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
