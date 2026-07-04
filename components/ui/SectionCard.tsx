"use client";

import { cn } from "@/lib/utils";

interface SectionCardProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ label, children, className }: SectionCardProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      {label && (
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
