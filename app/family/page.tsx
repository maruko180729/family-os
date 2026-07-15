"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { HeroCard } from "@/components/ui/HeroCard";
import { MemberCard } from "@/components/ui/MemberCard";
import { MarukoCard } from "@/components/ui/MarukoCard";
import { CompanyCard } from "@/components/ui/CompanyCard";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { ReminderCard } from "@/components/ui/ReminderCard";
import { FamilyTimeline } from "@/components/ui/FamilyTimeline";
import AddMilestoneSheet from "@/components/AddMilestoneSheet";
import EditCompanySheet from "@/components/EditCompanySheet";
import EditVehicleSheet from "@/components/EditVehicleSheet";
import EditDocumentSheet from "@/components/EditDocumentSheet";
import EditReminderSheet from "@/components/EditReminderSheet";
import { useMilestones } from "@/hooks/useMilestones";
import { useCompany } from "@/hooks/useCompany";
import { useVehicle } from "@/hooks/useVehicle";
import { useDocumentsData } from "@/hooks/useDocumentsData";
import { useReminders } from "@/hooks/useReminders";
import { getMembers } from "@/lib/storage";
import { mockSettings } from "@/lib/mock";
import { toast } from "@/hooks/useToast";
import type { Company, Vehicle, FamilyDocument, Reminder } from "@/lib/types";

export default function FamilyPage() {
  const members = getMembers();
  const maruko = members.find(m => m.id === "m3");
  const familyMembers = members.filter(m => m.id !== "m3");

  const { milestones, addMilestone } = useMilestones();
  const { companies, updateCompany } = useCompany();
  const { vehicles, updateVehicle } = useVehicle();
  const { documents, updateDocument } = useDocumentsData();
  const { reminders, addReminder, updateReminder, toggleReminder, deleteReminder } = useReminders();

  const [milestoneSheetOpen, setMilestoneSheetOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingDocument, setEditingDocument] = useState<FamilyDocument | null>(null);
  const [addReminderOpen, setAddReminderOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">家庭档案</p>
        <h1 className="text-2xl font-semibold text-foreground">{mockSettings.familyName}</h1>
      </div>

      <HeroCard>
        <div className="flex items-center gap-2 mb-3">
          <Heart size={15} className="text-white/70" fill="currentColor" />
          <span className="text-sm text-white/70">家庭理念</span>
        </div>
        <p className="text-lg font-medium leading-relaxed">一起把生活经营得越来越好。</p>
      </HeroCard>

      <MemberCard members={familyMembers} />

      {maruko && <MarukoCard member={maruko} reminders={reminders} />}

      <CompanyCard companies={companies} onEdit={setEditingCompany} />

      <VehicleCard vehicles={vehicles} onEdit={setEditingVehicle} />

      <DocumentCard documents={documents} members={members} onEdit={setEditingDocument} />

      <ReminderCard
        reminders={reminders}
        onAdd={() => setAddReminderOpen(true)}
        onEdit={setEditingReminder}
        onToggle={toggleReminder}
        onDelete={deleteReminder}
      />

      <FamilyTimeline milestones={milestones} onAddClick={() => setMilestoneSheetOpen(true)} />

      <AddMilestoneSheet
        open={milestoneSheetOpen}
        onClose={() => setMilestoneSheetOpen(false)}
        onSave={addMilestone}
      />

      {editingCompany && (
        <EditCompanySheet
          key={editingCompany.id}
          company={editingCompany}
          open
          onClose={() => setEditingCompany(null)}
          onSave={updated => { updateCompany(updated); toast("已更新"); }}
        />
      )}

      {editingVehicle && (
        <EditVehicleSheet
          key={editingVehicle.id}
          vehicle={editingVehicle}
          open
          onClose={() => setEditingVehicle(null)}
          onSave={updated => { updateVehicle(updated); toast("车辆已更新"); }}
        />
      )}

      {editingDocument && (
        <EditDocumentSheet
          key={editingDocument.id}
          document={editingDocument}
          members={members}
          open
          onClose={() => setEditingDocument(null)}
          onSave={updated => { updateDocument(updated); toast("证件已更新"); }}
        />
      )}

      <EditReminderSheet
        key="add-reminder"
        mode="add"
        members={members}
        open={addReminderOpen}
        onClose={() => setAddReminderOpen(false)}
        onSave={data => { addReminder(data); toast("提醒已添加"); }}
      />

      {editingReminder && (
        <EditReminderSheet
          key={editingReminder.id}
          mode="edit"
          reminder={editingReminder}
          members={members}
          open
          onClose={() => setEditingReminder(null)}
          onSave={updated => { updateReminder(updated); toast("提醒已更新"); }}
        />
      )}
    </div>
  );
}
