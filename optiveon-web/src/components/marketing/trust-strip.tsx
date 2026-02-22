"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

/* ── Inline SVG logos (simplified, monochrome versions) ── */

function BloombergLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 120 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="18" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.02em">Bloomberg</text>
        </svg>
    );
}

function AWSLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 23.5c-5.2 3-12.7 4.6-19.2 4.6-.9 0-1.7-.1-2.5-.2l.3-.5c6.1-3.2 13.8-5 20.8-5 5.1 0 10.6 1.1 15.7 3.1l-1 1.3c-4.5-2-9.3-3.1-14.1-3.3z" fill="currentColor" opacity="0.6" />
            <text x="6" y="20" fontFamily="Inter, system-ui, sans-serif" fontSize="17" fontWeight="800" letterSpacing="-0.02em" fill="currentColor">AWS</text>
        </svg>
    );
}

function StripeLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 80 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="700" letterSpacing="-0.02em">Stripe</text>
        </svg>
    );
}

function PostgresLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 130 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="18" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.02em">PostgreSQL</text>
        </svg>
    );
}

function DockerLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 90 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="700" letterSpacing="-0.02em">Docker</text>
        </svg>
    );
}

function NextJSLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 90 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="700" letterSpacing="-0.02em">Next.js</text>
        </svg>
    );
}

function PrismaLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 90 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="700" letterSpacing="-0.02em">Prisma</text>
        </svg>
    );
}

function NginxLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 80 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="700" letterSpacing="-0.02em">Nginx</text>
        </svg>
    );
}

const LOGOS = [
    { Component: BloombergLogo, name: "Bloomberg" },
    { Component: AWSLogo, name: "AWS" },
    { Component: StripeLogo, name: "Stripe" },
    { Component: PostgresLogo, name: "PostgreSQL" },
    { Component: DockerLogo, name: "Docker" },
    { Component: NextJSLogo, name: "Next.js" },
    { Component: PrismaLogo, name: "Prisma" },
    { Component: NginxLogo, name: "Nginx" },
];

function LogoItem({ Component, name }: { Component: React.FC<{ className?: string }>; name: string }) {
    return (
        <div
            className="flex items-center justify-center px-8 md:px-12 opacity-30 hover:opacity-60 transition-opacity duration-300 flex-shrink-0"
            title={name}
        >
            <Component className="h-6 md:h-8 w-auto text-foreground" />
        </div>
    );
}

export function TrustStrip() {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    // Duplicate logos for seamless infinite scroll
    const logoSet = [...LOGOS, ...LOGOS];

    return (
        <section className="py-10 md:py-14 relative overflow-hidden border-t border-b border-border/30">
            <div
                ref={ref}
                className={cn(
                    "transition-all duration-slow",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                <p className="text-center text-[0.65rem] uppercase tracking-[0.25em] text-foreground-muted mb-8">
                    Powered by Industry-Leading Technology
                </p>

                {/* Marquee container */}
                <div className="relative">
                    {/* Left fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    {/* Right fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Scrolling track */}
                    <div className="flex animate-marquee hover:[animation-play-state:paused]">
                        {logoSet.map((logo, i) => (
                            <LogoItem key={`${logo.name}-${i}`} Component={logo.Component} name={logo.name} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
