"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, GraduationCap, Loader2, Rocket, Sparkles } from "lucide-react";
import type { UserMode } from "@/types";

const modes = [
  {
    id: "student" as UserMode,
    emoji: "🎓",
    title: "Student",
    description: "Study plans, lectures, flashcards, quizzes",
    icon: GraduationCap,
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
  },
  {
    id: "professional" as UserMode,
    emoji: "💼",
    title: "Professional",
    description: "Meetings, decisions, action items",
    icon: Briefcase,
    gradient: "from-[#8B5CF6] to-[#EC4899]",
  },
  {
    id: "career" as UserMode,
    emoji: "🚀",
    title: "Career",
    description: "Applications, interviews, resumes",
    icon: Rocket,
    gradient: "from-[#EC4899] to-[#F59E0B]",
  },
];

export function DemoModePicker({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState<UserMode | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function enterDemo(mode: UserMode) {
    setLoading(mode);
    setError(null);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Could not start demo");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      {!compact ? (
        <div className="text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-xs text-[#C4B5FD]">
            <Sparkles className="h-3.5 w-3.5" />
            Local demo — no account needed
          </div>
          <h2 className="text-lg font-semibold text-[#F8FAFC]">
            Explore dashboards without signing in
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Perfect while you fix Supabase auth. Demo data only — nothing is saved.
          </p>
        </div>
      ) : (
        <p className="text-center text-xs text-slate-500">
          Or explore without an account
        </p>
      )}

      <div className={`grid gap-2 ${compact ? "grid-cols-3" : "sm:grid-cols-3"}`}>
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            disabled={!!loading}
            onClick={() => enterDemo(mode.id)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-[#8B5CF6]/40 hover:bg-white/[0.07] disabled:opacity-60"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{mode.emoji}</span>
              {loading === mode.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#A78BFA]" />
              ) : (
                <mode.icon className="h-3.5 w-3.5 text-[#A78BFA]" />
              )}
            </div>
            <p className="mt-2 text-sm font-medium text-[#F8FAFC]">{mode.title}</p>
            {!compact ? (
              <p className="mt-0.5 text-[10px] text-slate-500">{mode.description}</p>
            ) : null}
          </button>
        ))}
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
