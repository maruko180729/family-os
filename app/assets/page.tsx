"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { Card, HeroCard, SectionLabel } from "@/components/ui/FamilyCard";
import LineChart from "@/components/LineChart";

const assetCategories = [
  { name: "应急资金", amount: 1500000, color: "bg-blue-100 text-blue-700", change: "+0" },
  { name: "投资资产", amount: 4200000, color: "bg-green-100 text-green-700", change: "+180,000" },
  { name: "国内资产", amount: 3800000, color: "bg-amber-100 text-amber-700", change: "+20,000" },
  { name: "创业资金", amount: 2500000, color: "bg-purple-100 text-purple-700", change: "+50,000" },
  { name: "公司资产", amount: 2580000, color: "bg-rose-100 text-rose-700", change: "+0" },
  { name: "负债", amount: -1000000, color: "bg-red-100 text-red-700", change: "-32,000" },
];

const monthlyChanges = [
  { label: "工资收入", amount: "+280,000", positive: true },
  { label: "投资收益", amount: "+48,000", positive: true },
  { label: "一次性支出", amount: "-65,000", positive: false },
  { label: "公司收入波动", amount: "-45,000", positive: false },
];

// 真实折线图数据：过去12个月净资产（万円）
const trendData = [1180, 1200, 1215, 1220, 1240, 1260, 1280, 1300, 1315, 1330, 1340, 1358];
const trendLabels = ["7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月"];

export default function AssetsPage() {
  const netAsset = useCountUp(13580000, 1200, 200);

  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">资产总览</p>
        <h1 className="text-2xl font-semibold text-foreground">家庭净资产</h1>
      </div>

      {/* Hero 净资产 + 折线图 */}
      <HeroCard>
        <p className="text-sm text-white/70 mb-1">家庭净资产</p>
        <p className="text-3xl font-bold tracking-tight">
          ¥{netAsset.toLocaleString()}
        </p>
        <p className="text-sm text-white/70 mt-1">本月变化 +¥218,000</p>

        {/* 真实 SVG 折线图 */}
        <div className="mt-4">
          <LineChart data={trendData} labels={trendLabels} color="white" height={72} />
        </div>
      </HeroCard>

      {/* 资产分类 */}
      <Card>
        <SectionLabel>资产分类</SectionLabel>
        <div className="space-y-3">
          {assetCategories.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cat.color}`}>
                {cat.name}
              </span>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {cat.amount < 0 ? "-" : ""}¥{Math.abs(cat.amount).toLocaleString()}
                </p>
                <p className={`text-xs ${cat.change.startsWith("+") ? "text-primary" : "text-red-500"}`}>
                  {cat.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 资产配置比例 */}
      <Card>
        <SectionLabel>资产配置比例</SectionLabel>
        <div className="flex rounded-full overflow-hidden h-2.5 mb-4">
          <div className="bg-blue-400" style={{ width: "11%" }} />
          <div className="bg-green-400" style={{ width: "31%" }} />
          <div className="bg-amber-400" style={{ width: "28%" }} />
          <div className="bg-purple-400" style={{ width: "18%" }} />
          <div className="bg-rose-400" style={{ width: "19%" }} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "应急资金", pct: "11%", color: "bg-blue-400" },
            { name: "投资资产", pct: "31%", color: "bg-green-400" },
            { name: "国内资产", pct: "28%", color: "bg-amber-400" },
            { name: "创业资金", pct: "18%", color: "bg-purple-400" },
            { name: "公司资产", pct: "19%", color: "bg-rose-400" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
              <span className="text-xs font-medium text-foreground ml-auto">{item.pct}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 本月资产变化原因 */}
      <Card>
        <SectionLabel>本月资产变化</SectionLabel>
        <div className="space-y-3">
          {monthlyChanges.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.positive ? (
                  <TrendingUp size={14} className="text-primary" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <span className={`text-sm font-semibold ${item.positive ? "text-primary" : "text-red-500"}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
