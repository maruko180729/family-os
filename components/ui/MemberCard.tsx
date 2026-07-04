"use client";

import type { Member } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  members: Member[];
  className?: string;
}

export function MemberCard({ members, className }: MemberCardProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        家庭成员
      </p>
      <div className="space-y-4">
        {members.map(m => (
          <div key={m.id} className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center text-2xl shrink-0">
              {m.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="font-medium text-foreground">{m.name}</p>
                <span className="text-xs text-muted-foreground">{m.role}</span>
              </div>
              {m.note && <p className="text-xs text-muted-foreground mt-0.5">{m.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
