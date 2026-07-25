"use client";

import { useState } from "react";
import { BottomSheet, SaveButton, CancelButton } from "@/components/editing";
import type { ExchangeRateSettings } from "@/lib/types";

interface Props {
  open: boolean;
  current: ExchangeRateSettings;
  onClose: () => void;
  onSave: (rates: ExchangeRateSettings) => void;
}

function RateForm({ current, onClose, onSave }: Omit<Props, "open">) {
  const [value, setValue] = useState(String(current.cnyToJpy));

  const num = parseFloat(value);
  const valid = !isNaN(num) && num > 0;

  function handleSave() {
    if (!valid) return;
    onSave({ cnyToJpy: num });
    onClose();
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">修改后所有中国资产的日元折算值立即更新</p>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">人民币兑日元汇率</label>
        <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-2xl">
          <span className="text-sm text-muted-foreground whitespace-nowrap">1 CNY =</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0.01"
            placeholder="20.00"
            value={value}
            onChange={e => setValue(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-foreground outline-none text-right"
          />
          <span className="text-sm text-muted-foreground">JPY</span>
        </div>
        {valid && (
          <p className="text-xs text-muted-foreground mt-1.5 ml-1">
            示例：¥500,000 CNY ≈ ¥{Math.round(500000 * num).toLocaleString()} JPY
          </p>
        )}
      </div>

      <div className="pt-2 space-y-2">
        <SaveButton onSave={handleSave} disabled={!valid} />
        <CancelButton onCancel={onClose} />
      </div>
    </div>
  );
}

export default function ExchangeRateSheet({ open, current, onClose, onSave }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} title="汇率设置">
      {open && <RateForm current={current} onClose={onClose} onSave={onSave} />}
    </BottomSheet>
  );
}
