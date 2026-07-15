"use client";

import { useState, useCallback } from "react";
import type { Vehicle } from "@/lib/types";
import { getVehicles, saveVehicles } from "@/lib/storage";

export function useVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => getVehicles());

  const updateVehicle = useCallback((updated: Vehicle) => {
    const next = vehicles.map(v => v.id === updated.id ? updated : v);
    saveVehicles(next);
    setVehicles(next);
  }, [vehicles]);

  return { vehicles, updateVehicle };
}
