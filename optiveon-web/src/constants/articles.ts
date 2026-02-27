export interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: "Research" | "Engineering" | "Market Analysis" | "Case Study";
    readTime: string;
    date: string;
    url: string;
}

export const INSIGHT_ARTICLES: Article[] = [
    {
        id: "out-of-sample-testing",
        title: "Why In-Sample Backtesting is Breaking Your Trading Algorithms",
        excerpt: "Exploring the dangers of curve-fitting and how structured out-of-sample validation prevents deployment disasters in volatile markets.",
        category: "Research",
        readTime: "6 min read",
        date: "Feb 24, 2026",
        url: "/insights/out-of-sample-testing"
    },
    {
        id: "options-pricing-models",
        title: "Modern Approaches to Real-Time Options Pricing",
        excerpt: "How GPU-accelerated infrastructure is changing the way quant teams calculate the Greeks under zero-day expiration (0DTE) stress.",
        category: "Engineering",
        readTime: "8 min read",
        date: "Feb 18, 2026",
        url: "/insights/options-pricing-models"
    },
    {
        id: "institutional-drawdown-limits",
        title: "Setting Hard Drawdown Limits: A Primer for Prop Firms",
        excerpt: "An analysis of how top proprietary trading firms structure their automated circuit breakers to protect capital during flash crashes.",
        category: "Market Analysis",
        readTime: "5 min read",
        date: "Feb 10, 2026",
        url: "/insights/institutional-drawdown-limits"
    },
    {
        id: "latency-arbitrage",
        title: "The Death of Simple Latency Arbitrage",
        excerpt: "As exchange matching engines approach the speed of light, alpha generation is returning to fundamental statistical modeling.",
        category: "Research",
        readTime: "11 min read",
        date: "Jan 28, 2026",
        url: "/insights/latency-arbitrage"
    },
    {
        id: "case-study-delta-neutral",
        title: "Scaling a Delta-Neutral Options Strategy Validation",
        excerpt: "How one of our clients used Optiveon's infrastructure to stress-test their delta-neutral algorithm across 5 years of tick data.",
        category: "Case Study",
        readTime: "7 min read",
        date: "Jan 15, 2026",
        url: "/insights/case-study-delta-neutral"
    },
    {
        id: "data-quality-survivorship",
        title: "The Silent Killer: Survivorship Bias in Historical Data",
        excerpt: "If your backtests don't include delisted assets, your Sharpe ratio is a lie. Here is how to clean your historical pricing feeds.",
        category: "Engineering",
        readTime: "9 min read",
        date: "Jan 03, 2026",
        url: "/insights/data-quality-survivorship"
    },
    {
        id: "regime-detection",
        title: "Building Adaptive Regime Detection Models",
        excerpt: "Strategies that work in low-volatility melt-ups die in high-variance selloffs. Learn how to implement dynamic regime switching.",
        category: "Research",
        readTime: "12 min read",
        date: "Dec 18, 2025",
        url: "/insights/regime-detection"
    },
    {
        id: "execution-slippage",
        title: "Modeling Execution Slippage in Crypto Perpetuals",
        excerpt: "A deep dive into measuring the true cost of crossing the spread on major centralized exchanges during high-volume periods.",
        category: "Market Analysis",
        readTime: "6 min read",
        date: "Dec 05, 2025",
        url: "/insights/execution-slippage"
    }
];
