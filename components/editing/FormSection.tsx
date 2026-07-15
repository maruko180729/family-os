import { cn } from "@/lib/utils";

interface FormSectionProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ label, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
