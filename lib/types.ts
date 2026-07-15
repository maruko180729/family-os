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
  relatedMemberId?: string; // Member id, e.g. links a medical reminder to Maruko
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

// Sprint 2 — Asset Snapshot model
// Monthly snapshot: user enters current total per group once a month
export type AssetGroup = "japan" | "china" | "investment" | "other";

export interface AssetSnapshot {
  id: string;
  month: string;      // "YYYY-MM"
  group: AssetGroup;
  amount: number;     // JPY integer, total for this group
  updatedAt?: string; // ISO date string, set on save
  note?: string;
}

export interface AppSettings {
  familyName: string;
  primaryCurrency: string;
  timezone: string;
}

// Sprint 3 — Home/家 module
export interface Company {
  id: string;
  name: string;
  legalRepresentative: string; // member name
  foundedYear: string; // "YYYY"
  status: string; // e.g. "正常经营"
  // Financial snapshot (editable in Sprint 5)
  revenue?: number;          // 营业额 JPY
  companyExpenses?: number;  // 支出 JPY
  transferToFamily?: number; // 家庭转入 JPY
  balance?: number;          // 余额 JPY
}

export interface Vehicle {
  id: string;
  name: string;
  nextInspection: string; // "YYYY-MM-DD"
  insuranceExpiry: string; // "YYYY-MM-DD"
  taxDate?: string;        // 税金日期 "YYYY-MM-DD"
  nextService?: string;    // 下次保养 "YYYY-MM-DD" or note
  note?: string;
}

export interface FamilyDocument {
  id: string;
  ownerId: string; // Member id
  type?: string;   // "在留卡" | "护照" | "签证" | "其它"
  label: string;
  date: string;    // reference or expiry date "YYYY" or "YYYY-MM-DD"
  expiryDate?: string;  // explicit expiry "YYYY-MM-DD"
  remindDays?: number;  // days before expiry to surface reminder
  note?: string;
}

export interface Milestone {
  id: string;
  date: string; // "YYYY" or "YYYY-MM"
  title: string;
  emoji?: string;
}
