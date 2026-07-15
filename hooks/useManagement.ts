/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Income, Expense, IncomeSource, ExpenseCategory } from "@/lib/types";
import { getIncome, saveIncome, getExpenses, saveExpenses } from "@/lib/storage";

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useManagement(month: string) {
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load from storage on mount or month change
  useEffect(() => {
    const allIncome = getIncome();
    const allExpenses = getExpenses();
    setIncome(allIncome.filter(i => i.month === month));
    setExpenses(allExpenses.filter(e => e.month === month));
  }, [month]);

  const addIncome = useCallback(
    (source: IncomeSource, amount: number, date: string, note?: string) => {
      const entry: Income = { id: genId(), month, source, amount, date, note };
      const all = getIncome();
      const updated = [...all, entry];
      saveIncome(updated);
      setIncome(updated.filter(i => i.month === month));
    },
    [month]
  );

  const addExpense = useCallback(
    (category: ExpenseCategory, amount: number, date: string, note?: string) => {
      const entry: Expense = { id: genId(), month, category, amount, date, note };
      const all = getExpenses();
      const updated = [...all, entry];
      saveExpenses(updated);
      setExpenses(updated.filter(e => e.month === month));
    },
    [month]
  );

  const deleteIncome = useCallback(
    (id: string) => {
      const updated = getIncome().filter(i => i.id !== id);
      saveIncome(updated);
      setIncome(updated.filter(i => i.month === month));
    },
    [month]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      const updated = getExpenses().filter(e => e.id !== id);
      saveExpenses(updated);
      setExpenses(updated.filter(e => e.month === month));
    },
    [month]
  );

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
