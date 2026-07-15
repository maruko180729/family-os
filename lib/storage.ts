// Family OS — LocalStorage abstraction (Alpha)
// Drop-in replacement: swap get/set implementations for Supabase in Beta.

import type {
  Member, Goal, Reminder, Timeline, Income, Expense, AssetSnapshot,
  Company, Vehicle, FamilyDocument, Milestone,
} from "./types";
import {
  mockMembers, mockGoals, mockReminders, mockTimeline,
  mockIncome, mockExpenses, mockAssetSnapshots,
  mockCompanies, mockVehicles, mockDocuments, mockMilestones,
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

// Asset Snapshots (Sprint 2)
export const getAssetSnapshots = (): AssetSnapshot[] => load("assetSnapshots", mockAssetSnapshots);
export const saveAssetSnapshots = (v: AssetSnapshot[]) => save("assetSnapshots", v);

// Companies (Sprint 3)
export const getCompanies = (): Company[] => load("companies", mockCompanies);
export const saveCompanies = (v: Company[]) => save("companies", v);

// Vehicles (Sprint 3)
export const getVehicles = (): Vehicle[] => load("vehicles", mockVehicles);
export const saveVehicles = (v: Vehicle[]) => save("vehicles", v);

// Family documents / certificates (Sprint 3)
export const getDocuments = (): FamilyDocument[] => load("documents", mockDocuments);
export const saveDocuments = (v: FamilyDocument[]) => save("documents", v);

// Family milestones (Sprint 3)
export const getMilestones = (): Milestone[] => load("milestones", mockMilestones);
export const saveMilestones = (v: Milestone[]) => save("milestones", v);
