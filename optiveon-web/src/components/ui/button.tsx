"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[0.9375rem] font-medium tracking-[0.01em] transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-accent text-background-dark shadow-md shadow-accent/15 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25",
        outline:
          "border border-border-hover bg-transparent text-foreground hover:bg-white/[0.03] hover:border-accent hover:text-accent",
        ghost:
          "bg-white/[0.03] text-foreground border border-transparent hover:bg-white/[0.06] hover:border-border",
        link: "text-accent underline-offset-4 hover:underline",
        destructive: "bg-error text-white hover:bg-error/90 shadow-md",
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-4 py-2 text-sm",
        lg: "px-9 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <span className="spinner" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
