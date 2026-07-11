import { notFound } from "next/navigation";
import { WorkspaceDetail } from "@/components/workspace/workspace-detail";
import { createClient } from "@/lib/supabase/server";
import type { Workspace } from "@/types";

export const dynamic = "force-dynamic";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (error || !data) notFound();

  return <WorkspaceDetail initial={data as Workspace} />;
}
