"use client";

import { useState } from "react";
import type { Vehicle } from "@/lib/types";
import { BottomSheet, FormSection, TextInput, DateInput, SaveButton, CancelButton } from "@/components/editing";

interface Props {
  vehicle: Vehicle;
  open: boolean;
  onClose: () => void;
  onSave: (v: Vehicle) => void;
}

// Caller must pass key={vehicle.id} so this remounts with fresh state.
export default function EditVehicleSheet({ vehicle, open, onClose, onSave }: Props) {
  const [name, setName]                   = useState(vehicle.name);
  const [nextInspection, setInspection]   = useState(vehicle.nextInspection);
  const [insuranceExpiry, setInsurance]   = useState(vehicle.insuranceExpiry);
  const [taxDate, setTaxDate]             = useState(vehicle.taxDate ?? "");
  const [nextService, setNextService]     = useState(vehicle.nextService ?? "");
  const [note, setNote]                   = useState(vehicle.note ?? "");

  const canSave = name.trim().length > 0 && nextInspection.length > 0 && insuranceExpiry.length > 0;

  function handleSave() {
    if (!canSave) return;
    onSave({
      ...vehicle,
      name: name.trim(),
      nextInspection,
      insuranceExpiry,
      taxDate: taxDate || undefined,
      nextService: nextService.trim() || undefined,
      note: note.trim() || undefined,
    });
    onClose();
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={`编辑车辆`}>
      <div className="space-y-4">
        <FormSection>
          <TextInput label="车辆名称" value={name} onChange={setName} autoFocus />
        </FormSection>

        <FormSection label="到期日期">
          <DateInput label="车检到期日" value={nextInspection} onChange={setInspection} />
          <DateInput label="保险到期日" value={insuranceExpiry} onChange={setInsurance} />
          <DateInput label="税金日期" value={taxDate} onChange={setTaxDate} />
          <DateInput label="下次保养" value={nextService} onChange={setNextService} />
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
