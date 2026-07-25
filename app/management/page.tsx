"use client";

import { useState } from "react";
import { Plus, Trash2, Settings2, AlertCircle } from "lucide-react";
import { MonthSelector } from "@/components/MonthSelector";
import { HeroCard } from "@/components/ui/HeroCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { useMonth } from "@/hooks/useMonth";
import { useManagement } from "@/hooks/useManagement";
import AddIncomeSheet from "@/components/AddIncomeSheet";
import AddExpenseSheet from "@/components/AddExpenseSheet";
import PaymentCenterSheet from "@/components/PaymentCenterSheet";
import { toast } from "@/hooks/useToast";
import { getCreditCards, getRecurringExpenses } from "@/lib/storage";
import type { IncomeSource, Expense, RecurringExpense } from "@/lib/types";

const INCOME_LABELS: Record<IncomeSource, string> = {
  salary: "工资",
  spouse: "配偶入金",
  other:  "其他收入",
};

function buildExpenseLookups() {
  const cards = getCreditCards();
  const recurring = getRecurringExpenses();
  const cardMap = Object.fromEntries(cards.map(c => [c.id, c]));
  const recurringMap = Object.fromEntries(recurring.map(r => [r.id, r]));
  return { cardMap, recurringMap };
}

function expenseSourceLabel(item: Expense, cardMap: Record<string, { name: string; last4: string }>, recurringMap: Record<string, { name: string }>): string {
  const type = item.expenseType ?? item.category;
  if (type === "credit") {
    if (item.paymentSourceId && cardMap[item.paymentSourceId]) {
      const c = cardMap[item.paymentSourceId];
      return `${c.name} •••• ${c.last4}`;
    }
    return "信用卡";
  }
  if (type === "recurring" || type === "fixed") {
    if (item.recurringId && recurringMap[item.recurringId]) {
      return recurringMap[item.recurringId].name;
    }
    return item.note ?? "固定支出";
  }
  return item.note ?? "其他支出";
}

