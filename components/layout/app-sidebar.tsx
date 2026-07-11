"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getModeLabel, getNavItems } from "@/lib/modes";
import type { UserMode } from "@/types";
import { cn } from "@/lib/utils";

export function AppSidebar({
  mode,
  isDemo = false,
}: {
  mode: UserMode;
  isDemo?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = getNavItems(mode);

  async function handleSignOut() {
    if (isDemo) {
      await fetch("/api/demo", { method: "DELETE" });
      router.push("/login");
      router.refresh();
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col border-r border-white/10 bg-[#0a0f1c]/90 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]">
          <BookOpen className="h-4 w-4 text-white" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#F8FAFC]">StudySync AI</p>
          <p className="text-[10px] text-[#A78BFA]">
            {getModeLabel(mode)}
            {isDemo ? " · Demo" : ""}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-gradient-to-r from-[#3B82F6]/20 to-[#8B5CF6]/20 text-[#F8FAFC]"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
        >
          <LogOut className="h-4 w-4" />
          {isDemo ? "Exit demo" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
