"use client";

import { useState } from "react";
import type { Goal } from "@/lib/types";
import {
  BottomSheet, FormSection, TextInput, CurrencyInput,
  DateInput, SelectInput, SaveButton, CancelButton,
} from "@/components/editing";

const STATUS_OPTIONS = [
  { value: "active",    label: "正常" },
  { value: "watching",  label: "需要关注" },
  { value: "completed", label: "已完成" },
  { value: "paused",    label: "暂停" },
];

interface Props {
  goal: Goal;
  open: boolean;
  onClose: () => void;
  onSave: (goal: Goal) => void;
}

// Caller must pass key={goal.id} so this component remounts with fresh
// state when a different goal is selected — no useEffect needed.
export default function EditGoalSheet({ goal, open, onClose, onSave }: Props) {
  const [name, setName]               = useState(goal.name);
  const [emoji, setEmoji]             = useState(goal.emoji ?? "");
  const [targetValue, setTargetValue] = useState(goal.targetValue > 0 ? String(goal.targetValue) : "");
  const [currentValue, setCurrentValue] = useState(goal.currentValue > 0 ? String(goal.currentValue) : "");
  const [targetDate, setTargetDate]   = useState(goal.targetDate ?? "");
  const [status, setStatus]           = useState<string>(goal.status);

  const isJPY   = goal.unit === "JPY";
  const isAsset = goal.category === "asset";
  const canSave = name.trim().length > 0;

  function handleSave() {
    if (!canSave) return;
    onSave({
      ...goal,
      name: name.trim(),
      emoji: emoji.trim() || goal.emoji,
      targetValue: Number(targetValue) || goal.targetValue,
      currentValue: isAsset ? goal.currentValue : (Number(currentValue) || goal.currentValue),
      targetDate: targetDate.trim() || undefined,
      status: status as Goal["status"],
    });
    onClose();
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="编辑目标">
      <div className="space-y-4">
        <FormSection>
          <div className="flex gap-3">
            <TextInput label="图标" value={emoji} onChange={setEmoji} placeholder="📈" className="w-20 shrink-0" />
            <TextInput label="目标名称" value={name} onChange={setName} autoFocus className="flex-1" />
          </div>
        </FormSection>

        <FormSection label="进度">
          {isJPY ? (
            <>
              {!isAsset && (
                <CurrencyInput label="当前金额" value={currentValue} onChange={setCurrentValue} />
              )}
              <CurrencyInput label="目标金额" value={targetValue} onChange={setTargetValue} />
            </>
          ) : (
            <>
              <TextInput label={`当前（${goal.unit}）`} value={currentValue} onChange={setCurrentValue} placeholder="0" />
              <TextInput label={`目标（${goal.unit}）`} value={targetValue} onChange={setTargetValue} placeholder="100" />
            </>
          )}
          <DateInput label="目标日期" value={targetDate} onChange={setTargetDate} />
        </FormSection>

        <FormSection label="状态">
          <SelectInput label="当前状态" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        </FormSection>

        <div className="pt-2 space-y-2">
          <SaveButton onSave={handleSave} disabled={!canSave} />
          <CancelButton onCancel={onClose} />
        </div>
      </div>
    </BottomSheet>
  );
}
