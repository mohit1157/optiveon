"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { footerNavSections } from "@/constants/navigation";
import { companyInfo, riskDisclaimer } from "@/constants/content";

export function Footer() {
  return (
    <footer className="bg-background-card border-t border-border py-4xl">
      <div className="container">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-4xl pb-2xl border-b border-border">
          {/* Brand */}
          <div className="max-w-[320px] md:text-left text-center md:mx-0 mx-auto">
            <Logo className="mb-lg md:justify-start justify-center" />
            <p className="text-[0.9375rem] text-foreground-secondary leading-relaxed">
              Advanced algorithmic trading research and market analysis
              technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-4xl justify-center md:justify-start">
            {footerNavSections.map((section) => (
              <div key={section.title} className="text-center md:text-left">
                <h4 className="text-[0.9375rem] font-semibold tracking-wide text-foreground mb-lg">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-md">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.9375rem] text-foreground-secondary hover:text-accent transition-colors duration-fast"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-2xl">
          {/* Risk Disclaimer */}
          <div className="bg-background-dark/50 border border-border/50 rounded-lg p-md mb-xl">
            <p className="text-[0.7rem] text-foreground-muted/70 leading-relaxed text-balance">
              <strong className="text-foreground-muted">
                Risk Disclaimer:
              </strong>{" "}
              {riskDisclaimer}
            </p>
          </div>

          {/* Copyright & Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-md text-center md:text-left">
            <div className="flex items-center gap-md">
              <p className="text-sm text-foreground-muted">
                {companyInfo.copyright}
              </p>
            </div>

            <div className="flex items-center gap-lg">
              <a href="https://www.linkedin.com/company/optiveon/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-foreground-muted hover:text-accent transition-colors block">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <p className="text-sm text-foreground-muted">
                {companyInfo.address.full}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
