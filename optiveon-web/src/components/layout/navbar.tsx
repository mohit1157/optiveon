"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavbarScroll } from "@/hooks/use-navbar-scroll";
import { mainNavItems } from "@/constants/navigation";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { SiteChatbot } from "./site-chatbot";

export function Navbar() {
  // Fix hydration mismatch by only rendering after mount
  const [mounted, setMounted] = useState(false);
  const { isScrolled, isHidden } = useNavbarScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a simplified server-safe version
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-md transition-all duration-slow",
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent",
          isHidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo collapsed={isScrolled} />
            <span className="hidden md:inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/20">
              Preview Environment
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-xl">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground-secondary transition-colors duration-fast hover:text-foreground relative group"
                >
                  {item.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-normal group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-md">
            <Button variant="primary" asChild>
              <Link href="/#contact">Request Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background-card border-b border-border transition-all duration-normal",
            isMobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          )}
        >
          <ul className="flex flex-col p-xl gap-lg">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-base font-medium text-foreground-secondary hover:text-foreground transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li className="pt-md">
              <Button variant="primary" className="w-full" asChild>
                <Link href="/#contact" onClick={closeMobileMenu}>
                  Request Demo
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Floating logo badge when navbar is hidden */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none",
          isHidden ? "opacity-100" : "opacity-0 -translate-y-2"
        )}
      >
        <div className="container py-md">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/90 shadow-lg backdrop-blur-md"
          >
            <Logo showText={false} className="scale-[0.85]" />
          </Link>
        </div>
      </div>

      <SiteChatbot isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}
