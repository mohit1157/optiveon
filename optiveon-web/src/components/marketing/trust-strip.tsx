"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Badge } from "@/components/ui/badge";

/* ── Curved grain / laurel wreath SVGs in site's accent gold ── */

function GrainLeft() {
    return (
        <svg viewBox="0 0 50 90" className="h-14 md:h-16 w-auto flex-shrink-0" fill="none">
            {/* Curved stem */}
            <path d="M38 82 C36 70, 32 55, 34 40, 38 25, 42 15" stroke="#d6b36a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Left leaves curving inward */}
            <ellipse cx="28" cy="68" rx="9" ry="4" transform="rotate(-55 28 68)" fill="#d6b36a" opacity="0.75" />
            <ellipse cx="24" cy="56" rx="9" ry="4" transform="rotate(-50 24 56)" fill="#d6b36a" opacity="0.65" />
            <ellipse cx="23" cy="44" rx="8" ry="3.5" transform="rotate(-40 23 44)" fill="#d6b36a" opacity="0.55" />
            <ellipse cx="26" cy="33" rx="7" ry="3" transform="rotate(-30 26 33)" fill="#d6b36a" opacity="0.45" />
            <ellipse cx="30" cy="23" rx="6" ry="2.5" transform="rotate(-20 30 23)" fill="#d6b36a" opacity="0.35" />
            {/* Right leaves curving outward */}
            <ellipse cx="44" cy="65" rx="7" ry="3.5" transform="rotate(40 44 65)" fill="#d6b36a" opacity="0.6" />
            <ellipse cx="43" cy="53" rx="7" ry="3.5" transform="rotate(35 43 53)" fill="#d6b36a" opacity="0.5" />
            <ellipse cx="42" cy="41" rx="6" ry="3" transform="rotate(25 42 41)" fill="#d6b36a" opacity="0.4" />
            <ellipse cx="42" cy="30" rx="5" ry="2.5" transform="rotate(15 42 30)" fill="#d6b36a" opacity="0.3" />
        </svg>
    );
}

function GrainRight() {
    return (
        <svg viewBox="0 0 50 90" className="h-14 md:h-16 w-auto flex-shrink-0" fill="none">
            {/* Curved stem (mirrored) */}
            <path d="M12 82 C14 70, 18 55, 16 40, 12 25, 8 15" stroke="#d6b36a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Right leaves curving inward */}
            <ellipse cx="22" cy="68" rx="9" ry="4" transform="rotate(55 22 68)" fill="#d6b36a" opacity="0.75" />
            <ellipse cx="26" cy="56" rx="9" ry="4" transform="rotate(50 26 56)" fill="#d6b36a" opacity="0.65" />
            <ellipse cx="27" cy="44" rx="8" ry="3.5" transform="rotate(40 27 44)" fill="#d6b36a" opacity="0.55" />
            <ellipse cx="24" cy="33" rx="7" ry="3" transform="rotate(30 24 33)" fill="#d6b36a" opacity="0.45" />
            <ellipse cx="20" cy="23" rx="6" ry="2.5" transform="rotate(20 20 23)" fill="#d6b36a" opacity="0.35" />
            {/* Left leaves curving outward */}
            <ellipse cx="6" cy="65" rx="7" ry="3.5" transform="rotate(-40 6 65)" fill="#d6b36a" opacity="0.6" />
            <ellipse cx="7" cy="53" rx="7" ry="3.5" transform="rotate(-35 7 53)" fill="#d6b36a" opacity="0.5" />
            <ellipse cx="8" cy="41" rx="6" ry="3" transform="rotate(-25 8 41)" fill="#d6b36a" opacity="0.4" />
            <ellipse cx="8" cy="30" rx="5" ry="2.5" transform="rotate(-15 8 30)" fill="#d6b36a" opacity="0.3" />
        </svg>
    );
}

/* ── Real brand-color SVG logos ── */

function BloombergLogo() {
    return (
        <svg viewBox="0 0 200 40" className="h-7 md:h-8 w-auto flex-shrink-0">
            <rect x="4" y="6" width="28" height="28" rx="3" fill="#F37A21" />
            <text x="38" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="18" fontWeight="700" fill="#F37A21" letterSpacing="-0.5">Bloomberg</text>
        </svg>
    );
}

function AWSLogo() {
    return (
        <svg viewBox="0 0 120 40" className="h-7 md:h-8 w-auto flex-shrink-0">
            <text x="5" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="24" fontWeight="800" fill="#FF9900" letterSpacing="-0.5">AWS</text>
            <path d="M5 32 C25 38, 55 38, 80 32" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
    );
}

function StripeLogo() {
    return (
        <svg viewBox="0 0 120 40" className="h-7 md:h-8 w-auto flex-shrink-0">
            <text x="5" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="22" fontWeight="700" fill="#635BFF" letterSpacing="-0.3">stripe</text>
        </svg>
    );
}

