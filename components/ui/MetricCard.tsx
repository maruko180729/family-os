"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  sublabel?: string;
  className?: string;
}

export function MetricCard({
  label, value, delta, deltaPositive = true, sublabel, className,
}: MetricCardProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
      {delta && (
        <div className={cn("flex items-center gap-1 mt-1", deltaPositive ? "text-primary" : "text-destructive")}>
          {deltaPositive
            ? <ArrowUpRight size={13} />
            : <ArrowDownRight size={13} />}
          <span className="text-xs font-medium">{delta}</span>
        </div>
      )}
      {sublabel && <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>}
    </div>
  );
}
