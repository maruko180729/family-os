"use client";

import { ArrowUpRight } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { HeroCard } from "@/components/ui/HeroCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { ReminderCard } from "@/components/ui/ReminderCard";
import { mockReminders } from "@/lib/mock";
import { getLatestNetAsset } from "@/hooks/useAssets";

export default function TodayPage() {
  const { netAsset: netAssetTarget, change: deltaTarget } = getLatestNetAsset();
  const netAsset = useCountUp(netAssetTarget, 1200, 200);
  const delta = useCountUp(deltaTarget, 900, 400);

  return (
    <div className="pt-12 space-y-4">
      {/* 问候 */}
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">晚上好，徐瑞</p>
        <h1 className="text-2xl font-semibold text-foreground leading-snug">
          今天，我们的小家<br />
          <span className="text-primary">很好。</span>
        </h1>
      </div>

      {/* Hero 净资产 */}
      <HeroCard>
        <p className="text-sm text-white/70 mb-1">家庭净资产</p>
        <p className="text-3xl font-bold tracking-tight">¥{netAsset.toLocaleString()}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <ArrowUpRight size={14} className="text-white/75" />
          <span className="text-sm text-white/75">本月 +¥{delta.toLocaleString()}</span>
        </div>
      </HeroCard>

      {/* 家庭状态 */}
      <SectionCard>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <span className="text-sm font-medium text-primary">状态：健康</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1.5">本月没有需要担心的事情。</p>
      </SectionCard>

      {/* 家庭顾问 */}
      <SectionCard label="家庭顾问">
        <p className="text-sm text-foreground leading-[1.8]">
          本月最大的进步是开始了 NISA 定投，让长期资产配置更加系统。创业资金也在持续累积，整体走势稳健。建议在 10 月底前开始准备故乡纳税，提前规划可以从容选择返礼品。
        </p>
      </SectionCard>

      {/* 待办提醒（只显示 pending） */}
      <ReminderCard reminders={mockReminders} />
    </div>
  );
}
