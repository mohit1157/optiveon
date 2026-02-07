"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroStats } from "@/constants/content";
import { LiveMetrics } from "./live-metrics";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center py-[140px] md:py-[100px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(27, 53, 89, 0.45) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 100% 50%, rgba(214, 179, 106, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 0% 80%, rgba(27, 53, 89, 0.2) 0%, transparent 50%),
              #0b111b
            `,
          }}
        />

        {/* Grid lines */}
        <div className="grid-lines absolute inset-0 animate-grid-pulse" />

        {/* Floating orbs */}
        <div className="absolute w-[900px] h-[900px] rounded-full bg-gradient-to-br from-primary to-primary-dark -top-[400px] -right-[300px] opacity-15 blur-[120px] animate-orb-float-1" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent to-accent-dark -bottom-[200px] -left-[150px] opacity-[0.08] blur-[120px] animate-orb-float-2" />
      </div>

      <LiveMetrics className="hidden lg:block" />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-3xl xl:gap-4xl items-center">
          {/* Content */}
          <div className="lg:text-left text-center animate-fade-in-up lg:pr-xl">
            <Badge variant="outline" className="mb-xl inline-flex gap-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Advanced Trading Technology
            </Badge>

            <h1 className="text-hero-title mb-xl text-balance">
              Intelligent Market Research &{" "}
              <span className="gradient-text">Algorithmic Trading</span>
            </h1>

            <p className="text-xl text-foreground-secondary mb-2xl max-w-[640px] leading-relaxed lg:mx-0 mx-auto text-balance">
              Leverage cutting-edge algorithms and real-time market analysis to
              make informed trading decisions. Our proprietary technology powers
              sophisticated research tools for futures, options, and forex
              markets.
            </p>

            <div className="flex gap-lg mb-4xl lg:justify-start justify-center flex-col sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/#pricing">
                  View Pricing
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/#solutions">Explore Solutions</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-4xl pt-2xl border-t border-border lg:justify-start justify-center flex-col sm:flex-row items-center sm:items-start">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-xs text-center sm:text-left"
                >
                  <span className="text-3xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm text-foreground-muted font-[450] tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Visual */}
          <div className="flex justify-center lg:justify-end lg:order-none order-first animate-fade-in-up-delay">
            <div className="w-full max-w-[520px] bg-background-card border border-border rounded-xl overflow-hidden shadow-lg shadow-glow">
              {/* Terminal Header */}
              <div className="flex items-center gap-md px-lg py-md bg-black/40 border-b border-border">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[0.8125rem] text-foreground-muted">
                  market_analysis.py
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-xl">
                <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
                  <code>
                    <span className="code-keyword">from</span> optiveon{" "}
                    <span className="code-keyword">import</span> MarketAnalyzer
                    {"\n\n"}
                    <span className="code-comment">
                      # Initialize real-time analyzer
                    </span>
                    {"\n"}analyzer = MarketAnalyzer({"\n"}
                    {"    "}markets=[
                    <span className="code-string">
                      &quot;futures&quot;
                    </span>,{" "}
                    <span className="code-string">&quot;options&quot;</span>,{" "}
                    <span className="code-string">&quot;forex&quot;</span>],
                    {"\n"}
                    {"    "}strategy=
                    <span className="code-string">
                      &quot;momentum_alpha&quot;
                    </span>
                    {"\n"}){"\n\n"}
                    <span className="code-comment">
                      # Generate trading signals
                    </span>
                    {"\n"}signals = analyzer.get_signals({"\n"}
                    {"    "}timeframe=
                    <span className="code-string">&quot;1h&quot;</span>,{"\n"}
                    {"    "}confidence_threshold=
                    <span className="code-number">0.85</span>
                    {"\n"}){"\n\n"}
                    <span className="code-keyword">for</span> signal{" "}
                    <span className="code-keyword">in</span> signals:{"\n"}
                    {"    "}
                    <span className="code-function">print</span>(f
                    <span className="code-string">
                      &quot;📊 {"{signal.asset}"}: {"{signal.action}"}&quot;
                    </span>
                    ){"\n"}
                    {"    "}
                    <span className="code-function">print</span>(f
                    <span className="code-string">
                      &quot; Confidence: {"{signal.score:.2%}"}&quot;
                    </span>
                    )
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
