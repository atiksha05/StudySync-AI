export const AUTH_NOT_CONFIGURED_MESSAGE =
  "Auth is in local preview mode. Add your real Supabase URL and anon key to .env.local to enable sign up, sign in, and social login.";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  if (!url || !key) return false;
  if (url.includes("placeholder") || url.includes("your-project")) return false;
  if (key === "placeholder-key" || key.includes("your-anon")) return false;

  return true;
}
