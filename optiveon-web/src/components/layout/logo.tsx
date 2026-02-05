"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  href?: string;
  collapsed?: boolean;
}

export function Logo({
  className,
  showText = true,
  href = "/",
  collapsed = false,
}: LogoProps) {
  const content = (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/images/logo.svg"
        alt="Optiveon Logo"
        width={46}
        height={46}
        className="drop-shadow-[0_0_8px_rgba(214,179,106,0.25)] transition-all duration-normal hover:drop-shadow-[0_0_14px_rgba(214,179,106,0.4)]"
        priority
      />
      {showText && (
        <span
          className={cn(
            "inline-block overflow-hidden whitespace-nowrap text-2xl font-semibold font-heading uppercase tracking-[0.18em] bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent",
            "transition-all duration-300",
            collapsed
              ? "max-w-0 opacity-0 -translate-x-2 ml-0"
              : "max-w-[220px] opacity-100 translate-x-0 ml-md"
          )}
        >
          Optiveon
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus-visible:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
