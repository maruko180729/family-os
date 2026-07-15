"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { MonthSelector } from "@/components/MonthSelector";
import { HeroCard } from "@/components/ui/HeroCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { useMonth } from "@/hooks/useMonth";
import { useManagement } from "@/hooks/useManagement";
import AddIncomeSheet from "@/components/AddIncomeSheet";
import AddExpenseSheet from "@/components/AddExpenseSheet";
import { toast } from "@/hooks/useToast";
import type { IncomeSource, ExpenseCategory } from "@/lib/types";

const INCOME_LABELS: Record<IncomeSource, string> = {
  salary: "工资",
  spouse: "配偶入金",
  other:  "其他收入",
};

const EXPENSE_LABELS: Record<ExpenseCategory, string> = {
  fixed:  "固定支出",
  credit: "信用卡合计",
  other:  "其他支出",
};

export default function ManagementPage() {
  const { month, display, prev, next, isCurrentMonth } = useMonth();
  const {
    income, expenses,
    totalIncome, totalExpense, balance, expenseRatio,
    addIncome, addExpense, deleteIncome, deleteExpense,
  } = useManagement(month);

  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

  // AI advisor — rule-based text
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
      {/* 月份切换 */}
      <MonthSelector display={display} subtitle="家庭经营" prev={prev} next={next} disableNext={isCurrentMonth} />

      {/* Hero：结余 */}
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

      {/* 收入明细 */}
      <SectionCard>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">收入明细</p>
          <button
            onClick={() => setIncomeOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-primary bg-accent px-3 py-1.5 rounded-full active:scale-95 transition-transform"
          >
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
                  <span className="text-sm font-semibold text-primary">
                    +¥{item.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteIncome(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  >
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
          <button
            onClick={() => setExpenseOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-destructive bg-red-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
          >
            <Plus size={13} />新增
          </button>
        </div>

        {expenses.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">暂无支出记录</p>
        ) : (
          <div className="space-y-2.5">
            {expenses.map(item => (
              <div key={item.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-medium">
                    {EXPENSE_LABELS[item.category]}
                  </span>
                  {item.note && <span className="text-xs text-muted-foreground">{item.note}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-destructive">
                    -¥{item.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteExpense(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  >
                    <Trash2 size={13} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* AI 家庭顾问 */}
      <SectionCard label="家庭顾问">
        <p className="text-sm text-foreground leading-[1.8]">{advisorText}</p>
      </SectionCard>

      {/* Sheets */}
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
        onClose={() => setExpenseOpen(false)}
        onSave={(category, amount, date, note) => {
          const saved = addExpense(category, amount, date, note);
          if (saved !== month) {
            const [y, m] = saved.split("-");
            toast(`已保存到 ${y}年${parseInt(m)}月`);
          }
        }}
      />
    </div>
  );
}
