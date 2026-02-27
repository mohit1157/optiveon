import { INSIGHT_ARTICLES } from "@/constants/articles";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";

// Helper component for the article card
function ArticleCard({ article }: { article: typeof INSIGHT_ARTICLES[0] }) {
    return (
        <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-[350px] md:w-[450px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-background-card/40 p-xl backdrop-blur-md transition-all duration-slow hover:border-accent/40 hover:-translate-y-2 hover:shadow-glow"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-normal group-hover:opacity-100" />

            <div className="relative z-10 mb-8">
                <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-md">
                    {article.category}
                </span>
                <h3 className="mb-3 text-[1.4rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                    {article.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-foreground-secondary">
                    {article.excerpt}
                </p>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-border/50 pt-4">
                <div className="flex items-center gap-4 text-xs font-medium text-foreground-muted">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                    </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-dark/80 text-foreground transition-all duration-normal group-hover:bg-accent group-hover:text-black">
                    <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-normal group-hover:rotate-0" />
                </div>
            </div>
        </Link>
    );
}

export default function InsightsPage() {
    // Split articles into two rows for the marquee effect
    const row1 = INSIGHT_ARTICLES.slice(0, Math.ceil(INSIGHT_ARTICLES.length / 2));
    const row2 = INSIGHT_ARTICLES.slice(Math.ceil(INSIGHT_ARTICLES.length / 2));

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden pt-32 pb-24">
            {/* Background Orbs */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-accent/10 mix-blend-screen blur-[120px]" />
                <div className="absolute top-[40%] right-[10%] h-[400px] w-[400px] rounded-full bg-primary/20 mix-blend-screen blur-[100px]" />
            </div>

            <div className="container relative z-10 mb-20 text-center">
                <div className="mb-6 inline-flex items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-accent backdrop-blur-md">
                    Research & Knowledge Base
                </div>
                <h1 className="text-hero-title mx-auto mb-6 max-w-4xl text-balance tracking-tight">
                    Exploring the Alpha in <span className="gradient-text">Algorithmic Infrastructure</span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-foreground-secondary text-balance">
                    Deep dives, technical analyses, and industry insights into market structure, quantitative validation, and low-latency deployment.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative flex w-full flex-col gap-8 py-10">
                {/* Left/Right Fade Gradients */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[10vw] bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[10vw] bg-gradient-to-l from-background to-transparent" />

                {/* Row 1: Left to Right */}
                <div className="group relative flex overflow-hidden">
                    <div className="flex w-max animate-marquee items-center gap-8 pl-8 hover:[animation-play-state:paused]">
                        {[...row1, ...row1, ...row1].map((article, idx) => (
                            <ArticleCard key={`r1-${idx}`} article={article} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Right to Left */}
                <div className="group relative flex overflow-hidden">
                    <div className="flex w-max animate-marquee-reverse items-center gap-8 pl-8 hover:[animation-play-state:paused]">
                        {[...row2, ...row2, ...row2].map((article, idx) => (
                            <ArticleCard key={`r2-${idx}`} article={article} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
