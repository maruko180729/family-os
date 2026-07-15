"use client";

import { usePathname } from "next/navigation";

// Re-keying on pathname causes React to unmount/remount the subtree,
// which Tailwind's animate-in picks up as a fresh entry animation.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div
      key={pathname}
      className="animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {children}
    </div>
  );
}
