"use client";

import { useState } from "react";
import type { Company } from "@/lib/types";
import { BottomSheet, FormSection, CurrencyInput, SaveButton, CancelButton } from "@/components/editing";

interface Props {
  company: Company;
  open: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
}

// Caller must pass key={company.id} so this remounts with fresh state.
export default function EditCompanySheet({ company, open, onClose, onSave }: Props) {
  const [revenue, setRevenue]               = useState(company.revenue ? String(company.revenue) : "");
  const [expenses, setExpenses]             = useState(company.companyExpenses ? String(company.companyExpenses) : "");
  const [transferToFamily, setTransfer]     = useState(company.transferToFamily ? String(company.transferToFamily) : "");
  const [balance, setBalance]               = useState(company.balance ? String(company.balance) : "");

  const rev = Number(revenue) || 0;
  const exp = Number(expenses) || 0;
  const profit = rev - exp;

  function handleSave() {
    onSave({
      ...company,
      revenue: Number(revenue) || undefined,
      companyExpenses: Number(expenses) || undefined,
      transferToFamily: Number(transferToFamily) || undefined,
      balance: Number(balance) || undefined,
    });
    onClose();
  }

  return (
    <BottomSheet open={open} onClose={onClose} title={`编辑 ${company.name}`}>
      <div className="space-y-4">
        <FormSection label="本月经营">
          <CurrencyInput label="营业额" value={revenue} onChange={setRevenue} />
          <CurrencyInput label="支出" value={expenses} onChange={setExpenses} />
          {(rev > 0 || exp > 0) && (
            <p className="text-xs text-muted-foreground px-1">
              利润（自动）：
              <span className={profit >= 0 ? "text-primary font-semibold" : "text-destructive font-semibold"}>
                {profit >= 0 ? "+" : ""}¥{profit.toLocaleString()}
              </span>
            </p>
          )}
        </FormSection>

        <FormSection label="资金流向">
          <CurrencyInput label="家庭转入" value={transferToFamily} onChange={setTransfer} />
          <CurrencyInput label="余额" value={balance} onChange={setBalance} />
        </FormSection>

        <div className="pt-2 space-y-2">
          <SaveButton onSave={handleSave} />
          <CancelButton onCancel={onClose} />
        </div>
      </div>
    </BottomSheet>
  );
}
