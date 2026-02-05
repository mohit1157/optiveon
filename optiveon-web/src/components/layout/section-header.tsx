"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  tag: string;
  title: string;
  highlightedText?: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  tag,
  title,
  highlightedText,
  subtitle,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-[760px] mb-4xl",
        centered && "text-center mx-auto",
        className
      )}
    >
      <Badge variant="outline" className="mb-lg">
        {tag}
      </Badge>
      <h2 className="text-section-title mb-lg">
        {title}{" "}
        {highlightedText && (
          <span className="gradient-text">{highlightedText}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-lg text-foreground-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
