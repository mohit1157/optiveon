"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SectionHeader } from "@/components/layout/section-header";
import { features } from "@/constants/features";

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const Icon = feature.icon;

  if (feature.title === "System Architecture") {
    return (
      <div
        ref={ref}
        className={cn(
          "md:col-span-2 lg:col-span-3 motion-card p-xl md:p-2xl bg-background-card border border-border rounded-xl transition-all duration-slow",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="flex flex-col lg:flex-row gap-xl items-center">
          <div className="lg:w-1/3 space-y-md">
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-primary rounded-lg mb-lg shadow-md">
              <Icon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-xs">{feature.title}</h3>
            <p className="text-[0.9375rem] text-foreground-secondary leading-relaxed">
              {feature.description}
            </p>
          </div>

          <div className="lg:w-2/3 w-full border border-border/50 rounded-xl bg-background-dark/50 p-lg relative overflow-hidden flex flex-col sm:flex-row gap-md items-center justify-between">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />

            {/* Node 1 */}
            <div className="relative z-10 text-center flex-1 w-full bg-background-elevated border border-border/70 rounded-lg py-md px-sm shadow-md">
              <p className="text-xs uppercase tracking-widest text-foreground-muted mb-xs">Ingestion</p>
              <p className="text-sm font-semibold text-accent">Sub-ms Feeds</p>
            </div>

            <div className="relative z-10 hidden sm:flex text-accent/40"><ArrowRight className="w-5 h-5" /></div>

            {/* Node 2 */}
            <div className="relative z-10 text-center flex-1 w-full bg-background-elevated border border-accent/30 rounded-lg py-md px-sm shadow-accent-lg">
              <p className="text-xs uppercase tracking-widest text-foreground-muted mb-xs">Execution</p>
              <p className="text-sm font-semibold text-foreground">Core Engines</p>
            </div>

            <div className="relative z-10 hidden sm:flex text-accent/40"><ArrowRight className="w-5 h-5" /></div>

            {/* Node 3 */}
            <div className="relative z-10 text-center flex-1 w-full bg-background-elevated border border-border/70 rounded-lg py-md px-sm shadow-md">
              <p className="text-xs uppercase tracking-widest text-foreground-muted mb-xs">Access Layer</p>
              <p className="text-sm font-semibold text-primary-light">Prisma / Next.js</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "motion-card relative p-2xl bg-background-card border border-border rounded-xl transition-all duration-slow overflow-hidden group",
        "hover:bg-background-card-hover hover:border-border-hover hover:shadow-lg",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Top glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" />

      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center bg-gradient-primary rounded-lg mb-xl shadow-md">
        <Icon className="w-6 h-6 text-accent" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-md">{feature.title}</h3>
      <p className="text-[0.9375rem] text-foreground-secondary leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-16 md:py-[120px] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-dark">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 50% 0%, rgba(27, 53, 89, 0.2) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 90% 90%, rgba(214, 179, 106, 0.05) 0%, transparent 60%)
            `,
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(214, 179, 106, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(214, 179, 106, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 70% 50% at 50% 50%, black 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container">
        <SectionHeader
          tag="Features"
          title="Powerful Tools for"
          highlightedText="Informed Decisions"
          subtitle="Our comprehensive suite of analysis tools helps you understand market dynamics and identify opportunities."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
