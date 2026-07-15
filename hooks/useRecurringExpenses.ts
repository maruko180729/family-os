"use client";

import { useState, useCallback } from "react";
import type { RecurringExpense } from "@/lib/types";
import { getRecurringExpenses, saveRecurringExpenses } from "@/lib/storage";

function genId() {
  return `re-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export function useRecurringExpenses() {
  const [items, setItems] = useState<RecurringExpense[]>(() => getRecurringExpenses());

  const addItem = useCallback((data: Omit<RecurringExpense, "id">) => {
    const entry: RecurringExpense = { ...data, id: genId() };
    const next = [...getRecurringExpenses(), entry];
    saveRecurringExpenses(next);
    setItems(next);
  }, []);

  const updateItem = useCallback((updated: RecurringExpense) => {
    const next = items.map(i => i.id === updated.id ? updated : i);
    saveRecurringExpenses(next);
    setItems(next);
  }, [items]);

  const toggleItem = useCallback((id: string) => {
    const next = items.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i);
    saveRecurringExpenses(next);
    setItems(next);
  }, [items]);

  const deleteItem = useCallback((id: string) => {
    const next = items.filter(i => i.id !== id);
    saveRecurringExpenses(next);
    setItems(next);
  }, [items]);

  return { items, addItem, updateItem, toggleItem, deleteItem };
}
