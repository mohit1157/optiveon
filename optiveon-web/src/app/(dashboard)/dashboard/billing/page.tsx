import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Check, ExternalLink, Zap, Building2, Rocket } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SubscriptionPlan, SubscriptionStatus } from "@prisma/client";

const billingPlans = [
  {
    plan: "STARTER" as const,
    name: "Starter",
    description: "For individual researchers",
    price: "$299",
    period: "/month",
    icon: Zap,
    href: process.env.NEXT_PUBLIC_STRIPE_STARTER_LINK || "/checkout?plan=starter",
    features: [
      "Real-time market data",
      "50+ technical indicators",
      "Basic signal alerts",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    plan: "PROFESSIONAL" as const,
    name: "Professional",
    description: "For growing teams",
    price: "$899",
    period: "/month",
    icon: Building2,
    href: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_LINK || "/checkout?plan=professional",
    features: [
      "Everything in Starter",
      "Advanced signal generation",
      "Backtesting suite",
      "API access (10K calls/day)",
      "Priority support",
    ],
    cta: "Get Started",
    featured: true,
    badge: "Recommended",
  },
  {
    plan: "ENTERPRISE" as const,
    name: "Enterprise",
    description: "For institutional firms",
    price: "Custom",
    period: "",
    icon: Rocket,
    href: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_LINK || "/checkout?plan=enterprise",
    features: [
      "Everything in Professional",
      "Unlimited API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
  },
];

export default async function BillingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user) {
    redirect("/login");
  }

  const currentPlan = user.subscription?.plan || SubscriptionPlan.FREE;
  const status = user.subscription?.status || SubscriptionStatus.ACTIVE;

  return (
    <div className="space-y-xl max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-foreground-secondary mt-sm">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your active subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-md">
                <h3 className="text-xl font-bold">{currentPlan}</h3>
                <Badge variant={status === SubscriptionStatus.ACTIVE ? "success" : "warning"}>
                  {status}
                </Badge>
              </div>
              {user.subscription?.currentPeriodEnd && (
                <p className="text-sm text-foreground-secondary mt-sm">
                  {user.subscription.cancelAtPeriodEnd
                    ? "Cancels on"
                    : "Renews on"}{" "}
                  {new Date(
                    user.subscription.currentPeriodEnd
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
            {user.subscription?.stripeCustomerId && (
              <Button variant="outline" asChild>
                <Link href="/api/billing/portal">
                  Manage Billing
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-lg">Available Plans</h2>
        <div className="grid gap-lg md:grid-cols-3">
          {billingPlans.map((tier) => {
            const isCurrentPlan = tier.plan === currentPlan;

            return (
              <Card
                key={tier.name}
                featured={tier.featured}
                className={isCurrentPlan ? "ring-2 ring-accent" : ""}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tier.name}</CardTitle>
                    {tier.badge && <Badge>{tier.badge}</Badge>}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="pt-md">
                    <span className="text-3xl font-bold">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-foreground-secondary">
                        {tier.period}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-lg">
                  <ul className="space-y-sm">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-sm text-sm text-foreground-secondary"
                      >
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={isCurrentPlan ? "outline" : "primary"}
                    className="w-full"
                    disabled={isCurrentPlan}
                    asChild={!isCurrentPlan}
                  >
                    {isCurrentPlan ? (
                      "Current Plan"
                    ) : (
                      <a href={tier.href} target="_blank" rel="noopener noreferrer">
                        {tier.cta}
                      </a>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Billing History (placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your past invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-xl">
            <p className="text-foreground-secondary">No billing history yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
