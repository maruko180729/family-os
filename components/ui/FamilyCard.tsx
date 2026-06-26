"use client";

import { cn } from "@/lib/utils";

// ── Card ────────────────────────────────────────────────────────────────────
export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card rounded-3xl p-5 border border-border shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

// ── Hero Card ────────────────────────────────────────────────────────────────
export function HeroCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-primary rounded-3xl p-5 text-white",
        className
      )}
    >
      {children}
    </div>
  );
}

// ── Section Header ───────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}

// ── Metric Display ───────────────────────────────────────────────────────────
export function Metric({
  label,
  value,
  delta,
  deltaPositive,
  size = "lg",
}: {
  label?: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  size?: "lg" | "sm";
}) {
  return (
    <div>
      {label && (
        <p className="text-sm text-white/70 mb-1">{label}</p>
      )}
      <p className={size === "lg" ? "text-3xl font-bold tracking-tight" : "text-xl font-bold tracking-tight"}>
        {value}
      </p>
      {delta && (
        <p className={`text-sm mt-1 ${deltaPositive !== false ? "text-white/75" : "text-white/60"}`}>
          {delta}
        </p>
      )}
    </div>
  );
}

// ── Advisor Card ─────────────────────────────────────────────────────────────
export function AdvisorCard({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <SectionLabel>家庭顾问</SectionLabel>
      <p className="text-sm text-foreground leading-[1.8]">{children}</p>
    </Card>
  );
}
