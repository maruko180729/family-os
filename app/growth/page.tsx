"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/FamilyCard";

type GoalStatus = "正常" | "需要关注" | "已完成";

interface Goal {
  name: string;
  current: string;
  target: string;
  eta: string;
  progress: number;
  status: GoalStatus;
  emoji: string;
}

const goals: Goal[] = [
  {
    name: "家庭净资产",
    current: "¥13,580,000",
    target: "¥20,000,000",
    eta: "2028年",
    progress: 68,
    status: "正常",
    emoji: "📈",
  },
  {
    name: "创业资金",
    current: "¥2,500,000",
    target: "¥5,000,000",
    eta: "2026年",
    progress: 50,
    status: "正常",
    emoji: "🚀",
  },
  {
    name: "NISA",
    current: "¥360,000 / 年",
    target: "¥360,000 / 年",
    eta: "持续进行",
    progress: 100,
    status: "已完成",
    emoji: "💹",
  },
  {
    name: "iDeCo",
    current: "¥276,000 / 年",
    target: "¥276,000 / 年",
    eta: "持续进行",
    progress: 80,
    status: "正常",
    emoji: "🏦",
  },
  {
    name: "永住申请",
    current: "资料整理中",
    target: "提交申请",
    eta: "2025年内",
    progress: 40,
    status: "需要关注",
    emoji: "🏠",
  },
  {
    name: "健康",
    current: "Maruko 疫苗",
    target: "按时接种",
    eta: "18 天后",
    progress: 60,
    status: "需要关注",
    emoji: "💉",
  },
  {
    name: "旅行",
    current: "¥0",
    target: "¥200,000",
    eta: "年底",
    progress: 0,
    status: "正常",
    emoji: "✈️",
  },
];

const statusConfig: Record<GoalStatus, { color: string; bg: string; icon: React.ReactNode }> = {
  正常: {
    color: "text-primary",
    bg: "bg-accent",
    icon: <CheckCircle2 size={13} className="text-primary" />,
  },
  需要关注: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: <AlertCircle size={13} className="text-amber-500" />,
  },
  已完成: {
    color: "text-primary",
    bg: "bg-accent",
    icon: <CheckCircle2 size={13} className="text-primary" />,
  },
};

export default function GrowthPage() {
  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">目标管理</p>
        <h1 className="text-2xl font-semibold text-foreground">成长</h1>
      </div>

      {/* 直接展示目标列表，去掉顶部统计卡 */}
      <div className="space-y-3">
        {goals.map((goal) => {
          const conf = statusConfig[goal.status];
          return (
            <Card key={goal.name}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl leading-none">{goal.emoji}</span>
                  <div>
                    <p className="font-medium text-foreground text-sm">{goal.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{goal.eta}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${conf.bg} ${conf.color}`}>
                  {conf.icon}
                  <span>{goal.status}</span>
                </div>
              </div>

              {/* 进度条 */}
              <div className="bg-muted rounded-full h-1.5 mb-3">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: `${goal.progress}%`, transition: "width 0.8s ease" }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">当前：{goal.current}</span>
                <span className="text-xs text-muted-foreground">目标：{goal.target}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
