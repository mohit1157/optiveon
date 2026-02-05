"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  href?: string;
}

export function Logo({ className, showText = true, href = "/" }: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-md", className)}>
      <Image
        src="/images/logo.svg"
        alt="Optiveon Logo"
        width={46}
        height={46}
        className="drop-shadow-[0_0_8px_rgba(201,162,39,0.3)] transition-all duration-normal hover:drop-shadow-[0_0_12px_rgba(201,162,39,0.5)]"
        priority
      />
      {showText && (
        <span className="text-2xl font-bold uppercase tracking-wider bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
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
