"use client";

import { useState, useCallback } from "react";
import type { ExchangeRateSettings } from "@/lib/types";
import { getExchangeRates, saveExchangeRates } from "@/lib/storage";

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRateSettings>(() => getExchangeRates());

  const updateRates = useCallback((r: ExchangeRateSettings) => {
    saveExchangeRates(r);
    setRates(r);
  }, []);

  return { rates, updateRates };
}
