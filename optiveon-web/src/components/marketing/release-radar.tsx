"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/section-header";

type Status = "Live" | "In Progress" | "Planned";

const updates: Array<{
  quarter: string;
  title: string;
  description: string;
  status: Status;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    quarter: "Q1 2026",
    title: "Adaptive Strategy Workbench",
    description:
      "Visual strategy layer with live versioning, scenario compare, and one-click deployment profiles.",
    status: "Live",
    icon: Rocket,
  },
  {
    quarter: "Q2 2026",
    title: "Institutional Risk Profiles",
    description:
      "Portfolio guardrails with pre-trade policy checks and deterministic approval logs.",
    status: "In Progress",
    icon: ShieldCheck,
  },
  {
    quarter: "Q2 2026",
    title: "Execution Co-Pilot",
    description:
      "Context-aware runbooks with anomaly detection and rollback-aware alerts.",
    status: "In Progress",
    icon: Sparkles,
  },
  {
    quarter: "Q3 2026",
    title: "Latency Intelligence Layer",
    description:
      "System-wide latency attribution mapped to data sources, queues, and execution paths.",
    status: "Planned",
    icon: CalendarClock,
  },
];

const filters: Status[] = ["Live", "In Progress", "Planned"];

export function ReleaseRadar() {
  const [active, setActive] = useState<Status>("Live");

  const filtered = useMemo(
    () => updates.filter((item) => item.status === active),
    [active]
  );

  return (
    <section id="roadmap" className="py-[120px] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-dark">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 55% 45% at 100% 0%, rgba(27, 53, 89, 0.16) 0%, transparent 60%),
              radial-gradient(ellipse 45% 45% at 0% 100%, rgba(214, 179, 106, 0.06) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="container">
        <SectionHeader
          tag="Release Radar"
          title="What’s Shipping"
          highlightedText="Next"
          subtitle="Transparent roadmap updates to show where the platform is heading."
        />

        <div className="flex flex-wrap gap-sm mb-xl justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-lg py-sm text-sm transition-all duration-normal",
                active === filter
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-secondary hover:border-border-hover hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-lg">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={`${item.title}-${item.status}`}
                className="rounded-2xl border border-border bg-background-card p-xl transition-all duration-normal hover:-translate-y-1 hover:border-border-hover hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-lg">
                  <div className="flex items-center gap-md">
                    <div className="w-11 h-11 rounded-lg bg-background-elevated border border-border flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                        {item.quarter}
                      </p>
                      <p className="font-semibold mt-xs">{item.title}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-xs rounded-full px-md py-xs border",
                      item.status === "Live" &&
                        "text-success border-success/25 bg-success/10",
                      item.status === "In Progress" &&
                        "text-warning border-warning/25 bg-warning/10",
                      item.status === "Planned" &&
                        "text-foreground-secondary border-border bg-background-elevated"
                    )}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
