"use client";

import { useState, useCallback } from "react";
import type { AssetGroup, AssetSnapshot } from "@/lib/types";
import { getAssetSnapshots, saveAssetSnapshots, getExchangeRates } from "@/lib/storage";

const GROUPS: AssetGroup[] = ["japan", "china", "investment", "other"];

export const GROUP_META: Record<AssetGroup, { label: string; colorClass: string; dotClass: string }> = {
  japan:      { label: "日本资产", colorClass: "bg-blue-50 text-blue-700",    dotClass: "bg-blue-400"   },
  china:      { label: "中国资产", colorClass: "bg-orange-50 text-orange-600", dotClass: "bg-orange-400" },
  investment: { label: "投资资产", colorClass: "bg-green-50 text-green-700",  dotClass: "bg-green-500"  },
  other:      { label: "其它资产", colorClass: "bg-gray-100 text-gray-500",   dotClass: "bg-gray-400"   },
};

export interface AssetGroupInfo {
  group: AssetGroup;
  label: string;
  colorClass: string;
  dotClass: string;
  amount: number;      // JPY (converted)
  rawAmount?: number;  // original CNY (only for china group)
  currency?: "JPY" | "CNY";
  change: number;      // JPY delta
  recorded: boolean;
}

function prevMonth(month: string): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// Convert a snapshot's stored amount to JPY using the exchange rate
function toJpy(snap: AssetSnapshot, cnyToJpy: number): number {
  if (snap.currency === "CNY" && snap.rawAmount !== undefined) {
    return Math.round(snap.rawAmount * cnyToJpy);
  }
  return snap.amount;
}

function sumGroupJpy(snaps: AssetSnapshot[], group: AssetGroup, cnyToJpy: number): number {
  const snap = snaps.find(s => s.group === group);
  return snap ? toJpy(snap, cnyToJpy) : 0;
}

// Plain function (not a hook) — used by Home and Growth pages
export function getLatestNetAsset(): { netAsset: number; change: number; month: string | null } {
  const snapshots = getAssetSnapshots();
  const { cnyToJpy } = getExchangeRates();
  const months = [...new Set(snapshots.map(s => s.month))].sort();
  if (months.length === 0) return { netAsset: 0, change: 0, month: null };

  const sumMonth = (m: string) =>
    snapshots.filter(s => s.month === m).reduce((s, snap) => s + toJpy(snap, cnyToJpy), 0);

  const latest = months[months.length - 1];
  const netAsset = sumMonth(latest);
  const prevMonthKey = months.length > 1 ? months[months.length - 2] : null;
  const change = prevMonthKey ? netAsset - sumMonth(prevMonthKey) : 0;

  return { netAsset, change, month: latest };
}

export function useAssets(month: string, cnyToJpy: number) {
  const [snapshots, setSnapshots] = useState<AssetSnapshot[]>(() => getAssetSnapshots());

  const cur = snapshots.filter(s => s.month === month);
  const prev = snapshots.filter(s => s.month === prevMonth(month));

  const groups: AssetGroupInfo[] = GROUPS.map(g => {
    const snap = cur.find(s => s.group === g);
    const jpyAmount = snap ? toJpy(snap, cnyToJpy) : 0;
    const prevJpy = sumGroupJpy(prev, g, cnyToJpy);
    return {
      group: g,
      ...GROUP_META[g],
      amount: jpyAmount,
      rawAmount: snap?.rawAmount,
      currency: snap?.currency,
      change: jpyAmount - prevJpy,
      recorded: snap !== undefined,
    };
  });

  const netAsset = groups.reduce((s, g) => s + g.amount, 0);
  const prevNetAsset = GROUPS.reduce((s, g) => s + sumGroupJpy(prev, g, cnyToJpy), 0);
  const monthlyChange = netAsset - prevNetAsset;
  const hasData = cur.length > 0;

  const lastUpdated = cur.length > 0
    ? cur.reduce((latest, s) => s.updatedAt && s.updatedAt > (latest ?? "") ? s.updatedAt : latest, undefined as string | undefined)
    : undefined;

  const months = [...new Set(snapshots.map(s => s.month))].sort();
  const trend = months.map(m => ({
    month: m,
    netAsset: snapshots.filter(s => s.month === m).reduce((s, snap) => s + toJpy(snap, cnyToJpy), 0),
  }));

  // currentAmounts: china returns CNY raw for form display; others return JPY
  const currentAmounts = Object.fromEntries(
    GROUPS.map(g => {
      const snap = cur.find(s => s.group === g);
      if (!snap) return [g, 0];
      if (g === "china" && snap.currency === "CNY" && snap.rawAmount !== undefined) return [g, snap.rawAmount];
      return [g, snap.amount];
    })
  ) as Record<AssetGroup, number>;

  const updateSnapshot = useCallback(
    (amounts: Record<AssetGroup, number>) => {
      const now = new Date().toISOString();
      const others = snapshots.filter(s => s.month !== month);
      const newSnaps: AssetSnapshot[] = GROUPS.map(g => {
        if (g === "china") {
          const rawAmt = amounts[g];
          return {
            id: `snap-${month}-${g}`,
            month,
            group: g,
            currency: "CNY" as const,
            rawAmount: rawAmt,
            amount: Math.round(rawAmt * cnyToJpy),
            updatedAt: now,
          };
        }
        return { id: `snap-${month}-${g}`, month, group: g, amount: amounts[g], updatedAt: now };
      });
      const updated = [...others, ...newSnaps];
      setSnapshots(updated);
      saveAssetSnapshots(updated);
    },
    [snapshots, month, cnyToJpy]
  );

  const updateSingleGroup = useCallback(
    (group: AssetGroup, amount: number) => {
      const now = new Date().toISOString();
      const others = snapshots.filter(s => !(s.month === month && s.group === group));
      const entry: AssetSnapshot = group === "china"
        ? { id: `snap-${month}-${group}`, month, group, currency: "CNY", rawAmount: amount, amount: Math.round(amount * cnyToJpy), updatedAt: now }
        : { id: `snap-${month}-${group}`, month, group, amount, updatedAt: now };
      const updated = [...others, entry];
      setSnapshots(updated);
      saveAssetSnapshots(updated);
    },
    [snapshots, month, cnyToJpy]
  );

  return { groups, netAsset, monthlyChange, trend, updateSnapshot, updateSingleGroup, currentAmounts, hasData, lastUpdated };
}
