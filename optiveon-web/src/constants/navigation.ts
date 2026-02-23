import { NavItem, NavSection } from "@/types";

export const mainNavItems: NavItem[] = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Products",
    href: "/products",
    children: [
      { title: "Options Trade", href: "/products/options", description: "AI-powered options trading bot" },
      { title: "Stocks", href: "/products/stocks", comingSoon: true, description: "Automated stock trading" },
      { title: "Polymarket BTC", href: "/products/polymarket", comingSoon: true, description: "Prediction market strategies" },
      { title: "Futes", href: "/products/futes", comingSoon: true, description: "Futures trading automation" },
      { title: "Forex", href: "/products/forex", comingSoon: true, description: "FX pair trading bot" },
    ],
  },
  {
    title: "Validation",
    href: "/#validation",
  },
  {
    title: "Payment",
    href: "https://buy.stripe.com/test_bJe8wQ7SfcME6V637r8N200",
    external: true,
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];

export const footerNavSections: NavSection[] = [
  {
    title: "Product",
    items: [
      { title: "Request Demo", href: "/#contact" },
      { title: "Features", href: "/#features" },
      { title: "Validation", href: "/#validation" },
      { title: "Customer Stories", href: "/#proof" },
      { title: "Solutions", href: "/#solutions" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "Technology", href: "/#technology" },
      { title: "Release Radar", href: "/#roadmap" },
      { title: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Risk Disclaimer", href: "/disclaimer" },
    ],
  },
];

export const dashboardNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Account",
    href: "/dashboard/account",
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
  },
  {
    title: "API Keys",
    href: "/dashboard/api-keys",
  },
];
