"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Key,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Account",
    href: "/dashboard/account",
    icon: User,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "API Keys",
    href: "/dashboard/api-keys",
    icon: Key,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full w-64 bg-background-card border-r border-border">
      {/* Logo */}
      <div className="p-lg border-b border-border">
        <Logo href="/" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-md overflow-y-auto">
        <ul className="space-y-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-md px-lg py-md rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-foreground-secondary hover:text-foreground hover:bg-background-elevated"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-lg pt-lg border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-md px-lg py-md rounded-lg text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-background-elevated transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Back to website
          </Link>
        </div>
      </nav>

      {/* Sign Out */}
      <div className="p-md border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-foreground-secondary hover:text-foreground"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="w-5 h-5 mr-md" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
