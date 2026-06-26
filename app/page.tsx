"use client";

import { Bell, Clock, ArrowUpRight } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { Card, HeroCard, SectionLabel, AdvisorCard } from "@/components/ui/FamilyCard";

// 只展示未完成的提醒
const pendingReminders = [
  { text: "Maruko 疫苗还有 18 天", urgency: "soon" },
  { text: "故乡纳税建议 10～11 月确认", urgency: "later" },
];

export default function TodayPage() {
  const netAsset = useCountUp(13580000, 1200, 200);
  const delta = useCountUp(218000, 900, 400);

  return (
    <div className="pt-12 space-y-4">
      {/* 顶部问候 */}
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">晚上好，徐瑞</p>
        <h1 className="text-2xl font-semibold text-foreground leading-snug">
          今天，我们的小家
          <br />
          <span className="text-primary">很好。</span>
        </h1>
      </div>

      {/* Hero 净资产卡（高度降低约20%，padding 从 p-6 → p-5） */}
      <HeroCard>
        <p className="text-sm text-white/70 mb-1">家庭净资产</p>
        <p className="text-3xl font-bold tracking-tight">
          ¥{netAsset.toLocaleString()}
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          <ArrowUpRight size={14} className="text-white/75" />
          <span className="text-sm text-white/75">
            本月 +¥{delta.toLocaleString()}
          </span>
        </div>
      </HeroCard>

      {/* 家庭状态 */}
      <Card>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <span className="text-sm font-medium text-primary">状态：健康</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1.5">
          本月没有需要担心的事情。
        </p>
      </Card>

      {/* 家庭顾问 — 自然语言段落 */}
      <AdvisorCard>
        本月最大的进步是开始了 NISA 定投，让长期资产配置更加系统。创业资金也在持续累积，整体走势稳健。建议在 10 月底前开始准备故乡纳税，提前规划可以从容选择返礼品。
      </AdvisorCard>

      {/* 今日提醒 — 只显示未完成 */}
      {pendingReminders.length > 0 && (
        <Card>
          <SectionLabel>
            <span className="inline-flex items-center gap-1.5">
              <Bell size={12} />
              待办提醒
            </span>
          </SectionLabel>
          <div className="space-y-3">
            {pendingReminders.map((r, i) => (
              <div key={i} className="flex items-start gap-3">
                <Clock
                  size={15}
                  className={r.urgency === "soon" ? "text-amber-500 shrink-0 mt-0.5" : "text-muted-foreground shrink-0 mt-0.5"}
                />
                <p className="text-sm text-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
