"use client";

import { Car } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicles: Vehicle[];
  className?: string;
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function urgency(dateStr: string): { label: string; className: string } {
  const days = daysUntil(dateStr);
  if (days <= 7) return { label: "即将到期", className: "text-destructive" };
  if (days <= 30) return { label: "请留意", className: "text-amber-600" };
  return { label: "正常", className: "text-muted-foreground" };
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${y}/${parseInt(m)}/${parseInt(d)}`;
}

export function VehicleCard({ vehicles, className }: VehicleCardProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        车辆
      </p>
      <div className="space-y-5">
        {vehicles.map(v => {
          const inspection = urgency(v.nextInspection);
          const insurance = urgency(v.insuranceExpiry);
          return (
            <div key={v.id}>
              <div className="flex items-center gap-2 mb-2">
                <Car size={15} className="text-muted-foreground" />
                <p className="font-medium text-foreground text-sm">{v.name}</p>
              </div>
              <div className="pl-6 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">车检</span>
                  <span className="text-xs text-foreground">
                    {formatDate(v.nextInspection)}
                    <span className={cn("ml-2 font-medium", inspection.className)}>{inspection.label}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">保险</span>
                  <span className="text-xs text-foreground">
                    {formatDate(v.insuranceExpiry)}
                    <span className={cn("ml-2 font-medium", insurance.className)}>{insurance.label}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
