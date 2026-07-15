"use client";

import { Building2, Pencil } from "lucide-react";
import type { Company } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  companies: Company[];
  onEdit?: (company: Company) => void;
  className?: string;
}

export function CompanyCard({ companies, onEdit, className }: CompanyCardProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        公司
      </p>
      <div className="space-y-4">
        {companies.map(c => (
          <div key={c.id}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                <Building2 size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  法人：{c.legalRepresentative} · 成立：{c.foundedYear}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {onEdit && (
                  <button
                    onClick={() => onEdit(c)}
                    className="w-7 h-7 flex items-center justify-center rounded-xl bg-muted active:scale-90 transition-transform"
                    aria-label="编辑公司"
                  >
                    <Pencil size={13} className="text-muted-foreground" />
                  </button>
                )}
                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-accent text-primary">
                  {c.status}
                </span>
              </div>
            </div>

            {/* Financial snapshot — shown when data exists */}
            {(c.revenue || c.companyExpenses || c.transferToFamily || c.balance) && (
              <div className="mt-3 ml-[60px] grid grid-cols-2 gap-x-4 gap-y-1">
                {c.revenue != null && (
                  <p className="text-xs text-muted-foreground">营业额 <span className="text-foreground font-medium">¥{c.revenue.toLocaleString()}</span></p>
                )}
                {c.companyExpenses != null && (
                  <p className="text-xs text-muted-foreground">支出 <span className="text-foreground font-medium">¥{c.companyExpenses.toLocaleString()}</span></p>
                )}
                {(c.revenue != null && c.companyExpenses != null) && (
                  <p className="text-xs text-muted-foreground">利润 <span className={cn("font-medium", (c.revenue - c.companyExpenses) >= 0 ? "text-primary" : "text-destructive")}>
                    {(c.revenue - c.companyExpenses) >= 0 ? "+" : ""}¥{(c.revenue - c.companyExpenses).toLocaleString()}
                  </span></p>
                )}
                {c.transferToFamily != null && (
                  <p className="text-xs text-muted-foreground">家庭转入 <span className="text-foreground font-medium">¥{c.transferToFamily.toLocaleString()}</span></p>
                )}
                {c.balance != null && (
                  <p className="text-xs text-muted-foreground">余额 <span className="text-foreground font-medium">¥{c.balance.toLocaleString()}</span></p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
