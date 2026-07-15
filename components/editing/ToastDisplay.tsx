"use client";

import { CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastContext, useToastState } from "@/hooks/useToast";
import type { ToastItem } from "@/hooks/useToast";

const config = {
  success: { Icon: CheckCircle2, cls: "bg-foreground text-background" },
  error:   { Icon: XCircle,      cls: "bg-destructive text-white"     },
  info:    { Icon: Info,         cls: "bg-foreground text-background" },
};

function ToastPill({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const { Icon, cls } = config[toast.type];
  return (
    <button
      onClick={onDismiss}
      className={cn(
        "flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg text-sm font-medium",
        "animate-in slide-in-from-bottom-4 duration-300",
        cls
      )}
    >
      <Icon size={16} />
      {toast.message}
    </button>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const state = useToastState();

  return (
    <ToastContext.Provider value={state}>
      {children}
      {state.toasts.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 z-50 flex flex-col items-center gap-2 pointer-events-none px-4">
          {state.toasts.map(t => (
            <div key={t.id} className="pointer-events-auto">
              <ToastPill toast={t} onDismiss={() => state.dismiss(t.id)} />
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
