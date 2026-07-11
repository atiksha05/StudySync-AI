import { Card } from "@/components/ui/card";
import { DEMO_RESUME_VERSIONS } from "@/lib/career/demo";

export const dynamic = "force-dynamic";

export default function ResumeTrackerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-bold text-[#F8FAFC]">Resume Tracker</h1>
      <p className="mb-6 text-sm text-slate-400">
        Manage resume versions and track which ones you used per application
      </p>

      <div className="space-y-3">
        {DEMO_RESUME_VERSIONS.map((resume) => (
          <Card key={resume.id} className="border-white/10 bg-[#0d1424]/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#F8FAFC]">{resume.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Last updated {resume.updated} · Used {resume.used} times
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                PDF
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
