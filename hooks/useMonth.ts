"use client";

import { useState } from "react";

function toMonthStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function formatDisplay(month: string): string {
  const [y, m] = month.split("-");
  return `${y}年${parseInt(m)}月`;
}

export function useMonth(initialOffset = 0) {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + initialOffset);
    return toMonthStr(d);
  });

  function prev() {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(y, m - 2, 1);
    setMonth(toMonthStr(d));
  }

  function next() {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(y, m, 1);
    setMonth(toMonthStr(d));
  }

  const isCurrentMonth = month === toMonthStr(new Date());

  return { month, display: formatDisplay(month), prev, next, isCurrentMonth };
}
