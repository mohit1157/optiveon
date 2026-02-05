"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border bg-background-dark px-5 py-4 text-base text-foreground transition-all duration-fast",
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
Input.displayName = "Input";

export { Input };
