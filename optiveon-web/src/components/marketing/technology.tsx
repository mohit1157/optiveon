"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Badge } from "@/components/ui/badge";
import {
  technologyFeatures,
  technologyDiagramNodes,
} from "@/constants/technology";

function TechFeatureCard({
  feature,
  index,
}: {
  feature: (typeof technologyFeatures)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-lg p-lg bg-background-card border border-border rounded-lg transition-all duration-normal",
        "hover:border-border-hover hover:bg-background-card-hover",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary/40 rounded-md border border-border">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <h4 className="font-medium mb-xs">{feature.title}</h4>
        <p className="text-[0.9375rem] text-foreground-secondary leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

function TechDiagram() {
  return (
    <div className="relative w-[420px] h-[420px] hidden lg:block">
      {/* SVG Lines */}
      <svg className="absolute inset-0" viewBox="0 0 400 400">
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="50"
          stroke="rgba(148, 163, 184, 0.1)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <line
          x1="200"
          y1="200"
          x2="350"
          y2="200"
          stroke="rgba(148, 163, 184, 0.1)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="350"
          stroke="rgba(148, 163, 184, 0.1)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <line
          x1="200"
          y1="200"
          x2="50"
          y2="200"
          stroke="rgba(148, 163, 184, 0.1)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
      </svg>

      {/* Nodes */}
      {technologyDiagramNodes.map((node) => {
        const positions: Record<string, { top: string; left: string }> = {
          center: { top: "50%", left: "50%" },
          top: { top: "8%", left: "50%" },
          right: { top: "50%", left: "92%" },
          bottom: { top: "92%", left: "50%" },
          left: { top: "50%", left: "8%" },
        };

        const pos = positions[node.position] ?? positions.center;
        const isCenter = node.position === "center";

        return (
          <div
            key={node.id}
            className={cn(
              "absolute px-xl py-md rounded-md border text-[0.8125rem] font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 transition-all duration-normal",
              "hover:border-accent hover:shadow-accent",
              isCenter
                ? "bg-gradient-primary border-accent/30 font-semibold z-10"
                : "bg-background-card border-border"
            )}
            style={{ top: pos!.top, left: pos!.left }}
          >
            {node.label}
          </div>
        );
      })}
    </div>
  );
}

export function Technology() {
  return (
    <section id="technology" className="py-16 md:py-[120px] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-dark">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 60% at 80% 20%, rgba(214, 179, 106, 0.06) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 20% 80%, rgba(27, 53, 89, 0.15) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-4xl items-center">
          {/* Text Content */}
          <div className="lg:text-left text-center">
            <Badge variant="outline" className="mb-md">
              Technology
            </Badge>
            <h2 className="text-section-title mb-lg">
              Built for <span className="gradient-text">Performance</span>
            </h2>
            <p className="text-foreground-secondary mb-2xl leading-relaxed lg:text-left text-center">
              Our proprietary technology stack is engineered from the ground up
              for low-latency, high-reliability market analysis. Every component
              is optimized for speed and accuracy.
            </p>

            {/* Feature Cards */}
            <div className="flex flex-col gap-xl">
              {technologyFeatures.map((feature, index) => (
                <TechFeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Diagram */}
          <div className="flex justify-center items-center">
            <TechDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
