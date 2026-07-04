"use client";

import { Heart } from "lucide-react";
import { HeroCard } from "@/components/ui/HeroCard";
import { MemberCard } from "@/components/ui/MemberCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockMembers, mockSettings } from "@/lib/mock";

const anniversaries = [
  { label: "结婚纪念日", date: "每年 5 月 20 日" },
  { label: "Maruko 生日", date: "每年 3 月 7 日" },
];

export default function FamilyPage() {
  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">家庭档案</p>
        <h1 className="text-2xl font-semibold text-foreground">{mockSettings.familyName}</h1>
      </div>

      <HeroCard>
        <div className="flex items-center gap-2 mb-3">
          <Heart size={15} className="text-white/70" fill="currentColor" />
          <span className="text-sm text-white/70">家庭理念</span>
        </div>
        <p className="text-lg font-medium leading-relaxed">一起把生活经营得越来越好。</p>
      </HeroCard>

      <MemberCard members={mockMembers} />

      <SectionCard label="家庭纪念日">
        <div className="space-y-3">
          {anniversaries.map(a => (
            <div key={a.label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{a.label}</span>
              <span className="text-sm text-muted-foreground">{a.date}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <EmptyState emoji="📷" title="家庭照片" description="即将开放" />
    </div>
  );
}
