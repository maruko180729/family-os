"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { IncomeSource } from "@/lib/types";

const SOURCES: { value: IncomeSource; label: string }[] = [
  { value: "salary", label: "工资" },
  { value: "spouse", label: "配偶入金" },
  { value: "other",  label: "其他收入" },
];

interface Props {
  open: boolean;
  currentMonth: string; // "YYYY-MM"
  onClose: () => void;
  onSave: (source: IncomeSource, amount: number, date: string, note?: string) => void;
}

export default function AddIncomeSheet({ open, currentMonth, onClose, onSave }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [source, setSource] = useState<IncomeSource>("salary");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");

  function handleSave() {
    const num = parseInt(amount.replace(/,/g, ""), 10);
    if (!num || num <= 0) return;
    onSave(source, num, date, note || undefined);
    setAmount("");
    setNote("");
    setSource("salary");
    setDate(today);
    onClose();
  }

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-10 pt-6 max-w-[480px] mx-auto">
        <SheetHeader className="mb-5">
          <SheetTitle className="text-lg font-semibold text-left">新增收入</SheetTitle>
        </SheetHeader>

        {/* 收入类型 */}
        <div className="flex gap-2 mb-5">
          {SOURCES.map(s => (
            <button
              key={s.value}
              onClick={() => setSource(s.value)}
              className={`flex-1 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                source === s.value
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* 金额 */}
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">金额（円）</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">¥</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              autoFocus
              className="w-full pl-8 pr-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
            />
          </div>
        </div>

        {/* 日期 */}
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">日期</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full px-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>

        {/* 备注 */}
        <div className="mb-6">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">备注（可选）</label>
          <input
            type="text"
            placeholder="例：6月工资"
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full px-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!amount || parseInt(amount) <= 0}
          className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm disabled:opacity-40 active:scale-95 transition-transform"
        >
          保存
        </button>
      </SheetContent>
    </Sheet>
  );
}
