"use client";

import { useState, useRef } from "react";
import { Heart, Camera } from "lucide-react";
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
import { getMembers, getFamilyProfile, saveFamilyProfile } from "@/lib/storage";
import { mockSettings } from "@/lib/mock";
import { toast } from "@/hooks/useToast";
import type { Company, Vehicle, FamilyDocument, Reminder } from "@/lib/types";

// Compress an image file to a data URL (max 512×512, JPEG quality 0.82)
async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const SIZE = 512;
      const canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext("2d")!;
      // Centre-crop square
      const src = Math.min(img.width, img.height);
      const sx = (img.width - src) / 2;
      const sy = (img.height - src) / 2;
      ctx.drawImage(img, sx, sy, src, src, 0, 0, SIZE, SIZE);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function FamilyPage() {
  const members = getMembers();
  const maruko = members.find(m => m.id === "m3");
  const familyMembers = members.filter(m => m.id !== "m3");

  const { milestones, addMilestone } = useMilestones();
  const { companies, updateCompany } = useCompany();
  const { vehicles, updateVehicle } = useVehicle();
  const { documents, updateDocument } = useDocumentsData();
  const { reminders, addReminder, updateReminder, toggleReminder, deleteReminder } = useReminders();

  const [avatarDataUrl, setAvatarDataUrl] = useState<string | undefined>(
    () => getFamilyProfile().avatarDataUrl
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [milestoneSheetOpen, setMilestoneSheetOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingDocument, setEditingDocument] = useState<FamilyDocument | null>(null);
  const [addReminderOpen, setAddReminderOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImage(file);
      // Check size (~750KB limit for localStorage safety)
      if (dataUrl.length > 750_000) {
        toast("图片过大，请选择更小的图片");
        return;
      }
      saveFamilyProfile({ avatarDataUrl: dataUrl });
      setAvatarDataUrl(dataUrl);
      toast("头像已更新");
    } catch {
      toast("图片处理失败，请重试");
    }
    // Reset file input
    e.target.value = "";
  }

  function handleResetAvatar() {
    saveFamilyProfile({});
    setAvatarDataUrl(undefined);
    toast("已恢复默认头像");
  }

  return (
    <div className="pt-12 space-y-4">
      <div className="pb-1">
        <p className="text-sm text-muted-foreground mb-1">家庭档案</p>
        <h1 className="text-2xl font-semibold text-foreground">{mockSettings.familyName}</h1>
      </div>

      {/* Avatar section */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center cursor-pointer active:scale-95 transition-transform ring-2 ring-border"
            onClick={() => fileInputRef.current?.click()}
          >
            {/* eslint-disable @next/next/no-img-element */}
            {avatarDataUrl ? (
              <img src={avatarDataUrl} alt="家庭头像" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl select-none">🏠</span>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          >
            <Camera size={13} />
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <button onClick={() => fileInputRef.current?.click()} className="underline underline-offset-2">
            更换头像
          </button>
          {avatarDataUrl && (
            <button onClick={handleResetAvatar} className="underline underline-offset-2">
              恢复默认头像
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
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
