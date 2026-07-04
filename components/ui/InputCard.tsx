"use client";

import { cn } from "@/lib/utils";

interface InputField {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  type?: "text" | "number" | "textarea";
  onChange: (value: string) => void;
}

interface InputCardProps {
  label?: string;
  fields: InputField[];
  className?: string;
}

export function InputCard({ label, fields, className }: InputCardProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-5 border border-border shadow-sm", className)}>
      {label && (
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          {label}
        </p>
      )}
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.id}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={field.value}
                placeholder={field.placeholder}
                onChange={e => field.onChange(e.target.value)}
                rows={3}
                className="w-full text-sm text-foreground bg-muted rounded-2xl px-3.5 py-2.5 border-0 outline-none resize-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary transition-shadow"
              />
            ) : (
              <input
                type={field.type ?? "text"}
                value={field.value}
                placeholder={field.placeholder}
                onChange={e => field.onChange(e.target.value)}
                className="w-full text-sm text-foreground bg-muted rounded-2xl px-3.5 py-2.5 border-0 outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary transition-shadow"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
