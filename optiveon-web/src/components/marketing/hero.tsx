"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroStats } from "@/constants/content";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center py-[132px] md:py-[96px] overflow-hidden">
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
        <div className="noise-overlay absolute inset-0" />

        {/* Floating orbs */}
        <div className="absolute w-[900px] h-[900px] rounded-full bg-gradient-to-br from-primary to-primary-dark -top-[400px] -right-[300px] opacity-15 blur-[120px] animate-orb-float-1" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent to-accent-dark -bottom-[200px] -left-[150px] opacity-[0.08] blur-[120px] animate-orb-float-2" />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-3xl xl:gap-4xl items-center">
          {/* Content */}
          <div className="lg:text-left text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-xl inline-flex gap-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Client Software + Proprietary Validation
            </Badge>

            <h1 className="text-hero-title mb-lg text-balance">
              Institutional-Grade Strategy Validation and{" "}
              <span className="gradient-text">Execution Infrastructure</span>
            </h1>

            <p className="text-[1.1rem] text-foreground-secondary mb-xl max-w-[680px] leading-relaxed lg:mx-0 mx-auto text-balance">
              Optiveon builds institutional-grade research, validation, and
              deployment software for trading teams, while running proprietary
              trading workflows to continuously stress test and refine
              production strategies.
            </p>

            <div className="mb-2xl flex flex-wrap gap-sm lg:justify-start justify-center">
              <span className="rounded-full border border-border bg-background-card/70 px-md py-xs text-[0.68rem] uppercase tracking-[0.14em] text-foreground-muted">
                Multi-Asset
              </span>
              <span className="rounded-full border border-border bg-background-card/70 px-md py-xs text-[0.68rem] uppercase tracking-[0.14em] text-foreground-muted">
                Research to Deployment
              </span>
              <span className="rounded-full border border-border bg-background-card/70 px-md py-xs text-[0.68rem] uppercase tracking-[0.14em] text-foreground-muted">
                Institutional Risk Controls
              </span>
            </div>

            <div className="flex gap-lg mb-4xl lg:justify-start justify-center flex-col sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/#contact">
                  Request Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/#validation">See Validation Process</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-3xl pt-2xl border-t border-border lg:justify-start justify-center flex-col sm:flex-row items-center sm:items-start">
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
            <div className="w-full max-w-[560px]">
              <div className="bg-background-card border border-border rounded-xl overflow-hidden shadow-lg shadow-glow">
                {/* Terminal Header */}
                <div className="flex items-center gap-md px-lg py-md bg-black/40 border-b border-border">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="font-mono text-[0.8125rem] text-foreground-muted">
                    strategy_pipeline.py
                  </span>
                </div>

                {/* Terminal Content */}
                <div className="p-xl">
                  <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
                    <code>
                      <span className="code-keyword">from</span> optiveon{" "}
                      <span className="code-keyword">import</span>{" "}
                      StrategyPipeline{"\n\n"}
                      <span className="code-comment">
                        # Build a production-grade research to execution
                        pipeline
                      </span>
                      {"\n"}
                      pipeline = StrategyPipeline({"\n"}
                      {"    "}assets=[{"\n"}
                      {"      "}
                      <span className="code-string">
                        &quot;equities&quot;
                      </span>,{" "}
                      <span className="code-string">&quot;futures&quot;</span>,{" "}
                      <span className="code-string">&quot;fx&quot;</span>,{" "}
                      <span className="code-string">&quot;crypto&quot;</span>
                      {"\n"}
                      {"    "}],
                      {"\n"}
                      {"    "}regime_model=
                      <span className="code-string">
                        &quot;adaptive_volatility&quot;
                      </span>
                      ,{"\n"}
                      {"    "}risk_profile=
                      <span className="code-string">
                        &quot;institutional&quot;
                      </span>
                      {"\n"}){"\n\n"}
                      <span className="code-comment">
                        # Validate before deployment
                      </span>
                      {"\n"}
                      report = pipeline.validate({"\n"}
                      {"    "}in_sample=
                      <span className="code-string">&quot;2018-2022&quot;</span>
                      ,{"\n"}
                      {"    "}out_of_sample=
                      <span className="code-string">&quot;2023-2025&quot;</span>
                      ,{"\n"}
                      {"    "}max_drawdown=
                      <span className="code-number">0.08</span>
                      {"\n"}){"\n\n"}
                      <span className="code-keyword">if</span> report.status ==
                      <span className="code-string">&quot;approved&quot;</span>:
                      {"\n"}
                      {"    "}deployment = pipeline.deploy(mode=
                      <span className="code-string">
                        &quot;paper_or_live&quot;
                      </span>
                      )
                    </code>
                  </pre>
                </div>
              </div>

              <div className="mt-md grid gap-md sm:grid-cols-2">
                <div className="motion-card rounded-xl border border-border bg-background-card/80 p-lg">
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-foreground-muted">
                    Validation Matrix
                  </p>
                  <p className="mt-sm text-sm text-foreground-secondary">
                    Out-of-sample health score
                  </p>
                  <div className="mt-md h-2 rounded-full bg-background-elevated">
                    <div className="h-2 w-[86%] rounded-full bg-gradient-accent transition-all duration-slow" />
                  </div>
                  <p className="mt-sm text-xs text-success">86% Approved</p>
                </div>

                <div className="motion-card rounded-xl border border-border bg-background-card/80 p-lg">
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-foreground-muted">
                    Deployment Queue
                  </p>
                  <div className="mt-sm space-y-sm text-xs text-foreground-secondary">
                    <p className="flex items-center justify-between">
                      <span>Paper Trading</span>
                      <span className="text-success">Active</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Risk Review</span>
                      <span className="text-warning">In Progress</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Production Gate</span>
                      <span className="text-foreground-muted">Pending</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
