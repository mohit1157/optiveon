"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bot, Loader2, SendHorizontal, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AssistantSuggestion {
  label: string;
  href: string;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  suggestions?: AssistantSuggestion[];
}

interface ChatbotApiResponse {
  ok?: boolean;
  answer?: string;
  suggestions?: AssistantSuggestion[];
  error?: string;
}

interface SiteChatbotProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface LocalReply {
  answer: string;
  suggestions: AssistantSuggestion[];
}

const QUICK_PROMPTS = [
  "Which plan should I start with?",
  "How does checkout and billing work?",
  "What API access do I get?",
  "How do I contact the Optiveon team?",
];

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "I can help with pricing, plans, checkout, features, API access, support, and policy pages. Ask anything about the Optiveon site and company.",
  suggestions: [
    { label: "Compare plans", href: "/#pricing" },
    { label: "Explore features", href: "/#features" },
    { label: "Contact Optiveon", href: "/#contact" },
  ],
};

function getLocalReply(rawMessage: string): LocalReply {
  const question = rawMessage.toLowerCase();

  if (
    /(pricing|price|plan|tier|cost|start|starter|professional|enterprise)/.test(
      question
    )
  ) {
    return {
      answer:
        "Start with Professional if you need API access and active strategy workflows. Starter is best for individual exploration, and Enterprise is for institutional rollout with procurement support.",
      suggestions: [
        { label: "Compare plans", href: "/#pricing" },
        { label: "Start Professional", href: "/checkout?plan=professional" },
        { label: "Contact sales", href: "/#contact" },
      ],
    };
  }

  if (/(checkout|billing|invoice|payment|stripe)/.test(question)) {
    return {
      answer:
        "Checkout is processed securely through Stripe. You can select a plan, complete payment, and then manage billing from your dashboard billing page. Enterprise teams can request invoice and contract workflows.",
      suggestions: [
        { label: "Go to pricing", href: "/#pricing" },
        { label: "Billing portal", href: "/dashboard/billing" },
        { label: "Talk to sales", href: "/#contact" },
      ],
    };
  }

  if (/(api|integration|webhook|endpoint|key)/.test(question)) {
    return {
      answer:
        "API access is available on Professional and Enterprise plans. Professional includes daily call limits for production pilots, while Enterprise supports higher throughput and tailored integration support.",
      suggestions: [
        { label: "API keys", href: "/dashboard/api-keys" },
        { label: "Professional plan", href: "/checkout?plan=professional" },
        { label: "Integration support", href: "/#contact" },
      ],
    };
  }

  if (/(contact|team|support|email|sales|demo)/.test(question)) {
    return {
      answer:
        "You can reach the Optiveon team through the Contact section for sales, onboarding, and technical requests.",
      suggestions: [
        { label: "Go to contact", href: "/#contact" },
        { label: "Compare plans", href: "/#pricing" },
        { label: "Explore features", href: "/#features" },
      ],
    };
  }

  return {
    answer:
      "I can help with pricing, checkout, API access, product capabilities, and support. Ask a specific question and I will point you to the exact section.",
    suggestions: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Features", href: "/#features" },
      { label: "Contact", href: "/#contact" },
    ],
  };
}

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function SuggestionLink({ suggestion }: { suggestion: AssistantSuggestion }) {
  if (suggestion.href.startsWith("mailto:")) {
    return (
      <a
        href={suggestion.href}
        className="rounded-full border border-border bg-background-dark/70 px-md py-xs text-[0.69rem] font-medium uppercase tracking-[0.11em] text-foreground-secondary transition-colors hover:text-foreground"
      >
        {suggestion.label}
      </a>
    );
  }

  return (
    <Link
      href={suggestion.href}
      className="rounded-full border border-border bg-background-dark/70 px-md py-xs text-[0.69rem] font-medium uppercase tracking-[0.11em] text-foreground-secondary transition-colors hover:text-foreground"
    >
      {suggestion.label}
    </Link>
  );
}

