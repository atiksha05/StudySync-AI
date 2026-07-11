import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Brain,
  Briefcase,
  FileUp,
  GraduationCap,
  Rocket,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: FileUp,
      title: "Upload anything",
      description:
        "Lecture audio, meeting recordings, PDFs, text notes, images, and interview prep materials.",
      color: "text-[#3B82F6]",
      bg: "bg-[#3B82F6]/15",
    },
    {
      icon: Brain,
      title: "AI knowledge engine",
      description:
        "Gemini turns raw content into summaries, notes, flashcards, decisions, and action items.",
      color: "text-[#8B5CF6]",
      bg: "bg-[#8B5CF6]/15",
    },
    {
      icon: Sparkles,
      title: "Three clear paths",
      description:
        "Learn better with Student Mode. Work smarter with Professional Mode. Get hired with Career Mode.",
      color: "text-[#EC4899]",
      bg: "bg-[#EC4899]/15",
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#050816]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(59,130,246,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.1),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-20">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#3B82F6]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 px-8 py-14 backdrop-blur-sm sm:px-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-sm text-[#C4B5FD]">
            <Sparkles className="h-4 w-4" />
            AI knowledge workspace
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[#F8FAFC] sm:text-5xl">
            Turn messy content into{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              organized knowledge
            </span>{" "}
            with AI
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            StudySync AI helps students, professionals, and job seekers transform
            lectures, meetings, PDFs, notes, and interview prep into organized study
            materials, action items, and searchable insights.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] px-6 text-sm font-semibold text-white shadow-lg shadow-[#8B5CF6]/25 transition hover:shadow-[#8B5CF6]/40"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#F8FAFC] transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-6 backdrop-blur-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B82F6]/15">
              <GraduationCap className="h-5 w-5 text-[#3B82F6]" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[#F8FAFC]">Student Mode</h2>
            <p className="mt-2 text-sm text-slate-400">
              Lectures, exams, flashcards, quizzes, and AI study plans.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-6 backdrop-blur-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EC4899]/15">
              <Briefcase className="h-5 w-5 text-[#EC4899]" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[#F8FAFC]">Professional Mode</h2>
            <p className="mt-2 text-sm text-slate-400">
              Meetings, decisions, action items, risks, and follow-up emails.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-6 backdrop-blur-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F59E0B]/15">
              <Rocket className="h-5 w-5 text-[#F59E0B]" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[#F8FAFC]">Career Mode</h2>
            <p className="mt-2 text-sm text-slate-400">
              Track applications, prepare interviews, organize companies, resumes,
              recruiters, and practice questions.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-[#111827]/60 p-6 backdrop-blur-sm"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg}`}
              >
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-[#F8FAFC]">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
