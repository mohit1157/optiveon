import { NavItem, NavSection } from "@/types";
import { Sliders, BarChart3, Bitcoin, Flame, Globe } from "lucide-react";

export const mainNavItems: NavItem[] = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Products",
    href: "/products",
    children: [
      { title: "Options Trade", href: "/products/options", description: "AI-powered options trading bot", icon: Sliders, iconColor: "text-emerald-400", color: "from-emerald-500/20 to-emerald-600/5" },
      { title: "Stocks", href: "/products/stocks", comingSoon: true, description: "Automated stock trading", icon: BarChart3, iconColor: "text-blue-400", color: "from-blue-500/20 to-blue-600/5" },
      { title: "Polymarket BTC", href: "/products/polymarket", comingSoon: true, description: "Prediction market strategies", icon: Bitcoin, iconColor: "text-amber-400", color: "from-amber-500/20 to-amber-600/5" },
      { title: "Futes", href: "/products/futes", comingSoon: true, description: "Futures trading automation", icon: Flame, iconColor: "text-orange-400", color: "from-orange-500/20 to-orange-600/5" },
      { title: "Forex", href: "/products/forex", comingSoon: true, description: "FX pair trading bot", icon: Globe, iconColor: "text-violet-400", color: "from-violet-500/20 to-violet-600/5" },
    ],
  },
  {
    title: "Validation",
    href: "/#validation",
  },
  {
    title: "Insights",
    href: "/insights",
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
      { title: "Insights", href: "/insights" },
      { title: "Technology", href: "/#technology" },
      { title: "Release Radar", href: "/#roadmap" },
      { title: "Careers", href: "/careers" },
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
