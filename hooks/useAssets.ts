"use client";

import { useState, useCallback } from "react";
import type { AssetGroup, AssetSnapshot } from "@/lib/types";
import { getAssetSnapshots, saveAssetSnapshots } from "@/lib/storage";

const GROUPS: AssetGroup[] = ["japan", "china", "investment", "other"];

export const GROUP_META: Record<AssetGroup, { label: string; colorClass: string; dotClass: string }> = {
  japan:      { label: "日本资产", colorClass: "bg-blue-50 text-blue-700",   dotClass: "bg-blue-400"   },
  china:      { label: "中国资产", colorClass: "bg-orange-50 text-orange-600", dotClass: "bg-orange-400" },
  investment: { label: "投资资产", colorClass: "bg-green-50 text-green-700", dotClass: "bg-green-500"  },
  other:      { label: "其它资产", colorClass: "bg-gray-100 text-gray-500",  dotClass: "bg-gray-400"   },
};

export interface AssetGroupInfo {
  group: AssetGroup;
  label: string;
  colorClass: string;
  dotClass: string;
  amount: number;
  change: number;
  recorded: boolean; // false = show "—"
}

function prevMonth(month: string): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function sumGroup(snaps: AssetSnapshot[], group: AssetGroup): number {
  return snaps.find(s => s.group === group)?.amount ?? 0;
}

// Net asset as of the most recently recorded snapshot month (for pages
// that show "current status" without a month selector, e.g. Home/Growth).
export function getLatestNetAsset(): { netAsset: number; change: number; month: string | null } {
  const snapshots = getAssetSnapshots();
  const months = [...new Set(snapshots.map(s => s.month))].sort();
  if (months.length === 0) return { netAsset: 0, change: 0, month: null };

  const sumMonth = (m: string) => snapshots.filter(s => s.month === m).reduce((s, snap) => s + snap.amount, 0);
  const latest = months[months.length - 1];
  const netAsset = sumMonth(latest);
  const prevMonthKey = months.length > 1 ? months[months.length - 2] : null;
  const change = prevMonthKey ? netAsset - sumMonth(prevMonthKey) : 0;

  return { netAsset, change, month: latest };
}

export function useAssets(month: string) {
  const [snapshots, setSnapshots] = useState<AssetSnapshot[]>(() => getAssetSnapshots());

  const cur = snapshots.filter(s => s.month === month);
  const prev = snapshots.filter(s => s.month === prevMonth(month));

  const groups: AssetGroupInfo[] = GROUPS.map(g => {
    const snap = cur.find(s => s.group === g);
    const amount = snap?.amount ?? 0;
    return {
      group: g,
      ...GROUP_META[g],
      amount,
      change: amount - sumGroup(prev, g),
      recorded: snap !== undefined,
    };
  });

  const netAsset = groups.reduce((s, g) => s + g.amount, 0);
  const prevNetAsset = GROUPS.reduce((s, g) => s + sumGroup(prev, g), 0);
  const monthlyChange = netAsset - prevNetAsset;
  const hasData = cur.length > 0;

  // Last update time for the current month's snapshots
  const lastUpdated = cur.length > 0
    ? cur.reduce((latest, s) => s.updatedAt && s.updatedAt > (latest ?? "") ? s.updatedAt : latest, undefined as string | undefined)
    : undefined;

  // Trend: all months with data, sorted, net per month
  const months = [...new Set(snapshots.map(s => s.month))].sort();
  const trend = months.map(m => ({
    month: m,
    netAsset: snapshots.filter(s => s.month === m).reduce((s, snap) => s + snap.amount, 0),
  }));

  const currentAmounts = Object.fromEntries(
    GROUPS.map(g => [g, sumGroup(cur, g)])
  ) as Record<AssetGroup, number>;

  const updateSnapshot = useCallback(
    (amounts: Record<AssetGroup, number>) => {
      const now = new Date().toISOString();
      const others = snapshots.filter(s => s.month !== month);
      const newSnaps: AssetSnapshot[] = GROUPS.map(g => ({
        id: `snap-${month}-${g}`,
        month,
        group: g,
        amount: amounts[g],
        updatedAt: now,
      }));
      const updated = [...others, ...newSnaps];
      setSnapshots(updated);
      saveAssetSnapshots(updated);
    },
    [snapshots, month]
  );

  const updateSingleGroup = useCallback(
    (group: AssetGroup, amount: number) => {
      const now = new Date().toISOString();
      const others = snapshots.filter(s => !(s.month === month && s.group === group));
      const entry: AssetSnapshot = { id: `snap-${month}-${group}`, month, group, amount, updatedAt: now };
      const updated = [...others, entry];
      setSnapshots(updated);
      saveAssetSnapshots(updated);
    },
    [snapshots, month]
  );

  return { groups, netAsset, monthlyChange, trend, updateSnapshot, updateSingleGroup, currentAmounts, hasData, lastUpdated };
}
