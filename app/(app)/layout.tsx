import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { getDemoMode } from "@/lib/demo-preview";
import { ensureProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import type { UserMode } from "@/types";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const demoMode = await getDemoMode();

  if (!user && demoMode) {
    return (
      <div className="flex min-h-[calc(100vh-0px)]">
        <AppSidebar mode={demoMode} isDemo />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-100">
            Demo preview — no account required. Sign in later to save real data.
          </div>
          {children}
        </div>
      </div>
    );
  }

  if (!user) redirect("/login");

  const profile = await ensureProfile(user.id, {
    full_name: user.user_metadata?.full_name,
    nickname: user.user_metadata?.nickname,
  });

  if (!profile.onboarding_completed || !profile.user_mode) {
    redirect("/onboarding");
  }

  const mode = profile.user_mode as UserMode;

  return (
    <div className="flex min-h-[calc(100vh-0px)]">
      <AppSidebar mode={mode} />
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
