import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Key, Plus, Copy, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { maskApiKey } from "@/lib/utils";

export default async function ApiKeysPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscription: true,
      apiKeys: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const canCreateKeys =
    user.subscription?.plan === "PROFESSIONAL" ||
    user.subscription?.plan === "ENTERPRISE";

  return (
    <div className="space-y-xl max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-foreground-secondary mt-sm">
            Manage your API keys for programmatic access
          </p>
        </div>
        {canCreateKeys && (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create API Key
          </Button>
        )}
      </div>

      {/* Plan Notice */}
      {!canCreateKeys && (
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="py-lg">
            <div className="flex items-start gap-md">
              <Key className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-warning">
                  Upgrade to access API
                </p>
                <p className="text-sm text-foreground-secondary mt-sm">
                  API access is available on Professional and Enterprise plans.
                  Upgrade your subscription to create API keys.
                </p>
                <Button variant="outline" size="sm" className="mt-md">
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Keys List */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            API keys allow you to authenticate API requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.apiKeys.length === 0 ? (
            <div className="text-center py-xl">
              <Key className="w-12 h-12 text-foreground-muted mx-auto mb-md" />
              <p className="text-foreground-secondary">No API keys yet</p>
              {canCreateKeys && (
                <p className="text-sm text-foreground-muted mt-sm">
                  Create your first API key to get started
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-md">
              {user.apiKeys.map((key) => {
                const isExpired =
                  key.expiresAt && new Date(key.expiresAt) < new Date();

                return (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-md rounded-lg bg-background-dark border border-border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-md">
                        <p className="font-medium">{key.name}</p>
                        <Badge variant={isExpired ? "error" : "success"}>
                          {isExpired ? "Expired" : "Active"}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground-muted font-mono mt-sm">
                        {maskApiKey(`${key.keyPrefix}...`)}
                      </p>
                      <div className="flex items-center gap-lg mt-sm text-xs text-foreground-muted">
                        <span>
                          Created:{" "}
                          {new Date(key.createdAt).toLocaleDateString()}
                        </span>
                        {key.lastUsedAt && (
                          <span>
                            Last used:{" "}
                            {new Date(key.lastUsedAt).toLocaleDateString()}
                          </span>
                        )}
                        {key.expiresAt && (
                          <span>
                            Expires:{" "}
                            {new Date(key.expiresAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-sm">
                      <Button variant="ghost" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Learn how to use the Optiveon API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-background-dark rounded-lg p-lg">
            <p className="text-sm font-mono text-foreground-secondary">
              # Example API request
            </p>
            <pre className="mt-md text-sm font-mono overflow-x-auto">
              <code>
                {`curl -X GET "https://api.optiveon.com/v1/signals" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
