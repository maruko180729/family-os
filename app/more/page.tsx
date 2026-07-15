"use client";

import { ChevronRight, Home, Leaf, TrendingUp, Gift, Shield, Calendar, Settings, Info } from "lucide-react";
import Link from "next/link";
import { SectionCard } from "@/components/ui/SectionCard";
import { getTimeline } from "@/lib/storage";
import { lastReviewableMonth } from "@/lib/utils";

const taxItems = [
  { label: "iDeCo",      desc: "每月 ¥23,000 节税",    icon: Shield   },
  { label: "NISA",       desc: "年额 ¥360,000 免税",    icon: TrendingUp },
  { label: "ふるさと納税", desc: "建议 10～11 月确认",   icon: Gift     },
  { label: "生命保险控除", desc: "年末调整时申报",        icon: Leaf     },
];

const menuItems = [
  { label: "月度回顾", desc: "每月记录一次",  icon: Calendar, href: "/review" },
  { label: "设置",     desc: "账户与偏好",    icon: Settings },
  { label: "关于 Family OS", desc: "Alpha 0.5", icon: Info },
];

export default function MorePage() {
  const reviewMonth = lastReviewableMonth();
  const reviewed = getTimeline().some(t => t.month === reviewMonth && t.status === "published");
  const reviewMonthNum = parseInt(reviewMonth.split("-")[1]);

  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">更多功能</p>
        <h1 className="text-2xl font-semibold text-foreground">更多</h1>
      </div>

      <SectionCard label="节税中心">
        <div className="space-y-1">
          {taxItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 p-3 rounded-2xl active:bg-muted hover:bg-muted transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard>
        <div className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </>
            );
            const className = "w-full flex items-center gap-3 p-3 rounded-2xl active:bg-muted hover:bg-muted transition-colors text-left";
            return item.href ? (
              <Link key={item.label} href={item.href} className={className}>{content}</Link>
            ) : (
              <button key={item.label} className={className}>{content}</button>
            );
          })}
        </div>
      </SectionCard>

      {/* 家页面入口 */}
      <Link href="/" className="block bg-accent rounded-3xl p-5 border border-border active:scale-95 transition-transform">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
            <Home size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">今天</p>
            <p className="text-xs text-muted-foreground">家庭概览与每日提醒</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground ml-auto" />
        </div>
      </Link>

      {/* 月度回顾入口 */}
      <div className="bg-accent rounded-3xl p-5 border border-border">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-accent-foreground mb-1">{reviewMonthNum} 月月度回顾</p>
            <p className="text-xs text-muted-foreground">{reviewed ? "已完成" : "还未填写本月回顾"}</p>
          </div>
          <Link
            href="/review"
            className="bg-primary text-white text-xs font-medium px-4 py-2 rounded-full active:scale-95 transition-transform"
          >
            {reviewed ? "查看" : "开始填写"}
          </Link>
        </div>
      </div>
    </div>
  );
}
