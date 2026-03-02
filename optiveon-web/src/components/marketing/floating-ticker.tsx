"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MOCK_MESSAGES = [
    { text: "TSLA 3m Options Bot deployed in 1.2s", icon: "🟢", glow: "emerald" },
    { text: "150k historical candles backtested", icon: "⚡", glow: "accent" },
    { text: "Adaptive Volatility regime model active", icon: "🧠", glow: "blue" },
    { text: "BTC Short squeeze detected", icon: "📉", glow: "emerald" },
    { text: "New institutional risk limits enabled", icon: "🛡️", glow: "warning" },
];

export function FloatingTicker() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initial delay before first message
        const initialTimer = setTimeout(() => setIsVisible(true), 1500);

        // Rotation interval
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % MOCK_MESSAGES.length);
                setIsVisible(true);
            }, 500); // 500ms fade out before swapping
        }, 5000); // 5 seconds per message

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    const message = MOCK_MESSAGES[currentIndex];

    if (!message) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div
                className={cn(
                    "glass-panel px-4 py-2.5 rounded-full flex items-center gap-3 text-xs md:text-sm shadow-2xl transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0 translate-scale-100" : "opacity-0 translate-y-4 scale-95",
                    message.glow === "emerald" && "border-emerald-500/20 shadow-[0_4px_20px_rgba(16,185,129,0.15)]",
                    message.glow === "accent" && "border-accent/20 shadow-[0_4px_20px_rgba(214,179,106,0.15)]",
                    message.glow === "blue" && "border-blue-500/20 shadow-[0_4px_20px_rgba(59,130,246,0.15)]",
                    message.glow === "warning" && "border-warning/20 shadow-[0_4px_20px_rgba(245,158,11,0.15)]"
                )}
            >
                <span className="text-base">{message.icon}</span>
                <span className="text-foreground-secondary font-mono tracking-tight text-balance whitespace-nowrap">
                    {message.text}
                </span>
            </div>
        </div>
    );
}
