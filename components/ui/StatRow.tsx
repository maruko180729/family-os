"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatRowItem {
  label: string;
  value: string;
  positive?: boolean;
}

interface StatRowProps {
  items: StatRowItem[];
  className?: string;
}

export function StatRow({ items, className }: StatRowProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map(item => (
        <div key={item.label} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.positive !== undefined && (
              item.positive
                ? <TrendingUp size={14} className="text-primary" />
                : <TrendingDown size={14} className="text-destructive" />
            )}
            <span className="text-sm text-foreground">{item.label}</span>
          </div>
          <span className={cn(
            "text-sm font-semibold",
            item.positive === true && "text-primary",
            item.positive === false && "text-destructive",
            item.positive === undefined && "text-foreground",
          )}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
