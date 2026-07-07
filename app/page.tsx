import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Brain, FileUp, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      title: "Upload lectures",
      description: "Drop audio or PDF files from class in seconds.",
    },
    {
      icon: Brain,
      title: "AI study materials",
      description: "Get notes, summaries, flashcards, and quizzes automatically.",
    },
    {
      icon: Layers,
      title: "Stay organized",
      description: "Track lectures and action items from one dashboard.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-16 text-white shadow-xl shadow-indigo-600/20 sm:px-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
          <Sparkles className="h-4 w-4" />
          PM portfolio project
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Turn lectures into study materials with AI
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-indigo-100">
          StudySync AI helps students upload lecture audio or PDFs and instantly
          generate notes, flashcards, quizzes, summaries, and action items.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <feature.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
