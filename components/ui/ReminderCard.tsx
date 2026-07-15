"use client";

import { useState } from "react";
import { Clock, CheckCircle2, Plus, Pencil, Trash2 } from "lucide-react";
import type { Reminder } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/editing";

interface ReminderCardProps {
  reminders: Reminder[];
  onAdd?: () => void;
  onEdit?: (r: Reminder) => void;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export function ReminderCard({ reminders, onAdd, onEdit, onToggle, onDelete, className }: ReminderCardProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const pending = reminders.filter(r => r.status === "pending");
  const done    = reminders.filter(r => r.status === "done");

  const isInteractive = !!(onAdd || onEdit || onToggle || onDelete);

  // Read-only mode: only show pending, return null if empty
  if (!isInteractive) {
    if (pending.length === 0) return null;
    return (
      <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          待办提醒
        </p>
        <div className="space-y-3">
          {pending.map(r => (
            <div key={r.id} className="flex items-start gap-3">
              <Clock size={15} className="shrink-0 mt-0.5 text-muted-foreground" />
              <p className="text-sm text-foreground leading-relaxed">{r.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            待办提醒
          </p>
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 text-xs text-primary font-medium active:scale-90 transition-transform"
            >
              <Plus size={13} />
              新增
            </button>
          )}
        </div>

        {reminders.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">暂无提醒</p>
        ) : (
          <div className="space-y-1">
            {pending.length > 0 && (
              <div className="space-y-2 mb-3">
                {pending.map(r => (
                  <ReminderRow
                    key={r.id}
                    reminder={r}
                    onEdit={onEdit}
                    onToggle={onToggle}
                    onDelete={onDelete ? () => setConfirmId(r.id) : undefined}
                  />
                ))}
              </div>
            )}
            {done.length > 0 && (
              <>
                <p className="text-xs text-muted-foreground mb-2 mt-3">已完成</p>
                <div className="space-y-2">
                  {done.map(r => (
                    <ReminderRow
                      key={r.id}
                      reminder={r}
                      onEdit={onEdit}
                      onToggle={onToggle}
                      onDelete={onDelete ? () => setConfirmId(r.id) : undefined}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmId !== null}
        title="删除提醒"
        message="确定要删除这条提醒吗？此操作无法撤销。"
        onConfirm={() => {
          if (confirmId) onDelete?.(confirmId);
          setConfirmId(null);
        }}
        onCancel={() => setConfirmId(null)}
      />
    </>
  );
}

function ReminderRow({
  reminder,
  onEdit,
  onToggle,
  onDelete,
}: {
  reminder: Reminder;
  onEdit?: (r: Reminder) => void;
  onToggle?: (id: string) => void;
  onDelete?: () => void;
}) {
  const isDone = reminder.status === "done";
  return (
    <div className="flex items-start gap-3 py-1">
      <button
        onClick={() => onToggle?.(reminder.id)}
        className={cn(
          "shrink-0 mt-0.5 transition-colors active:scale-90",
          isDone ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {isDone ? <CheckCircle2 size={15} /> : <Clock size={15} />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm leading-relaxed", isDone && "line-through text-muted-foreground")}>
          {reminder.title}
        </p>
        {reminder.dueDate && !isDone && (
          <p className="text-xs text-muted-foreground mt-0.5">{reminder.dueDate}</p>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {onEdit && (
          <button
            onClick={() => onEdit(reminder)}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground active:scale-90 transition-transform"
          >
            <Pencil size={12} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 rounded-full text-muted-foreground hover:text-destructive active:scale-90 transition-transform"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
