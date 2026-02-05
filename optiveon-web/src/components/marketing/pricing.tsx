"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/constants/pricing";

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
      </div>
    </section>
  );
}
