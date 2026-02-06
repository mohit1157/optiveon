"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgeDollarSign, Clock3, LineChart, Sparkles } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";

type PlanKey = "STARTER" | "PROFESSIONAL";

const planPricing: Record<
  PlanKey,
  { label: string; monthly: number; slug: string }
> = {
  STARTER: { label: "Starter", monthly: 99, slug: "starter" },
  PROFESSIONAL: { label: "Professional", monthly: 299, slug: "professional" },
};

export function RoiCalculator() {
  const [plan, setPlan] = useState<PlanKey>("PROFESSIONAL");
  const [teamSize, setTeamSize] = useState(5);
  const [monthlyStrategies, setMonthlyStrategies] = useState(25);
  const [avgCapital, setAvgCapital] = useState(15000);
  const [alphaLift, setAlphaLift] = useState(1.8);
  const [weeklyHoursSaved, setWeeklyHoursSaved] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(140);

  const metrics = useMemo(() => {
    const platform = planPricing[plan];
    const yearlyPlanCost = platform.monthly * 12;

    const strategyValue =
      monthlyStrategies * avgCapital * (alphaLift / 100) * 12;
    const laborValue =
      weeklyHoursSaved * hourlyRate * 52 * Math.max(teamSize, 1);
    const totalValue = strategyValue + laborValue;
    const netGain = totalValue - yearlyPlanCost;
    const roi = yearlyPlanCost > 0 ? (netGain / yearlyPlanCost) * 100 : 0;
    const monthlyValue = totalValue / 12;
    const paybackMonths =
      monthlyValue > 0 ? Math.max(yearlyPlanCost / monthlyValue, 0.1) : 12;

    return {
      yearlyPlanCost,
      strategyValue,
      laborValue,
      totalValue,
      netGain,
      roi,
      paybackMonths,
    };
  }, [
    plan,
    teamSize,
    monthlyStrategies,
    avgCapital,
    alphaLift,
    weeklyHoursSaved,
    hourlyRate,
  ]);

  return (
    <section id="roi" className="py-[120px] relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 55% 45% at 0% 20%, rgba(27, 53, 89, 0.2) 0%, transparent 65%),
              radial-gradient(ellipse 45% 45% at 100% 100%, rgba(214, 179, 106, 0.08) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="container">
        <SectionHeader
          tag="ROI Planner"
          title="Model Your"
          highlightedText="Business Impact"
          subtitle="Tune assumptions and get an instant estimate of annual value created by Optiveon."
        />

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-2xl items-start">
          <div className="rounded-2xl border border-border bg-background-card p-2xl space-y-xl">
            <div className="grid sm:grid-cols-2 gap-md">
              {(
                Object.keys(planPricing) as Array<keyof typeof planPricing>
              ).map((key) => (
                <button
                  key={key}
                  onClick={() => setPlan(key)}
                  className={cn(
                    "rounded-xl border p-lg text-left transition-all duration-normal",
                    plan === key
                      ? "border-accent bg-accent/10 shadow-accent"
                      : "border-border hover:border-border-hover bg-background-elevated"
                  )}
                >
                  <p className="text-sm text-foreground-muted uppercase tracking-[0.16em]">
                    Plan
                  </p>
                  <p className="text-xl font-semibold mt-sm">
                    {planPricing[key].label}
                  </p>
                  <p className="text-sm text-foreground-secondary mt-sm">
                    {formatCurrency(planPricing[key].monthly)}/month
                  </p>
                </button>
              ))}
            </div>

            <SliderField
              label="Team size"
              value={teamSize}
              setValue={setTeamSize}
              min={1}
              max={40}
              step={1}
              suffix=" analysts"
            />
            <SliderField
              label="Strategies reviewed per month"
              value={monthlyStrategies}
              setValue={setMonthlyStrategies}
              min={5}
              max={100}
              step={1}
            />
            <SliderField
              label="Average capital per strategy"
              value={avgCapital}
              setValue={setAvgCapital}
              min={5000}
              max={100000}
              step={1000}
              formatter={(v) => formatCurrency(v)}
            />
            <SliderField
              label="Expected performance lift"
              value={alphaLift}
              setValue={setAlphaLift}
              min={0.2}
              max={5}
              step={0.1}
              formatter={(v) => `${v.toFixed(1)}%`}
            />
            <SliderField
              label="Research hours saved per week"
              value={weeklyHoursSaved}
              setValue={setWeeklyHoursSaved}
              min={1}
              max={40}
              step={1}
              suffix=" hours"
            />
            <SliderField
              label="Blended hourly cost"
              value={hourlyRate}
              setValue={setHourlyRate}
              min={40}
              max={300}
              step={5}
              formatter={(v) => formatCurrency(v)}
            />
          </div>

          <div className="rounded-2xl border border-border bg-gradient-premium p-2xl space-y-lg sticky top-24">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                Annual Impact
              </p>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <p className="text-4xl font-bold text-foreground">
              {formatCurrency(metrics.netGain)}
            </p>
            <p className="text-sm text-foreground-secondary">
              Net gain after plan cost
            </p>

            <div className="grid grid-cols-2 gap-md pt-md">
              <Metric
                icon={LineChart}
                label="Modeled ROI"
                value={`${Math.max(metrics.roi, 0).toFixed(0)}%`}
              />
              <Metric
                icon={Clock3}
                label="Payback"
                value={`${metrics.paybackMonths.toFixed(1)} mo`}
              />
              <Metric
                icon={BadgeDollarSign}
                label="Alpha Value"
                value={formatCurrency(metrics.strategyValue)}
              />
              <Metric
                icon={Clock3}
                label="Labor Value"
                value={formatCurrency(metrics.laborValue)}
              />
            </div>

            <div className="rounded-xl bg-background/40 border border-border p-lg space-y-sm">
              <p className="text-sm text-foreground-secondary">
                Estimated annual platform cost:{" "}
                <span className="text-foreground font-semibold">
                  {formatCurrency(metrics.yearlyPlanCost)}
                </span>
              </p>
              <Button className="w-full" asChild>
                <Link href={`/checkout?plan=${planPricing[plan].slug}`}>
                  Start {planPricing[plan].label} Plan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-md">
      <div className="flex items-center gap-sm text-foreground-muted text-xs uppercase tracking-[0.12em]">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <p className="text-sm font-semibold mt-sm">{value}</p>
    </div>
  );
}

function SliderField({
  label,
  value,
  setValue,
  min,
  max,
  step,
  suffix,
  formatter,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  formatter?: (value: number) => string;
}) {
  const displayValue = formatter
    ? formatter(value)
    : `${Number.isInteger(value) ? value : value.toFixed(1)}${suffix || ""}`;

  return (
    <label className="block space-y-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground-secondary">{label}</span>
        <span className="text-sm font-semibold">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-background-elevated slider-track"
      />
    </label>
  );
}
