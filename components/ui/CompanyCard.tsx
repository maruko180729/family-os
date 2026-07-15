"use client";

import { Building2 } from "lucide-react";
import type { Company } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  companies: Company[];
  className?: string;
}

export function CompanyCard({ companies, className }: CompanyCardProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        公司
      </p>
      <div className="space-y-4">
        {companies.map(c => (
          <div key={c.id} className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center shrink-0">
              <Building2 size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                法人：{c.legalRepresentative} · 成立：{c.foundedYear}
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-accent text-primary shrink-0">
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
