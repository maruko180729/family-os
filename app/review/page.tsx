"use client";

import { CheckCircle2 } from "lucide-react";
import { MonthSelector } from "@/components/MonthSelector";
import { HeroCard } from "@/components/ui/HeroCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { InputCard } from "@/components/ui/InputCard";
import { useMonth } from "@/hooks/useMonth";
import { useAssets } from "@/hooks/useAssets";
import { useManagement } from "@/hooks/useManagement";
import { useReview } from "@/hooks/useReview";
import { lastReviewableMonth } from "@/lib/utils";

function generateAiSummary(hasData: boolean, netChange: number, events: string, happyMoment: string): string {
  const parts: string[] = [];
  if (hasData) {
    if (netChange > 0) parts.push(`本月净资产增加 ¥${netChange.toLocaleString()}`);
    else if (netChange < 0) parts.push(`本月净资产减少 ¥${Math.abs(netChange).toLocaleString()}`);
    else parts.push("本月净资产暂无变化");
  }
  if (events.trim()) parts.push(events.trim());
  if (happyMoment.trim()) parts.push(`最开心的事：${happyMoment.trim()}`);
  if (parts.length === 0) return "本月还没有记录，填写后这里会生成总结。";
  return parts.join("。") + "。";
}

export default function ReviewPage() {
  const { month, display, prev, next } = useMonth(-1);
  const { netAsset: netAssetEnd, monthlyChange: netChange, hasData } = useAssets(month);
  const netAssetStart = netAssetEnd - netChange;
  const { totalIncome, totalExpense } = useManagement(month);
  const { entry, status, update, save } = useReview(month);

  const isLastReviewable = month === lastReviewableMonth();
  const aiSummary = generateAiSummary(hasData, netChange, entry.events, entry.happyMoment);

  function handleSave() {
    save(hasData ? netAssetStart : 0, hasData ? netAssetEnd : 0, aiSummary);
  }

  return (
    <div className="pt-10 space-y-4">
      <MonthSelector display={display} subtitle="月度回顾" prev={prev} next={next} disableNext={isLastReviewable} />

      <HeroCard>
        <p className="text-sm text-white/70 mb-1">净资产变化</p>
        {hasData ? (
          <>
            <p className="text-3xl font-bold tracking-tight text-white">
              {netChange >= 0 ? "+" : "-"}¥{Math.abs(netChange).toLocaleString()}
            </p>
            <p className="text-sm text-white/75 mt-1">
              ¥{netAssetStart.toLocaleString()} → ¥{netAssetEnd.toLocaleString()}
            </p>
          </>
        ) : (
          <p className="text-sm text-white/75 mt-1">该月尚未录入资产快照，请先到「资产」页面录入</p>
        )}
      </HeroCard>

      {status === "published" && (
        <div className="flex items-center gap-2 text-xs text-primary font-medium px-1">
          <CheckCircle2 size={14} />
          本月回顾已保存
        </div>
      )}

      <InputCard
        label="本月记录"
        fields={[
          {
            id: "events", label: "大事件", type: "textarea", value: entry.events,
            placeholder: "本月发生的重要事情", onChange: v => update("events", v),
          },
          {
            id: "incomeSummary", label: "收入概况", value: entry.incomeSummary,
            placeholder: totalIncome > 0 ? `例：本月收入共 ¥${totalIncome.toLocaleString()}` : "本月收入来源",
            onChange: v => update("incomeSummary", v),
          },
          {
            id: "expenseSummary", label: "支出备注", value: entry.expenseSummary,
            placeholder: totalExpense > 0 ? `例：本月支出共 ¥${totalExpense.toLocaleString()}` : "本月特殊支出",
            onChange: v => update("expenseSummary", v),
          },
          {
            id: "nextFocus", label: "下月重点", value: entry.nextFocus,
            placeholder: "下个月要关注的事情", onChange: v => update("nextFocus", v),
          },
          {
            id: "happyMoment", label: "最开心的事", value: entry.happyMoment,
            placeholder: "本月印象最深的开心时刻", onChange: v => update("happyMoment", v),
          },
        ]}
      />

      <SectionCard label="AI 月报总结">
        <p className="text-sm text-foreground leading-[1.8]">{aiSummary}</p>
      </SectionCard>

      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm active:scale-95 transition-transform"
      >
        保存本月回顾
      </button>
    </div>
  );
}
