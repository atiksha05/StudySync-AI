import type { Profile, UserMode } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { getModeLabel as modeLabel } from "@/lib/modes";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return data as Profile | null;
}

export async function ensureProfile(
  userId: string,
  metadata?: { full_name?: string; nickname?: string }
): Promise<Profile> {
  const supabase = await createClient();
  const existing = await getProfile(userId);
  if (existing) return existing;

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      full_name: metadata?.full_name ?? null,
      nickname: metadata?.nickname ?? null,
      onboarding_completed: false,
      user_mode: null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function completeOnboarding(
  userId: string,
  mode: UserMode
): Promise<Profile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      user_mode: mode,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function updateUserMode(
  userId: string,
  mode: UserMode
): Promise<Profile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      user_mode: mode,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("*")
    .single();

  if (error) throw error;
  return data as Profile;
}

export function getModeLabel(mode: UserMode) {
  return modeLabel(mode);
}
