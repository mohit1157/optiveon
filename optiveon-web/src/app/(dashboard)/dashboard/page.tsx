import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BarChart3, TrendingUp, Activity, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubscriptionPlan, SubscriptionStatus } from "@prisma/client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscription: true,
      apiKeys: {
        where: {
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const stats = [
    {
      title: "Current Plan",
      value: user.subscription?.plan || SubscriptionPlan.FREE,
      icon: TrendingUp,
      description: "Your subscription tier",
    },
    {
      title: "API Keys",
      value: user.apiKeys.length.toString(),
      icon: Key,
      description: "Active API keys",
    },
    {
      title: "Status",
      value: user.subscription?.status || SubscriptionStatus.ACTIVE,
      icon: Activity,
      description: "Subscription status",
    },
    {
      title: "API Calls",
      value: "0",
      icon: BarChart3,
      description: "This month",
    },
  ];

  return (
    <div className="space-y-xl">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user.name || "User"}
        </h1>
        <p className="text-foreground-secondary mt-sm">
          Here&apos;s an overview of your account
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground-secondary">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-foreground-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-foreground-muted mt-sm">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-lg md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-md">
            <div className="flex items-center justify-between p-md rounded-lg bg-background-dark border border-border">
              <div>
                <p className="font-medium">Upgrade Plan</p>
                <p className="text-sm text-foreground-secondary">
                  Unlock more features with Professional
                </p>
              </div>
              <Badge>Upgrade</Badge>
            </div>
            <div className="flex items-center justify-between p-md rounded-lg bg-background-dark border border-border">
              <div>
                <p className="font-medium">Create API Key</p>
                <p className="text-sm text-foreground-secondary">
                  Generate a new API key for integration
                </p>
              </div>
              <Badge variant="outline">Create</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-md">
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">Email Verified</span>
              <Badge variant={user.emailVerified ? "success" : "warning"}>
                {user.emailVerified ? "Verified" : "Pending"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  user.subscription?.status === SubscriptionStatus.ACTIVE ? "success" : "muted"
                }
              >
                {user.subscription?.status || SubscriptionStatus.ACTIVE}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">Member Since</span>
              <span className="text-sm">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  );
}
