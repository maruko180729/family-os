"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import type { Goal } from "@/lib/types";
import { getGoalProgress } from "@/lib/mock";
import { cn } from "@/lib/utils";

const statusConfig = {
  active:    { label: "正常",    color: "text-primary",    bg: "bg-accent",     icon: CheckCircle2 },
  watching:  { label: "需要关注", color: "text-amber-600",  bg: "bg-amber-50",   icon: AlertCircle },
  completed: { label: "已完成",  color: "text-primary",    bg: "bg-accent",     icon: CheckCircle2 },
  paused:    { label: "暂停",    color: "text-muted-foreground", bg: "bg-muted", icon: AlertCircle },
};

interface GoalCardProps {
  goal: Goal;
  className?: string;
}

export function GoalCard({ goal, className }: GoalCardProps) {
  const conf = statusConfig[goal.status];
  const Icon = conf.icon;
  const progress = getGoalProgress(goal);

  const currentLabel =
    goal.unit === "JPY" ? `¥${goal.currentValue.toLocaleString()}` : `${goal.currentValue}${goal.unit}`;
  const targetLabel =
    goal.targetLabel ??
    (goal.unit === "JPY" ? `¥${goal.targetValue.toLocaleString()}` : `${goal.targetValue}${goal.unit}`);

  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{goal.emoji}</span>
          <div>
            <p className="font-medium text-foreground text-sm">{goal.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {goal.targetDate ?? goal.targetLabel ?? ""}
            </p>
          </div>
        </div>
        <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", conf.bg, conf.color)}>
          <Icon size={12} />
          <span>{conf.label}</span>
        </div>
      </div>

      <div className="bg-muted rounded-full h-1.5 mb-3">
        <div
          className="bg-primary h-1.5 rounded-full"
          style={{ width: `${progress}%`, transition: "width 0.8s ease" }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">当前：{currentLabel}</span>
        <span className="text-xs text-muted-foreground">目标：{targetLabel}</span>
      </div>
    </div>
  );
}
