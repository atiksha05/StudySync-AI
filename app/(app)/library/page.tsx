import { createClient } from "@/lib/supabase/server";
import { getDemoMode } from "@/lib/demo-preview";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Workspace } from "@/types";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const demoMode = await getDemoMode();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && demoMode) {
    return (
      <PlaceholderPage
        title="Library"
        description="Demo mode has no saved workspaces yet. Sign in to upload and build your library."
      />
    );
  }

  const { data } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const workspaces = (data ?? []) as Workspace[];

  if (workspaces.length === 0) {
    return (
      <PlaceholderPage
        title="Library"
        description="Your processed lectures, meetings, and documents will appear here."
      />
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold text-[#F8FAFC]">Library</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {workspaces.map((w) => (
          <Link key={w.id} href={`/workspace/${w.id}`}>
            <Card className="border-white/10 bg-[#0d1424]/80 p-5 transition hover:border-[#8B5CF6]/30">
              <p className="font-medium text-[#F8FAFC]">{w.title}</p>
              <p className="mt-1 text-xs capitalize text-slate-500">
                {w.content_type.replace(/_/g, " ")} · {w.status}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
