"use client";

import { useState, useCallback } from "react";
import type { AssetGroup, AssetSnapshot } from "@/lib/types";
import { getAssetSnapshots, saveAssetSnapshots } from "@/lib/storage";

const GROUPS: AssetGroup[] = ["japan", "china", "investment", "other"];

export const GROUP_META: Record<AssetGroup, { label: string; colorClass: string; dotClass: string }> = {
  japan:      { label: "日本资产", colorClass: "bg-blue-50 text-blue-700",   dotClass: "bg-blue-400"   },
  china:      { label: "中国资产", colorClass: "bg-amber-50 text-amber-700", dotClass: "bg-amber-400"  },
  investment: { label: "投资资产", colorClass: "bg-accent text-primary",     dotClass: "bg-primary"    },
  other:      { label: "其它资产", colorClass: "bg-purple-50 text-purple-700", dotClass: "bg-purple-400" },
};

export interface AssetGroupInfo {
  group: AssetGroup;
  label: string;
  colorClass: string;
  dotClass: string;
  amount: number;
  change: number;
}

function prevMonth(month: string): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function sumGroup(snaps: AssetSnapshot[], group: AssetGroup): number {
  return snaps.find(s => s.group === group)?.amount ?? 0;
}

export function useAssets(month: string) {
  const [snapshots, setSnapshots] = useState<AssetSnapshot[]>(() => getAssetSnapshots());

  const cur = snapshots.filter(s => s.month === month);
  const prev = snapshots.filter(s => s.month === prevMonth(month));

  const groups: AssetGroupInfo[] = GROUPS.map(g => ({
    group: g,
    ...GROUP_META[g],
    amount: sumGroup(cur, g),
    change: sumGroup(cur, g) - sumGroup(prev, g),
  }));

  const netAsset = groups.reduce((s, g) => s + g.amount, 0);
  const prevNetAsset = GROUPS.reduce((s, g) => s + sumGroup(prev, g), 0);
  const monthlyChange = netAsset - prevNetAsset;
  const hasData = cur.length > 0;

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
      const others = snapshots.filter(s => s.month !== month);
      const newSnaps: AssetSnapshot[] = GROUPS.map(g => ({
        id: `snap-${month}-${g}`,
        month,
        group: g,
        amount: amounts[g],
      }));
      const updated = [...others, ...newSnaps];
      setSnapshots(updated);
      saveAssetSnapshots(updated);
    },
    [snapshots, month]
  );

  return { groups, netAsset, monthlyChange, trend, updateSnapshot, currentAmounts, hasData };
}
