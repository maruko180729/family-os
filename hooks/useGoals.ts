"use client";

import { useState, useCallback } from "react";
import type { Goal } from "@/lib/types";
import { getGoals, saveGoals } from "@/lib/storage";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(() => getGoals());

  const updateGoal = useCallback((updated: Goal) => {
    const next = goals.map(g => g.id === updated.id ? updated : g);
    saveGoals(next);
    setGoals(next);
  }, [goals]);

  return { goals, updateGoal };
}
