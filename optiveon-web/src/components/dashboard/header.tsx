"use client";

import { useSession } from "next-auth/react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-border bg-background-card px-lg flex items-center justify-between">
      {/* Left side - Mobile menu button */}
      <div className="flex items-center gap-md">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold hidden sm:block">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-md">
        {/* Notifications (placeholder) */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>

        {/* User info */}
        <div className="flex items-center gap-md">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{session?.user?.name}</p>
            <p className="text-xs text-foreground-muted">
              {session?.user?.email}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-foreground">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
