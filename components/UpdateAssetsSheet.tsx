"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { AssetGroup } from "@/lib/types";
import { GROUP_META } from "@/hooks/useAssets";

const GROUPS: AssetGroup[] = ["japan", "china", "investment", "other"];

interface Props {
  open: boolean;
  currentMonth: string;
  currentAmounts: Record<AssetGroup, number>;
  onClose: () => void;
  onSave: (amounts: Record<AssetGroup, number>) => void;
}

// Inner form — mounts fresh each time the sheet opens, so useState
// initializers run from props without needing useEffect.
function AssetsForm({
  currentMonth,
  currentAmounts,
  onClose,
  onSave,
}: Omit<Props, "open">) {
  const [values, setValues] = useState<Record<AssetGroup, string>>({
    japan:      currentAmounts.japan      ? String(currentAmounts.japan)      : "",
    china:      currentAmounts.china      ? String(currentAmounts.china)      : "",
    investment: currentAmounts.investment ? String(currentAmounts.investment) : "",
    other:      currentAmounts.other      ? String(currentAmounts.other)      : "",
  });

  function handleSave() {
    const amounts: Record<AssetGroup, number> = {
      japan:      parseInt(values.japan.replace(/,/g, ""))      || 0,
      china:      parseInt(values.china.replace(/,/g, ""))      || 0,
      investment: parseInt(values.investment.replace(/,/g, "")) || 0,
      other:      parseInt(values.other.replace(/,/g, ""))      || 0,
    };
    onSave(amounts);
    onClose();
  }

  const [y, m] = currentMonth.split("-");
  const displayMonth = `${y}年${parseInt(m)}月`;
  const canSave = GROUPS.some(g => parseInt(values[g].replace(/,/g, "")) > 0);

  return (
    <>
      <SheetHeader className="mb-1">
        <SheetTitle className="text-lg font-semibold text-left">更新资产快照</SheetTitle>
      </SheetHeader>
      <p className="text-xs text-muted-foreground mb-5">{displayMonth}·输入各类资产当前总额</p>

      <div className="space-y-3 mb-6">
        {GROUPS.map((g, i) => (
          <div key={g}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {GROUP_META[g].label}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">¥</span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="0"
                value={values[g]}
                onChange={e => setValues(prev => ({ ...prev, [g]: e.target.value }))}
                autoFocus={i === 0}
                className="w-full pl-8 pr-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!canSave}
        className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm disabled:opacity-40 active:scale-95 transition-transform"
      >
        保存快照
      </button>
    </>
  );
}

export default function UpdateAssetsSheet({ open, currentMonth, currentAmounts, onClose, onSave }: Props) {
  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-10 pt-6 max-w-[480px] mx-auto">
        {open && (
          <AssetsForm
            currentMonth={currentMonth}
            currentAmounts={currentAmounts}
            onClose={onClose}
            onSave={onSave}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
