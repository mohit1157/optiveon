import { companyInfo, riskDisclaimer } from "@/constants/content";
import { features } from "@/constants/features";

export interface AssistantSuggestion {
  label: string;
  href: string;
}

export interface SiteAssistantReply {
  answer: string;
  suggestions: AssistantSuggestion[];
  matchedTopics: string[];
}

interface SiteTopic {
  id: string;
  keywords: string[];
  answer: () => string;
  suggestions: AssistantSuggestion[];
}

const STOP_WORDS = new Set([
  "the", "and", "for", "from", "with", "that", "this", "into", "about",
  "have", "your", "you", "our", "what", "when", "where", "how", "can",
  "are", "is", "does", "they", "them", "there", "please", "tell", "more",
  "need", "just", "also", "very", "some", "any", "would", "could", "should",
  "will", "like", "know", "want", "get", "got", "been", "being", "was",
]);

function getFeatureList() {
  return features.map((f) => `• ${f.title}: ${f.description}`).join("\n");
}

const TOPICS: SiteTopic[] = [
  // ── Greetings & Small Talk ──
  {
    id: "greeting",
    keywords: [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
      "whats up", "sup", "howdy", "greetings", "yo",
    ],
    answer: () =>
      `Hello! Welcome to Optiveon. I'm here to help you with anything about our platform — features, pricing, payments, API access, onboarding, or company info. What would you like to know?`,
    suggestions: [
      { label: "Explore features", href: "/#features" },
      { label: "View pricing", href: "/#contact" },
      { label: "Request demo", href: "/#contact" },
    ],
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank", "appreciate", "helpful", "great", "awesome", "perfect", "cool"],
    answer: () =>
      `You're welcome! If you have any other questions about Optiveon, feel free to ask. I'm here to help!`,
    suggestions: [
      { label: "Explore features", href: "/#features" },
      { label: "Contact team", href: "/#contact" },
    ],
  },

  // ── Company Information ──
  {
    id: "company",
    keywords: [
      "company", "optiveon", "about", "who", "founded", "founder", "team",
      "based", "headquarters", "hq", "location", "office", "address", "austin",
      "texas", "llc",
    ],
    answer: () =>
      `Optiveon LLC is an algorithmic trading research and market analysis company headquartered in Austin, Texas. We build institutional-grade research, validation, and deployment software for trading teams while running proprietary trading workflows.\n\nOffice: ${companyInfo.address.full}\nEmail: ${companyInfo.email}`,
    suggestions: [
      { label: "Contact us", href: "/#contact" },
      { label: "View technology", href: "/#technology" },
      { label: "Send email", href: `mailto:${companyInfo.email}` },
    ],
  },

  // ── Product & Features ──
  {
    id: "product",
    keywords: [
      "feature", "features", "platform", "product", "tool", "tools",
      "capability", "capabilities", "offer", "offering", "software",
      "solution", "solutions", "what do", "what does", "provide",
    ],
    answer: () =>
      `Optiveon's platform provides institutional-grade tools for algorithmic trading research and execution:\n\n${getFeatureList()}\n\nOur platform supports equities, futures, forex, and crypto markets with sub-12ms median signal pipeline latency.`,
    suggestions: [
      { label: "See features", href: "/#features" },
      { label: "Validation lifecycle", href: "/#validation" },
      { label: "Request demo", href: "/#contact" },
    ],
  },

  // ── Analytics & AI ──
  {
    id: "analytics",
    keywords: [
      "analytics", "real-time", "realtime", "data", "visualization",
      "monitor", "monitoring", "market data", "insight", "insights",
      "ai", "machine learning", "ml", "artificial intelligence", "prediction",
      "forecast",
    ],
    answer: () =>
      `Optiveon offers Real-Time Analytics with institutional-grade data feeds and advanced visualization tools. Our AI-Powered Insights use machine learning models to analyze patterns and generate actionable market signals.\n\nKey stats:\n• 42 strategies under validation\n• 18 global markets & venues\n• <12ms median signal pipeline latency`,
    suggestions: [
      { label: "See features", href: "/#features" },
      { label: "View technology", href: "/#technology" },
      { label: "Request demo", href: "/#contact" },
    ],
  },

  // ── Pricing & Plans ──
  {
    id: "pricing",
    keywords: [
      "price", "pricing", "plan", "plans", "cost", "tier", "tiers",
      "starter", "professional", "enterprise", "subscription", "how much",
      "affordable", "expensive", "budget", "package", "packages", "monthly",
      "annually", "free trial", "free",
    ],
    answer: () =>
      `Optiveon offers three subscription tiers:\n\n• Starter ($299/mo) — For individual researchers. Includes core analytics, backtesting, and smart alerts.\n• Professional ($899/mo) — For growing teams. Adds API access, multi-user collaboration, and priority support.\n• Enterprise (Custom pricing) — For institutional firms. Full API throughput, dedicated support, custom integrations, and SLA guarantees.\n\nYou can subscribe directly through the Payment option in the navigation bar, or request a demo for a guided walkthrough.`,
    suggestions: [
      { label: "View payment options", href: "/#" },
      { label: "Request demo", href: "/#contact" },
      { label: "Contact sales", href: "/#contact" },
    ],
  },

  // ── Payments & Billing ──
  {
    id: "payment",
    keywords: [
      "payment", "pay", "checkout", "billing", "invoice", "stripe",
      "credit card", "card", "subscribe", "purchase", "buy", "charge",
      "refund", "cancel", "cancellation",
    ],
    answer: () =>
      `Payments are handled securely through Stripe. To subscribe:\n\n1. Click "Payment" in the top navigation bar\n2. Choose your plan (Starter, Professional, or Enterprise)\n3. Complete checkout through Stripe's secure payment page\n\nAll plans are billed monthly. For Enterprise pricing or custom billing arrangements, contact our sales team.`,
    suggestions: [
      { label: "Go to payment", href: "/#" },
      { label: "Contact sales", href: "/#contact" },
      { label: "View plans", href: "/#contact" },
    ],
  },

  // ── Demo & Onboarding ──
  {
    id: "demo",
    keywords: [
      "demo", "onboarding", "trial", "get started", "start", "sign up",
      "signup", "register", "registration", "walkthrough", "tour",
      "try", "test", "sample", "preview", "setup", "begin",
    ],
    answer: () =>
      `To get started with Optiveon:\n\n1. Request a demo via our contact form — the team will schedule a personalized walkthrough\n2. During the demo, we'll map the platform capabilities to your specific workflow\n3. After the demo, you can subscribe to the plan that fits your needs\n\nOnboarding includes technical setup assistance, API key provisioning, and integration support.`,
    suggestions: [
      { label: "Request demo", href: "/#contact" },
      { label: "Explore features", href: "/#features" },
      { label: "View payment options", href: "/#" },
    ],
  },

  // ── API & Integration ──
  {
    id: "api",
    keywords: [
      "api", "integration", "integrate", "endpoint", "endpoints", "webhook",
      "webhooks", "keys", "key", "developer", "developers", "sdk", "rest",
      "documentation", "docs", "programmatic", "automate", "automation",
    ],
    answer: () =>
      `API access is available from the Professional tier upward:\n\n• Professional: Standard API access with generous rate limits\n• Enterprise: Full API throughput, custom endpoints, webhook support, and dedicated integration engineering\n\nYou can manage your API keys from the Dashboard after subscribing. The API supports RESTful endpoints for market data, signal generation, and portfolio management.`,
    suggestions: [
      { label: "API keys dashboard", href: "/dashboard/api-keys" },
      { label: "Request demo", href: "/#contact" },
      { label: "View plans", href: "/#contact" },
    ],
  },

  // ── Markets & Trading ──
  {
    id: "markets",
    keywords: [
      "market", "markets", "trading", "trade", "equities", "equity",
      "stocks", "stock", "futures", "options", "forex", "fx", "crypto",
      "cryptocurrency", "bitcoin", "asset", "assets", "portfolio",
      "strategy", "strategies", "backtest", "backtesting", "algorithm",
      "algorithmic", "quant", "quantitative", "signal", "signals",
    ],
    answer: () =>
      `Optiveon provides Multi-Market Coverage across:\n\n• Equities (stocks)\n• Futures\n• Options\n• Forex (FX)\n• Cryptocurrency\n\nOur Custom Algorithms framework lets you build, backtest, and validate trading strategies before deployment. We currently have 42 strategies under validation across 18 global markets and venues.\n\nThe platform includes Smart Alerts for price movements, pattern detection, and signal generation.`,
    suggestions: [
      { label: "See features", href: "/#features" },
      { label: "Validation lifecycle", href: "/#validation" },
      { label: "Request demo", href: "/#contact" },
    ],
  },

  // ── Validation & Testing ──
  {
    id: "validation",
    keywords: [
      "validation", "validate", "verified", "verify", "test", "testing",
      "backtest", "backtesting", "performance", "results", "track record",
      "proof", "lifecycle", "live", "paper trading", "simulation",
      "drawdown", "sharpe", "accuracy",
    ],
    answer: () =>
      `Optiveon uses a rigorous Validation Lifecycle for every strategy:\n\n1. Research & Development — Build and design your strategy\n2. In-Sample Testing — Validate against historical data (e.g., 2018-2022)\n3. Out-of-Sample Testing — Verify on unseen data (e.g., 2023-2025)\n4. Paper Trading — Live simulation without real capital\n5. Live Deployment — Deploy with configurable risk controls\n\nStrategies must meet strict criteria (max drawdown, Sharpe ratio thresholds) before advancement. This institutional-grade process is a core differentiator.`,
    suggestions: [
      { label: "Validation section", href: "/#validation" },
      { label: "Customer stories", href: "/#proof" },
      { label: "Request demo", href: "/#contact" },
    ],
  },

  // ── Technology Stack ──
  {
    id: "technology",
    keywords: [
      "technology", "tech", "stack", "infrastructure", "architecture",
      "built", "build", "framework", "nextjs", "next", "react", "prisma",
      "postgres", "postgresql", "database", "node", "typescript", "cloud",
      "aws", "deploy", "deployment", "docker", "server", "hosting",
      "latency", "speed", "fast", "performance",
    ],
    answer: () =>
      `Optiveon's technology stack is built for institutional-grade performance:\n\n• Frontend: Next.js + React + TypeScript\n• Backend: Node.js with Prisma ORM\n• Database: PostgreSQL (AWS RDS)\n• Payments: Stripe\n• Infrastructure: AWS EC2 with Docker + nginx\n• Performance: <12ms median signal pipeline latency\n\nThe System Architecture provides end-to-end resilience from sub-millisecond market data feeds through proprietary execution engines to a secure data layer.`,
    suggestions: [
      { label: "View tech section", href: "/#technology" },
      { label: "See features", href: "/#features" },
      { label: "Request demo", href: "/#contact" },
    ],
  },

  // ── Security & Privacy ──
  {
    id: "security",
    keywords: [
      "security", "secure", "safe", "safety", "encryption", "encrypted",
      "compliance", "compliant", "privacy", "data protection", "gdpr",
      "ssl", "https", "protected", "uptime", "reliable", "reliability",
      "trust", "trusted",
    ],
    answer: () =>
      `Security is a core priority at Optiveon:\n\n• Application-level AES-256-GCM encryption for API keys and sensitive data\n• Payments handled through Stripe (PCI-DSS Level 1 compliant)\n• SSL/TLS encryption on all connections\n• PostgreSQL database on AWS RDS with encryption at rest\n• Secure authentication via NextAuth.js with Google OAuth support\n\nFor full details, review our Privacy Policy and Terms of Service.`,
    suggestions: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "View technology", href: "/#technology" },
    ],
  },

  // ── Support & Contact ──
  {
    id: "support",
    keywords: [
      "support", "contact", "email", "help", "assistance", "reach",
      "call", "phone", "talk", "speak", "representative", "customer service",
      "issue", "problem", "bug", "question", "feedback",
    ],
    answer: () =>
      `You can reach the Optiveon team through:\n\n• Contact Form: Use the form in the Contact section on the homepage\n• Email: ${companyInfo.email}\n• Office: ${companyInfo.address.full}\n\nOur team responds to inquiries within 24 hours on business days. For urgent technical issues, Professional and Enterprise subscribers have priority support.`,
    suggestions: [
      { label: "Open contact form", href: "/#contact" },
      { label: "Send email", href: `mailto:${companyInfo.email}` },
      { label: "Request demo", href: "/#contact" },
    ],
  },

  // ── Legal & Compliance ──
  {
    id: "legal",
    keywords: [
      "legal", "terms", "terms of service", "tos", "privacy policy",
      "risk", "disclaimer", "regulated", "policy", "policies", "compliant",
      "advice", "investment advice", "financial advice", "liability",
      "copyright",
    ],
    answer: () =>
      `Important legal information:\n\n${riskDisclaimer}\n\nFor full details, please review our Terms of Service, Privacy Policy, and Risk Disclaimer pages.`,
    suggestions: [
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Risk disclaimer", href: "/disclaimer" },
    ],
  },

  // ── Jobs & Careers ──
  {
    id: "careers",
    keywords: [
      "job", "jobs", "career", "careers", "hiring", "hire", "work",
      "position", "opening", "openings", "apply", "application",
      "internship", "intern", "engineer", "developer",
    ],
    answer: () =>
      `We're always looking for talented people to join the Optiveon team! While we don't have a public careers page yet, you can reach out directly to express interest.\n\nSend your resume and a brief note about the role you're interested in to ${companyInfo.email}. We're particularly interested in quantitative researchers, full-stack engineers, and trading systems specialists.`,
    suggestions: [
      { label: "Send email", href: `mailto:${companyInfo.email}` },
      { label: "About Optiveon", href: "/#" },
    ],
  },

  // ── Competitors & Comparison ──
  {
    id: "comparison",
    keywords: [
      "competitor", "competitors", "compare", "comparison", "vs",
      "versus", "alternative", "alternatives", "better", "different",
      "difference", "unique", "advantage", "why optiveon", "why choose",
    ],
    answer: () =>
      `What sets Optiveon apart:\n\n• Institutional-Grade Validation — Our multi-stage validation lifecycle (in-sample → out-of-sample → paper → live) ensures strategies are rigorously tested before deployment\n• Full-Stack Platform — Research, validation, and execution in one integrated platform\n• Sub-12ms Latency — Proprietary signal pipeline optimized for speed\n• Multi-Market Coverage — Equities, futures, forex, options, and crypto from a single interface\n• Flexible Tiers — From individual researchers to institutional teams\n\nRequest a demo to see how we compare to your current workflow.`,
    suggestions: [
      { label: "See features", href: "/#features" },
      { label: "Request demo", href: "/#contact" },
      { label: "Validation lifecycle", href: "/#validation" },
    ],
  },
];

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreTopic(question: string, tokens: string[], topic: SiteTopic) {
  let score = 0;
  for (const keyword of topic.keywords) {
    if (keyword.includes(" ")) {
      // Multi-word keyword: check as phrase
      if (question.includes(keyword)) score += 3;
    } else if (question.includes(keyword)) {
      score += 2;
    } else if (tokens.includes(keyword)) {
      score += 1;
    }
  }
  return score;
}

