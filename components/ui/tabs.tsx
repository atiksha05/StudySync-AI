"use client";

import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-xl px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm",
            active === tab.id
              ? "bg-gradient-to-r from-[#3B82F6]/80 to-[#8B5CF6]/80 text-white"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
