"use client";

import { GoalCard } from "@/components/ui/GoalCard";
import { mockGoals } from "@/lib/mock";
import { getLatestNetAsset } from "@/hooks/useAssets";

export default function GrowthPage() {
  const { netAsset } = getLatestNetAsset();
  const goals = mockGoals.map(g =>
    g.category === "asset" ? { ...g, currentValue: netAsset } : g
  );

  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">目标管理</p>
        <h1 className="text-2xl font-semibold text-foreground">未来</h1>
      </div>

      <div className="space-y-3">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}