export function SiteChatbot({ isOpen, onOpenChange }: SiteChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(
    () => !isLoading && input.trim().length > 0,
    [input, isLoading]
  );

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [isOpen, isLoading, messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen, onOpenChange]);

  const submitMessage = async (rawMessage?: string) => {
    const content = (rawMessage ?? input).trim();
    if (!content || isLoading) {
      return;
    }

    const historyForRequest = messages
      .slice(-6)
      .map((message) => ({ role: message.role, content: message.content }))
      .concat([{ role: "user" as const, content }]);

    setMessages((current) => [
      ...current,
      { id: createMessageId(), role: "user", content },
    ]);
    setInput("");
    setIsLoading(true);
    const localReply = getLocalReply(content);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          history: historyForRequest,
        }),
      });

      const payload = (await response.json()) as ChatbotApiResponse;
      const answer = payload.answer;

      if (response.ok && answer) {
        setMessages((current) => [
          ...current,
          {
            id: createMessageId(),
            role: "assistant",
            content: answer,
            suggestions: payload.suggestions,
          },
        ]);
        return;
      }

      const prefix =
        response.status === 429
          ? "You have hit the chat rate limit for a moment. "
          : "Live assistant was temporarily unavailable. ";

      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content: `${prefix}${localReply.answer}`,
          suggestions: localReply.suggestions,
        },
      ]);
    } catch (error) {
      console.error("Failed to send chatbot message:", error);
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content: `Connection issue detected. ${localReply.answer}`,
          suggestions: localReply.suggestions,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitMessage();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60]">
        <Button
          onClick={() => onOpenChange(!isOpen)}
          className={cn(
            "group rounded-full px-lg py-sm",
            isOpen
              ? "bg-background-card text-foreground border border-border hover:bg-background-card-hover"
              : "border border-accent/30"
          )}
          aria-label={isOpen ? "Close assistant" : "Open assistant"}
        >
          {isOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-6" />
          )}
          <span className="hidden sm:inline">
            {isOpen ? "Close Assistant" : "Ask Optiveon AI"}
          </span>
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-[60] w-[min(92vw,430px)] transition-all duration-300",
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-3 opacity-0 pointer-events-none"
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-background/95 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/20 to-background-card px-lg py-md">
            <div className="flex items-center gap-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-dark/80">
                <Bot className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-foreground">
                  Optiveon Assistant
                </p>
                <p className="text-xs text-foreground-muted">
                  Site and company knowledge
                </p>
              </div>
            </div>
            <button
              className="rounded-md p-1 text-foreground-muted transition-colors hover:text-foreground"
              onClick={() => onOpenChange(false)}
              aria-label="Close assistant panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            className="max-h-[360px] space-y-md overflow-y-auto px-lg py-md"
          >
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    isAssistant ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-md py-sm text-sm leading-relaxed whitespace-pre-line",
                      isAssistant
                        ? "border border-border bg-background-card text-foreground-secondary"
                        : "bg-primary text-foreground"
                    )}
                  >
                    {message.content}
                    {isAssistant &&
                      message.suggestions &&
                      message.suggestions.length > 0 && (
                        <div className="mt-sm flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion) => (
                            <SuggestionLink
                              key={`${suggestion.label}-${suggestion.href}`}
                              suggestion={suggestion}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-sm rounded-2xl border border-border bg-background-card px-md py-sm text-sm text-foreground-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border px-lg py-md">
            <div className="mb-sm flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  className="rounded-full border border-border px-md py-xs text-[0.68rem] font-medium uppercase tracking-[0.11em] text-foreground-muted transition-colors hover:text-foreground"
                  onClick={() => void submitMessage(prompt)}
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-sm">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-background-dark/70 px-md text-sm text-foreground outline-none transition-colors placeholder:text-foreground-muted focus:border-accent"
                placeholder="Ask about plans, features, billing, support..."
                maxLength={1000}
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 rounded-xl"
                disabled={!canSend}
                aria-label="Send message"
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
