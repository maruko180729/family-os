// Family OS — Core Type Definitions
// All data structures. Alpha: LocalStorage. Beta: Supabase.

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string; // emoji
  birthDate?: string; // "YYYY-MM-DD"
  note?: string;
}

export type AssetCategory =
  | "emergency"
  | "investment"
  | "domestic"
  | "startup"
  | "company"
  | "liability";

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  amount: number; // JPY integer
  currency: string;
  month: string; // "YYYY-MM"
  note?: string;
}

export type IncomeSource = "salary" | "spouse" | "other";

export interface Income {
  id: string;
  month: string;       // "YYYY-MM"
  source: IncomeSource;
  amount: number;
  date: string;        // "YYYY-MM-DD"
  note?: string;
}

export type ExpenseCategory = "fixed" | "credit" | "other";

export interface Expense {
  id: string;
  month: string;       // "YYYY-MM"
  category: ExpenseCategory;
  amount: number;
  date: string;        // "YYYY-MM-DD"
  note?: string;
}

export type GoalStatus = "active" | "watching" | "completed" | "paused";
export type GoalCategory =
  | "asset"
  | "visa"
  | "nisa"
  | "ideco"
  | "health"
  | "travel"
  | "custom";

export interface Goal {
  id: string;
  name: string;
  emoji: string;
  category: GoalCategory;
  currentValue: number;
  targetValue: number;
  unit: "JPY" | "%" | "count";
  targetDate?: string; // "YYYY" or "YYYY-MM"
  targetLabel?: string; // display override e.g. "持续进行"
  status: GoalStatus;
  note?: string;
}

export type ReminderStatus = "pending" | "done" | "snoozed";

export interface Reminder {
  id: string;
  title: string;
  dueDate?: string;
  category: "tax" | "insurance" | "medical" | "visa" | "other";
  status: ReminderStatus;
  relatedGoalId?: string;
  note?: string;
}

export interface Timeline {
  id: string;
  month: string; // "YYYY-MM"
  netAssetStart: number;
  netAssetEnd: number;
  netChange: number;
  events?: string;
  incomeSummary?: string;
  expenseSummary?: string;
  nextFocus?: string;
  happyMoment?: string;
  aiSummary?: string;
  status: "draft" | "published";
}

export interface AssetTrendPoint {
  month: string; // "YYYY-MM"
  netAsset: number;
}

export interface AppSettings {
  familyName: string;
  primaryCurrency: string;
  timezone: string;
}
