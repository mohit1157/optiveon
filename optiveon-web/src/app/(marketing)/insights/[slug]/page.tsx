import { INSIGHT_ARTICLES } from "@/constants/articles";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";

interface PageProps {
    params: {
        slug: string;
    };
}

export default function ArticlePage({ params }: PageProps) {
    const article = INSIGHT_ARTICLES.find((a) => a.id === params.slug);

    if (!article) {
        notFound();
    }

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "datePublished": article.date,
        "author": {
            "@type": "Organization",
            "name": "Optiveon"
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center pt-32 pb-24">
            <JsonLd data={articleSchema} />

            {/* Background Gradients */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 mix-blend-screen blur-[120px]" />
            </div>

            <article className="container max-w-3xl">
                <Link
                    href="/insights"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Insights
                </Link>

                <header className="mb-12">
                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium">
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-accent">
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-foreground-muted">
                            <Calendar className="h-4 w-4" />
                            {article.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-foreground-muted">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                        </span>
                    </div>

                    <h1 className="text-section-title mb-6 leading-tight tracking-tight text-foreground">
                        {article.title}
                    </h1>

                    <p className="text-xl leading-relaxed text-foreground-secondary">
                        {article.excerpt}
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none text-foreground-muted">
                    {/* Placeholder for actual content since these are mock articles */}
                    <div className="rounded-xl border border-border/50 bg-background-card/50 p-8 text-center backdrop-blur-sm">
                        <p className="mb-4 text-lg">
                            This is a placeholder for the full article content.
                        </p>
                        <p className="text-sm">
                            Once the CMS or Content Pipeline is connected, the full markdown body for <strong>{article.title}</strong> will render here.
                        </p>
                    </div>
                </div>
            </article>
        </main>
    );
}
