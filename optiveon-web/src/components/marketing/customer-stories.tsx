"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";

const stories = [
  {
    company: "NorthBridge Capital",
    role: "Head of Quant Research",
    quote:
      "Optiveon replaced three disconnected tools. Our research cycle is now 38% faster, and we catch regime shifts earlier.",
    impact: [
      { label: "Research Turnaround", value: "-38%" },
      { label: "Signal Precision", value: "+24%" },
      { label: "Alert Response", value: "2.6x" },
    ],
  },
  {
    company: "Vertex Macro",
    role: "Portfolio Analytics Lead",
    quote:
      "The API and dashboard parity is the differentiator. We can prototype in the UI and deploy to production workflows without rework.",
    impact: [
      { label: "Deployment Time", value: "-52%" },
      { label: "Analyst Throughput", value: "+31%" },
      { label: "Data Incidents", value: "-44%" },
    ],
  },
  {
    company: "Apex Delta Labs",
    role: "Director of Trading Systems",
    quote:
      "The platform made our governance team happy and our traders faster. Audit visibility and speed usually trade off, but not here.",
    impact: [
      { label: "Governance Readiness", value: "+63%" },
      { label: "Model Iterations", value: "3.2x" },
      { label: "Manual Checks", value: "-47%" },
    ],
  },
];

export function CustomerStories() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const story = stories[index % stories.length]!;

  return (
    <section
      id="proof"
      className="py-[120px] relative overflow-hidden bg-background-dark"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 45% 40% at 10% 90%, rgba(214, 179, 106, 0.07) 0%, transparent 60%),
              radial-gradient(ellipse 55% 55% at 90% 10%, rgba(27, 53, 89, 0.18) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="container">
        <SectionHeader
          tag="Customer Stories"
          title="Proof from"
          highlightedText="Production Teams"
          subtitle="Outcomes from firms using Optiveon in live research and execution environments."
        />

        <div className="motion-card rounded-2xl border border-border bg-background-card p-2xl">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-2xl items-center">
            <div className="space-y-lg">
              <Quote className="w-7 h-7 text-accent" />
              <p className="text-xl leading-relaxed text-foreground text-balance">
                {story.quote}
              </p>
              <div>
                <p className="text-base font-semibold">{story.company}</p>
                <p className="text-sm text-foreground-muted">{story.role}</p>
              </div>

              <div className="flex items-center gap-md">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setIndex(
                      (prev) => (prev - 1 + stories.length) % stories.length
                    )
                  }
                  aria-label="Previous story"
                >
                  <ArrowLeft className="w-4 h-4 text-foreground" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setIndex((prev) => (prev + 1) % stories.length)
                  }
                  aria-label="Next story"
                >
                  <ArrowRight className="w-4 h-4 text-foreground" />
                </Button>
                <div className="flex items-center gap-2 ml-sm">
                  {stories.map((_, dot) => (
                    <button
                      key={dot}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-normal",
                        dot === index ? "w-7 bg-accent" : "w-2 bg-border-hover"
                      )}
                      onClick={() => setIndex(dot)}
                      aria-label={`Go to story ${dot + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-md sm:grid-cols-3 lg:grid-cols-1">
              {story.impact.map((item) => (
                <div
                  key={item.label}
                  className="motion-card rounded-xl border border-border bg-background-elevated p-lg"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold mt-sm gradient-text">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
