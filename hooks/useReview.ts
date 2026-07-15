/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Timeline } from "@/lib/types";
import { getTimeline, saveTimeline } from "@/lib/storage";

const empty = {
  events: "",
  incomeSummary: "",
  expenseSummary: "",
  nextFocus: "",
  happyMoment: "",
};

export function useReview(month: string) {
  const [entry, setEntry] = useState(empty);
  const [status, setStatus] = useState<Timeline["status"] | null>(null);

  useEffect(() => {
    const existing = getTimeline().find(t => t.month === month);
    if (existing) {
      setEntry({
        events: existing.events ?? "",
        incomeSummary: existing.incomeSummary ?? "",
        expenseSummary: existing.expenseSummary ?? "",
        nextFocus: existing.nextFocus ?? "",
        happyMoment: existing.happyMoment ?? "",
      });
      setStatus(existing.status);
    } else {
      setEntry(empty);
      setStatus(null);
    }
  }, [month]);

  const update = useCallback((field: keyof typeof empty, value: string) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  }, []);

  const save = useCallback(
    (netAssetStart: number, netAssetEnd: number, aiSummary: string) => {
      const all = getTimeline();
      const others = all.filter(t => t.month !== month);
      const saved: Timeline = {
        id: `t-${month}`,
        month,
        netAssetStart,
        netAssetEnd,
        netChange: netAssetEnd - netAssetStart,
        ...entry,
        aiSummary,
        status: "published",
      };
      saveTimeline([...others, saved]);
      setStatus("published");
    },
    [month, entry]
  );

  return { entry, status, update, save };
}
