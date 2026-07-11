import { Card } from "@/components/ui/card";
import { DEMO_TECHNICAL_QUESTIONS } from "@/lib/career/demo";

export const dynamic = "force-dynamic";

export default function TechnicalPracticePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-bold text-[#F8FAFC]">Technical Practice</h1>
      <p className="mb-6 text-sm text-slate-400">
        Coding and system design questions to sharpen your technical interviews
      </p>

      <div className="space-y-3">
        {DEMO_TECHNICAL_QUESTIONS.map((q, i) => (
          <Card key={i} className="border-white/10 bg-[#0d1424]/80 p-5">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  q.difficulty === "Easy"
                    ? "bg-emerald-500/10 text-emerald-300"
                    : q.difficulty === "Medium"
                      ? "bg-amber-500/10 text-amber-300"
                      : "bg-red-500/10 text-red-300"
                }`}
              >
                {q.difficulty}
              </span>
              <span className="text-[10px] text-slate-500">{q.topic}</span>
            </div>
            <p className="mt-3 text-sm text-slate-200">{q.question}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
