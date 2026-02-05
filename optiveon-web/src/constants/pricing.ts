import { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "For individual researchers and analysts",
    price: 99,
    period: "/month",
    features: [
      "Real-time market data",
      "50+ technical indicators",
      "Basic signal alerts",
      "Email support",
    ],
    cta: "Get Started",
    href: "/#contact",
  },
  {
    name: "Professional",
    description: "For serious traders and small teams",
    price: 299,
    period: "/month",
    features: [
      "Everything in Starter",
      "Advanced signal generation",
      "Backtesting suite",
      "API access (10K calls/day)",
      "Priority support",
    ],
    cta: "Get Started",
    href: "/#contact",
    featured: true,
    badge: "Recommended",
  },
  {
    name: "Enterprise",
    description: "For institutions and trading firms",
    price: null,
    priceLabel: "Custom",
    features: [
      "Everything in Professional",
      "Unlimited API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    href: "/#contact",
  },
];
