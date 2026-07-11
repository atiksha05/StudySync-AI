import Link from "next/link";
import { Card } from "@/components/ui/card";
import { DEMO_APPLICATIONS } from "@/lib/career/demo";
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from "@/lib/modes";

export const dynamic = "force-dynamic";

const PIPELINE_ORDER = [
  "saved",
  "applied",
  "oa",
  "recruiter_screen",
  "phone_interview",
  "final_interview",
  "offer",
  "rejected",
] as const;

export default function ApplicationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-bold text-[#F8FAFC]">Applications</h1>
      <p className="mb-6 text-sm text-slate-400">
        Track every application from saved to offer
      </p>

      <div className="mb-8 flex gap-1 overflow-x-auto pb-2">
        {PIPELINE_ORDER.map((status) => {
          const count = DEMO_APPLICATIONS.filter((a) => a.status === status).length;
          return (
            <div
              key={status}
              className="flex shrink-0 flex-col items-center rounded-xl border border-white/10 bg-[#0d1424]/80 px-3 py-2"
            >
              <span
                className="text-lg font-bold"
                style={{ color: APPLICATION_STATUS_COLORS[status] }}
              >
                {count}
              </span>
              <span className="text-[10px] text-slate-500">
                {APPLICATION_STATUS_LABELS[status]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {DEMO_APPLICATIONS.map((app) => (
          <Link key={app.id} href={`/company/${app.company_id}`}>
            <Card className="border-white/10 bg-[#0d1424]/80 p-5 transition hover:border-[#8B5CF6]/30">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-[#F8FAFC]">{app.company_name}</p>
                  <p className="text-sm text-slate-400">{app.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  {app.deadline ? (
                    <span className="text-xs text-slate-500">Due {app.deadline}</span>
                  ) : null}
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${APPLICATION_STATUS_COLORS[app.status]}20`,
                      color: APPLICATION_STATUS_COLORS[app.status],
                    }}
                  >
                    {APPLICATION_STATUS_LABELS[app.status]}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
