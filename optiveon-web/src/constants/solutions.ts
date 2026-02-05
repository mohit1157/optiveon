import { Box, Zap, Server } from "lucide-react";
import { Solution } from "@/types";

export const solutions: Solution[] = [
  {
    icon: Box,
    title: "Market Research Platform",
    description:
      "Comprehensive market analysis tools with historical data, trend identification, and pattern recognition for informed decision-making.",
    features: [
      "Historical data analysis",
      "Technical indicators library",
      "Pattern recognition AI",
      "Custom dashboards",
    ],
  },
  {
    icon: Zap,
    title: "Signal Generation Suite",
    description:
      "Advanced algorithmic signal generation with customizable parameters, backtesting capabilities, and real-time market scanning.",
    features: [
      "Real-time signal generation",
      "Multi-timeframe analysis",
      "Risk assessment tools",
      "Performance analytics",
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    icon: Server,
    title: "Enterprise API",
    description:
      "Robust API infrastructure for integrating our analysis engine into your existing systems and workflows.",
    features: [
      "RESTful & WebSocket APIs",
      "High-throughput data feeds",
      "Custom integrations",
      "Dedicated support",
    ],
  },
];
