// Family OS — LocalStorage abstraction (Alpha)
// Drop-in replacement: swap get/set implementations for Supabase in Beta.

import type {
  Member, Goal, Reminder, Timeline, Income, Expense, AssetSnapshot,
  Company, Vehicle, FamilyDocument, Milestone, CreditCard, RecurringExpense,
  ExchangeRateSettings, FamilyProfile,
} from "./types";
import {
  mockMembers, mockGoals, mockReminders, mockTimeline,
  mockIncome, mockExpenses, mockAssetSnapshots,
  mockCompanies, mockVehicles, mockDocuments, mockMilestones,
  mockCreditCards, mockRecurringExpenses,
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

// Credit Cards (Beta 0.2)
export const getCreditCards = (): CreditCard[] => load("creditCards", mockCreditCards);
export const saveCreditCards = (v: CreditCard[]) => save("creditCards", v);

// Recurring Expense Templates (Beta 0.2 / 0.2.2 — with migration from old `amount` field)
type LegacyRecurringExpense = Omit<RecurringExpense, "amountType" | "referenceAmount"> & { amount?: number };

export const getRecurringExpenses = (): RecurringExpense[] => {
  const raw = load<LegacyRecurringExpense[]>("recurringExpenses", mockRecurringExpenses as LegacyRecurringExpense[]);
  return raw.map(item => {
    if ("amountType" in item) return item as RecurringExpense;
    const amount = (item as LegacyRecurringExpense).amount ?? 0;
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      amountType: amount > 0 ? "fixed" : "variable",
      referenceAmount: amount > 0 ? amount : undefined,
      paymentDay: item.paymentDay,
      enabled: item.enabled,
      note: item.note,
    } as RecurringExpense;
  });
};
export const saveRecurringExpenses = (v: RecurringExpense[]) => save("recurringExpenses", v);

// Exchange Rates (Beta 0.2.2) — uses hyphen key per spec
const EXCHANGE_KEY = "family-os-exchange-rates";
const DEFAULT_RATES: ExchangeRateSettings = { cnyToJpy: 20 };

export const getExchangeRates = (): ExchangeRateSettings => {
  if (typeof window === "undefined") return DEFAULT_RATES;
  try {
    const raw = localStorage.getItem(EXCHANGE_KEY);
    return raw ? (JSON.parse(raw) as ExchangeRateSettings) : DEFAULT_RATES;
  } catch {
    return DEFAULT_RATES;
  }
};
export const saveExchangeRates = (v: ExchangeRateSettings): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(EXCHANGE_KEY, JSON.stringify(v));
};

// Family Profile (Beta 0.2.2) — uses hyphen key per spec
const PROFILE_KEY = "family-os-family-profile";
export const getFamilyProfile = (): FamilyProfile => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as FamilyProfile) : {};
  } catch {
    return {};
  }
};
export const saveFamilyProfile = (v: FamilyProfile): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(v));
};
