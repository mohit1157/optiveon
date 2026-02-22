"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TRUST_LOGOS = [
    { name: "Bloomberg", label: "Data Partner" },
    { name: "AWS", label: "Infrastructure" },
    { name: "Stripe", label: "Payments" },
    { name: "PostgreSQL", label: "Database" },
    { name: "Docker", label: "Deployment" },
];

export function TrustStrip() {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    return (
        <section className="py-12 md:py-16 relative overflow-hidden border-t border-b border-border/40">
            <div
                ref={ref}
                className={cn(
                    "container transition-all duration-slow",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                <p className="text-center text-xs uppercase tracking-[0.2em] text-foreground-muted mb-8">
                    Powered by Industry-Leading Technology
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {TRUST_LOGOS.map((logo) => (
                        <div
                            key={logo.name}
                            className="flex flex-col items-center gap-1 opacity-40 hover:opacity-70 transition-opacity duration-normal"
                        >
                            <span className="text-lg font-semibold tracking-tight text-foreground">
                                {logo.name}
                            </span>
                            <span className="text-[0.6rem] uppercase tracking-[0.15em] text-foreground-muted">
                                {logo.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