function dedupeSuggestions(suggestions: AssistantSuggestion[]) {
  const seen = new Set<string>();
  return suggestions.filter((suggestion) => {
    const key = `${suggestion.label}:${suggestion.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getSiteAssistantReply(message: string): SiteAssistantReply {
  const question = message.trim().toLowerCase();

  if (!question) {
    return {
      answer:
        "Ask me anything about Optiveon — our products, pricing, payment, features, API access, technology stack, validation process, or company info. I'm here to help!",
      matchedTopics: [],
      suggestions: [
        { label: "Explore features", href: "/#features" },
        { label: "View pricing", href: "/#contact" },
        { label: "Request demo", href: "/#contact" },
      ],
    };
  }

  const tokens = tokenize(question);

  const rankedTopics = TOPICS.map((topic) => ({
    topic,
    score: scoreTopic(question, tokens, topic),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (rankedTopics.length === 0) {
    // Improved fallback — try to be helpful instead of generic
    return {
      answer:
        `That's a great question! While I may not have a specific answer for that, I can help with:\n\n• Product features and capabilities\n• Pricing plans (Starter, Professional, Enterprise)\n• Payment and billing\n• API access and integrations\n• Company info and contact details\n• Validation and backtesting process\n• Technology stack and security\n• Legal policies\n\nCould you rephrase your question around one of these topics? Or reach out to our team for personalized assistance at ${companyInfo.email}.`,
      matchedTopics: [],
      suggestions: [
        { label: "Explore features", href: "/#features" },
        { label: "Contact team", href: "/#contact" },
        { label: "Send email", href: `mailto:${companyInfo.email}` },
      ],
    };
  }

  const selected = rankedTopics.slice(0, 2);
  const answer = selected.map((entry) => entry.topic.answer()).join("\n\n");
  const suggestions = dedupeSuggestions(
    selected.flatMap((entry) => entry.topic.suggestions)
  ).slice(0, 3);

  return {
    answer,
    suggestions,
    matchedTopics: selected.map((entry) => entry.topic.id),
  };
}
