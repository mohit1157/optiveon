import { Activity, Layers, Github } from "lucide-react";
import { TechFeature } from "@/types";

export const technologyFeatures: TechFeature[] = [
  {
    icon: Activity,
    title: "Ultra-Low Latency",
    description:
      "Sub-10ms response times with optimized data pipelines and edge computing.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description:
      "Cloud-native infrastructure that scales seamlessly with demand.",
  },
  {
    icon: Github,
    title: "Modern Tech Stack",
    description:
      "Python, Rust, and Go powering our high-performance analysis engine.",
  },
];

export const technologyDiagramNodes = [
  { id: "center", label: "Analysis Engine", position: "center" },
  { id: "node-1", label: "Market Data", position: "top" },
  { id: "node-2", label: "ML Models", position: "right" },
  { id: "node-3", label: "Signal Gen", position: "bottom" },
  { id: "node-4", label: "Risk Mgmt", position: "left" },
] as const;