export default function ManagementPage() {
  const { month, display, prev, next, isCurrentMonth } = useMonth();
  const { cardMap, recurringMap } = buildExpenseLookups();
  const {
    income, expenses,
    totalIncome, totalExpense, balance, expenseRatio,
    addIncome, addExpense, deleteIncome, deleteExpense,
  } = useManagement(month);

  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<RecurringExpense | undefined>(undefined);
  const [paymentCenterOpen, setPaymentCenterOpen] = useState(false);

  // Variable templates with no expense recorded for this month
  const pendingVariableTemplates = getRecurringExpenses()
    .filter(r => r.enabled && r.amountType === "variable")
    .filter(r => !expenses.some(e => e.recurringId === r.id));

  function openForTemplate(template: RecurringExpense) {
    setPendingTemplate(template);
    setExpenseOpen(true);
  }

  function openNormalExpense() {
    setPendingTemplate(undefined);
    setExpenseOpen(true);
  }

  const advisorText = (() => {
    if (totalIncome === 0) return "本月尚未录入收入，请完善本月经营数据。";
    if (balance < 0) return `本月支出超过收入 ¥${Math.abs(balance).toLocaleString()}，建议检查固定支出项目。`;
    if (expenseRatio <= 30) return `本月家庭经营状态良好。支出占收入 ${expenseRatio}%，结余充裕，可考虑增加储蓄或投资。`;
    if (expenseRatio <= 50) return `本月家庭经营稳定。支出占收入 ${expenseRatio}%，结余情况良好。`;
    if (expenseRatio <= 70) return `本月支出占收入 ${expenseRatio}%，略偏高。建议关注下月支出结构。`;
    return `本月支出占收入 ${expenseRatio}%，结余偏低，建议梳理可压缩的支出项目。`;
  })();

  return (
    <div className="pt-10 space-y-4">
      <MonthSelector display={display} subtitle="家庭经营" prev={prev} next={next} disableNext={isCurrentMonth} />

      <HeroCard>
        <p className="text-sm text-white/70 mb-1">本月结余</p>
        <p className={`text-3xl font-bold tracking-tight ${balance < 0 ? "text-red-300" : "text-white"}`}>
          {balance >= 0 ? "+" : ""}¥{balance.toLocaleString()}
        </p>
        <div className="flex gap-6 mt-3 pt-3 border-t border-white/20">
          <div>
            <p className="text-xs text-white/60 mb-0.5">收入</p>
            <p className="text-base font-semibold text-white">¥{totalIncome.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-white/60 mb-0.5">支出</p>
            <p className="text-base font-semibold text-white/90">¥{totalExpense.toLocaleString()}</p>
          </div>
          {totalIncome > 0 && (
            <div className="ml-auto text-right">
              <p className="text-xs text-white/60 mb-0.5">支出占比</p>
              <p className="text-base font-semibold text-white">{expenseRatio}%</p>
            </div>
          )}
        </div>
      </HeroCard>

      {/* 本月待输入 — variable templates without recorded expense */}
      {pendingVariableTemplates.length > 0 && (
        <SectionCard>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={13} className="text-amber-500" />
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">本月待输入</p>
          </div>
          <div className="space-y-2.5">
            {pendingVariableTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => openForTemplate(template)}
                className="w-full flex items-center justify-between px-4 py-3 bg-amber-50 rounded-2xl active:scale-[0.98] transition-transform text-left"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{template.name}</p>
                  {template.paymentDay && (
                    <p className="text-xs text-muted-foreground mt-0.5">扣款日：{template.paymentDay}日</p>
                  )}
                </div>
                <span className="text-xs text-amber-600 font-medium">金额待输入 →</span>
              </button>
            ))}
          </div>
        </SectionCard>
      )}

      {/* 收入明细 */}
      <SectionCard>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">收入明细</p>
          <button onClick={() => setIncomeOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-primary bg-accent px-3 py-1.5 rounded-full active:scale-95 transition-transform">
            <Plus size={13} />新增
          </button>
        </div>
        {income.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">暂无收入记录</p>
        ) : (
          <div className="space-y-2.5">
            {income.map(item => (
              <div key={item.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-accent text-primary font-medium">
                    {INCOME_LABELS[item.source]}
                  </span>
                  {item.note && <span className="text-xs text-muted-foreground">{item.note}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary">+¥{item.amount.toLocaleString()}</span>
                  <button onClick={() => deleteIncome(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                    <Trash2 size={13} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 支出明细 */}
      <SectionCard>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">支出明细</p>
          <button onClick={openNormalExpense}
            className="flex items-center gap-1 text-xs font-medium text-destructive bg-red-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform">
            <Plus size={13} />新增
          </button>
        </div>
        {expenses.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">暂无支出记录</p>
        ) : (
          <div className="space-y-2.5">
            {expenses.map(item => (
              <div key={item.id} className="flex items-center justify-between group">
                <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-medium">
                  {expenseSourceLabel(item, cardMap, recurringMap)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-destructive">-¥{item.amount.toLocaleString()}</span>
                  <button onClick={() => deleteExpense(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                    <Trash2 size={13} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard label="家庭顾问">
        <p className="text-sm text-foreground leading-[1.8]">{advisorText}</p>
      </SectionCard>

      <button onClick={() => setPaymentCenterOpen(true)}
        className="w-full flex items-center justify-between px-5 py-4 bg-card border border-border rounded-3xl shadow-sm active:scale-[0.98] transition-transform">
        <div className="flex items-center gap-3">
          <Settings2 size={16} className="text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">支付管理</p>
            <p className="text-xs text-muted-foreground">信用卡 · 固定支出模板</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">管理 →</span>
      </button>

      <AddIncomeSheet
        open={incomeOpen}
        currentMonth={month}
        onClose={() => setIncomeOpen(false)}
        onSave={(source, amount, date, note) => {
          const saved = addIncome(source, amount, date, note);
          if (saved !== month) {
            const [y, m] = saved.split("-");
            toast(`已保存到 ${y}年${parseInt(m)}月`);
          }
        }}
      />

      <AddExpenseSheet
        open={expenseOpen}
        currentMonth={month}
        initialTemplate={pendingTemplate}
        onClose={() => { setExpenseOpen(false); setPendingTemplate(undefined); }}
        onSave={payload => {
          const saved = addExpense(payload);
          if (saved !== month) {
            const [y, m] = saved.split("-");
            toast(`已保存到 ${y}年${parseInt(m)}月`);
          }
          return saved;
        }}
      />

      <PaymentCenterSheet
        open={paymentCenterOpen}
        onClose={() => setPaymentCenterOpen(false)}
      />
    </div>
  );
}
