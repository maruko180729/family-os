/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import type { Company } from "@/lib/types";
import {
  BottomSheet, FormSection, CurrencyInput, SaveButton, CancelButton,
} from "@/components/editing";

interface Props {
  company: Company | null;
  open: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
}

export default function EditCompanySheet({ company, open, onClose, onSave }: Props) {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [transferToFamily, setTransferToFamily] = useState("");
  const [balance, setBalance] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (company) {
      setRevenue(company.revenue ? String(company.revenue) : "");
      setExpenses(company.companyExpenses ? String(company.companyExpenses) : "");
      setTransferToFamily(company.transferToFamily ? String(company.transferToFamily) : "");
      setBalance(company.balance ? String(company.balance) : "");
    }
  }, [company]);

  if (!company) return null;

  const rev = Number(revenue) || 0;
  const exp = Number(expenses) || 0;
  const profit = rev - exp;

  function handleSave() {
    if (!company) return;
    setSaving(true);
    setTimeout(() => {
      onSave({
        ...company,
        revenue: Number(revenue) || undefined,
        companyExpenses: Number(expenses) || undefined,
        transferToFamily: Number(transferToFamily) || undefined,
        balance: Number(balance) || undefined,
      });
      setSaving(false);
      onClose();
    }, 400);
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={`编辑 ${company.name}`}>
      <div className="space-y-4">
        <FormSection label="本月经营">
          <CurrencyInput label="营业额" value={revenue} onChange={setRevenue} />
          <CurrencyInput label="支出" value={expenses} onChange={setExpenses} />
          {(rev > 0 || exp > 0) && (
            <div className="px-1 pt-1">
              <p className="text-xs text-muted-foreground">
                利润（自动）：
                <span className={profit >= 0 ? "text-primary font-semibold" : "text-destructive font-semibold"}>
                  {profit >= 0 ? "+" : ""}¥{profit.toLocaleString()}
                </span>
              </p>
            </div>
          )}
        </FormSection>

        <FormSection label="资金流向">
          <CurrencyInput label="家庭转入" value={transferToFamily} onChange={setTransferToFamily} />
          <CurrencyInput label="余额" value={balance} onChange={setBalance} />
        </FormSection>

        <div className="pt-2 space-y-2">
          <SaveButton onSave={handleSave} saving={saving} />
          <CancelButton onCancel={onClose} />
        </div>
      </div>
    </BottomSheet>
  );
}
