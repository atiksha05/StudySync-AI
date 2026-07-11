import { NextResponse } from "next/server";
import { ensureProfile, updateUserMode } from "@/lib/profile";
import { isValidUserMode } from "@/lib/modes";
import { createClient } from "@/lib/supabase/server";
import type { UserMode } from "@/types";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const mode = body.mode as UserMode;

  if (!isValidUserMode(mode)) {
    return NextResponse.json({ error: "Invalid workspace mode" }, { status: 400 });
  }

  await ensureProfile(user.id, {
    full_name: user.user_metadata?.full_name,
    nickname: user.user_metadata?.nickname,
  });

  const profile = await updateUserMode(user.id, mode);
  return NextResponse.json({ profile });
}
