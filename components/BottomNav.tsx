"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, Target, House, MoreHorizontal } from "lucide-react";

const tabs = [
  { href: "/", label: "今天", icon: Home },
  { href: "/assets", label: "资产", icon: TrendingUp },
  { href: "/growth", label: "成长", icon: Target },
  { href: "/family", label: "家", icon: House },
  { href: "/more", label: "更多", icon: MoreHorizontal },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/90 backdrop-blur-sm border-t border-border pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl active:scale-90 transition-transform duration-100"
            >
              <div className={`relative flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-200 ${active ? "bg-accent" : ""}`}>
                <Icon
                  size={19}
                  className={active ? "text-primary" : "text-muted-foreground"}
                  strokeWidth={active ? 2.5 : 1.8}
                />
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
