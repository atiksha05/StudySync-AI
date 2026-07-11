import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CompanyWorkspace } from "@/components/career/company-workspace";
import { getDemoCompany } from "@/lib/career/demo";
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from "@/lib/modes";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = getDemoCompany(id);

  if (!company) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Link
        href="/companies"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to companies
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F8FAFC]">{company.name}</h1>
          <p className="mt-1 text-sm text-slate-400">
            {company.role} · {company.location}
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: `${APPLICATION_STATUS_COLORS[company.status]}20`,
            color: APPLICATION_STATUS_COLORS[company.status],
          }}
        >
          {APPLICATION_STATUS_LABELS[company.status]}
        </span>
      </div>

      <CompanyWorkspace company={company} />
    </div>
  );
}
