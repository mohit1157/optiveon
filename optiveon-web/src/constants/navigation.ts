import { NavItem, NavSection } from "@/types";

export const mainNavItems: NavItem[] = [
  {
    title: "Pricing",
    href: "/#pricing",
  },
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Validation",
    href: "/#validation",
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
      { title: "Pricing", href: "/#pricing" },
      { title: "Features", href: "/#features" },
      { title: "Validation", href: "/#validation" },
      { title: "ROI Planner", href: "/#roi" },
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
