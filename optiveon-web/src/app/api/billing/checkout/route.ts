import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { createAuditLog, AuditActions, AuditEntities } from "@/lib/audit";
import { createCheckoutSession, createCustomer, PLANS } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const PLAN_MAP = {
  starter: "STARTER",
  professional: "PROFESSIONAL",
  enterprise: "ENTERPRISE",
} as const;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const planParam = searchParams.get("plan")?.toLowerCase() || "";
  const planKey = PLAN_MAP[planParam as keyof typeof PLAN_MAP];

  if (!planKey) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (!PLANS[planKey].priceId) {
    return NextResponse.redirect(
      absoluteUrl(`/checkout?plan=${planParam}`),
      303
    );
  }

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    const callbackUrl = `/checkout?plan=${planParam}`;
    return NextResponse.redirect(
      absoluteUrl(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`),
      303
    );
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user) {
    return NextResponse.redirect(absoluteUrl("/login"), 303);
  }

  let subscription = user.subscription;

  if (!subscription) {
    subscription = await db.subscription.create({
      data: {
        userId: user.id,
        plan: "FREE",
        status: "ACTIVE",
      },
    });
  }

  let stripeCustomerId = subscription.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await createCustomer({
      email: user.email,
      name: user.name || undefined,
      metadata: { userId: user.id },
    });

    stripeCustomerId = customer.id;

    await db.subscription.update({
      where: { id: subscription.id },
      data: { stripeCustomerId },
    });
  }

  const checkoutSession = await createCheckoutSession({
    customerId: stripeCustomerId,
    priceId: PLANS[planKey].priceId!,
    successUrl: absoluteUrl("/dashboard/billing?success=1"),
    cancelUrl: absoluteUrl(`/checkout?plan=${planParam}&canceled=1`),
  });

  await createAuditLog({
    userId: user.id,
    action: AuditActions.SUBSCRIPTION_UPDATED,
    entity: AuditEntities.SUBSCRIPTION,
    entityId: subscription.id,
    metadata: { plan: planKey },
  });

  return NextResponse.redirect(
    checkoutSession.url || "/dashboard/billing",
    303
  );
}
