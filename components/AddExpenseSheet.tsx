"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { ExpenseCategory } from "@/lib/types";

const CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: "fixed",  label: "固定支出" },
  { value: "credit", label: "信用卡" },
  { value: "other",  label: "其他支出" },
];

interface Props {
  open: boolean;
  currentMonth: string;
  onClose: () => void;
  onSave: (category: ExpenseCategory, amount: number, date: string, note?: string) => void;
}

export default function AddExpenseSheet({ open, currentMonth, onClose, onSave }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [category, setCategory] = useState<ExpenseCategory>("fixed");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");

  function handleSave() {
    const num = parseInt(amount.replace(/,/g, ""), 10);
    if (!num || num <= 0) return;
    onSave(category, num, date, note || undefined);
    setAmount("");
    setNote("");
    setCategory("fixed");
    setDate(today);
    onClose();
  }

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-10 pt-6 max-w-[480px] mx-auto">
        <SheetHeader className="mb-5">
          <SheetTitle className="text-lg font-semibold text-left">新增支出</SheetTitle>
        </SheetHeader>

        {/* 支出类型 */}
        <div className="flex gap-2 mb-5">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`flex-1 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                category === c.value
                  ? "bg-destructive text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {c.label}
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
            placeholder="例：房租"
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full px-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!amount || parseInt(amount) <= 0}
          className="w-full py-3.5 rounded-2xl bg-destructive text-white font-semibold text-sm disabled:opacity-40 active:scale-95 transition-transform"
        >
          保存
        </button>
      </SheetContent>
    </Sheet>
  );
}
