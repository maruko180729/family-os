"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  onDelete: () => void;
  label?: string;
  className?: string;
}

export function DeleteButton({ onDelete, label = "删除", className }: DeleteButtonProps) {
  return (
    <button
      onClick={onDelete}
      className={cn(
        "w-full py-3.5 rounded-2xl text-destructive font-medium text-sm flex items-center justify-center gap-2",
        "active:scale-95 transition-transform",
        className
      )}
    >
      <Trash2 size={15} />
      {label}
    </button>
  );
}
