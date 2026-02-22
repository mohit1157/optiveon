import { db } from "@/lib/db";
import { interestOptions } from "@/constants/content";
import { formatNumber } from "@/lib/utils";

interface InsightItem {
  label: string;
  count: number;
  percent: number;
}

const sampleInsights: InsightItem[] = [
  { label: "Market Research Platform", count: 38, percent: 34 },
  { label: "Enterprise API", count: 26, percent: 23 },
  { label: "Signal Generation Suite", count: 24, percent: 21 },
  { label: "Custom Solution", count: 16, percent: 14 },
  { label: "General Inquiry", count: 9, percent: 8 },
];

export async function InquiryInsights() {
  if (!process.env.DATABASE_URL) {
    return (
      <section className="py-16 md:py-[120px] relative overflow-hidden">
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
            <div className="space-y-lg">
              {sampleInsights.map((item) => (
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
          </div>
        </div>
      </section>
    );
  }

  let grouped: Record<string, number> = {};
  try {
    const contacts = await db.contact.findMany({
      select: { interest: true },
    });
    grouped = contacts.reduce((acc: Record<string, number>, contact: { interest: string }) => {
      acc[contact.interest] = (acc[contact.interest] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  } catch {
    grouped = {};
  }

  const total = Object.values(grouped).reduce((sum, count) => sum + count, 0);

  const insights: InsightItem[] = interestOptions.map((option) => {
    const count = grouped[option.value] || 0;
    return {
      label: option.label,
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
    };
  });

  return (
    <section className="py-16 md:py-[120px] relative overflow-hidden">
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
