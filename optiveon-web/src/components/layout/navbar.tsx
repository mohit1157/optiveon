"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavbarScroll } from "@/hooks/use-navbar-scroll";
import { mainNavItems } from "@/constants/navigation";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { SiteChatbot } from "./site-chatbot";
import { PaymentDropdown } from "./payment-dropdown";
import { Badge } from "@/components/ui/badge";
import type { NavItem } from "@/types";

/* ── Products Dropdown (Desktop) ── */
function ProductsDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="text-sm font-medium text-foreground-secondary transition-colors duration-fast hover:text-foreground relative group flex items-center gap-1"
        onClick={() => setOpen((v) => !v)}
      >
        {item.title}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-normal group-hover:w-full" />
      </button>

      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
      >
        <div className="w-72 rounded-xl border border-border bg-background-card/95 backdrop-blur-xl shadow-lg p-2">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.comingSoon ? "#" : child.href}
              onClick={(e) => {
                if (child.comingSoon) e.preventDefault();
                else setOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                child.comingSoon
                  ? "cursor-default opacity-50"
                  : "hover:bg-background-elevated"
              )}
            >
              {child.icon && (
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <child.icon className="w-4 h-4 text-accent" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {child.title}
                </p>
                {child.description && (
                  <p className="text-xs text-foreground-muted mt-0.5">
                    {child.description}
                  </p>
                )}
              </div>
              {child.comingSoon && (
                <Badge variant="muted" className="text-[0.6rem] ml-2 flex-shrink-0">
                  Soon
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Products Dropdown (Mobile) ── */
function ProductsDropdownMobile({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="text-base font-medium text-foreground-secondary hover:text-foreground transition-colors flex items-center gap-1 w-full"
        onClick={() => setOpen((v) => !v)}
      >
        {item.title}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="mt-2 ml-3 flex flex-col gap-1 border-l border-border pl-3">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.comingSoon ? "#" : child.href}
              onClick={(e) => {
                if (child.comingSoon) {
                  e.preventDefault();
                } else {
                  onNavigate();
                }
              }}
              className={cn(
                "flex items-center justify-between py-1.5 text-sm transition-colors",
                child.comingSoon
                  ? "cursor-default opacity-50 text-foreground-muted"
                  : "text-foreground-secondary hover:text-foreground"
              )}
            >
              {child.title}
              {child.comingSoon && (
                <Badge variant="muted" className="text-[0.55rem]">
                  Soon
                </Badge>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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

  // Filter out Payment from regular nav items — it gets its own dropdown
  const navLinks = mainNavItems.filter((item) => item.title !== "Payment");

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-slow",
          isScrolled
            ? "py-2 px-4"
            : "py-md",
          isHidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div
          className={cn(
            "transition-all duration-slow",
            isScrolled
              ? "container max-w-3xl mx-auto bg-background-card/80 backdrop-blur-2xl border border-border/60 rounded-full shadow-lg shadow-black/10 px-6 py-2"
              : "container"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo collapsed={isScrolled} />
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-xl">
              {navLinks.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <ProductsDropdown item={item} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-sm font-medium text-foreground-secondary transition-colors duration-fast hover:text-foreground relative group"
                    >
                      {item.title}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-normal group-hover:w-full" />
                    </Link>
                  </li>
                )
              )}
              <li>
                <PaymentDropdown />
              </li>
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
              {navLinks.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <ProductsDropdownMobile
                      item={item}
                      onNavigate={closeMobileMenu}
                    />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-base font-medium text-foreground-secondary hover:text-foreground transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              )}
              <li>
                <PaymentDropdown mobile />
              </li>
              <li className="pt-md">
                <Button variant="primary" className="w-full" asChild>
                  <Link href="/#contact" onClick={closeMobileMenu}>
                    Request Demo
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
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
