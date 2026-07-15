"use client";

import { ArrowUpRight } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { HeroCard } from "@/components/ui/HeroCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { ReminderCard } from "@/components/ui/ReminderCard";
import { getReminders } from "@/lib/storage";
import { getLatestNetAsset } from "@/hooks/useAssets";
import { getIncome, getExpenses } from "@/lib/storage";

function buildAdvisorText(): string {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const income = getIncome().filter(i => i.month === currentMonth);
  const expenses = getExpenses().filter(e => e.month === currentMonth);
  const { netAsset, change } = getLatestNetAsset();

  const totalIncome = income.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const parts: string[] = [];

  if (netAsset > 0) {
    if (change > 0) {
      parts.push(`本月净资产增加 ¥${change.toLocaleString()}，家庭资产持续成长。`);
    } else if (change < 0) {
      parts.push(`本月净资产减少 ¥${Math.abs(change).toLocaleString()}，建议关注支出结构。`);
    } else {
      parts.push(`本月净资产保持稳定。`);
    }
  }

  if (totalIncome > 0 && totalExpense > 0) {
    if (balance > 0) {
      parts.push(`本月结余 ¥${balance.toLocaleString()}，收支健康。`);
    } else if (balance < 0) {
      parts.push(`本月支出超出收入 ¥${Math.abs(balance).toLocaleString()}，请注意控制支出。`);
    }
  } else if (totalIncome === 0 && totalExpense === 0) {
    parts.push(`本月尚未录入收支数据，建议前往「经营」页面记录。`);
  }

  const month = now.getMonth() + 1;
  if (month >= 10 && month <= 11) {
    parts.push(`10～11月是确认故乡纳税的好时机，建议提前规划额度。`);
  } else if (month === 12) {
    parts.push(`年底前记得确认 NISA 年度额度是否用满。`);
  } else if (month === 1) {
    parts.push(`新年开始，适合制定本年度家庭目标计划。`);
  }

  return parts.length > 0 ? parts.join("") : "家庭状态良好，继续保持。";
}

export default function TodayPage() {
  const { netAsset: netAssetTarget, change: deltaTarget } = getLatestNetAsset();
  const netAsset = useCountUp(netAssetTarget, 1200, 200);
  const delta = useCountUp(deltaTarget, 900, 400);

  const reminders = getReminders().filter(r => r.status === "pending");
  const advisorText = buildAdvisorText();

  const statusHealthy = deltaTarget >= 0;

  return (
    <div className="pt-12 space-y-4">
      {/* 问候 */}
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">你好，徐瑞</p>
        <h1 className="text-2xl font-semibold text-foreground leading-snug">
          今天，我们的小家<br />
          <span className="text-primary">{statusHealthy ? "很好。" : "需要关注。"}</span>
        </h1>
      </div>

      {/* Hero 净资产 */}
      <HeroCard>
        <p className="text-sm text-white/70 mb-1">家庭净资产</p>
        <p className="text-3xl font-bold tracking-tight">¥{netAsset.toLocaleString()}</p>
        {deltaTarget !== 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <ArrowUpRight size={14} className="text-white/75" />
            <span className="text-sm text-white/75">
              本月 {deltaTarget > 0 ? "+" : ""}¥{delta.toLocaleString()}
            </span>
          </div>
        )}
      </HeroCard>

      {/* 家庭状态 */}
      <SectionCard>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full shrink-0 ${statusHealthy ? "bg-primary" : "bg-orange-400"}`} />
          <span className={`text-sm font-medium ${statusHealthy ? "text-primary" : "text-orange-600"}`}>
            状态：{statusHealthy ? "健康" : "注意"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1.5">
          {statusHealthy ? "本月没有需要担心的事情。" : "本月净资产有所下降，建议检查支出情况。"}
        </p>
      </SectionCard>

      {/* 家庭顾问 */}
      <SectionCard label="家庭顾问">
        <p className="text-sm text-foreground leading-[1.8]">{advisorText}</p>
      </SectionCard>

      {/* 待办提醒（只显示 pending） */}
      {reminders.length > 0 ? (
        <ReminderCard reminders={reminders} />
      ) : (
        <SectionCard>
          <p className="text-sm text-muted-foreground text-center py-2">暂无待处理事项</p>
        </SectionCard>
      )}
    </div>
  );
}
