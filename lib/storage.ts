// Family OS — LocalStorage abstraction (Alpha)
// Drop-in replacement: swap get/set implementations for Supabase in Beta.

import type { Member, Asset, Goal, Reminder, Timeline, Income, Expense } from "./types";
import {
  mockMembers, mockAssets, mockGoals, mockReminders, mockTimeline,
  mockIncome, mockExpenses,
} from "./mock";

const PREFIX = "family-os";

function key(name: string) {
  return `${PREFIX}:${name}`;
}

function load<T>(name: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key(name));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(name: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key(name), JSON.stringify(value));
}

// Members
export const getMembers = (): Member[] => load("members", mockMembers);
export const saveMembers = (v: Member[]) => save("members", v);

// Assets
export const getAssets = (): Asset[] => load("assets", mockAssets);
export const saveAssets = (v: Asset[]) => save("assets", v);

// Goals
export const getGoals = (): Goal[] => load("goals", mockGoals);
export const saveGoals = (v: Goal[]) => save("goals", v);

// Reminders
export const getReminders = (): Reminder[] => load("reminders", mockReminders);
export const saveReminders = (v: Reminder[]) => save("reminders", v);

// Timeline (monthly reviews)
export const getTimeline = (): Timeline[] => load("timeline", mockTimeline);
export const saveTimeline = (v: Timeline[]) => save("timeline", v);

// Income
export const getIncome = (): Income[] => load("income", mockIncome);
export const saveIncome = (v: Income[]) => save("income", v);

// Expenses
export const getExpenses = (): Expense[] => load("expenses", mockExpenses);
export const saveExpenses = (v: Expense[]) => save("expenses", v);
