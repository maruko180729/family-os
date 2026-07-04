"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Timeline } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TimelineCardProps {
  entry: Timeline;
  className?: string;
}

export function TimelineCard({ entry, className }: TimelineCardProps) {
  const positive = entry.netChange >= 0;
  const changeLabel = `${positive ? "+" : ""}¥${Math.abs(entry.netChange).toLocaleString()}`;

  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {entry.month} 月度回顾
          </p>
          <p className="text-lg font-bold tracking-tight text-foreground mt-0.5">
            ¥{entry.netAssetEnd.toLocaleString()}
          </p>
        </div>
        <div className={cn("flex items-center gap-1 text-sm font-semibold", positive ? "text-primary" : "text-destructive")}>
          {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {changeLabel}
        </div>
      </div>

      {entry.events && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1">本月大事</p>
          <p className="text-sm text-foreground leading-relaxed">{entry.events}</p>
        </div>
      )}

      {entry.happyMoment && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1">最开心的事</p>
          <p className="text-sm text-foreground leading-relaxed">{entry.happyMoment}</p>
        </div>
      )}
    </div>
  );
}
