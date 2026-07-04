"use client";

import { Clock, CheckCircle2 } from "lucide-react";
import type { Reminder } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ReminderCardProps {
  reminders: Reminder[];
  className?: string;
}

export function ReminderCard({ reminders, className }: ReminderCardProps) {
  const pending = reminders.filter(r => r.status === "pending");
  if (pending.length === 0) return null;

  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        待办提醒
      </p>
      <div className="space-y-3">
        {pending.map(r => (
          <ReminderRow key={r.id} reminder={r} />
        ))}
      </div>
    </div>
  );
}

function ReminderRow({ reminder }: { reminder: Reminder }) {
  const urgent = reminder.category === "medical";
  return (
    <div className="flex items-start gap-3">
      <Clock
        size={15}
        className={cn("shrink-0 mt-0.5", urgent ? "text-amber-500" : "text-muted-foreground")}
      />
      <p className="text-sm text-foreground leading-relaxed">{reminder.title}</p>
    </div>
  );
}
