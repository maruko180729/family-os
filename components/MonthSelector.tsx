"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSelectorProps {
  display: string;
  subtitle: string;
  prev: () => void;
  next: () => void;
  disableNext?: boolean;
}

export function MonthSelector({ display, subtitle, prev, next, disableNext = false }: MonthSelectorProps) {
  return (
    <div className="flex items-center justify-between pb-1">
      <button
        onClick={prev}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted active:scale-90 transition-transform"
      >
        <ChevronLeft size={18} className="text-muted-foreground" />
      </button>
      <div className="text-center">
        <h1 className="text-base font-semibold text-foreground">{display}</h1>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <button
        onClick={next}
        disabled={disableNext}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted active:scale-90 transition-transform disabled:opacity-30"
      >
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>
    </div>
  );
}
