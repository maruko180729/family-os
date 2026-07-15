"use client";

import { useState, useCallback } from "react";
import type { Timeline } from "@/lib/types";
import { getTimeline, saveTimeline } from "@/lib/storage";

const empty = {
  events: "",
  incomeSummary: "",
  expenseSummary: "",
  nextFocus: "",
  happyMoment: "",
};

function entryFromTimeline(all: Timeline[], month: string) {
  const t = all.find(x => x.month === month);
  if (!t) return empty;
  return {
    events: t.events ?? "",
    incomeSummary: t.incomeSummary ?? "",
    expenseSummary: t.expenseSummary ?? "",
    nextFocus: t.nextFocus ?? "",
    happyMoment: t.happyMoment ?? "",
  };
}

export function useReview(month: string) {
  // Store full timeline; derive entry from it so month changes are free of effects
  const [timeline, setTimeline] = useState<Timeline[]>(() => getTimeline());
  // Track the "active month" to detect prop changes during render
  const [activeMonth, setActiveMonth] = useState(month);
  const [entry, setEntry] = useState(() => entryFromTimeline(getTimeline(), month));

  // React-approved "adjust state when prop changes" pattern (setState during render,
  // not inside useEffect). This causes a single extra render on month change.
  if (activeMonth !== month) {
    setActiveMonth(month);
    setEntry(entryFromTimeline(timeline, month));
  }

  const existing = timeline.find(t => t.month === month);
  const status = existing?.status ?? null;

  const update = useCallback((field: keyof typeof empty, value: string) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  }, []);

  const save = useCallback(
    (netAssetStart: number, netAssetEnd: number, aiSummary: string) => {
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
      const updated = [...getTimeline().filter(t => t.month !== month), saved];
      saveTimeline(updated);
      setTimeline(updated);
    },
    [month, entry]
  );

  return { entry, status, update, save };
}
