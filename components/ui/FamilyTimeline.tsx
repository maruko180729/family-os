"use client";

import { Plus } from "lucide-react";
import type { Milestone } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FamilyTimelineProps {
  milestones: Milestone[];
  onAddClick?: () => void;
  className?: string;
}

export function FamilyTimeline({ milestones, onAddClick, className }: FamilyTimelineProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          家庭时间线
        </p>
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="flex items-center gap-1 text-xs font-medium text-primary active:scale-95 transition-transform"
          >
            <Plus size={13} />
            添加
          </button>
        )}
      </div>
      <div className="space-y-4">
        {milestones.map((m, i) => (
          <div key={m.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">
                {m.emoji ?? "•"}
              </div>
              {i < milestones.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
            </div>
            <div className="pb-4">
              <p className="text-xs text-muted-foreground">{m.date}</p>
              <p className="text-sm font-medium text-foreground mt-0.5">{m.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
