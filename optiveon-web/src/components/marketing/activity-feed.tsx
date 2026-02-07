import { db } from "@/lib/db";
import { AuditActions } from "@/lib/audit";
import { formatRelativeTime } from "@/lib/utils";

interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
}

const sampleActivity: ActivityItem[] = [
  {
    id: "sample-1",
    message: "Validation profile approved for multi-asset momentum strategy",
    timestamp: "4 minutes ago",
  },
  {
    id: "sample-2",
    message: "New Professional workspace provisioned",
    timestamp: "11 minutes ago",
  },
  {
    id: "sample-3",
    message: "Risk guardrail template updated for equities deployment",
    timestamp: "24 minutes ago",
  },
];

function formatInterestLabel(value?: string) {
  switch (value) {
    case "market-research":
      return "Market Research";
    case "signal-generation":
      return "Signal Generation";
    case "enterprise-api":
      return "Enterprise API";
    case "custom-solution":
      return "Custom Solution";
    case "general":
      return "General Inquiry";
    default:
      return "Inquiry";
  }
}

function formatActivity(action: string, metadata?: Record<string, unknown>) {
  switch (action) {
    case AuditActions.REGISTER:
      return "New account created";
    case AuditActions.SUBSCRIPTION_UPDATED:
      return `Subscription updated${
        metadata?.plan ? ` to ${metadata.plan}` : ""
      }`;
    case AuditActions.SUBSCRIPTION_CANCELED:
      return "Subscription canceled";
    case AuditActions.CONTACT_CREATED:
      return `New inquiry: ${formatInterestLabel(
        metadata?.interest as string | undefined
      )}`;
    case AuditActions.API_KEY_CREATED:
      return "New API key issued";
    default:
      return "Platform activity recorded";
  }
}

export async function ActivityFeed() {
  if (!process.env.DATABASE_URL) {
    return (
      <section className="py-[120px] relative overflow-hidden bg-background-dark">
        <div className="container">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4xl items-start">
            <div className="max-w-[620px] lg:mb-0 mb-2xl">
              <span className="section-tag mb-lg">Live Feed</span>
              <h2 className="text-section-title mb-lg text-balance">
                Recent Platform <span className="gradient-text">Activity</span>
              </h2>
              <p className="text-lg text-foreground-secondary leading-relaxed text-balance">
                A real-time view of user onboarding, subscription activity, and
                inquiries.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background-card p-2xl">
              <div className="space-y-lg">
                {sampleActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-lg border-b border-border/60 pb-lg last:border-b-0 last:pb-0"
                  >
                    <div className="mt-2 h-2 w-2 rounded-full bg-accent" />
                    <div>
                      <p className="text-sm text-foreground">{item.message}</p>
                      <p className="text-xs text-foreground-muted mt-xs">
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  let logs: Awaited<ReturnType<typeof db.auditLog.findMany>> = [];
  try {
    logs = await db.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  } catch {
    logs = [];
  }

  const items: ActivityItem[] = logs.map((log) => {
    let metadata: Record<string, unknown> | undefined;
    if (log.metadata) {
      try {
        metadata = JSON.parse(log.metadata) as Record<string, unknown>;
      } catch {
        metadata = undefined;
      }
    }
    return {
      id: log.id,
      message: formatActivity(log.action, metadata),
      timestamp: formatRelativeTime(log.createdAt),
    };
  });

  return (
    <section className="py-[120px] relative overflow-hidden bg-background-dark">
      <div className="container">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4xl items-start">
          <div className="max-w-[620px] lg:mb-0 mb-2xl">
            <span className="section-tag mb-lg">Live Feed</span>
            <h2 className="text-section-title mb-lg text-balance">
              Recent Platform <span className="gradient-text">Activity</span>
            </h2>
            <p className="text-lg text-foreground-secondary leading-relaxed text-balance">
              A real-time view of user onboarding, subscription activity, and
              inquiries.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background-card p-2xl">
            <div className="space-y-lg">
              {items.length === 0 ? (
                <p className="text-sm text-foreground-secondary">
                  No activity yet or database unavailable. As soon as users
                  onboard and reach out, updates will appear here.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-lg border-b border-border/60 pb-lg last:border-b-0 last:pb-0"
                  >
                    <div className="mt-2 h-2 w-2 rounded-full bg-accent" />
                    <div>
                      <p className="text-sm text-foreground">{item.message}</p>
                      <p className="text-xs text-foreground-muted mt-xs">
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
