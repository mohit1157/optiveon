import { companyInfo } from "@/constants/content";
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
  "the",
  "and",
  "for",
  "from",
  "with",
  "that",
  "this",
  "into",
  "about",
  "have",
  "your",
  "you",
  "our",
  "what",
  "when",
  "where",
  "how",
  "can",
  "are",
  "is",
  "does",
  "they",
  "them",
  "there",
  "please",
  "tell",
  "more",
  "need",
]);

function getFeatureHighlights() {
  return features
    .slice(0, 4)
    .map((feature) => feature.title)
    .join(", ");
}

const TOPICS: SiteTopic[] = [
  {
    id: "pricing",
    keywords: [
      "price",
      "pricing",
      "plan",
      "plans",
      "cost",
      "tier",
      "starter",
      "professional",
      "enterprise",
      "subscription",
      "checkout",
      "billing",
    ],
    answer: () =>
      "Public pricing is currently not listed. Request a demo and the team will recommend the right package based on your workflow, integration needs, and team size.",
    suggestions: [
      { label: "Request demo", href: "/#contact" },
      { label: "Talk to sales", href: "/#contact" },
      { label: "Contact team", href: "/#contact" },
    ],
  },
  {
    id: "product",
    keywords: [
      "feature",
      "features",
      "platform",
      "tool",
      "research",
      "analytics",
      "alerts",
      "backtest",
      "algorithm",
      "trading",
      "signal",
    ],
    answer: () =>
      `Core platform capabilities include ${getFeatureHighlights()}. The product is focused on market research and decision support across futures, options, and forex workflows.`,
    suggestions: [
      { label: "See feature section", href: "/#features" },
      { label: "View product tour", href: "/#tour" },
      { label: "Open solutions", href: "/#solutions" },
    ],
  },
  {
    id: "api",
    keywords: [
      "api",
      "integration",
      "integrate",
      "endpoint",
      "data",
      "feed",
      "webhook",
      "keys",
      "dashboard",
      "developer",
    ],
    answer: () =>
      "API access is included from the Professional tier upward, with higher throughput and custom integration support in Enterprise. You can manage API keys from the dashboard and use the platform for data-driven workflows.",
    suggestions: [
      { label: "API keys page", href: "/dashboard/api-keys" },
      { label: "Request demo", href: "/#contact" },
      { label: "Contact integrations team", href: "/#contact" },
    ],
  },
  {
    id: "security",
    keywords: [
      "security",
      "secure",
      "infrastructure",
      "stripe",
      "compliance",
      "privacy",
      "latency",
      "uptime",
      "reliable",
    ],
    answer: () =>
      "The stack is built on trusted infrastructure: Next.js, PostgreSQL, Prisma, Stripe, and Resend. Billing runs through Stripe, and the platform is designed for reliability with low-latency market data workflows.",
    suggestions: [
      { label: "Security disclaimer", href: "/disclaimer" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "View tech section", href: "/#technology" },
    ],
  },
  {
    id: "support",
    keywords: [
      "support",
      "contact",
      "email",
      "help",
      "team",
      "sales",
      "demo",
      "talk",
      "reach",
      "company",
    ],
    answer: () =>
      `You can reach the Optiveon team from the contact section or directly via ${companyInfo.email}. Company location: ${companyInfo.address.full}.`,
    suggestions: [
      { label: "Open contact section", href: "/#contact" },
      { label: "Send email", href: `mailto:${companyInfo.email}` },
      { label: "Request demo", href: "/#contact" },
    ],
  },
  {
    id: "legal",
    keywords: [
      "legal",
      "terms",
      "privacy",
      "risk",
      "advice",
      "regulated",
      "policy",
      "disclaimer",
      "compliant",
    ],
    answer: () =>
      "Optiveon provides technology and research tools and does not provide investment advice. For legal details, use the Terms, Privacy, and Risk Disclaimer pages linked in the footer and policy section.",
    suggestions: [
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Risk disclaimer", href: "/disclaimer" },
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
  return topic.keywords.reduce((score, keyword) => {
    if (question.includes(keyword)) {
      return score + 2;
    }

    return tokens.includes(keyword) ? score + 1 : score;
  }, 0);
}

function dedupeSuggestions(suggestions: AssistantSuggestion[]) {
  const seen = new Set<string>();
  return suggestions.filter((suggestion) => {
    const key = `${suggestion.label}:${suggestion.href}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export function getSiteAssistantReply(message: string): SiteAssistantReply {
  const question = message.trim().toLowerCase();

  if (!question) {
    return {
      answer:
        "Ask me about demos, onboarding, product features, API access, support, or legal policy pages.",
      matchedTopics: [],
      suggestions: [
        { label: "Request demo", href: "/#contact" },
        { label: "Features", href: "/#features" },
        { label: "Contact", href: "/#contact" },
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
    return {
      answer:
        "I can answer questions about Optiveon demos, product capabilities, API access, support contacts, and legal pages. If you share your goal, I can point you to the exact page and next step.",
      matchedTopics: [],
      suggestions: [
        { label: "Request demo", href: "/#contact" },
        { label: "View features", href: "/#features" },
        { label: "Talk to team", href: "/#contact" },
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
