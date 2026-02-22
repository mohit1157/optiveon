"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Zap, Building2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const paymentPlans = [
    {
        name: "Starter",
        description: "For individual researchers",
        price: "$299/mo",
        icon: Zap,
        href: process.env.NEXT_PUBLIC_STRIPE_STARTER_LINK || "#",
        color: "from-blue-500/20 to-blue-600/5",
        iconColor: "text-blue-400",
    },
    {
        name: "Professional",
        description: "For growing teams",
        price: "$899/mo",
        icon: Building2,
        href: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_LINK || "#",
        color: "from-amber-500/20 to-amber-600/5",
        iconColor: "text-amber-400",
    },
    {
        name: "Enterprise",
        description: "For institutional firms",
        price: "Custom",
        icon: Rocket,
        href: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_LINK || "#",
        color: "from-emerald-500/20 to-emerald-600/5",
        iconColor: "text-emerald-400",
    },
];

export function PaymentDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm font-medium text-foreground-secondary transition-colors duration-fast hover:text-foreground relative group"
            >
                Payment
                <ChevronDown
                    className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-normal group-hover:w-full" />
            </button>

            <div
                className={cn(
                    "absolute top-full right-0 mt-3 w-72 rounded-xl border border-border bg-background-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 transition-all duration-200 origin-top-right",
                    isOpen
                        ? "opacity-100 scale-100 visible translate-y-0"
                        : "opacity-0 scale-95 invisible -translate-y-2"
                )}
            >
                <div className="p-2">
                    <p className="px-3 pt-2 pb-3 text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                        Choose a Plan
                    </p>
                    {paymentPlans.map((plan) => (
                        <a
                            key={plan.name}
                            href={plan.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                                "hover:bg-gradient-to-r",
                                plan.color,
                                "group/item"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-lg bg-background/50 border border-border/50 transition-colors",
                                    "group-hover/item:border-accent/30"
                                )}
                            >
                                <plan.icon className={cn("w-5 h-5", plan.iconColor)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-foreground">
                                        {plan.name}
                                    </span>
                                    <span className="text-xs font-medium text-accent">
                                        {plan.price}
                                    </span>
                                </div>
                                <p className="text-xs text-foreground-secondary mt-0.5">
                                    {plan.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
