"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { solutions } from "@/constants/solutions";

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const Icon = solution.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "relative p-2xl bg-background-card border rounded-xl transition-all duration-slow",
        solution.featured
          ? "border-accent bg-gradient-to-b from-accent/5 to-transparent"
          : "border-border hover:border-border-hover hover:shadow-md",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Featured Badge */}
      {solution.badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          {solution.badge}
        </Badge>
      )}

      {/* Header */}
      <div className="flex items-center gap-lg mb-lg">
        <div className="w-12 h-12 flex items-center justify-center bg-primary/40 rounded-md border border-border">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold">{solution.title}</h3>
      </div>

      {/* Description */}
      <p className="text-[0.9375rem] text-foreground-secondary mb-xl leading-relaxed">
        {solution.description}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-md">
        {solution.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-md text-sm text-foreground-secondary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Solutions() {
  return (
    <section
      id="solutions"
      className="py-16 md:py-[120px] relative overflow-hidden bg-background-dark"
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 0% 50%, rgba(27, 53, 89, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 100% 80%, rgba(214, 179, 106, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      <div className="container">
        <SectionHeader
          tag="Solutions"
          title="Tailored for"
          highlightedText="Every Need"
          subtitle="From individual research to enterprise-grade analysis platforms."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              solution={solution}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
