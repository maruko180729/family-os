"use client";

import { useState, useCallback } from "react";
import type { FamilyDocument } from "@/lib/types";
import { getDocuments, saveDocuments } from "@/lib/storage";

export function useDocumentsData() {
  const [documents, setDocuments] = useState<FamilyDocument[]>(() => getDocuments());

  const updateDocument = useCallback((updated: FamilyDocument) => {
    const next = documents.map(d => d.id === updated.id ? updated : d);
    saveDocuments(next);
    setDocuments(next);
  }, [documents]);

  return { documents, updateDocument };
}
