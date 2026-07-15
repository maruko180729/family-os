"use client";

import { Clock } from "lucide-react";
import type { Member, Reminder } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MarukoCardProps {
  member: Member;
  reminders?: Reminder[];
  className?: string;
}

function calcAge(birthDate?: string): number | null {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export function MarukoCard({ member, reminders = [], className }: MarukoCardProps) {
  const age = calcAge(member.birthDate);
  const pending = reminders.filter(r => r.relatedMemberId === member.id && r.status === "pending");

  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Maruko
      </p>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-3xl shrink-0">
          {member.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <p className="font-semibold text-foreground text-base">{member.name}</p>
            {age !== null && <span className="text-sm text-muted-foreground">{age} 岁</span>}
          </div>
          {member.note && <p className="text-xs text-muted-foreground mt-0.5">{member.note}</p>}
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-accent text-primary shrink-0">
          健康
        </span>
      </div>

      {pending.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border space-y-2.5">
          {pending.map(r => (
            <div key={r.id} className="flex items-start gap-2.5">
              <Clock size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">{r.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
