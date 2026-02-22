"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Badge } from "@/components/ui/badge";

/* ── Real brand-color SVG logos ── */

function BloombergLogo() {
    return (
        <svg viewBox="0 0 200 40" className="h-7 md:h-9 w-auto flex-shrink-0">
            <rect x="4" y="6" width="28" height="28" rx="3" fill="#F37A21" />
            <text x="38" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="18" fontWeight="700" fill="#F37A21" letterSpacing="-0.5">Bloomberg</text>
        </svg>
    );
}

function AWSLogo() {
    return (
        <svg viewBox="0 0 120 40" className="h-7 md:h-9 w-auto flex-shrink-0">
            <text x="5" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="24" fontWeight="800" fill="#FF9900" letterSpacing="-0.5">AWS</text>
            <path d="M5 32 C25 38, 55 38, 80 32" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
    );
}

function StripeLogo() {
    return (
        <svg viewBox="0 0 120 40" className="h-7 md:h-9 w-auto flex-shrink-0">
            <text x="5" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="22" fontWeight="700" fill="#635BFF" letterSpacing="-0.3">stripe</text>
        </svg>
    );
}

function PostgreSQLLogo() {
    return (
        <svg viewBox="0 0 180 40" className="h-7 md:h-9 w-auto flex-shrink-0">
            <circle cx="16" cy="20" r="12" fill="none" stroke="#336791" strokeWidth="2.5" />
            <path d="M12 16 C16 14, 20 16, 20 20 C20 24, 16 26, 12 24" fill="#336791" opacity="0.6" />
            <text x="34" y="27" fontFamily="Inter, Arial, sans-serif" fontSize="17" fontWeight="700" fill="#336791" letterSpacing="-0.3">PostgreSQL</text>
        </svg>
    );
}

function DockerLogo() {
    return (
        <svg viewBox="0 0 130 40" className="h-7 md:h-9 w-auto flex-shrink-0">
            {/* Whale body */}
            <path d="M5 22 Q5 16, 12 16 L32 16 Q38 16, 38 22 L38 26 Q38 30, 32 30 L12 30 Q5 30, 5 26 Z" fill="#2496ED" opacity="0.15" stroke="#2496ED" strokeWidth="1.5" />
            {/* Container boxes */}
            <rect x="9" y="19" width="5" height="4" rx="0.5" fill="#2496ED" />
            <rect x="16" y="19" width="5" height="4" rx="0.5" fill="#2496ED" />
            <rect x="23" y="19" width="5" height="4" rx="0.5" fill="#2496ED" />
            <rect x="16" y="13" width="5" height="4" rx="0.5" fill="#2496ED" opacity="0.6" />
            <text x="44" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="19" fontWeight="700" fill="#2496ED" letterSpacing="-0.3">Docker</text>
        </svg>
    );
}

function NextJSLogo() {
    return (
        <svg viewBox="0 0 130 40" className="h-7 md:h-9 w-auto flex-shrink-0">
            <circle cx="16" cy="20" r="12" fill="#000" stroke="#fff" strokeWidth="1" />
            <path d="M12 14 L22 20 L12 26 Z" fill="#fff" opacity="0.9" />
            <line x1="20" y1="12" x2="20" y2="28" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
            <text x="34" y="27" fontFamily="Inter, Arial, sans-serif" fontSize="19" fontWeight="700" fill="#ffffff" letterSpacing="-0.3">Next.js</text>
        </svg>
    );
}

function PrismaLogo() {
    return (
        <svg viewBox="0 0 120 40" className="h-7 md:h-9 w-auto flex-shrink-0">
            <path d="M8 30 L16 8 L28 28 Z" fill="none" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M16 8 L28 28 L8 30 Z" fill="#2D3748" opacity="0.15" />
            <text x="34" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="19" fontWeight="700" fill="#5A67D8" letterSpacing="-0.3">Prisma</text>
        </svg>
    );
}

function NginxLogo() {
    return (
        <svg viewBox="0 0 120 40" className="h-7 md:h-9 w-auto flex-shrink-0">
            <rect x="4" y="8" width="24" height="24" rx="3" fill="#009639" opacity="0.15" stroke="#009639" strokeWidth="1.5" />
            <text x="10" y="26" fontFamily="Inter, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#009639">N</text>
            <text x="34" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="19" fontWeight="700" fill="#009639" letterSpacing="-0.3">Nginx</text>
        </svg>
    );
}

const LOGOS = [
    { Component: BloombergLogo, name: "Bloomberg" },
    { Component: AWSLogo, name: "AWS" },
    { Component: StripeLogo, name: "Stripe" },
    { Component: PostgreSQLLogo, name: "PostgreSQL" },
    { Component: DockerLogo, name: "Docker" },
    { Component: NextJSLogo, name: "Next.js" },
    { Component: PrismaLogo, name: "Prisma" },
    { Component: NginxLogo, name: "Nginx" },
];

function LogoItem({ Component, name }: { Component: React.FC; name: string }) {
    return (
        <div
            className="flex items-center justify-center px-6 md:px-10 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
            title={name}
        >
            <Component />
        </div>
    );
}

export function TrustStrip() {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    // Duplicate logos for seamless infinite scroll
    const logoSet = [...LOGOS, ...LOGOS];

    return (
        <section className="py-10 md:py-14 relative overflow-hidden">
            <div
                ref={ref}
                className={cn(
                    "transition-all duration-slow",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                {/* Heading styled like SectionHeader tag */}
                <div className="text-center mb-8">
                    <Badge variant="outline">
                        Powered by Industry-Leading Technology
                    </Badge>
                </div>

                {/* Marquee container */}
                <div className="relative">
                    {/* Left gradient fade — site's navy/gold brand colors */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-28 md:w-48 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(to right, #0b111b 0%, rgba(11, 17, 27, 0.8) 40%, transparent 100%)",
                        }}
                    />
                    {/* Right gradient fade */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-28 md:w-48 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(to left, #0b111b 0%, rgba(11, 17, 27, 0.8) 40%, transparent 100%)",
                        }}
                    />

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
