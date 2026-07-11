import { createClient } from "@/lib/supabase/server";
import { getDemoMode } from "@/lib/demo-preview";
import { getProfile } from "@/lib/profile";
import {
  CareerDashboard,
  ProfessionalDashboard,
  StudentDashboard,
} from "@/components/dashboard/mode-dashboards";
import type { Workspace } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const demoMode = await getDemoMode();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const mode = user
    ? ((await getProfile(user.id))?.user_mode ?? "student")
    : (demoMode ?? "student");

  if (mode === "career") {
    return <CareerDashboard />;
  }

  let workspaces: Workspace[] = [];

  if (user) {
    const { data } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    workspaces = (data ?? []) as Workspace[];
  }

  if (mode === "professional") {
    return <ProfessionalDashboard workspaces={workspaces} />;
  }

  return <StudentDashboard workspaces={workspaces} />;
}
