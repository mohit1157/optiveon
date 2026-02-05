import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { createBillingPortalSession } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect(absoluteUrl("/login"), 303);
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user?.subscription?.stripeCustomerId) {
    return NextResponse.redirect(absoluteUrl("/dashboard/billing"), 303);
  }

  const portalSession = await createBillingPortalSession({
    customerId: user.subscription.stripeCustomerId,
    returnUrl: absoluteUrl("/dashboard/billing"),
  });

  return NextResponse.redirect(portalSession.url || "/dashboard/billing", 303);
}
