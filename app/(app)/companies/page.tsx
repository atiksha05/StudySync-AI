import Link from "next/link";
import { Card } from "@/components/ui/card";
import { DEMO_COMPANIES } from "@/lib/career/demo";
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from "@/lib/modes";

export const dynamic = "force-dynamic";

export default function CompaniesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-bold text-[#F8FAFC]">Companies</h1>
      <p className="mb-6 text-sm text-slate-400">
        Track companies you&apos;re targeting and prep for each role
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {DEMO_COMPANIES.map((company) => (
          <Link key={company.id} href={`/company/${company.id}`}>
            <Card className="border-white/10 bg-[#0d1424]/80 p-5 transition hover:border-[#8B5CF6]/30">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[#F8FAFC]">{company.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{company.role}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{company.location}</p>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${APPLICATION_STATUS_COLORS[company.status]}20`,
                    color: APPLICATION_STATUS_COLORS[company.status],
                  }}
                >
                  {APPLICATION_STATUS_LABELS[company.status]}
                </span>
              </div>
              {company.salary_range ? (
                <p className="mt-3 text-xs text-slate-500">{company.salary_range}</p>
              ) : null}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
