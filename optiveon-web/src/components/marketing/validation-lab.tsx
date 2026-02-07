"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  FlaskConical,
  LineChart,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/section-header";

type ValidationStage = {
  id: string;
  label: string;
  title: string;
  summary: string;
  metric: string;
  checks: string[];
  icon: React.ComponentType<{ className?: string }>;
};

type MarketSession = {
  id: string;
  label: string;
  market: string;
  startsUtc: number;
  endsUtc: number;
};

const VALIDATION_STAGES: ValidationStage[] = [
  {
    id: "research",
    label: "Step 01",
    title: "Research & Signal Design",
    summary:
      "Quant teams define hypotheses, signal families, and execution assumptions across multiple asset classes.",
    metric: "42 active strategy families",
    checks: [
      "Cross-asset feature engineering",
      "Data quality and survivorship checks",
      "Regime segmentation before model fitting",
    ],
    icon: LineChart,
  },
  {
    id: "validation",
    label: "Step 02",
    title: "Out-of-Sample Validation",
    summary:
      "Strategies are stress tested across volatile and low-liquidity regimes before entering deployment queues.",
    metric: "86% approval rate over last 90 days",
    checks: [
      "Walk-forward and out-of-sample testing",
      "Drawdown and slippage stress scenarios",
      "PnL stability and parameter sensitivity scans",
    ],
    icon: FlaskConical,
  },
  {
    id: "risk",
    label: "Step 03",
    title: "Risk & Control Gating",
    summary:
      "Every strategy passes deterministic guardrails to enforce exposure, capital allocation, and fail-safe rules.",
    metric: "12 ms median risk-evaluation latency",
    checks: [
      "Pre-trade exposure policy validation",
      "Automated anomaly flags and circuit breakers",
      "Audit-ready decision trails",
    ],
    icon: ShieldCheck,
  },
  {
    id: "deploy",
    label: "Step 04",
    title: "Client Deployment",
    summary:
      "Approved strategies move to paper and production environments with observability and rollback controls.",
    metric: "99.9% deployment pipeline reliability",
    checks: [
      "Paper/live environment parity checks",
      "Operational runbooks and alert routing",
      "Rollback-aware release controls",
    ],
    icon: Rocket,
  },
];

const MARKET_SESSIONS: MarketSession[] = [
  {
    id: "asia",
    label: "Asia Session",
    market: "Singapore / Hong Kong",
    startsUtc: 0,
    endsUtc: 8,
  },
  {
    id: "europe",
    label: "Europe Session",
    market: "London / Frankfurt",
    startsUtc: 7,
    endsUtc: 16,
  },
  {
    id: "us",
    label: "US Session",
    market: "New York / Chicago",
    startsUtc: 13,
    endsUtc: 21,
  },
];

function isSessionOpen(
  currentUtcHour: number,
  startsUtc: number,
  endsUtc: number
) {
  if (startsUtc < endsUtc) {
    return currentUtcHour >= startsUtc && currentUtcHour < endsUtc;
  }
  return currentUtcHour >= startsUtc || currentUtcHour < endsUtc;
}

export function ValidationLab() {
  const [activeStageId, setActiveStageId] = useState(
    VALIDATION_STAGES[0]?.id ?? "research"
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const stage =
    VALIDATION_STAGES.find((item) => item.id === activeStageId) ??
    VALIDATION_STAGES[0]!;

  const utcHour = useMemo(
    () => currentTime.getUTCHours() + currentTime.getUTCMinutes() / 60,
    [currentTime]
  );

  const utcLabel = useMemo(
    () =>
      currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
      }),
    [currentTime]
  );

  return (
    <section id="validation" className="py-[120px] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-dark">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 100% 0%, rgba(27, 53, 89, 0.2) 0%, transparent 65%),
              radial-gradient(ellipse 45% 35% at 0% 100%, rgba(214, 179, 106, 0.08) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="container">
        <SectionHeader
          tag="Validation"
          title="Research to Production"
          highlightedText="With Institutional Controls"
          subtitle="Optiveon software is validated through a structured lifecycle before any strategy is promoted to client deployment."
        />

        <div className="grid gap-2xl xl:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-2xl border border-border bg-background-card/85 p-xl md:p-2xl">
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-foreground-muted mb-lg">
              Validation Lifecycle
            </p>
            <div className="space-y-md">
              {VALIDATION_STAGES.map((item) => {
                const active = item.id === stage.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveStageId(item.id)}
                    className={cn(
                      "group w-full rounded-xl border px-lg py-lg text-left transition-all duration-normal",
                      active
                        ? "border-accent bg-accent/10 shadow-accent"
                        : "border-border bg-background-dark/55 hover:border-border-hover hover:bg-background-card"
                    )}
                  >
                    <div className="flex items-start justify-between gap-lg">
                      <div>
                        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-foreground-muted">
                          {item.label}
                        </p>
                        <p className="mt-xs text-base font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-sm text-sm text-foreground-secondary leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border",
                          active
                            ? "border-accent/50 bg-accent/15"
                            : "border-border bg-background-elevated group-hover:border-border-hover"
                        )}
                      >
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background-card p-xl md:p-2xl">
            <div className="flex flex-wrap items-center justify-between gap-md border-b border-border pb-lg">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-foreground-muted">
                  Active Stage
                </p>
                <h3 className="mt-sm text-2xl font-semibold text-foreground">
                  {stage.title}
                </h3>
              </div>
              <div className="rounded-full border border-accent/30 bg-accent/10 px-md py-xs text-xs uppercase tracking-[0.14em] text-accent">
                {stage.metric}
              </div>
            </div>

            <div className="mt-lg space-y-md">
              {stage.checks.map((check) => (
                <div
                  key={check}
                  className="flex items-start gap-md rounded-xl border border-border bg-background-elevated/70 px-lg py-md"
                >
                  <span className="mt-[7px] h-2 w-2 rounded-full bg-accent" />
                  <p className="text-sm leading-relaxed text-foreground-secondary">
                    {check}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-xl rounded-xl border border-border bg-background-dark/70 p-lg">
              <div className="flex flex-wrap items-center justify-between gap-sm">
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-foreground-muted">
                  Global Validation Pulse
                </p>
                <p className="text-xs text-foreground-muted">UTC {utcLabel}</p>
              </div>

              <div className="mt-md grid gap-sm sm:grid-cols-3">
                {MARKET_SESSIONS.map((session) => {
                  const open = isSessionOpen(
                    utcHour,
                    session.startsUtc,
                    session.endsUtc
                  );
                  return (
                    <div
                      key={session.id}
                      className={cn(
                        "rounded-lg border px-md py-md transition-colors duration-normal",
                        open
                          ? "border-success/30 bg-success/10"
                          : "border-border bg-background-card"
                      )}
                    >
                      <p className="text-xs uppercase tracking-[0.12em] text-foreground-muted">
                        {session.label}
                      </p>
                      <p className="mt-sm text-sm font-semibold text-foreground">
                        {session.market}
                      </p>
                      <p
                        className={cn(
                          "mt-sm inline-flex items-center gap-xs text-xs uppercase tracking-[0.12em]",
                          open ? "text-success" : "text-foreground-muted"
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            open
                              ? "bg-success animate-pulse"
                              : "bg-foreground-muted"
                          )}
                        />
                        {open ? "Open" : "Closed"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-lg flex items-center gap-sm text-sm text-foreground-secondary">
              <ArrowRight className="h-4 w-4 text-accent" />
              Strategies that pass each gate can be promoted to paper or live
              client environments.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
