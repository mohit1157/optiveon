"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/constants/pricing";

const comparisonPlans = [
  {
    key: "starter",
    label: "Starter",
    descriptor: "Individual",
    featured: false,
  },
  {
    key: "professional",
    label: "Professional",
    descriptor: "Recommended",
    featured: true,
  },
  {
    key: "enterprise",
    label: "Enterprise",
    descriptor: "Institutional",
    featured: false,
  },
] as const;

const comparisonRows = [
  {
    capability: "Real-time market data",
    values: {
      starter: "Included",
      professional: "Included",
      enterprise: "Included",
    },
  },
  {
    capability: "Signal generation",
    values: {
      starter: "Basic",
      professional: "Advanced",
      enterprise: "Custom",
    },
  },
  {
    capability: "Backtesting",
    values: {
      starter: "Core",
      professional: "Advanced suite",
      enterprise: "Institutional",
    },
  },
  {
    capability: "API usage",
    values: {
      starter: "Limited",
      professional: "10K calls/day",
      enterprise: "Unlimited",
    },
  },
  {
    capability: "Support",
    values: {
      starter: "Email",
      professional: "Priority",
      enterprise: "Dedicated manager",
    },
  },
  {
    capability: "SLA",
    values: {
      starter: "No",
      professional: "Standard",
      enterprise: "Guaranteed",
    },
  },
];

const pricingFaqs = [
  {
    question: "Can I cancel or change plans anytime?",
    answer:
      "Yes. You can upgrade, downgrade, or cancel from the billing portal. Plan changes apply at the next billing cycle unless noted otherwise.",
  },
  {
    question: "Do I need a credit card to evaluate the platform?",
    answer:
      "For paid plans, checkout is processed by Stripe with secure card handling. Enterprise evaluations can be coordinated through sales.",
  },
  {
    question: "How does API access differ between plans?",
    answer:
      "Professional includes a fixed daily API quota suitable for production pilots. Enterprise provides higher throughput and tailored integration support.",
  },
  {
    question: "What is included in Enterprise onboarding?",
    answer:
      "Enterprise includes tailored rollout support, integration guidance, and a dedicated account contact aligned to your team requirements.",
  },
];

function PricingCard({
  tier,
  index,
}: {
  tier: (typeof pricingTiers)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "relative p-2xl border rounded-xl transition-all duration-slow",
        tier.featured
          ? "border-accent bg-gradient-to-b from-accent/5 to-transparent scale-[1.02]"
          : "border-border bg-background-card hover:border-border-hover hover:shadow-md",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Badge */}
      {tier.badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          {tier.badge}
        </Badge>
      )}

      {/* Header */}
      <div className="text-center pb-xl mb-xl border-b border-border">
        <h3 className="text-[1.375rem] font-semibold mb-xs">{tier.name}</h3>
        <p className="text-sm text-foreground-muted mb-lg">
          {tier.description}
        </p>
        <div className="flex items-baseline justify-center gap-xs">
          <span className="text-5xl font-bold tracking-tight">
            {tier.priceLabel || `$${tier.price}`}
          </span>
          {tier.period && (
            <span className="text-[0.9375rem] text-foreground-muted">
              {tier.period}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-lg mb-2xl">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-md text-[0.9375rem] text-foreground-secondary"
          >
            <Check className="w-[18px] h-[18px] text-success flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={tier.featured ? "primary" : "outline"}
        className="w-full"
        asChild
      >
        <Link href={tier.href}>{tier.cta}</Link>
      </Button>
    </div>
  );
}

