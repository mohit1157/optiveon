import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { createAuditLog, AuditActions, AuditEntities } from "@/lib/audit";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          console.log(
            `Payment succeeded for subscription: ${invoice.subscription}`
          );
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await handlePaymentFailed(invoice);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Find user by stripe customer ID
  const existingSubscription = await db.subscription.findFirst({
    where: { stripeCustomerId: customerId },
    include: { user: true },
  });

  if (!existingSubscription) {
    console.error(`No subscription found for customer: ${customerId}`);
    return;
  }

  // Determine plan based on price ID
  const priceId = subscription.items.data[0]?.price.id;
  let plan: "STARTER" | "PROFESSIONAL" | "ENTERPRISE" = "STARTER";

  if (priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID) {
    plan = "PROFESSIONAL";
  } else if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) {
    plan = "ENTERPRISE";
  }

  // Map Stripe status to our status
  let status: "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING" | "PAUSED" =
    "ACTIVE";
  switch (subscription.status) {
    case "active":
      status = "ACTIVE";
      break;
    case "canceled":
      status = "CANCELED";
      break;
    case "past_due":
      status = "PAST_DUE";
      break;
    case "trialing":
      status = "TRIALING";
      break;
    case "paused":
      status = "PAUSED";
      break;
  }

  await db.subscription.update({
    where: { id: existingSubscription.id },
    data: {
      stripeSubscriptionId: subscription.id,
      plan,
      status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });

  await createAuditLog({
    userId: existingSubscription.userId,
    action: AuditActions.SUBSCRIPTION_UPDATED,
    entity: AuditEntities.SUBSCRIPTION,
    entityId: existingSubscription.id,
    metadata: { plan, status },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  const existingSubscription = await db.subscription.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!existingSubscription) {
    return;
  }

  await db.subscription.update({
    where: { id: existingSubscription.id },
    data: {
      status: "CANCELED",
      plan: "FREE",
    },
  });

  await createAuditLog({
    userId: existingSubscription.userId,
    action: AuditActions.SUBSCRIPTION_CANCELED,
    entity: AuditEntities.SUBSCRIPTION,
    entityId: existingSubscription.id,
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  const existingSubscription = await db.subscription.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!existingSubscription) {
    return;
  }

  await db.subscription.update({
    where: { id: existingSubscription.id },
    data: {
      status: "PAST_DUE",
    },
  });
}
