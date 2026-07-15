"use client";

import { useState } from "react";
import type { FamilyDocument, Member } from "@/lib/types";
import {
  BottomSheet, FormSection, TextInput, DateInput,
  SelectInput, SaveButton, CancelButton,
} from "@/components/editing";

const DOC_TYPES = [
  { value: "在留卡", label: "在留卡" },
  { value: "护照", label: "护照" },
  { value: "签证", label: "签证" },
  { value: "其它", label: "其它" },
];

interface Props {
  document: FamilyDocument;
  members: Member[];
  open: boolean;
  onClose: () => void;
  onSave: (d: FamilyDocument) => void;
}

// Caller must pass key={document.id} so this remounts with fresh state.
export default function EditDocumentSheet({ document: doc, members, open, onClose, onSave }: Props) {
  const memberOptions = members.map(m => ({ value: m.id, label: m.name }));

  const [ownerId, setOwnerId]       = useState(doc.ownerId);
  const [type, setType]             = useState(doc.type ?? "");
  const [label, setLabel]           = useState(doc.label);
  const [date, setDate]             = useState(doc.date);
  const [expiryDate, setExpiry]     = useState(doc.expiryDate ?? "");
  const [remindDays, setRemindDays] = useState(doc.remindDays ? String(doc.remindDays) : "");
  const [note, setNote]             = useState(doc.note ?? "");

  const canSave = label.trim().length > 0 && ownerId.length > 0;

  function handleSave() {
    if (!canSave) return;
    onSave({
      ...doc,
      ownerId,
      type: type || undefined,
      label: label.trim(),
      date,
      expiryDate: expiryDate || undefined,
      remindDays: Number(remindDays) || undefined,
      note: note.trim() || undefined,
    });
    onClose();
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="编辑证件">
      <div className="space-y-4">
        <FormSection>
          <SelectInput label="持有人" value={ownerId} onChange={setOwnerId} options={memberOptions} />
          <SelectInput label="证件类型" value={type} onChange={setType} options={DOC_TYPES} />
          <TextInput label="证件名称" value={label} onChange={setLabel} autoFocus />
        </FormSection>

        <FormSection label="日期">
          <DateInput label="参考日期" value={date} onChange={setDate} />
          <DateInput label="到期日" value={expiryDate} onChange={setExpiry} />
          <TextInput
            label="提前提醒天数"
            value={remindDays}
            onChange={setRemindDays}
            placeholder="30"
          />
        </FormSection>

        <FormSection label="备注">
          <TextInput label="备注" value={note} onChange={setNote} placeholder="可选" />
        </FormSection>

        <div className="pt-2 space-y-2">
          <SaveButton onSave={handleSave} disabled={!canSave} />
          <CancelButton onCancel={onClose} />
        </div>
      </div>
    </BottomSheet>
  );
}
