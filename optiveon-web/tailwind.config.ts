import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Primary Colors - Deep Navy & Gold
        primary: {
          DEFAULT: "#1e3a5f",
          light: "#2d5a8a",
          dark: "#0f2440",
        },
        accent: {
          DEFAULT: "#c9a227",
          light: "#d4b54a",
          dark: "#a8861f",
        },
        // Semantic Colors
        success: "#059669",
        warning: "#d97706",
        error: "#dc2626",
        // Backgrounds - Sophisticated Dark Theme
        background: {
          DEFAULT: "#0c1221",
          dark: "#080d16",
          card: "#111827",
          "card-hover": "#1a2234",
          elevated: "#1f2937",
        },
        // Text Colors
        foreground: {
          DEFAULT: "#f8fafc",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
        // Border Colors
        border: {
          DEFAULT: "rgba(148, 163, 184, 0.1)",
          hover: "rgba(148, 163, 184, 0.2)",
          accent: "rgba(201, 162, 39, 0.3)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      fontSize: {
        "hero-title": [
          "clamp(2.75rem, 6vw, 4.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "section-title": [
          "clamp(2rem, 4vw, 3.25rem)",
          { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem",
        "5xl": "8rem",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.2)",
        md: "0 4px 12px rgba(0, 0, 0, 0.15)",
        lg: "0 12px 40px rgba(0, 0, 0, 0.25)",
        glow: "0 0 60px rgba(30, 58, 95, 0.3)",
        accent: "0 0 40px rgba(201, 162, 39, 0.15)",
        "accent-lg": "0 0 50px rgba(201, 162, 39, 0.25)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #1e3a5f 0%, #2d5a8a 100%)",
        "gradient-accent": "linear-gradient(135deg, #c9a227 0%, #d4b54a 100%)",
        "gradient-premium":
          "linear-gradient(135deg, #1e3a5f 0%, #0f2440 50%, #1e3a5f 100%)",
        "gradient-text":
          "linear-gradient(135deg, #c9a227 0%, #f4d875 50%, #c9a227 100%)",
        "gradient-dark": "linear-gradient(180deg, #0c1221 0%, #111827 100%)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in-up-delay":
          "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s backwards",
        pulse: "pulse 2s ease-in-out infinite",
        "grid-pulse": "gridPulse 8s ease-in-out infinite",
        "float-particles": "floatParticles 20s linear infinite",
        "orb-float-1": "orbFloat1 15s ease-in-out infinite",
        "orb-float-2": "orbFloat2 12s ease-in-out infinite",
        spin: "spin 0.8s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.3)" },
        },
        gridPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        floatParticles: {
          "0%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-10px) translateX(5px)" },
          "50%": { transform: "translateY(-5px) translateX(-5px)" },
          "75%": { transform: "translateY(-15px) translateX(3px)" },
          "100%": { transform: "translateY(0) translateX(0)" },
        },
        orbFloat1: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-30px, 20px)" },
        },
        orbFloat2: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(20px, -15px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
