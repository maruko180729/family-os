"use client";

import { cn } from "@/lib/utils";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function TextInput({ label, value, onChange, placeholder, autoFocus, className }: TextInputProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-xs font-medium text-muted-foreground block px-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full px-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow placeholder:text-muted-foreground/50"
      />
    </div>
  );
}
