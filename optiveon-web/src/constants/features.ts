import { BarChart3, Sun, Monitor, Shield, Wrench, Bell } from "lucide-react";
import { Feature } from "@/types";

export const features: Feature[] = [
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Monitor market movements with sub-millisecond data feeds and advanced visualization tools.",
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
    title: "Secure Infrastructure",
    description:
      "Enterprise-grade security with encrypted data transmission and secure API endpoints.",
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
