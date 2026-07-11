import { getDemoMode } from "@/lib/demo-preview";
import { getProfile, getModeLabel } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { isGeminiConfigured } from "@/lib/ai";
import { WorkspaceSwitcher } from "@/components/settings/workspace-switcher";
import { DemoModePicker } from "@/components/auth/demo-mode-picker";
import type { UserMode } from "@/types";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const demoMode = await getDemoMode();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && demoMode) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold text-[#F8FAFC]">Settings</h1>

        <Card className="mb-6 space-y-4 border-white/10 bg-[#0d1424]/80 p-6">
          <div>
            <p className="text-xs text-slate-500">Account</p>
            <p className="text-sm text-[#F8FAFC]">Demo preview (not signed in)</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Current Workspace</p>
            <p className="text-sm text-[#F8FAFC]">{getModeLabel(demoMode)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">AI Provider</p>
            <p className="text-sm text-[#F8FAFC]">
              Google Gemini {isGeminiConfigured() ? "(connected)" : "(demo mode)"}
            </p>
          </div>
        </Card>

        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <h2 className="mb-4 text-lg font-semibold text-[#F8FAFC]">
            Switch Demo Workspace
          </h2>
          <DemoModePicker />
        </Card>
      </div>
    );
  }

  const profile = await getProfile(user!.id);
  const mode = (profile?.user_mode ?? "student") as UserMode;

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold text-[#F8FAFC]">Settings</h1>

      <Card className="mb-6 space-y-4 border-white/10 bg-[#0d1424]/80 p-6">
        <div>
          <p className="text-xs text-slate-500">Email</p>
          <p className="text-sm text-[#F8FAFC]">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Current Workspace</p>
          <p className="text-sm text-[#F8FAFC]">
            {profile?.user_mode ? getModeLabel(profile.user_mode) : "Not set"}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">AI Provider</p>
          <p className="text-sm text-[#F8FAFC]">
            Google Gemini {isGeminiConfigured() ? "(connected)" : "(demo mode)"}
          </p>
        </div>
        <p className="text-xs text-slate-500">
          To enable live AI, add <code className="text-[#A78BFA]">GEMINI_API_KEY</code> to
          your environment variables.
        </p>
      </Card>

      <Card className="border-white/10 bg-[#0d1424]/80 p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#F8FAFC]">Switch Workspace</h2>
        <WorkspaceSwitcher currentMode={mode} />
      </Card>
    </div>
  );
}
