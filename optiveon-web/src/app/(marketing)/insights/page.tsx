import { INSIGHT_ARTICLES } from "@/constants/articles";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Deeply minimal, Claude-style article card
function ArticleCard({ article }: { article: typeof INSIGHT_ARTICLES[0] }) {
    return (
        <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start"
        >
            <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent/80 transition-colors group-hover:text-accent">
                    {article.category}
                </span>
            </div>
            <h3 className="mb-3 text-[1.4rem] font-medium leading-snug text-foreground transition-colors group-hover:underline decoration-accent/50 underline-offset-4">
                {article.title}
            </h3>
            <p className="mb-5 line-clamp-3 text-[1.05rem] leading-relaxed text-foreground-secondary">
                {article.excerpt}
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-foreground-muted">
                {article.date}
            </div>
        </Link>
    );
}

// Massive, distinct featured post
function FeaturedArticle({ article }: { article: typeof INSIGHT_ARTICLES[0] }) {
    return (
        <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16 items-center"
        >
            <div className="order-2 flex flex-col items-start md:order-1">
                <div className="mb-6">
                    <span className="rounded-full border border-border/50 bg-background-card/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
                        {article.category}
                    </span>
                </div>
                <h2 className="mb-5 text-[2rem] font-medium leading-tight text-foreground transition-colors group-hover:text-accent md:text-[2.75rem] text-balance">
                    {article.title}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-foreground-secondary max-w-xl text-balance">
                    {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-foreground-muted">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1.5 transition-colors group-hover:text-accent">
                        Read article <ArrowRight className="h-4 w-4" />
                    </span>
                </div>
            </div>

            {/* Abstract Thumbnail Area - mimicking a clean graphic */}
            <div className="order-1 aspect-video w-full overflow-hidden rounded-xl border border-border/30 bg-background-card md:order-2 md:aspect-square lg:aspect-[4/3] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/10 transition-opacity duration-slow group-hover:opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center mix-blend-screen opacity-20">
                    <div className="w-[150%] h-[150%] bg-[url('/images/noise.png')] opacity-30 animate-spin [animation-duration:120s]" />
                </div>
            </div>
        </Link>
    );
}

export default function InsightsPage() {
    const featuredArticle = INSIGHT_ARTICLES[0];
    const gridArticles = INSIGHT_ARTICLES.slice(1);

    if (!featuredArticle) {
        return (
            <main className="flex min-h-screen flex-col items-center bg-background pt-32 pb-32">
                <p>No articles found.</p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center bg-background pt-32 pb-32">
            <div className="container max-w-6xl">
                <header className="mb-16 md:mb-24">
                    <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-6xl lg:text-[4.5rem]">
                        Insights
                    </h1>
                    <p className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-foreground-secondary md:text-xl text-balance">
                        Research, engineering updates, and market structure analyses from the Optiveon team.
                    </p>
                </header>
            </div>

            {/* Horizontal Article Ticker (Claude Style) */}
            <div className="w-full border-y border-border/40 bg-background-dark py-4 mb-20 md:mb-32 overflow-hidden relative">
                {/* Left/Right Fade Gradients for smooth entrance/exit */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[10vw] max-w-[100px] bg-gradient-to-r from-background-dark to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[10vw] max-w-[100px] bg-gradient-to-l from-background-dark to-transparent" />

                <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
                    {[...INSIGHT_ARTICLES, ...INSIGHT_ARTICLES].map((article, idx) => (
                        <Link
                            href={article.url}
                            key={`ticker-${idx}`}
                            className="group flex items-center px-8 border-r border-border/30 last:border-r-0 transition-opacity hover:opacity-80"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-[1.05rem] font-medium text-foreground transition-colors group-hover:text-accent whitespace-nowrap">
                                    {article.title}
                                </span>
                                <span className="text-[0.85rem] text-foreground-muted">
                                    {article.date}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="container max-w-6xl">
                <section className="mb-24 md:mb-32">
                    <FeaturedArticle article={featuredArticle} />
                </section>

                <section>
                    <div className="mb-12 border-b border-border/40 pb-4">
                        <h2 className="text-2xl font-medium tracking-tight text-foreground">
                            Latest
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                        {gridArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
