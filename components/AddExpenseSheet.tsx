"use client";

import { useState } from "react";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { ExpenseCategory, ExpenseType, CreditCard, RecurringExpense } from "@/lib/types";
import { getCreditCards } from "@/lib/storage";
import { getRecurringExpenses } from "@/lib/storage";

const CATEGORY_LABELS: Record<string, string> = {
  fixed:  "固定支出",
  credit: "信用卡",
  other:  "其他支出",
};

interface SavePayload {
  category: ExpenseCategory;
  expenseType: ExpenseType;
  amount: number;
  date: string;
  note?: string;
  paymentSourceId?: string;
  recurringId?: string;
}

interface Props {
  open: boolean;
  currentMonth: string;
  onClose: () => void;
  onSave: (payload: SavePayload) => string; // returns saved month
}

type Mode = "fixed" | "credit" | "other";

// ── Fixed expense flow ─────────────────────────────────────────────────────
function FixedFlow({ currentMonth, onClose, onSave }: { currentMonth: string; onClose: () => void; onSave: (p: SavePayload) => void }) {
  const items = getRecurringExpenses().filter(r => r.enabled);
  const [selected, setSelected] = useState<RecurringExpense | null>(null);
  const [amount, setAmount] = useState("");

  function handleSelect(item: RecurringExpense) {
    setSelected(item);
    setAmount(String(item.amount));
  }

  function handleSave() {
    const num = parseInt(amount.replace(/,/g, ""), 10);
    if (!selected || !num || num <= 0) return;
    const day = selected.paymentDay
      ? String(selected.paymentDay).padStart(2, "0")
      : "01";
    const date = `${currentMonth}-${day}`;
    onSave({
      category: "fixed",
      expenseType: "recurring",
      amount: num,
      date,
      recurringId: selected.id,
    });
  }

  if (!selected) {
    return (
      <div className="space-y-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => handleSelect(item)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-muted rounded-2xl active:scale-[0.98] transition-transform text-left"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
            </div>
            <p className="text-sm font-semibold text-foreground">¥{item.amount.toLocaleString()}</p>
          </button>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">暂无启用的固定支出项目</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-xs text-muted-foreground">
        <ChevronLeft size={14} /> 重新选择
      </button>

      <div className="flex items-center justify-between px-4 py-3 bg-accent rounded-2xl">
        <div>
          <p className="text-sm font-semibold text-primary">{selected.name}</p>
          <p className="text-xs text-muted-foreground">{selected.category}</p>
        </div>
        <CheckCircle2 size={18} className="text-primary" />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">金额（円）</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">¥</span>
          <input
            type="number"
            inputMode="numeric"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            autoFocus
            className="w-full pl-8 pr-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!amount || parseInt(amount) <= 0}
        className="w-full py-3.5 rounded-2xl bg-destructive text-white font-semibold text-sm disabled:opacity-40 active:scale-95 transition-transform"
      >
        保存
      </button>
      <button onClick={onClose} className="w-full py-3 rounded-2xl text-muted-foreground text-sm">取消</button>
    </div>
  );
}

// ── Credit card flow ───────────────────────────────────────────────────────
function CreditFlow({ onClose, onSave }: { onClose: () => void; onSave: (p: SavePayload) => void }) {
  const cards = getCreditCards();
  const [selected, setSelected] = useState<CreditCard | null>(null);
  const [amount, setAmount] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  function handleSave() {
    const num = parseInt(amount.replace(/,/g, ""), 10);
    if (!selected || !num || num <= 0) return;
    onSave({
      category: "credit",
      expenseType: "credit",
      amount: num,
      date,
      paymentSourceId: selected.id,
    });
  }

  if (!selected) {
    return (
      <div className="space-y-2">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => setSelected(card)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-muted rounded-2xl active:scale-[0.98] transition-transform text-left"
          >
            <p className="text-sm font-medium text-foreground">{card.name}</p>
            <p className="text-xs text-muted-foreground font-mono">••••{card.last4}</p>
          </button>
        ))}
        {cards.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">暂无信用卡，请先在支付管理中添加</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-xs text-muted-foreground">
        <ChevronLeft size={14} /> 重新选择
      </button>

      <div className="flex items-center justify-between px-4 py-3 bg-accent rounded-2xl">
        <div>
          <p className="text-sm font-semibold text-primary">{selected.name}</p>
          <p className="text-xs text-muted-foreground font-mono">••••{selected.last4}</p>
        </div>
        <CheckCircle2 size={18} className="text-primary" />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">账单金额（円）</label>
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

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">日期</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
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
      <button onClick={onClose} className="w-full py-3 rounded-2xl text-muted-foreground text-sm">取消</button>
    </div>
  );
}

// ── Other expense flow ─────────────────────────────────────────────────────
function OtherFlow({ onClose, onSave }: { onClose: () => void; onSave: (p: SavePayload) => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");

  function handleSave() {
    const num = parseInt(amount.replace(/,/g, ""), 10);
    if (!num || num <= 0) return;
    onSave({ category: "other", expenseType: "other", amount: num, date, note: note || undefined });
  }

  return (
    <div className="space-y-4">
      <div>
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

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">日期</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full px-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">说明（可选）</label>
        <input
          type="text"
          placeholder="例：医疗费"
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
      <button onClick={onClose} className="w-full py-3 rounded-2xl text-muted-foreground text-sm">取消</button>
    </div>
  );
}

// ── Main sheet ─────────────────────────────────────────────────────────────
export default function AddExpenseSheet({ open, currentMonth, onClose, onSave }: Props) {
  const [mode, setMode] = useState<Mode>("fixed");

  function handleSave(payload: SavePayload) {
    const saved = onSave(payload);
    if (saved !== currentMonth) {
      // parent handles toast
    }
    setMode("fixed");
    onClose();
  }

  const modeTitle: Record<Mode, string> = {
    fixed:  "选择固定支出",
    credit: "选择信用卡",
    other:  "其他支出",
  };

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-10 pt-6 max-w-[480px] mx-auto">
        <SheetHeader className="mb-5">
          <SheetTitle className="text-lg font-semibold text-left">新增支出</SheetTitle>
        </SheetHeader>

        {/* Type tabs */}
        <div className="flex gap-2 mb-5">
          {(["fixed", "credit", "other"] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                mode === m ? "bg-destructive text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              {CATEGORY_LABELS[m === "fixed" ? "fixed" : m === "credit" ? "credit" : "other"]}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mb-3">{modeTitle[mode]}</p>

        {mode === "fixed"  && <FixedFlow  currentMonth={currentMonth} onClose={onClose} onSave={handleSave} />}
        {mode === "credit" && <CreditFlow onClose={onClose} onSave={handleSave} />}
        {mode === "other"  && <OtherFlow  onClose={onClose} onSave={handleSave} />}
      </SheetContent>
    </Sheet>
  );
}
