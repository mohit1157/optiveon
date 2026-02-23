"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

interface ComingSoonPageProps {
    title: string;
    description: string;
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
    return (
        <section className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-background" />
            <div className="container text-center max-w-xl">
                <Badge variant="outline" className="mb-lg">
                    <Clock className="w-3 h-3 mr-1" />
                    Coming Soon
                </Badge>
                <h1 className="text-section-title mb-lg">{title}</h1>
                <p className="text-lg text-foreground-secondary leading-relaxed mb-xl">
                    {description}
                </p>
                <Button variant="outline" asChild>
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        </section>
    );
}
