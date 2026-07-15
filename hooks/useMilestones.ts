"use client";

import { useState, useCallback } from "react";
import type { Milestone } from "@/lib/types";
import { getMilestones, saveMilestones } from "@/lib/storage";

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useMilestones() {
  // Initialize directly from storage — no useEffect needed
  const [milestones, setMilestones] = useState<Milestone[]>(() => getMilestones());

  const addMilestone = useCallback((date: string, title: string, emoji?: string) => {
    const entry: Milestone = { id: genId(), date, title, emoji: emoji || undefined };
    const updated = [...getMilestones(), entry];
    saveMilestones(updated);
    setMilestones(updated);
  }, []);

  const deleteMilestone = useCallback((id: string) => {
    const updated = getMilestones().filter(m => m.id !== id);
    saveMilestones(updated);
    setMilestones(updated);
  }, []);

  return { milestones, addMilestone, deleteMilestone };
}
