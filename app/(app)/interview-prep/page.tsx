import { Card } from "@/components/ui/card";
import { DEMO_COMPANIES } from "@/lib/career/demo";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default function InterviewPrepPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-bold text-[#F8FAFC]">Interview Prep</h1>
      <p className="mb-6 text-sm text-slate-400">
        AI-powered prep for your upcoming interviews
      </p>

      <Card className="mb-6 border-white/10 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#A78BFA]" />
          <h2 className="font-semibold text-[#F8FAFC]">AI Interview Coach</h2>
        </div>
        <p className="mt-2 text-sm text-slate-300">
          Practice STAR answers, review company-specific questions, and get personalized
          coaching tips. Add GEMINI_API_KEY for live AI coaching.
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {DEMO_COMPANIES.filter(
          (c) =>
            c.status === "final_interview" ||
            c.status === "phone_interview" ||
            c.status === "oa"
        ).map((company) => (
          <Link key={company.id} href={`/company/${company.id}`}>
            <Card className="border-white/10 bg-[#0d1424]/80 p-5 transition hover:border-[#8B5CF6]/30">
              <p className="font-medium text-[#F8FAFC]">{company.name}</p>
              <p className="mt-1 text-sm text-slate-400">{company.role}</p>
              <ul className="mt-3 space-y-1">
                {company.ai_output.ai_coach_tips.slice(0, 2).map((tip, i) => (
                  <li key={i} className="text-xs text-slate-500">
                    • {tip}
                  </li>
                ))}
              </ul>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
