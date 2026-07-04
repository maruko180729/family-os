// Family OS — Mock Data (Alpha)
// Real family data for Xu Rui household. Replace with LocalStorage/Supabase in Beta.

import type {
  Member, Asset, Income, Expense, Goal, Reminder, Timeline, AssetTrendPoint, AppSettings,
} from "./types";

export const mockSettings: AppSettings = {
  familyName: "我们的小家",
  primaryCurrency: "JPY",
  timezone: "Asia/Tokyo",
};

export const mockMembers: Member[] = [
  { id: "m1", name: "徐瑞", role: "会社員", avatar: "👨", note: "家庭财务负责人" },
  { id: "m2", name: "配偶", role: "経営者", avatar: "👩", note: "公司经营管理" },
  { id: "m3", name: "Maruko", role: "8歳", avatar: "👧", note: "成长记录中", birthDate: "2017-03-07" },
];

export const mockAssets: Asset[] = [
  { id: "a1", name: "应急资金", category: "emergency",  amount: 1500000,  currency: "JPY", month: "2025-06" },
  { id: "a2", name: "投资资产", category: "investment", amount: 4200000,  currency: "JPY", month: "2025-06" },
  { id: "a3", name: "国内资产", category: "domestic",   amount: 3800000,  currency: "JPY", month: "2025-06" },
  { id: "a4", name: "创业资金", category: "startup",    amount: 2500000,  currency: "JPY", month: "2025-06" },
  { id: "a5", name: "公司资产", category: "company",    amount: 2580000,  currency: "JPY", month: "2025-06" },
  { id: "a6", name: "负债",     category: "liability",  amount: -1000000, currency: "JPY", month: "2025-06" },
];

export const mockIncome: Income[] = [
  { id: "i1", month: "2025-06", source: "salary",     label: "工资收入",   amount: 280000, memberId: "m1" },
  { id: "i2", month: "2025-06", source: "investment", label: "投资收益",   amount: 48000 },
  { id: "i3", month: "2025-06", source: "business",   label: "公司收入",   amount: 150000, memberId: "m2" },
];

export const mockExpenses: Expense[] = [
  { id: "e1", month: "2025-06", label: "一次性支出",   amount: 65000,  category: "other" },
  { id: "e2", month: "2025-06", label: "公司收入波动", amount: 45000,  category: "other" },
];

export const mockGoals: Goal[] = [
  {
    id: "g1", name: "家庭净资产", emoji: "📈", category: "asset",
    currentValue: 13580000, targetValue: 20000000, unit: "JPY",
    targetDate: "2028", status: "active",
  },
  {
    id: "g2", name: "创业资金", emoji: "🚀", category: "custom",
    currentValue: 2500000, targetValue: 5000000, unit: "JPY",
    targetDate: "2026", status: "active",
  },
  {
    id: "g3", name: "NISA", emoji: "💹", category: "nisa",
    currentValue: 360000, targetValue: 360000, unit: "JPY",
    targetLabel: "持续进行", status: "completed",
  },
  {
    id: "g4", name: "iDeCo", emoji: "🏦", category: "ideco",
    currentValue: 221000, targetValue: 276000, unit: "JPY",
    targetLabel: "持续进行", status: "active",
  },
  {
    id: "g5", name: "永住申请", emoji: "🏠", category: "visa",
    currentValue: 40, targetValue: 100, unit: "%",
    targetDate: "2025", status: "watching",
  },
  {
    id: "g6", name: "健康", emoji: "💉", category: "health",
    currentValue: 60, targetValue: 100, unit: "%",
    targetLabel: "Maruko 疫苗", status: "watching",
  },
  {
    id: "g7", name: "旅行", emoji: "✈️", category: "travel",
    currentValue: 0, targetValue: 200000, unit: "JPY",
    targetDate: "2025", status: "active",
  },
];

export const mockReminders: Reminder[] = [
  {
    id: "r1", title: "NISA 已完成本月计划",
    category: "other", status: "done",
  },
  {
    id: "r2", title: "Maruko 疫苗还有 18 天",
    dueDate: "2025-07-15", category: "medical", status: "pending",
  },
  {
    id: "r3", title: "故乡纳税建议 10～11 月确认",
    dueDate: "2025-10-31", category: "tax", status: "pending",
  },
];

export const mockTimeline: Timeline[] = [
  {
    id: "t1",
    month: "2025-06",
    netAssetStart: 13362000,
    netAssetEnd: 13580000,
    netChange: 218000,
    events: "开始了 NISA 定投，完成本月额度。配偶公司新签约一个客户。",
    incomeSummary: "工资 28万 + 投资收益 4.8万 + 公司收入 15万",
    expenseSummary: "一次性支出 6.5万（家电维修 + 医疗）",
    nextFocus: "开始准备故乡纳税清单，评估10月额度",
    happyMoment: "Maruko 期末考试数学满分",
    aiSummary: "本月净资产增加 21.8万，主要来源为工资与投资收益。NISA 完成全年定投计划。建议10月提前规划故乡纳税。",
    status: "published",
  },
];

// Asset trend: last 12 months net asset in JPY
export const mockAssetTrend: AssetTrendPoint[] = [
  { month: "2024-07", netAsset: 11800000 },
  { month: "2024-08", netAsset: 12000000 },
  { month: "2024-09", netAsset: 12150000 },
  { month: "2024-10", netAsset: 12200000 },
  { month: "2024-11", netAsset: 12400000 },
  { month: "2024-12", netAsset: 12600000 },
  { month: "2025-01", netAsset: 12800000 },
  { month: "2025-02", netAsset: 13000000 },
  { month: "2025-03", netAsset: 13150000 },
  { month: "2025-04", netAsset: 13300000 },
  { month: "2025-05", netAsset: 13362000 },
  { month: "2025-06", netAsset: 13580000 },
];

// Derived helpers
export function getTotalAssets(): number {
  return mockAssets.filter(a => a.category !== "liability").reduce((s, a) => s + a.amount, 0);
}

export function getTotalLiabilities(): number {
  return Math.abs(mockAssets.filter(a => a.category === "liability").reduce((s, a) => s + a.amount, 0));
}

export function getNetAsset(): number {
  return mockAssets.reduce((s, a) => s + a.amount, 0);
}

export function getPendingReminders(): Reminder[] {
  return mockReminders.filter(r => r.status === "pending");
}

export function getGoalProgress(goal: Goal): number {
  if (goal.targetValue === 0) return 100;
  return Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100);
}
