"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-accent text-background-dark text-[0.6875rem] font-semibold uppercase tracking-[0.2em] px-lg py-xs",
        outline:
          "border border-accent/30 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest px-lg py-xs",
        success:
          "bg-success/10 text-success border border-success/20 text-xs px-3 py-1",
        warning:
          "bg-warning/10 text-warning border border-warning/20 text-xs px-3 py-1",
        error:
          "bg-error/10 text-error border border-error/20 text-xs px-3 py-1",
        muted: "bg-background-elevated text-foreground-muted text-xs px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
