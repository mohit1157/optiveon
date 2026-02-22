import { BarChart3, Sun, Monitor, Shield, Wrench, Bell } from "lucide-react";
import { Feature } from "@/types";

export const features: Feature[] = [
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Monitor market movements with institutional-grade data feeds and advanced visualization tools.",
  },
  {
    icon: Sun,
    title: "AI-Powered Insights",
    description:
      "Machine learning models analyze patterns and generate actionable market insights.",
  },
  {
    icon: Monitor,
    title: "Multi-Market Coverage",
    description:
      "Comprehensive analysis across futures, options, and forex markets in one platform.",
  },
  {
    icon: Shield,
    title: "System Architecture",
    description:
      "End-to-end resilience from sub-millisecond market data feeds through our proprietary execution engines to your secure Prisma/Next.js data layer.",
  },
  {
    icon: Wrench,
    title: "Custom Algorithms",
    description:
      "Build and backtest custom trading strategies with our flexible algorithm framework.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Customizable notifications for price movements, pattern detection, and signal generation.",
  },
];