function PostgreSQLLogo() {
    return (
        <svg viewBox="0 0 180 40" className="h-7 md:h-8 w-auto flex-shrink-0">
            <circle cx="16" cy="20" r="12" fill="none" stroke="#336791" strokeWidth="2.5" />
            <path d="M12 16 C16 14, 20 16, 20 20 C20 24, 16 26, 12 24" fill="#336791" opacity="0.6" />
            <text x="34" y="27" fontFamily="Inter, Arial, sans-serif" fontSize="17" fontWeight="700" fill="#336791" letterSpacing="-0.3">PostgreSQL</text>
        </svg>
    );
}

function DockerLogo() {
    return (
        <svg viewBox="0 0 130 40" className="h-7 md:h-8 w-auto flex-shrink-0">
            <path d="M5 22 Q5 16, 12 16 L32 16 Q38 16, 38 22 L38 26 Q38 30, 32 30 L12 30 Q5 30, 5 26 Z" fill="#2496ED" opacity="0.15" stroke="#2496ED" strokeWidth="1.5" />
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
        <svg viewBox="0 0 130 40" className="h-7 md:h-8 w-auto flex-shrink-0">
            <circle cx="16" cy="20" r="12" fill="#000" stroke="#fff" strokeWidth="1" />
            <path d="M12 14 L22 20 L12 26 Z" fill="#fff" opacity="0.9" />
            <line x1="20" y1="12" x2="20" y2="28" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
            <text x="34" y="27" fontFamily="Inter, Arial, sans-serif" fontSize="19" fontWeight="700" fill="#ffffff" letterSpacing="-0.3">Next.js</text>
        </svg>
    );
}

function PrismaLogo() {
    return (
        <svg viewBox="0 0 120 40" className="h-7 md:h-8 w-auto flex-shrink-0">
            <path d="M8 30 L16 8 L28 28 Z" fill="none" stroke="#2D3748" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M16 8 L28 28 L8 30 Z" fill="#2D3748" opacity="0.15" />
            <text x="34" y="28" fontFamily="Inter, Arial, sans-serif" fontSize="19" fontWeight="700" fill="#5A67D8" letterSpacing="-0.3">Prisma</text>
        </svg>
    );
}

function NginxLogo() {
    return (
        <svg viewBox="0 0 120 40" className="h-7 md:h-8 w-auto flex-shrink-0">
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
            className="flex items-center justify-center px-6 md:px-8 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
            title={name}
        >
            <Component />
        </div>
    );
}

export function TrustStrip() {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    const baseLogos = [...LOGOS, ...LOGOS]; // Duplicate to ensure it's wider than the screen
    const logoSet = [...baseLogos, ...baseLogos]; // Duplicate again for the -50% trick

    return (
        <section className="py-10 md:py-14 relative overflow-hidden">
            <div
                ref={ref}
                className={cn(
                    "transition-all duration-slow",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                {/* Heading & Live Metric */}
                <div className="text-center mb-8 flex flex-col items-center gap-md">
                    <Badge variant="outline" className="bg-background-elevated/50 border-accent/20">
                        Powered by Industry-Leading Technology
                    </Badge>
                    <div className="flex items-center gap-sm text-sm text-foreground-secondary bg-background-dark/80 px-4 py-2 rounded-full border border-border/50">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-glow" />
                        <span className="font-mono text-emerald-400 font-semibold">$120M+</span>
                        <span>in daily algorithmic volume verified</span>
                    </div>
                </div>

                {/* Layout: Grain — Wide Scrolling Logos — Grain */}
                <div className="container flex items-center gap-2 md:gap-4">
                    {/* Left curved grain */}
                    <div className="flex-shrink-0 hidden sm:block">
                        <GrainLeft />
                    </div>

                    {/* Center: wide scrolling logos */}
                    <div className="relative flex-1 overflow-hidden min-w-0">
                        {/* Left fade */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-8 md:w-14 z-10 pointer-events-none"
                            style={{ background: "linear-gradient(to right, #0b111b, transparent)" }}
                        />
                        {/* Right fade */}
                        <div
                            className="absolute right-0 top-0 bottom-0 w-8 md:w-14 z-10 pointer-events-none"
                            style={{ background: "linear-gradient(to left, #0b111b, transparent)" }}
                        />

                        <div className="flex animate-marquee hover:[animation-play-state:paused]">
                            {logoSet.map((logo, i) => (
                                <LogoItem key={`${logo.name}-${i}`} Component={logo.Component} name={logo.name} />
                            ))}
                        </div>
                    </div>

                    {/* Right curved grain */}
                    <div className="flex-shrink-0 hidden sm:block">
                        <GrainRight />
                    </div>
                </div>
            </div>
        </section>
    );
}
