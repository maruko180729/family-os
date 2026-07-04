"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { HeroCard } from "@/components/ui/HeroCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatRow } from "@/components/ui/StatRow";
import LineChart from "@/components/LineChart";
import { mockAssets, mockAssetTrend, getNetAsset } from "@/lib/mock";

const assetColorMap: Record<string, string> = {
  emergency:  "bg-blue-100 text-blue-700",
  investment: "bg-green-100 text-green-700",
  domestic:   "bg-amber-100 text-amber-700",
  startup:    "bg-purple-100 text-purple-700",
  company:    "bg-rose-100 text-rose-700",
  liability:  "bg-red-100 text-red-700",
};

const assetDotMap: Record<string, string> = {
  emergency: "bg-blue-400", investment: "bg-green-400", domestic: "bg-amber-400",
  startup: "bg-purple-400", company: "bg-rose-400",
};

const trendValues = mockAssetTrend.map(p => p.netAsset);
const trendLabels = mockAssetTrend.map(p => {
  const [, m] = p.month.split("-");
  return `${parseInt(m)}月`;
});

const totalAssets = mockAssets.filter(a => a.category !== "liability").reduce((s, a) => s + a.amount, 0);
const totalLiability = Math.abs(mockAssets.filter(a => a.category === "liability").reduce((s, a) => s + a.amount, 0));
const assetCategories = mockAssets.filter(a => a.category !== "liability");
const assetTotal = assetCategories.reduce((s, a) => s + a.amount, 0);

const monthlyChangeItems = [
  { label: "工资收入",   value: "+¥280,000", positive: true  },
  { label: "配偶入金",   value: "+¥150,000", positive: true  },
  { label: "其他收入",   value: "+¥48,000",  positive: true  },
  { label: "固定支出",   value: "-¥180,000", positive: false },
  { label: "信用卡合计", value: "-¥65,000",  positive: false },
  { label: "其他支出",   value: "-¥32,000",  positive: false },
];

export default function AssetsPage() {
  const netAsset = useCountUp(getNetAsset(), 1200, 200);

  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">资产总览</p>
        <h1 className="text-2xl font-semibold text-foreground">家庭净资产</h1>
      </div>

      {/* Hero + 折线图 */}
      <HeroCard>
        <p className="text-sm text-white/70 mb-1">家庭净资产</p>
        <p className="text-3xl font-bold tracking-tight">¥{netAsset.toLocaleString()}</p>
        <p className="text-sm text-white/70 mt-1">本月变化 +¥218,000</p>
        <div className="mt-4">
          <LineChart data={trendValues} labels={trendLabels} color="white" height={72} />
        </div>
      </HeroCard>

      {/* 资产分类 */}
      <SectionCard label="资产分类">
        <div className="space-y-3">
          {mockAssets.map(asset => (
            <div key={asset.id} className="flex items-center justify-between">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${assetColorMap[asset.category]}`}>
                {asset.name}
              </span>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {asset.amount < 0 ? "-" : ""}¥{Math.abs(asset.amount).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 配置比例 */}
      <SectionCard label="资产配置比例">
        <div className="flex rounded-full overflow-hidden h-2.5 mb-4">
          {assetCategories.map(a => (
            <div
              key={a.id}
              className={assetDotMap[a.category]}
              style={{ width: `${Math.round((a.amount / assetTotal) * 100)}%` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {assetCategories.map(a => (
            <div key={a.id} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full shrink-0 ${assetDotMap[a.category]}`} />
              <span className="text-xs text-muted-foreground">{a.name}</span>
              <span className="text-xs font-medium text-foreground ml-auto">
                {Math.round((a.amount / assetTotal) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 本月变化 */}
      <SectionCard label="本月资产变化">
        <StatRow items={monthlyChangeItems} />
      </SectionCard>
    </div>
  );
}
