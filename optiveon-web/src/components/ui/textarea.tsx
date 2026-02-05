"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border bg-background-dark px-5 py-4 text-base text-foreground transition-all duration-fast resize-none",
          "placeholder:text-foreground-muted",
          "focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/10",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-error focus:border-error focus:ring-error/10"
            : "border-border",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
