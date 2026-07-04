"use client";

import { cn } from "@/lib/utils";

interface HeroCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroCard({ children, className }: HeroCardProps) {
  return (
    <div className={cn("bg-primary rounded-3xl p-5 text-white", className)}>
      {children}
    </div>
  );
}
