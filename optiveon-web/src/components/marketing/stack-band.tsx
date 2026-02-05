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
    <section className="py-[80px] border-y border-border bg-background-dark">
      <div className="container">
        <div className="max-w-[760px] mb-2xl text-center mx-auto">
          <span className="section-tag mb-lg">Platform Stack</span>
          <h2 className="text-section-title mb-lg text-balance">
            Built on <span className="gradient-text">Trusted Infrastructure</span>
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed text-balance">
            Enterprise-grade tooling powering secure payments, reliable data,
            and scalable APIs.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-lg">
          {STACK_ITEMS.map((item) => (
            <div
              key={item}
              className="rounded-full border border-border bg-background-card px-xl py-sm text-sm text-foreground-secondary uppercase tracking-[0.2em]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
