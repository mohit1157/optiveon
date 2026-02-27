export interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: "Policy & Regulation" | "Market Structure" | "Quantitative Research" | "Industry News" | "Technology";
    readTime: string;
    date: string;
    url: string;
    imageUrl?: string;
}

export const INSIGHT_ARTICLES: Article[] = [
    {
        id: "esma-supervision",
        title: "ESMA pushes for consistent supervision of algorithmic trading",
        excerpt: "The European Securities and Markets Authority (ESMA) emphasizes the need for consistent supervision to address risks associated with AI and ensure firms can fully explain their algorithms' decision-making processes.",
        category: "Policy & Regulation",
        readTime: "4 min read",
        date: "Feb 25, 2026",
        url: "https://www.investmentexecutive.com/news/industry-news/esma-pushes-for-consistent-supervision-of-algorithmic-trading/",
        imageUrl: "/images/blog/esma.png"
    },
    {
        id: "ai-liquidity-impact",
        title: "AI-powered algorithms impact on stock market liquidity",
        excerpt: "A look at how AI-powered algorithmic trading is heavily influencing stock market liquidity, optimizing order execution, and reducing market impact for large institutional players.",
        category: "Market Structure",
        readTime: "6 min read",
        date: "Feb 18, 2026",
        url: "https://ibsintelligence.com/ibsi-news/ai-powered-algorithms-impact-on-stock-market-liquidity/",
        imageUrl: "/images/blog/liquidity.png"
    },
    {
        id: "machine-learning-pricing",
        title: "Pricing Financial Derivatives using Machine Learning",
        excerpt: "An exploration of how modern machine learning toolkits are being integrated with traditional mathematical pricing models, improving accuracy over traditional regression.",
        category: "Quantitative Research",
        readTime: "9 min read",
        date: "Feb 12, 2026",
        url: "https://www.risk.net/journal-of-computational-finance/7954316/pricing-financial-derivatives-using-machine-learning-a-comprehensive-review",
        imageUrl: "/images/blog/pricing.png"
    },
    {
        id: "algo-market-growth",
        title: "Algorithmic Trading Market Dominance in 2024",
        excerpt: "Hedge funds and prominent banks continue to dominate the algorithmic trading landscape, utilizing automation to enhance profitability and drastically reduce execution costs.",
        category: "Industry News",
        readTime: "5 min read",
        date: "Feb 01, 2026",
        url: "https://www.grandviewresearch.com/industry-analysis/algorithmic-trading-market",
        imageUrl: "/images/blog/dominance.png"
    },
    {
        id: "quantum-computing",
        title: "Quantum Computing Applications for Multi-Option Portfolio Pricing",
        excerpt: "Emerging research demonstrates the long-term potential of applying quantum mechanics and computing to complex, multi-option portfolio valuation and risk assessment.",
        category: "Technology",
        readTime: "11 min read",
        date: "Jan 22, 2026",
        url: "https://www.tandfonline.com/doi/full/10.1080/14697688.2023.2183549",
        imageUrl: "/images/blog/quantum.png"
    },
    {
        id: "options-volatility",
        title: "Navigating Earnings Season: Implied Volatility Analysis",
        excerpt: "Tools and visual methods to help traders analyze key structural options data—like volume, open interest, and implied volatility crush—ahead of major earnings reports.",
        category: "Market Structure",
        readTime: "7 min read",
        date: "Jan 10, 2026",
        url: "https://www.barchart.com/story/news/24128549/unusual-options-activity",
        imageUrl: "/images/blog/volatility.png"
    }
];
