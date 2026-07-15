"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { MonthSelector } from "@/components/MonthSelector";
import { HeroCard } from "@/components/ui/HeroCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { useMonth } from "@/hooks/useMonth";
import { useAssets } from "@/hooks/useAssets";
import { useCountUp } from "@/hooks/useCountUp";
import UpdateAssetsSheet from "@/components/UpdateAssetsSheet";
import LineChart from "@/components/LineChart";

export default function AssetsPage() {
  const { month, display, prev, next, isCurrentMonth } = useMonth();
  const { groups, netAsset, monthlyChange, trend, updateSnapshot, currentAmounts, hasData, lastUpdated } = useAssets(month);
  const [sheetOpen, setSheetOpen] = useState(false);

  const animatedNet = useCountUp(netAsset, 1200, 200);

  const trendValues = trend.map(t => t.netAsset);
  const trendLabels = trend.map(t => {
    const [, m] = t.month.split("-");
    return `${parseInt(m)}月`;
  });

  // Rule-based AI advisor
  const advisorText = (() => {
    if (!hasData) return "本月尚未录入资产快照。点击「更新资产」，录入各类资产当前总额。";
    const investGroup = groups.find(g => g.group === "investment")!;
    const chinaGroup  = groups.find(g => g.group === "china")!;

    if (monthlyChange > 0) {
      if (investGroup.change > 150000)
        return `本月净资产增加 ¥${monthlyChange.toLocaleString()}，投资资产表现突出，增加 ¥${investGroup.change.toLocaleString()}。家庭资产持续成长。`;
      if (chinaGroup.change > 100000)
        return `本月净资产增加 ¥${monthlyChange.toLocaleString()}，中国资产明显增长。建议持续关注汇率变动。`;
      if (monthlyChange > 200000)
        return `本月净资产增加 ¥${monthlyChange.toLocaleString()}，增幅良好，家庭财务保持健康增长态势。`;
      return `本月净资产增加 ¥${monthlyChange.toLocaleString()}，家庭资产稳步增长。`;
    }
    if (monthlyChange < 0)
      return `本月净资产减少 ¥${Math.abs(monthlyChange).toLocaleString()}，请确认是否为季节性支出或临时波动。`;
    return "本月净资产暂无变化，数据已记录。";
  })();

  const changePositive = monthlyChange >= 0;
  const changePrefix   = changePositive ? "+" : "";

  return (
    <div className="pt-10 space-y-4">
      {/* 月份切换 */}
      <MonthSelector display={display} subtitle="家庭资产" prev={prev} next={next} disableNext={isCurrentMonth} />

      {/* Hero */}
      <HeroCard>
        <div className="flex items-start justify-between mb-1">
          <p className="text-sm text-white/70">家庭净资产</p>
          {lastUpdated && (
            <p className="text-[10px] text-white/50">
              更新于 {new Date(lastUpdated).toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })}
            </p>
          )}
        </div>
        <p className="text-3xl font-bold tracking-tight text-white">
          ¥{animatedNet.toLocaleString()}
        </p>
        <p className={`text-sm mt-1 ${changePositive ? "text-white/80" : "text-red-300"}`}>
          本月变化 {changePrefix}¥{Math.abs(monthlyChange).toLocaleString()}
        </p>

        {/* 12-month trend — only show once the current month itself has a snapshot,
            otherwise the rising historical line reads as contradicting the ¥0 shown above */}
        {hasData && trendValues.length >= 2 && (
          <div className="mt-4">
            <LineChart data={trendValues} labels={trendLabels} color="white" height={72} />
          </div>
        )}
      </HeroCard>

      {/* 资产分类 */}
      <SectionCard label="资产分类">
        <div className="space-y-3">
          {groups.map(g => (
            <div key={g.group} className="flex items-center justify-between">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${g.colorClass}`}>
                {g.label}
              </span>
              <div className="text-right">
                {g.recorded ? (
                  <>
                    <p className="text-sm font-semibold text-foreground">
                      ¥{g.amount.toLocaleString()}
                    </p>
                    {g.change !== 0 && (
                      <p className={`text-xs ${g.change > 0 ? "text-primary" : "text-destructive"}`}>
                        {g.change > 0 ? "+" : ""}¥{g.change.toLocaleString()}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-sm font-medium text-muted-foreground">—</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* AI 家庭顾问 */}
      <SectionCard label="家庭顾问">
        <p className="text-sm text-foreground leading-[1.8]">{advisorText}</p>
      </SectionCard>

      {/* 更新资产 */}
      <button
        onClick={() => setSheetOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm active:scale-95 transition-transform"
      >
        <RefreshCw size={15} />
        更新资产快照
      </button>

      <UpdateAssetsSheet
        open={sheetOpen}
        currentMonth={month}
        currentAmounts={currentAmounts}
        onClose={() => setSheetOpen(false)}
        onSave={updateSnapshot}
      />
    </div>
  );
}
