import { NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { question, context, workspaceId } = await request.json();

  if (!question?.trim()) {
    return NextResponse.json({ error: "Question required" }, { status: 400 });
  }

  if (workspaceId) {
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("id")
      .eq("id", workspaceId)
      .eq("user_id", user.id)
      .single();

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }
  }

  const ai = getAIProvider();
  const answer = await ai.ask(question, context ?? "");

  return NextResponse.json({ answer });
}
