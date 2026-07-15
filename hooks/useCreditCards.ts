"use client";

import { useState, useCallback } from "react";
import type { CreditCard } from "@/lib/types";
import { getCreditCards, saveCreditCards } from "@/lib/storage";

function genId() {
  return `cc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export function useCreditCards() {
  const [cards, setCards] = useState<CreditCard[]>(() => getCreditCards());

  const addCard = useCallback((data: Omit<CreditCard, "id">) => {
    const entry: CreditCard = { ...data, id: genId() };
    const next = [...getCreditCards(), entry];
    saveCreditCards(next);
    setCards(next);
  }, []);

  const updateCard = useCallback((updated: CreditCard) => {
    const next = cards.map(c => c.id === updated.id ? updated : c);
    saveCreditCards(next);
    setCards(next);
  }, [cards]);

  const deleteCard = useCallback((id: string) => {
    const next = cards.filter(c => c.id !== id);
    saveCreditCards(next);
    setCards(next);
  }, [cards]);

  return { cards, addCard, updateCard, deleteCard };
}
