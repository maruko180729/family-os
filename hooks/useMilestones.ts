/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Milestone } from "@/lib/types";
import { getMilestones, saveMilestones } from "@/lib/storage";

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    setMilestones(getMilestones());
  }, []);

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
