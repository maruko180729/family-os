"use client";

import type { FamilyDocument, Member } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  documents: FamilyDocument[];
  members: Member[];
  className?: string;
}

export function DocumentCard({ documents, members, className }: DocumentCardProps) {
  const ownerName = (ownerId: string) => members.find(m => m.id === ownerId)?.name ?? "";

  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        重要证件
      </p>
      <div className="space-y-3">
        {documents.map(d => (
          <div key={d.id} className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {ownerName(d.ownerId)} · {d.label}
            </span>
            <span className="text-sm text-muted-foreground">{d.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
