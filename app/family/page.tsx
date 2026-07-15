"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { HeroCard } from "@/components/ui/HeroCard";
import { MemberCard } from "@/components/ui/MemberCard";
import { MarukoCard } from "@/components/ui/MarukoCard";
import { CompanyCard } from "@/components/ui/CompanyCard";
import { VehicleCard } from "@/components/ui/VehicleCard";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { FamilyTimeline } from "@/components/ui/FamilyTimeline";
import AddMilestoneSheet from "@/components/AddMilestoneSheet";
import EditCompanySheet from "@/components/EditCompanySheet";
import { useMilestones } from "@/hooks/useMilestones";
import { useCompany } from "@/hooks/useCompany";
import { getMembers, getVehicles, getDocuments, getReminders } from "@/lib/storage";
import { mockSettings } from "@/lib/mock";
import { toast } from "@/hooks/useToast";
import type { Company } from "@/lib/types";

export default function FamilyPage() {
  const members = getMembers();
  const maruko = members.find(m => m.id === "m3");
  const familyMembers = members.filter(m => m.id !== "m3");

  const vehicles = getVehicles();
  const documents = getDocuments();
  const reminders = getReminders();
  const { milestones, addMilestone } = useMilestones();
  const { companies, updateCompany } = useCompany();

  const [milestoneSheetOpen, setMilestoneSheetOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  function handleCompanySave(updated: Company) {
    updateCompany(updated);
    toast("已更新");
  }

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

      <VehicleCard vehicles={vehicles} />

      <DocumentCard documents={documents} members={members} />

      <FamilyTimeline milestones={milestones} onAddClick={() => setMilestoneSheetOpen(true)} />

      <AddMilestoneSheet
        open={milestoneSheetOpen}
        onClose={() => setMilestoneSheetOpen(false)}
        onSave={addMilestone}
      />

      <EditCompanySheet
        company={editingCompany}
        open={editingCompany !== null}
        onClose={() => setEditingCompany(null)}
        onSave={handleCompanySave}
      />
    </div>
  );
}
