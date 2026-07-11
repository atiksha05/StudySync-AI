"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, GraduationCap, Loader2, Rocket } from "lucide-react";
import { getModeLabel, MODE_TAGLINES } from "@/lib/modes";
import type { UserMode } from "@/types";

const modes: {
  id: UserMode;
  emoji: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}[] = [
  {
    id: "student",
    emoji: "🎓",
    title: "Student Workspace",
    description: "For lectures, exams, notes, flashcards, and study plans.",
    icon: GraduationCap,
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
  },
  {
    id: "professional",
    emoji: "💼",
    title: "Professional Workspace",
    description: "For meetings, action items, decisions, and follow-ups.",
    icon: Briefcase,
    gradient: "from-[#8B5CF6] to-[#EC4899]",
  },
  {
    id: "career",
    emoji: "🚀",
    title: "Career Workspace",
    description: "For applications, companies, resumes, interviews, and career prep.",
    icon: Rocket,
    gradient: "from-[#EC4899] to-[#F59E0B]",
  },
];

export function WorkspaceSwitcher({ currentMode }: { currentMode: UserMode }) {
  const router = useRouter();
  const [loading, setLoading] = useState<UserMode | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function switchMode(mode: UserMode) {
    if (mode === currentMode) return;

    setLoading(mode);
    setError(null);

    try {
      const res = await fetch("/api/profile/mode", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to switch workspace");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">
        Switch between workspaces anytime. Your data is preserved across modes.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {modes.map((mode) => {
          const active = mode.id === currentMode;
          return (
            <button
              key={mode.id}
              type="button"
              disabled={!!loading}
              onClick={() => switchMode(mode.id)}
              className={`relative rounded-xl border p-4 text-left transition ${
                active
                  ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/10"
                  : "border-white/10 bg-white/5 hover:border-[#8B5CF6]/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{mode.emoji}</span>
                {loading === mode.id ? (
                  <Loader2 className="h-4 w-4 animate-spin text-[#A78BFA]" />
                ) : (
                  <mode.icon className="h-4 w-4 text-[#A78BFA]" />
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-[#F8FAFC]">
                {mode.title}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                {MODE_TAGLINES[mode.id]}
              </p>
              {active ? (
                <span className="mt-2 inline-block text-[10px] font-medium text-[#A78BFA]">
                  Current · {getModeLabel(mode.id)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
