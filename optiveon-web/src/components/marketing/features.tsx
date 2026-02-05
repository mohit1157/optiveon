"use client";

import { cn } from "@/lib/utils";
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

  return (
    <div
      ref={ref}
      className={cn(
        "relative p-2xl bg-background-card border border-border rounded-xl transition-all duration-slow overflow-hidden group",
        "hover:bg-background-card-hover hover:border-border-hover hover:-translate-y-1 hover:shadow-lg",
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
    <section id="features" className="py-[120px] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-dark">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 50% 0%, rgba(30, 58, 95, 0.2) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 90% 90%, rgba(201, 162, 39, 0.05) 0%, transparent 60%)
            `,
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 162, 39, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 162, 39, 0.02) 1px, transparent 1px)
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
