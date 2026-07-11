import { isSupabaseConfigured } from "@/lib/supabase/config";

export function AuthSetupNotice() {
  if (isSupabaseConfigured()) return null;

  return (
    <div className="mb-4 rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2.5 text-[11px] leading-relaxed text-amber-100/90">
      <p className="font-medium text-amber-200">Local preview mode</p>
      <p className="mt-0.5 text-amber-100/80">
        You can explore the UI now. Email and social sign-in will work after you add
        Supabase keys to <code className="text-amber-200">.env.local</code>.
      </p>
    </div>
  );
}
