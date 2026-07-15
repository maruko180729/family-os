"use client";

import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export function CurrencyInput({ label, value, onChange, placeholder = "0", className }: CurrencyInputProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-xs font-medium text-muted-foreground block px-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none select-none">
          ¥
        </span>
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-8 pr-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
}
