// Family OS — Mock Data (Alpha)
// Real family data for Xu Rui household. Replace with LocalStorage/Supabase in Beta.

import type {
  Member, Asset, Income, Expense, Goal, Reminder, Timeline, AssetTrendPoint, AppSettings,
  AssetSnapshot,
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
  { id: "i1", month: "2025-06", source: "salary", amount: 280000, date: "2025-06-25" },
  { id: "i2", month: "2025-06", source: "spouse", amount: 150000, date: "2025-06-30" },
  { id: "i3", month: "2025-06", source: "other",  amount: 48000,  date: "2025-06-28", note: "投资收益" },
];

export const mockExpenses: Expense[] = [
  { id: "e1", month: "2025-06", category: "fixed",  amount: 180000, date: "2025-06-01", note: "房租+水电+保险" },
  { id: "e2", month: "2025-06", category: "credit", amount: 65000,  date: "2025-06-27" },
  { id: "e3", month: "2025-06", category: "other",  amount: 32000,  date: "2025-06-15", note: "医疗+日用" },
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

// Sprint 2 — Asset Snapshots (monthly, one record per group per month)
// Net asset per month = japan + china + investment + other
// Aligned with mockAssetTrend numbers above
export const mockAssetSnapshots: AssetSnapshot[] = [
  // 2024-07  net: 11,800,000
  { id: "s-2024-07-japan",      month: "2024-07", group: "japan",      amount: 3700000 },
  { id: "s-2024-07-china",      month: "2024-07", group: "china",      amount: 3500000 },
  { id: "s-2024-07-investment", month: "2024-07", group: "investment", amount: 3500000 },
  { id: "s-2024-07-other",      month: "2024-07", group: "other",      amount: 1100000 },
  // 2024-08  net: 12,000,000
  { id: "s-2024-08-japan",      month: "2024-08", group: "japan",      amount: 3750000 },
  { id: "s-2024-08-china",      month: "2024-08", group: "china",      amount: 3500000 },
  { id: "s-2024-08-investment", month: "2024-08", group: "investment", amount: 3600000 },
  { id: "s-2024-08-other",      month: "2024-08", group: "other",      amount: 1150000 },
  // 2024-09  net: 12,150,000
  { id: "s-2024-09-japan",      month: "2024-09", group: "japan",      amount: 3800000 },
  { id: "s-2024-09-china",      month: "2024-09", group: "china",      amount: 3550000 },
  { id: "s-2024-09-investment", month: "2024-09", group: "investment", amount: 3650000 },
  { id: "s-2024-09-other",      month: "2024-09", group: "other",      amount: 1150000 },
  // 2024-10  net: 12,200,000
  { id: "s-2024-10-japan",      month: "2024-10", group: "japan",      amount: 3850000 },
  { id: "s-2024-10-china",      month: "2024-10", group: "china",      amount: 3550000 },
  { id: "s-2024-10-investment", month: "2024-10", group: "investment", amount: 3650000 },
  { id: "s-2024-10-other",      month: "2024-10", group: "other",      amount: 1150000 },
  // 2024-11  net: 12,400,000
  { id: "s-2024-11-japan",      month: "2024-11", group: "japan",      amount: 3900000 },
  { id: "s-2024-11-china",      month: "2024-11", group: "china",      amount: 3550000 },
  { id: "s-2024-11-investment", month: "2024-11", group: "investment", amount: 3800000 },
  { id: "s-2024-11-other",      month: "2024-11", group: "other",      amount: 1150000 },
  // 2024-12  net: 12,600,000
  { id: "s-2024-12-japan",      month: "2024-12", group: "japan",      amount: 4000000 },
  { id: "s-2024-12-china",      month: "2024-12", group: "china",      amount: 3600000 },
  { id: "s-2024-12-investment", month: "2024-12", group: "investment", amount: 3850000 },
  { id: "s-2024-12-other",      month: "2024-12", group: "other",      amount: 1150000 },
  // 2025-01  net: 12,800,000
  { id: "s-2025-01-japan",      month: "2025-01", group: "japan",      amount: 4000000 },
  { id: "s-2025-01-china",      month: "2025-01", group: "china",      amount: 3600000 },
  { id: "s-2025-01-investment", month: "2025-01", group: "investment", amount: 4050000 },
  { id: "s-2025-01-other",      month: "2025-01", group: "other",      amount: 1150000 },
  // 2025-02  net: 13,000,000
  { id: "s-2025-02-japan",      month: "2025-02", group: "japan",      amount: 4050000 },
  { id: "s-2025-02-china",      month: "2025-02", group: "china",      amount: 3600000 },
  { id: "s-2025-02-investment", month: "2025-02", group: "investment", amount: 4200000 },
  { id: "s-2025-02-other",      month: "2025-02", group: "other",      amount: 1150000 },
  // 2025-03  net: 13,150,000
  { id: "s-2025-03-japan",      month: "2025-03", group: "japan",      amount: 4100000 },
  { id: "s-2025-03-china",      month: "2025-03", group: "china",      amount: 3600000 },
  { id: "s-2025-03-investment", month: "2025-03", group: "investment", amount: 4300000 },
  { id: "s-2025-03-other",      month: "2025-03", group: "other",      amount: 1150000 },
  // 2025-04  net: 13,300,000
  { id: "s-2025-04-japan",      month: "2025-04", group: "japan",      amount: 4100000 },
  { id: "s-2025-04-china",      month: "2025-04", group: "china",      amount: 3650000 },
  { id: "s-2025-04-investment", month: "2025-04", group: "investment", amount: 4400000 },
  { id: "s-2025-04-other",      month: "2025-04", group: "other",      amount: 1150000 },
  // 2025-05  net: 13,362,000
  { id: "s-2025-05-japan",      month: "2025-05", group: "japan",      amount: 4150000 },
  { id: "s-2025-05-china",      month: "2025-05", group: "china",      amount: 3650000 },
  { id: "s-2025-05-investment", month: "2025-05", group: "investment", amount: 4420000 },
  { id: "s-2025-05-other",      month: "2025-05", group: "other",      amount: 1142000 },
  // 2025-06  net: 13,580,000
  { id: "s-2025-06-japan",      month: "2025-06", group: "japan",      amount: 4200000 },
  { id: "s-2025-06-china",      month: "2025-06", group: "china",      amount: 3800000 },
  { id: "s-2025-06-investment", month: "2025-06", group: "investment", amount: 4500000 },
  { id: "s-2025-06-other",      month: "2025-06", group: "other",      amount: 1080000 },
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
