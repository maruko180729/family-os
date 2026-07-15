"use client";

import { useState } from "react";
import { GoalCard } from "@/components/ui/GoalCard";
import { getLatestNetAsset } from "@/hooks/useAssets";
import { useGoals } from "@/hooks/useGoals";
import { toast } from "@/hooks/useToast";
import EditGoalSheet from "@/components/EditGoalSheet";
import type { Goal } from "@/lib/types";

export default function GrowthPage() {
  const { netAsset } = getLatestNetAsset();
  const { goals, updateGoal } = useGoals();
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const displayGoals = goals.map(g =>
    g.category === "asset" ? { ...g, currentValue: netAsset } : g
  );

  function handleSave(updated: Goal) {
    updateGoal(updated);
    toast("目标已更新");
  }

  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">目标管理</p>
        <h1 className="text-2xl font-semibold text-foreground">未来</h1>
      </div>

      <div className="space-y-3">
        {displayGoals.map(goal => (
          <GoalCard key={goal.id} goal={goal} onEdit={setEditingGoal} />
        ))}
      </div>

      {editingGoal && (
        <EditGoalSheet
          key={editingGoal.id}
          goal={editingGoal}
          open
          onClose={() => setEditingGoal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
