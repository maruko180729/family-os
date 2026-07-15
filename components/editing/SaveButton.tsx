"use client";

import { cn } from "@/lib/utils";

interface SaveButtonProps {
  onSave: () => void;
  disabled?: boolean;
  saving?: boolean;
  label?: string;
  className?: string;
}

export function SaveButton({ onSave, disabled, saving, label = "保存", className }: SaveButtonProps) {
  return (
    <button
      onClick={onSave}
      disabled={disabled || saving}
      className={cn(
        "w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm",
        "active:scale-95 transition-transform disabled:opacity-40",
        className
      )}
    >
      {saving ? "保存中…" : label}
    </button>
  );
}
