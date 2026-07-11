"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Loader2, Rocket, Sparkles } from "lucide-react";
import type { UserMode } from "@/types";

const modes = [
  {
    id: "student" as UserMode,
    emoji: "🎓",
    title: "Student Workspace",
    description: "For lectures, exams, notes, flashcards, and study plans.",
    icon: GraduationCap,
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
  },
  {
    id: "professional" as UserMode,
    emoji: "💼",
    title: "Professional Workspace",
    description: "For meetings, action items, decisions, and follow-ups.",
    icon: Briefcase,
    gradient: "from-[#8B5CF6] to-[#EC4899]",
  },
  {
    id: "career" as UserMode,
    emoji: "🚀",
    title: "Career Workspace",
    description: "For applications, companies, resumes, interviews, and career prep.",
    icon: Rocket,
    gradient: "from-[#EC4899] to-[#F59E0B]",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<UserMode | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function selectMode(mode: UserMode) {
    setLoading(mode);
    setError(null);

    try {
      const res = await fetch("/api/profile/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save preference");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.1),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-xs text-[#C4B5FD]">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome to StudySync AI
          </div>
          <h1 className="text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
            What do you want to organize first?
          </h1>
          <p className="mt-2 text-slate-400">
            Choose your workspace. You can switch anytime in Settings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              disabled={!!loading}
              onClick={() => selectMode(mode.id)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 text-left backdrop-blur-md transition hover:border-[#8B5CF6]/40 hover:bg-[#0d1424]"
            >
              <div className="mb-3 text-2xl">{mode.emoji}</div>
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${mode.gradient}`}
              >
                {loading === mode.id ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                  <mode.icon className="h-5 w-5 text-white" />
                )}
              </div>
              <h2 className="text-lg font-semibold text-[#F8FAFC]">{mode.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{mode.description}</p>
            </button>
          ))}
        </div>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-center text-sm text-red-300">
            {error}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
