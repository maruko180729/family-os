"use client";

import { Heart } from "lucide-react";
import { Card, HeroCard, SectionLabel } from "@/components/ui/FamilyCard";

const members = [
  { name: "徐瑞", role: "会社员", avatar: "👨", note: "家庭财务负责人" },
  { name: "配偶", role: "经营者", avatar: "👩", note: "公司经营管理" },
  { name: "Maruko", role: "8 岁", avatar: "👧", note: "成长记录中" },
];

export default function FamilyPage() {
  return (
    <div className="pt-12 space-y-4">
      {/* 标题区 */}
      <div className="pb-2">
        <p className="text-sm text-muted-foreground mb-1">家庭档案</p>
        <h1 className="text-2xl font-semibold text-foreground">我们的小家</h1>
      </div>

      {/* 家庭理念卡 */}
      <HeroCard>
        <div className="flex items-center gap-2 mb-3">
          <Heart size={15} className="text-white/70" fill="currentColor" />
          <span className="text-sm text-white/70">家庭理念</span>
        </div>
        <p className="text-lg font-medium leading-relaxed">
          一起把生活经营得越来越好。
        </p>
      </HeroCard>

      {/* 家庭成员 */}
      <Card>
        <SectionLabel>家庭成员</SectionLabel>
        <div className="space-y-4">
          {members.map((m) => (
            <div key={m.name} className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center text-2xl shrink-0">
                {m.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-medium text-foreground">{m.name}</p>
                  <span className="text-xs text-muted-foreground">{m.role}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{m.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 家庭纪念日 */}
      <Card>
        <SectionLabel>家庭纪念日</SectionLabel>
        <div className="space-y-3">
          {[
            { label: "结婚纪念日", date: "每年 5 月 20 日" },
            { label: "Maruko 生日", date: "每年 3 月 7 日" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{item.label}</span>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 家庭照片占位 */}
      <div className="bg-muted rounded-3xl p-8 border border-dashed border-border flex flex-col items-center justify-center gap-2">
        <span className="text-3xl">📷</span>
        <p className="text-sm text-muted-foreground">家庭照片（即将开放）</p>
      </div>
    </div>
  );
}
