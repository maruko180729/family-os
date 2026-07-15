"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, CreditCard as CreditCardIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ConfirmDialog } from "@/components/editing";
import type { CreditCard, RecurringExpense, RecurringCategory } from "@/lib/types";
import { useCreditCards } from "@/hooks/useCreditCards";
import { useRecurringExpenses } from "@/hooks/useRecurringExpenses";
import { toast } from "@/hooks/useToast";

// ── Shared ────────────────────────────────────────────────────────────────
const RECURRING_CATEGORIES: RecurringCategory[] = [
  "房屋", "水电燃气", "通讯", "AI订阅", "娱乐", "保险", "税金", "其他"
];

// ── Credit Card Form ───────────────────────────────────────────────────────
function CardForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: CreditCard;
  onSave: (data: Omit<CreditCard, "id">) => void;
  onCancel: () => void;
}) {
  const [name, setName]           = useState(initial?.name ?? "");
  const [last4, setLast4]         = useState(initial?.last4 ?? "");
  const [billingDay, setBilling]  = useState(initial?.billingDay ? String(initial.billingDay) : "");
  const [paymentDay, setPayment]  = useState(initial?.paymentDay ? String(initial.paymentDay) : "");
  const [isDefault, setDefault]   = useState(initial?.isDefault ?? false);

  const canSave = name.trim().length > 0 && last4.trim().length === 4;

  return (
    <div className="space-y-3 py-3">
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">卡片名称</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="AMEX Gold"
          autoFocus
          className="w-full px-3.5 py-2.5 bg-muted rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">卡号后四位</label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={last4}
          onChange={e => setLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
          placeholder="1234"
          className="w-full px-3.5 py-2.5 bg-muted rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary font-mono"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">账单日</label>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={31}
            placeholder="1"
            value={billingDay}
            onChange={e => setBilling(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-muted rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">扣款日</label>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={31}
            placeholder="26"
            value={paymentDay}
            onChange={e => setPayment(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-muted rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={isDefault} onChange={e => setDefault(e.target.checked)} className="accent-primary" />
        <span className="text-sm text-foreground">设为默认</span>
      </label>
      <div className="flex gap-2 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium"
        >
          取消
        </button>
        <button
          onClick={() => onSave({ name: name.trim(), last4, billingDay: Number(billingDay) || undefined, paymentDay: Number(paymentDay) || undefined, isDefault })}
          disabled={!canSave}
          className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-40"
        >
          保存
        </button>
      </div>
    </div>
  );
}

// ── Recurring Expense Form ─────────────────────────────────────────────────
function RecurringForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: RecurringExpense;
  onSave: (data: Omit<RecurringExpense, "id">) => void;
  onCancel: () => void;
}) {
  const [name, setName]             = useState(initial?.name ?? "");
  const [amount, setAmount]         = useState(initial?.amount ? String(initial.amount) : "");
  const [paymentDay, setPayDay]     = useState(initial?.paymentDay ? String(initial.paymentDay) : "");
  const [category, setCategory]     = useState<RecurringCategory>(initial?.category ?? "其他");
  const [enabled, setEnabled]       = useState(initial?.enabled ?? true);
  const [note, setNote]             = useState(initial?.note ?? "");

  const canSave = name.trim().length > 0 && Number(amount) > 0;

  return (
    <div className="space-y-3 py-3">
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">名称</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Netflix"
          autoFocus
          className="w-full px-3.5 py-2.5 bg-muted rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">默认金额</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">¥</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full pl-7 pr-3 py-2.5 bg-muted rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="w-24">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">扣款日</label>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={31}
            placeholder="1"
            value={paymentDay}
            onChange={e => setPayDay(e.target.value)}
            className="w-full px-3 py-2.5 bg-muted rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">分类</label>
        <div className="flex flex-wrap gap-1.5">
          {RECURRING_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === cat
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">备注（可选）</label>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder=""
          className="w-full px-3.5 py-2.5 bg-muted rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} className="accent-primary" />
        <span className="text-sm text-foreground">已启用</span>
      </label>
      <div className="flex gap-2 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium"
        >
          取消
        </button>
        <button
          onClick={() => onSave({ name: name.trim(), amount: Number(amount), paymentDay: Number(paymentDay) || undefined, category, enabled, note: note.trim() || undefined })}
          disabled={!canSave}
          className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-40"
        >
          保存
        </button>
      </div>
    </div>
  );
}

// ── Main sheet ─────────────────────────────────────────────────────────────
type Tab = "recurring" | "cards";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PaymentCenterSheet({ open, onClose }: Props) {
  const { cards, addCard, updateCard, deleteCard } = useCreditCards();
  const { items, addItem, updateItem, toggleItem, deleteItem } = useRecurringExpenses();

  const [tab, setTab] = useState<Tab>("recurring");

  // Card state
  const [addingCard, setAddingCard]       = useState(false);
  const [editingCard, setEditingCard]     = useState<CreditCard | null>(null);
  const [deleteCardId, setDeleteCardId]   = useState<string | null>(null);

  // Recurring state
  const [addingItem, setAddingItem]       = useState(false);
  const [editingItem, setEditingItem]     = useState<RecurringExpense | null>(null);
  const [deleteItemId, setDeleteItemId]   = useState<string | null>(null);

  return (
    <>
      <Sheet open={open} onOpenChange={v => !v && onClose()}>
        <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-10 pt-6 max-w-[480px] mx-auto max-h-[85dvh] overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-lg font-semibold text-left">支付管理</SheetTitle>
          </SheetHeader>

          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {([["recurring", "固定支出"], ["cards", "信用卡"]] as [Tab, string][]).map(([t, label]) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                  tab === t ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Recurring Expenses Tab ── */}
          {tab === "recurring" && (
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id}>
                  {editingItem?.id === item.id ? (
                    <RecurringForm
                      initial={item}
                      onSave={data => { updateItem({ ...item, ...data }); setEditingItem(null); toast("已更新"); }}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-2xl">
                      <button onClick={() => toggleItem(item.id)} className="shrink-0 text-muted-foreground">
                        {item.enabled
                          ? <ToggleRight size={20} className="text-primary" />
                          : <ToggleLeft size={20} />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${!item.enabled && "text-muted-foreground line-through"}`}>{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category} · ¥{item.amount.toLocaleString()}{item.paymentDay ? ` · ${item.paymentDay}日` : ""}</p>
                      </div>
                      <button onClick={() => setEditingItem(item)} className="p-1.5 text-muted-foreground hover:text-foreground">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteItemId(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {addingItem ? (
                <RecurringForm
                  onSave={data => { addItem(data); setAddingItem(false); toast("已添加"); }}
                  onCancel={() => setAddingItem(false)}
                />
              ) : (
                <button
                  onClick={() => setAddingItem(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-border text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  <Plus size={14} /> 新增固定支出
                </button>
              )}
            </div>
          )}

          {/* ── Credit Cards Tab ── */}
          {tab === "cards" && (
            <div className="space-y-2">
              {cards.map(card => (
                <div key={card.id}>
                  {editingCard?.id === card.id ? (
                    <CardForm
                      initial={card}
                      onSave={data => { updateCard({ ...card, ...data }); setEditingCard(null); toast("已更新"); }}
                      onCancel={() => setEditingCard(null)}
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-2xl">
                      <CreditCardIcon size={16} className="shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{card.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          ••••{card.last4}
                          {card.paymentDay ? ` · 扣款日 ${card.paymentDay}日` : ""}
                          {card.isDefault ? " · 默认" : ""}
                        </p>
                      </div>
                      <button onClick={() => setEditingCard(card)} className="p-1.5 text-muted-foreground hover:text-foreground">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteCardId(card.id)} className="p-1.5 text-muted-foreground hover:text-destructive">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {addingCard ? (
                <CardForm
                  onSave={data => { addCard(data); setAddingCard(false); toast("已添加"); }}
                  onCancel={() => setAddingCard(false)}
                />
              ) : (
                <button
                  onClick={() => setAddingCard(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-border text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  <Plus size={14} /> 新增信用卡
                </button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={deleteCardId !== null}
        title="删除信用卡"
        message="确定删除这张卡吗？已记录的支出不受影响。"
        onConfirm={() => { if (deleteCardId) deleteCard(deleteCardId); setDeleteCardId(null); toast("已删除"); }}
        onCancel={() => setDeleteCardId(null)}
      />

      <ConfirmDialog
        open={deleteItemId !== null}
        title="删除固定支出"
        message="确定删除此项目吗？已记录的支出不受影响。"
        onConfirm={() => { if (deleteItemId) deleteItem(deleteItemId); setDeleteItemId(null); toast("已删除"); }}
        onCancel={() => setDeleteItemId(null)}
      />
    </>
  );
}
