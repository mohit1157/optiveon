const STACK_ITEMS = [
  "Next.js",
  "PostgreSQL",
  "Stripe",
  "Resend",
  "Tailwind",
  "Prisma",
];

export function StackBand() {
  return (
    <section className="py-lg border-y border-border/60 bg-[linear-gradient(180deg,rgba(17,27,42,0.38),rgba(9,14,23,0.58))]">
      <div className="container">
        <div className="rounded-2xl border border-border/70 bg-background-card/25 p-lg md:p-xl">
          <div className="flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[340px]">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-foreground-muted">
                Operational Baseline
              </p>
              <p className="mt-sm text-sm leading-relaxed text-foreground-secondary">
                Execution, data, and billing primitives powering Optiveon
                software.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-sm">
              {STACK_ITEMS.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-border bg-background-dark/60 px-lg py-xs text-xs font-medium uppercase tracking-[0.16em] text-foreground-secondary"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-sm text-[0.7rem] text-foreground-muted">
              <span className="rounded-full border border-border px-md py-xs uppercase tracking-[0.12em]">
                24/7 Monitoring
              </span>
              <span className="rounded-full border border-border px-md py-xs uppercase tracking-[0.12em]">
                Zero-downtime Deploys
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
