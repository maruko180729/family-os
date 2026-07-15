"use client";

import { useState, useCallback } from "react";
import type { Reminder } from "@/lib/types";
import { getReminders, saveReminders } from "@/lib/storage";

function genId() {
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(() => getReminders());

  const addReminder = useCallback((data: Omit<Reminder, "id" | "status">) => {
    const entry: Reminder = { ...data, id: genId(), status: "pending" };
    const next = [...getReminders(), entry];
    saveReminders(next);
    setReminders(next);
  }, []);

  const updateReminder = useCallback((updated: Reminder) => {
    const next = reminders.map(r => r.id === updated.id ? updated : r);
    saveReminders(next);
    setReminders(next);
  }, [reminders]);

  const toggleReminder = useCallback((id: string) => {
    const next = reminders.map(r =>
      r.id === id ? { ...r, status: r.status === "pending" ? "done" as const : "pending" as const } : r
    );
    saveReminders(next);
    setReminders(next);
  }, [reminders]);

  const deleteReminder = useCallback((id: string) => {
    const next = reminders.filter(r => r.id !== id);
    saveReminders(next);
    setReminders(next);
  }, [reminders]);

  return { reminders, addReminder, updateReminder, toggleReminder, deleteReminder };
}
