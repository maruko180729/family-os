"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toasts: ToastItem[];
  show: (message: string, type?: ToastType) => void;
  dismiss: (id: string) => void;
}

// Using module-level singleton so the hook works without a Provider
// (avoids requiring layout changes for simple pages)
let _show: ((message: string, type?: ToastType) => void) | null = null;

export function registerToastFn(fn: (message: string, type?: ToastType) => void) {
  _show = fn;
}

export function toast(message: string, type: ToastType = "success") {
  _show?.(message, type);
}

export const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  show: () => {},
  dismiss: () => {},
});

export function useToastState() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    const t = timers.current.get(id);
    if (t) { clearTimeout(t); timers.current.delete(id); }
  }, []);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    const t = setTimeout(() => dismiss(id), 2500);
    timers.current.set(id, t);
  }, [dismiss]);

  useEffect(() => {
    registerToastFn(show);
    return () => { if (_show === show) _show = null; };
  }, [show]);

  return { toasts, show, dismiss };
}

export function useToast() {
  return useContext(ToastContext);
}
