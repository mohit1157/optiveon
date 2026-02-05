import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { pricingTiers } from "@/constants/pricing";
import { PLANS } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/forms/contact-form";

interface CheckoutPageProps {
  searchParams: { plan?: string; canceled?: string };
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const planSlug = (searchParams.plan || "").toLowerCase();
  const tier = pricingTiers.find((item) => item.slug === planSlug);

  if (!tier) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const plan = PLANS[tier.plan];
  const priceLabel =
    plan.price === null || plan.price === undefined
      ? tier.priceLabel || "Custom"
      : `$${plan.price}`;
  const periodLabel = tier.period || (plan.price ? "/month" : "");
  const hasCheckout = Boolean(plan.priceId);

  return (
    <section className="py-[140px] min-h-screen">
      <div className="container">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4xl items-start">
          <div className="space-y-2xl">
            <div className="space-y-md">
              <Badge variant="outline">Checkout</Badge>
              <h1 className="text-section-title text-balance">
                {tier.name} Plan
              </h1>
              <p className="text-lg text-foreground-secondary text-balance">
                {tier.description}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background-card p-2xl space-y-xl">
              <div className="flex items-baseline gap-sm">
                <span className="text-5xl font-bold">{priceLabel}</span>
                {periodLabel && (
                  <span className="text-foreground-secondary">
                    {periodLabel}
                  </span>
                )}
              </div>

              <ul className="space-y-md">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-md text-sm text-foreground-secondary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              {searchParams.canceled && (
                <div className="rounded-lg border border-warning/30 bg-warning/10 p-md text-warning text-sm">
                  Checkout canceled. You can try again any time.
                </div>
              )}

              {hasCheckout ? (
                <div className="space-y-md">
                  {session?.user ? (
                    <Button size="lg" className="w-full" asChild>
                      <Link href={`/api/billing/checkout?plan=${tier.slug}`}>
                        Continue to Secure Checkout
                      </Link>
                    </Button>
                  ) : (
                    <Button size="lg" className="w-full" asChild>
                      <Link
                        href={`/login?callbackUrl=${encodeURIComponent(
                          `/checkout?plan=${tier.slug}`
                        )}`}
                      >
                        Sign In to Continue
                      </Link>
                    </Button>
                  )}

                  <div className="flex flex-wrap items-center gap-lg text-xs text-foreground-muted">
                    <span className="flex items-center gap-xs">
                      <ShieldCheck className="w-4 h-4 text-success" />
                      Encrypted checkout
                    </span>
                    <span className="flex items-center gap-xs">
                      <CreditCard className="w-4 h-4 text-accent" />
                      Powered by Stripe
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-lg">
                  <p className="text-sm text-foreground-secondary">
                    Enterprise plans are tailored to your infrastructure,
                    compliance, and throughput requirements. Tell us what you
                    need and we’ll prepare a custom proposal.
                  </p>
                  <div className="rounded-xl border border-border bg-background-elevated p-xl">
                    <ContactForm />
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-foreground-muted">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-accent hover:text-accent-light">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-accent hover:text-accent-light"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <aside className="space-y-xl">
            <div className="rounded-xl border border-border bg-background-card p-2xl">
              <h3 className="text-lg font-semibold mb-md">
                What happens next?
              </h3>
              <ul className="space-y-md text-sm text-foreground-secondary">
                <li className="flex items-start gap-md">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  Secure checkout and instant access to the Optiveon dashboard.
                </li>
                <li className="flex items-start gap-md">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  Guided onboarding plus access to API keys and data tools.
                </li>
                <li className="flex items-start gap-md">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  Cancel or upgrade anytime from your billing portal.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-background-card p-2xl">
              <h3 className="text-lg font-semibold mb-md">Need help?</h3>
              <p className="text-sm text-foreground-secondary mb-lg">
                Our team can walk you through data integrations, risk
                constraints, and compliance requirements.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/#contact">Talk to our team</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
