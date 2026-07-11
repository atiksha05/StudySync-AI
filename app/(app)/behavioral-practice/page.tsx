import { Card } from "@/components/ui/card";
import { DEMO_BEHAVIORAL_QUESTIONS } from "@/lib/career/demo";

export const dynamic = "force-dynamic";

export default function BehavioralPracticePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-bold text-[#F8FAFC]">Behavioral Practice</h1>
      <p className="mb-6 text-sm text-slate-400">
        Practice STAR-format answers for common behavioral interview questions
      </p>

      <div className="space-y-3">
        {DEMO_BEHAVIORAL_QUESTIONS.map((q, i) => (
          <Card key={i} className="border-white/10 bg-[#0d1424]/80 p-5">
            <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2 py-0.5 text-[10px] text-[#A78BFA]">
              {q.category}
            </span>
            <p className="mt-3 text-sm text-slate-200">{q.question}</p>
            <p className="mt-2 text-xs text-slate-500">
              Tip: Use Situation → Task → Action → Result structure
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