function getComparisonValueStyle(value: string, isFeatured: boolean) {
  const normalized = value.toLowerCase();
  if (normalized === "no" || normalized === "limited") {
    return "border-error/30 bg-error/10 text-error";
  }

  if (
    normalized.includes("included") ||
    normalized.includes("unlimited") ||
    normalized.includes("guaranteed")
  ) {
    return "border-success/30 bg-success/10 text-success";
  }

  if (isFeatured) {
    return "border-accent/35 bg-accent/10 text-accent";
  }

  return "border-border bg-background-elevated text-foreground";
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-[120px] relative overflow-hidden bg-background-dark"
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 50% 0%, rgba(27, 53, 89, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 100%, rgba(214, 179, 106, 0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="container">
        <SectionHeader
          tag="Pricing"
          title="Simple, Transparent"
          highlightedText="Pricing"
          subtitle="Choose the plan that fits your research and analysis needs."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-xl items-start">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>

        <div className="relative mt-4xl overflow-hidden rounded-2xl border border-border bg-background-card p-xl md:p-2xl">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-lg mb-lg">
            <h3 className="text-2xl font-semibold">Plan Comparison</h3>
            <p className="text-sm text-foreground-secondary">
              Compare core capabilities before checkout.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background-dark/80 shadow-md">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] table-fixed border-separate border-spacing-0">
                <thead>
                  <tr className="bg-background-card/55">
                    <th className="w-[34%] py-md pl-lg pr-md text-left text-xs uppercase tracking-[0.16em] text-foreground-muted border-b border-border/70">
                      Capability
                    </th>
                    {comparisonPlans.map((plan) => (
                      <th
                        key={plan.key}
                        className={cn(
                          "relative py-md px-lg text-left align-top border-l border-border/60 border-b border-border/70",
                          plan.featured &&
                            "bg-gradient-to-b from-accent/20 to-accent/5"
                        )}
                      >
                        {plan.featured && (
                          <span className="pointer-events-none absolute inset-y-0 left-0 w-px bg-accent/80" />
                        )}
                        <div className="flex items-center gap-sm">
                          <span
                            className={cn(
                              "text-xs uppercase tracking-[0.16em] text-foreground-muted",
                              plan.featured && "text-accent"
                            )}
                          >
                            {plan.label}
                          </span>
                          {plan.featured && (
                            <Badge className="text-[0.62rem] px-sm py-[2px]">
                              Best Value
                            </Badge>
                          )}
                        </div>
                        <p className="mt-xs text-xs text-foreground-muted font-normal">
                          {plan.descriptor}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, rowIndex) => {
                    const isLastRow = rowIndex === comparisonRows.length - 1;

                    return (
                      <tr
                        key={row.capability}
                        className="group animate-fade-in-up transition-colors duration-normal hover:bg-primary/10"
                        style={{
                          animationDelay: `${rowIndex * 80}ms`,
                          animationFillMode: "backwards",
                        }}
                      >
                        <td
                          className={cn(
                            "py-md pl-lg pr-md text-sm text-foreground-secondary transition-colors duration-normal group-hover:text-foreground",
                            !isLastRow && "border-b border-border/60"
                          )}
                        >
                          {row.capability}
                        </td>
                        {comparisonPlans.map((plan) => {
                          const value = row.values[plan.key];
                          return (
                            <td
                              key={`${row.capability}-${plan.key}`}
                              className={cn(
                                "py-md px-lg border-l border-border/50 transition-colors duration-normal",
                                !isLastRow && "border-b border-border/50",
                                plan.featured
                                  ? "bg-accent/[0.045] group-hover:bg-accent/[0.1]"
                                  : "group-hover:bg-background-card/55"
                              )}
                            >
                              <span
                                className={cn(
                                  "inline-flex rounded-full border px-sm py-[5px] text-xs font-semibold tracking-wide transition-all duration-normal group-hover:-translate-y-[1px] group-hover:shadow-md",
                                  getComparisonValueStyle(
                                    value,
                                    Boolean(plan.featured)
                                  )
                                )}
                              >
                                {value}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-3xl grid lg:grid-cols-[1.1fr_0.9fr] gap-2xl">
          <div className="rounded-2xl border border-border bg-background-card p-xl md:p-2xl">
            <h3 className="text-2xl font-semibold mb-md">Pricing FAQ</h3>
            <div className="space-y-md">
              {pricingFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-border bg-background-elevated px-lg py-md"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-foreground flex items-center justify-between gap-md">
                    {faq.question}
                    <span className="text-foreground-muted transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-md text-sm leading-relaxed text-foreground-secondary">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background-card p-xl md:p-2xl">
            <h3 className="text-2xl font-semibold mb-md">
              Checkout Confidence
            </h3>
            <ul className="space-y-md text-sm text-foreground-secondary">
              <li className="flex items-start gap-md">
                <span className="mt-1 h-2 w-2 rounded-full bg-success" />
                Secure billing through Stripe-hosted checkout
              </li>
              <li className="flex items-start gap-md">
                <span className="mt-1 h-2 w-2 rounded-full bg-success" />
                Plan changes available from your billing portal
              </li>
              <li className="flex items-start gap-md">
                <span className="mt-1 h-2 w-2 rounded-full bg-success" />
                Enterprise support for integration and rollout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
