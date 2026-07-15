"use client";

import { useState } from "react";
import type { Reminder, Member } from "@/lib/types";
import {
  BottomSheet, FormSection, TextInput, DateInput,
  SelectInput, SaveButton, CancelButton,
} from "@/components/editing";

const CATEGORY_OPTIONS = [
  { value: "tax", label: "税务" },
  { value: "insurance", label: "保险" },
  { value: "medical", label: "医疗" },
  { value: "visa", label: "签证" },
  { value: "other", label: "其它" },
];

interface AddProps {
  mode: "add";
  members: Member[];
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Reminder, "id" | "status">) => void;
}

interface EditProps {
  mode: "edit";
  reminder: Reminder;
  members: Member[];
  open: boolean;
  onClose: () => void;
  onSave: (r: Reminder) => void;
}

type Props = AddProps | EditProps;

function ReminderForm({
  initialTitle,
  initialCategory,
  initialDueDate,
  initialNote,
  initialMemberId,
  members,
  onClose,
  onSubmit,
}: {
  initialTitle: string;
  initialCategory: string;
  initialDueDate: string;
  initialNote: string;
  initialMemberId: string;
  members: Member[];
  onClose: () => void;
  onSubmit: (fields: { title: string; category: Reminder["category"]; dueDate?: string; note?: string; relatedMemberId?: string }) => void;
}) {
  const [title, setTitle]           = useState(initialTitle);
  const [category, setCategory]     = useState(initialCategory);
  const [dueDate, setDueDate]       = useState(initialDueDate);
  const [note, setNote]             = useState(initialNote);
  const [memberId, setMemberId]     = useState(initialMemberId);

  const memberOptions = [
    { value: "", label: "不关联" },
    ...members.map(m => ({ value: m.id, label: m.name })),
  ];

  const canSave = title.trim().length > 0;

  function handleSave() {
    if (!canSave) return;
    onSubmit({
      title: title.trim(),
      category: (category || "other") as Reminder["category"],
      dueDate: dueDate || undefined,
      note: note.trim() || undefined,
      relatedMemberId: memberId || undefined,
    });
  }

  return (
    <div className="space-y-4">
      <FormSection>
        <TextInput label="提醒内容" value={title} onChange={setTitle} autoFocus />
        <SelectInput label="分类" value={category} onChange={setCategory} options={CATEGORY_OPTIONS} />
      </FormSection>

      <FormSection label="详情">
        <DateInput label="截止日期" value={dueDate} onChange={setDueDate} />
        <SelectInput label="关联成员" value={memberId} onChange={setMemberId} options={memberOptions} />
        <TextInput label="备注" value={note} onChange={setNote} placeholder="可选" />
      </FormSection>

      <div className="pt-2 space-y-2">
        <SaveButton onSave={handleSave} disabled={!canSave} />
        <CancelButton onCancel={onClose} />
      </div>
    </div>
  );
}

// Caller must pass key when editing so this remounts with fresh state.
export default function EditReminderSheet(props: Props) {
  const { mode, members, open, onClose } = props;

  const title = mode === "add" ? "新增提醒" : "编辑提醒";

  return (
    <BottomSheet open={open} onClose={onClose} title={title}>
      {mode === "add" ? (
        <ReminderForm
          initialTitle=""
          initialCategory="other"
          initialDueDate=""
          initialNote=""
          initialMemberId=""
          members={members}
          onClose={onClose}
          onSubmit={fields => { props.onSave(fields); onClose(); }}
        />
      ) : (
        <ReminderForm
          initialTitle={props.reminder.title}
          initialCategory={props.reminder.category}
          initialDueDate={props.reminder.dueDate ?? ""}
          initialNote={props.reminder.note ?? ""}
          initialMemberId={props.reminder.relatedMemberId ?? ""}
          members={members}
          onClose={onClose}
          onSubmit={fields => { props.onSave({ ...props.reminder, ...fields }); onClose(); }}
        />
      )}
    </BottomSheet>
  );
}
