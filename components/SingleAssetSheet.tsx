"use client";

import { useState } from "react";
import type { AssetGroup } from "@/lib/types";
import { GROUP_META } from "@/hooks/useAssets";
import { BottomSheet, SaveButton, CancelButton } from "@/components/editing";

interface Props {
  group: AssetGroup;
  currentAmount: number; // CNY for china, JPY otherwise
  cnyToJpy: number;
  currentMonth: string;
  open: boolean;
  onClose: () => void;
  onSave: (group: AssetGroup, amount: number) => void;
}

function SingleAssetForm({
  group,
  currentAmount,
  cnyToJpy,
  currentMonth,
  onClose,
  onSave,
}: Omit<Props, "open">) {
  const [value, setValue] = useState(currentAmount > 0 ? String(currentAmount) : "");
  const [y, m] = currentMonth.split("-");
  const displayMonth = `${y}年${parseInt(m)}月`;
  const meta = GROUP_META[group];
  const isCny = group === "china";
  const canSave = parseInt(value.replace(/,/g, "")) >= 0 && value.trim() !== "";

  const jpyEquiv = isCny && parseInt(value) > 0
    ? Math.round(parseInt(value.replace(/,/g, "")) * cnyToJpy)
    : 0;

  function handleSave() {
    const amount = parseInt(value.replace(/,/g, "")) || 0;
    onSave(group, amount);
    onClose();
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {displayMonth} · {meta.label}
        {isCny && <span className="ml-1 text-orange-500">（CNY）</span>}
      </p>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">金额</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">¥</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={value}
            onChange={e => setValue(e.target.value)}
            autoFocus
            className="w-full pl-8 pr-16 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {isCny ? "CNY" : "JPY"}
          </span>
        </div>
        {isCny && jpyEquiv > 0 && (
          <p className="text-xs text-muted-foreground mt-1 ml-1">
            ≈ ¥{jpyEquiv.toLocaleString()} JPY（1 CNY = {cnyToJpy} JPY）
          </p>
        )}
      </div>

      <div className="pt-2 space-y-2">
        <SaveButton onSave={handleSave} disabled={!canSave} />
        <CancelButton onCancel={onClose} />
      </div>
    </div>
  );
}

export default function SingleAssetSheet({ open, group, currentAmount, cnyToJpy, currentMonth, onClose, onSave }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} title={`更新${GROUP_META[group].label}`}>
      {open && (
        <SingleAssetForm
          group={group}
          currentAmount={currentAmount}
          cnyToJpy={cnyToJpy}
          currentMonth={currentMonth}
          onClose={onClose}
          onSave={onSave}
        />
      )}
    </BottomSheet>
  );
}
