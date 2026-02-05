import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    priceId: null,
    features: ["Basic market data", "Limited indicators", "Community support"],
  },
  STARTER: {
    name: "Starter",
    price: 99,
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    features: [
      "Real-time market data",
      "50+ technical indicators",
      "Basic signal alerts",
      "Email support",
    ],
  },
  PROFESSIONAL: {
    name: "Professional",
    price: 299,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    features: [
      "Everything in Starter",
      "Advanced signal generation",
      "Backtesting suite",
      "API access (10K calls/day)",
      "Priority support",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: null, // Custom pricing
    priceId: null,
    features: [
      "Everything in Professional",
      "Unlimited API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
} as const;

export type PlanName = keyof typeof PLANS;

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
}: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

export async function createBillingPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function createCustomer({
  email,
  name,
  metadata,
}: {
  email: string;
  name?: string;
  metadata?: Stripe.MetadataParam;
}) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata,
  });

  return customer;
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}
