import { getDemoMode } from "@/lib/demo-preview";
import { getProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { WorkspaceUploadForm } from "@/components/workspace/upload-form";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const demoMode = await getDemoMode();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && demoMode) {
    return (
      <PlaceholderPage
        title="Upload"
        description="Sign in to upload and process real content. Demo mode shows dashboards only — uploads need a Supabase account."
      />
    );
  }

  const profile = await getProfile(user!.id);
  const mode = profile?.user_mode ?? "student";

  return <WorkspaceUploadForm userMode={mode} />;
}
