"use client";

import { cn } from "@/lib/utils";

interface CancelButtonProps {
  onCancel: () => void;
  label?: string;
  className?: string;
}

export function CancelButton({ onCancel, label = "取消", className }: CancelButtonProps) {
  return (
    <button
      onClick={onCancel}
      className={cn(
        "w-full py-3.5 rounded-2xl bg-muted text-muted-foreground font-medium text-sm",
        "active:scale-95 transition-transform",
        className
      )}
    >
      {label}
    </button>
  );
}
