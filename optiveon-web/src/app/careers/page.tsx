import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Careers | Optiveon",
    description:
        "Join Optiveon and help build the future of algorithmic trading technology.",
};

const openRoles = [
    {
        title: "Quantitative Developer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description:
            "Build and optimize algorithmic trading strategies using Python, machine learning, and real-time market data.",
    },
    {
        title: "Full Stack Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description:
            "Develop our Next.js platform, real-time dashboards, and trading infrastructure with a focus on performance and reliability.",
    },
    {
        title: "Data Scientist",
        department: "Research",
        location: "Remote",
        type: "Full-time",
        description:
            "Research and develop sentiment analysis models, market prediction algorithms, and risk management frameworks.",
    },
];

export default function CareersPage() {
    return (
        <section className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-background" />

            <div className="container max-w-4xl">
                {/* Header */}
                <div className="flex items-center gap-md mb-2xl">
                    <Link
                        href="/"
                        className="w-10 h-10 rounded-lg border border-border bg-background-card flex items-center justify-center hover:bg-background-elevated transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Careers at Optiveon</h1>
                        <p className="text-foreground-secondary mt-1">
                            Help us build the future of algorithmic trading
                        </p>
                    </div>
                </div>

                {/* Mission */}
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-xl mb-2xl">
                    <h2 className="text-lg font-semibold mb-sm">Why Optiveon?</h2>
                    <p className="text-foreground-secondary leading-relaxed">
                        We&apos;re a small, fast-moving team building cutting-edge trading
                        technology. At Optiveon, you&apos;ll work on real-world problems at
                        the intersection of finance, AI, and software engineering. We value
                        autonomy, impact, and continuous learning.
                    </p>
                    <div className="flex flex-wrap gap-lg mt-lg">
                        <div className="flex items-center gap-sm text-sm text-foreground-secondary">
                            <MapPin className="w-4 h-4 text-accent" />
                            Fully Remote
                        </div>
                        <div className="flex items-center gap-sm text-sm text-foreground-secondary">
                            <Clock className="w-4 h-4 text-accent" />
                            Flexible Hours
                        </div>
                        <div className="flex items-center gap-sm text-sm text-foreground-secondary">
                            <Zap className="w-4 h-4 text-accent" />
                            Equity Options
                        </div>
                    </div>
                </div>

                {/* Open Roles */}
                <h2 className="text-sm uppercase tracking-[0.15em] text-foreground-muted mb-lg">
                    Open Positions
                </h2>
                <div className="space-y-md mb-2xl">
                    {openRoles.map((role) => (
                        <div
                            key={role.title}
                            className="rounded-2xl border border-border bg-background-card p-xl hover:border-accent/30 transition-colors group"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md mb-md">
                                <div>
                                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                                        {role.title}
                                    </h3>
                                    <p className="text-sm text-foreground-muted">
                                        {role.department}
                                    </p>
                                </div>
                                <div className="flex items-center gap-sm">
                                    <span className="rounded-full border border-border bg-background-elevated px-md py-xs text-xs text-foreground-secondary">
                                        {role.location}
                                    </span>
                                    <span className="rounded-full border border-border bg-background-elevated px-md py-xs text-xs text-foreground-secondary">
                                        {role.type}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-foreground-secondary leading-relaxed">
                                {role.description}
                            </p>
                            <div className="mt-lg">
                                <a
                                    href="mailto:careers@optiveon.com"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                                >
                                    Apply →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* General Application */}
                <div className="rounded-2xl border border-border bg-background-card p-xl text-center">
                    <h3 className="text-lg font-semibold mb-sm">
                        Don&apos;t see the right role?
                    </h3>
                    <p className="text-sm text-foreground-secondary mb-lg max-w-md mx-auto">
                        We&apos;re always looking for talented people. Send us your resume
                        and tell us how you can contribute.
                    </p>
                    <a
                        href="mailto:careers@optiveon.com"
                        className="inline-flex items-center gap-2 rounded-lg bg-accent px-lg py-md text-sm font-semibold text-background hover:bg-accent/90 transition-colors"
                    >
                        Send General Application
                    </a>
                </div>
            </div>
        </section>
    );
}
