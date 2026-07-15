"use client";

import { useState, useCallback } from "react";
import type { Income, Expense, IncomeSource, ExpenseCategory } from "@/lib/types";
import { getIncome, saveIncome, getExpenses, saveExpenses } from "@/lib/storage";

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useManagement(month: string) {
  // Store all records; filter by month as derived state — no useEffect needed
  const [allIncome, setAllIncome] = useState<Income[]>(() => getIncome());
  const [allExpenses, setAllExpenses] = useState<Expense[]>(() => getExpenses());

  const income = allIncome.filter(i => i.month === month);
  const expenses = allExpenses.filter(e => e.month === month);

  const addIncome = useCallback(
    (source: IncomeSource, amount: number, date: string, note?: string) => {
      const entry: Income = { id: genId(), month, source, amount, date, note };
      const updated = [...getIncome(), entry];
      saveIncome(updated);
      setAllIncome(updated);
    },
    [month]
  );

  const addExpense = useCallback(
    (category: ExpenseCategory, amount: number, date: string, note?: string) => {
      const entry: Expense = { id: genId(), month, category, amount, date, note };
      const updated = [...getExpenses(), entry];
      saveExpenses(updated);
      setAllExpenses(updated);
    },
    [month]
  );

  const deleteIncome = useCallback((id: string) => {
    const updated = getIncome().filter(i => i.id !== id);
    saveIncome(updated);
    setAllIncome(updated);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    const updated = getExpenses().filter(e => e.id !== id);
    saveExpenses(updated);
    setAllExpenses(updated);
  }, []);

  const totalIncome = income.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;
  const expenseRatio = totalIncome > 0 ? Math.round((totalExpense / totalIncome) * 100) : 0;

  return {
    income, expenses,
    totalIncome, totalExpense, balance, expenseRatio,
    addIncome, addExpense, deleteIncome, deleteExpense,
  };
}
