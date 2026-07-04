"use client";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  emoji?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ emoji = "📭", title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn(
      "bg-muted rounded-3xl p-8 flex flex-col items-center justify-center gap-2 text-center",
      className
    )}>
      <span className="text-3xl">{emoji}</span>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
