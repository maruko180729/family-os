"use client";

import { Pencil } from "lucide-react";
import type { FamilyDocument, Member } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  documents: FamilyDocument[];
  members: Member[];
  onEdit?: (d: FamilyDocument) => void;
  className?: string;
}

export function DocumentCard({ documents, members, onEdit, className }: DocumentCardProps) {
  const ownerName = (ownerId: string) => members.find(m => m.id === ownerId)?.name ?? "";

  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        重要证件
      </p>
      <div className="space-y-3">
        {documents.map(d => (
          <div key={d.id} className="flex items-center justify-between gap-3">
            <span className="text-sm text-foreground">
              {ownerName(d.ownerId)} · {d.label}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm text-muted-foreground">{d.expiryDate ?? d.date}</span>
              {onEdit && (
                <button
                  onClick={() => onEdit(d)}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground active:scale-90 transition-transform"
                >
                  <Pencil size={13} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
