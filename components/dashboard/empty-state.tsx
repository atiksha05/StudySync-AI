import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
        <BookOpen className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
        No lectures yet
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
        Upload audio or PDF from class to get AI-generated notes, flashcards,
        quizzes, and action items.
      </p>
      <Link href="/lectures/new" className="mt-6">
        <Button>
          <Plus className="h-4 w-4" />
          Upload your first lecture
        </Button>
      </Link>
    </div>
  );
}
