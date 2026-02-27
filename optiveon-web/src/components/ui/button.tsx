"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "motion-button relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-[0.9375rem] font-semibold tracking-[0.01em] transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:-100%_0,0_0] before:bg-no-repeat before:opacity-0 before:transition-[background-position,opacity] before:duration-700 hover:before:opacity-100 hover:before:bg-[position:200%_0,0_0] [&>*]:relative [&>*]:z-[1]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-accent text-background-dark shadow-md shadow-accent/20 hover:-translate-y-0.5 hover:shadow-accent-lg border border-accent/20 hover:border-accent/40",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-white/[0.04] hover:border-accent hover:text-accent shadow-sm",
        ghost:
          "bg-white/[0.02] text-foreground border border-transparent hover:bg-white/[0.06] hover:border-border",
        link: "text-accent underline-offset-4 hover:underline",
        destructive: "bg-error text-white hover:bg-error/90 shadow-md",
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-4 py-2 text-sm",
        lg: "px-9 py-4 text-base",
        icon: "h-10 w-10 p-0",
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
