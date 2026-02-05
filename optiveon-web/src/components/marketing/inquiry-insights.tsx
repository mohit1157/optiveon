import { db } from "@/lib/db";
import { interestOptions } from "@/constants/content";
import { formatNumber } from "@/lib/utils";

interface InsightItem {
  label: string;
  count: number;
  percent: number;
}

export async function InquiryInsights() {
  if (!process.env.DATABASE_URL) {
    return (
      <section className="py-[120px] relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-dark">
          <div
            className="absolute inset-0"
            style={{
              background: `
              radial-gradient(ellipse 60% 50% at 100% 0%, rgba(27, 53, 89, 0.16) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 0% 80%, rgba(214, 179, 106, 0.06) 0%, transparent 60%)
            `,
            }}
          />
        </div>

        <div className="container">
          <div className="max-w-[760px] mb-4xl text-center mx-auto">
            <span className="section-tag mb-lg">Insights</span>
            <h2 className="text-section-title mb-lg text-balance">
              What Teams Ask <span className="gradient-text">Most</span>
            </h2>
            <p className="text-lg text-foreground-secondary leading-relaxed text-balance">
              Real inquiry data from the Optiveon contact pipeline.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background-card p-2xl">
            <p className="text-sm text-warning">
              Set `DATABASE_URL` to display inquiry insights.
            </p>
          </div>
        </div>
      </section>
    );
  }

  let grouped: Awaited<ReturnType<typeof db.contact.groupBy>> = [];
  try {
    grouped = await db.contact.groupBy({
      by: ["interest"],
      _count: { interest: true },
    });
  } catch {
    grouped = [];
  }

  const total = grouped.reduce((sum, item) => sum + item._count.interest, 0);

  const insights: InsightItem[] = interestOptions.map((option) => {
    const match = grouped.find((item) => item.interest === option.value);
    const count = match?._count.interest || 0;
    return {
      label: option.label,
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
    };
  });

  return (
    <section className="py-[120px] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-dark">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 100% 0%, rgba(27, 53, 89, 0.16) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 0% 80%, rgba(214, 179, 106, 0.06) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="container">
        <div className="max-w-[760px] mb-4xl text-center mx-auto">
          <span className="section-tag mb-lg">Insights</span>
          <h2 className="text-section-title mb-lg text-balance">
            What Teams Ask <span className="gradient-text">Most</span>
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed text-balance">
            Real inquiry data from the Optiveon contact pipeline.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background-card p-2xl">
          {total === 0 ? (
            <p className="text-sm text-foreground-secondary">
              No inquiries yet. This section will populate as soon as teams
              reach out.
            </p>
          ) : (
            <div className="space-y-lg">
              {insights.map((item) => (
                <div key={item.label} className="space-y-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-secondary">
                      {item.label}
                    </span>
                    <span className="text-foreground-muted">
                      {formatNumber(item.count)} · {item.percent}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-background-elevated">
                    <div
                      className="h-2 rounded-full bg-gradient-accent"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
