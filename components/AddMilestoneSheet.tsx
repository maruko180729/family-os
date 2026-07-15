"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (date: string, title: string, emoji?: string) => void;
}

export default function AddMilestoneSheet({ open, onClose, onSave }: Props) {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");

  function handleSave() {
    if (!date.trim() || !title.trim()) return;
    onSave(date.trim(), title.trim(), emoji.trim() || undefined);
    setDate("");
    setTitle("");
    setEmoji("");
    onClose();
  }

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-10 pt-6 max-w-[480px] mx-auto">
        <SheetHeader className="mb-5">
          <SheetTitle className="text-lg font-semibold text-left">添加家庭时间线事件</SheetTitle>
        </SheetHeader>

        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">时间</label>
          <input
            type="text"
            placeholder="例：2027 或 2027-11 或 未来"
            value={date}
            onChange={e => setDate(e.target.value)}
            autoFocus
            className="w-full px-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">事件</label>
          <input
            type="text"
            placeholder="例：Maruko 上小学"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>

        <div className="mb-6">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">图标（可选）</label>
          <input
            type="text"
            placeholder="例：🎓"
            value={emoji}
            onChange={e => setEmoji(e.target.value)}
            className="w-full px-3.5 py-3 bg-muted rounded-2xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!date.trim() || !title.trim()}
          className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm disabled:opacity-40 active:scale-95 transition-transform"
        >
          保存
        </button>
      </SheetContent>
    </Sheet>
  );
}
