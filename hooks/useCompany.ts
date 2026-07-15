"use client";

import { useState, useCallback } from "react";
import type { Company } from "@/lib/types";
import { getCompanies, saveCompanies } from "@/lib/storage";

export function useCompany() {
  const [companies, setCompanies] = useState<Company[]>(() => getCompanies());

  const updateCompany = useCallback((updated: Company) => {
    const next = companies.map(c => c.id === updated.id ? updated : c);
    saveCompanies(next);
    setCompanies(next);
  }, [companies]);

  return { companies, updateCompany };
}
