/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
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
  goal: Goal | null;
  open: boolean;
  onClose: () => void;
  onSave: (goal: Goal) => void;
}

export default function EditGoalSheet({ goal, open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [status, setStatus] = useState("active");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (goal) {
      setName(goal.name);
      setEmoji(goal.emoji ?? "");
      setTargetValue(goal.targetValue > 0 ? String(goal.targetValue) : "");
      setCurrentValue(goal.currentValue > 0 ? String(goal.currentValue) : "");
      setTargetDate(goal.targetDate ?? "");
      setStatus(goal.status);
    }
  }, [goal]);

  if (!goal) return null;

  const isJPY = goal.unit === "JPY";
  const isAsset = goal.category === "asset";
  const canSave = name.trim().length > 0;

  function handleSave() {
    if (!goal || !canSave) return;
    setSaving(true);
    setTimeout(() => {
      onSave({
        ...goal,
        name: name.trim(),
        emoji: emoji.trim() || goal.emoji,
        targetValue: Number(targetValue) || goal.targetValue,
        currentValue: isAsset ? goal.currentValue : (Number(currentValue) || goal.currentValue),
        targetDate: targetDate.trim() || undefined,
        status: status as Goal["status"],
      });
      setSaving(false);
      onClose();
    }, 400);
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="编辑目标">
      <div className="space-y-4">
        <FormSection>
          <div className="flex gap-3">
            <TextInput
              label="图标"
              value={emoji}
              onChange={setEmoji}
              placeholder="📈"
              className="w-20 shrink-0"
            />
            <TextInput
              label="目标名称"
              value={name}
              onChange={setName}
              autoFocus
              className="flex-1"
            />
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
              <TextInput
                label={`当前（${goal.unit}）`}
                value={currentValue}
                onChange={setCurrentValue}
                placeholder="0"
              />
              <TextInput
                label={`目标（${goal.unit}）`}
                value={targetValue}
                onChange={setTargetValue}
                placeholder="100"
              />
            </>
          )}
          <DateInput label="目标日期" value={targetDate} onChange={setTargetDate} />
        </FormSection>

        <FormSection label="状态">
          <SelectInput label="当前状态" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        </FormSection>

        <div className="pt-2 space-y-2">
          <SaveButton onSave={handleSave} disabled={!canSave} saving={saving} />
          <CancelButton onCancel={onClose} />
        </div>
      </div>
    </BottomSheet>
  );
}
