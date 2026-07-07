import Link from "next/link";
import { Plus } from "lucide-react";
import { LectureCard } from "@/components/dashboard/lecture-card";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/server";
import type { Lecture } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("lectures")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const lectures = (data ?? []) as Lecture[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Your lectures and AI-generated study materials.
          </p>
        </div>
        <Link href="/lectures/new">
          <Button>
            <Plus className="h-4 w-4" />
            Upload lecture
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        {error ? (
          <Alert variant="error" title="Could not load lectures">
            {error.message}
          </Alert>
        ) : lectures.length === 0 ? (
          <DashboardEmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lectures.map((lecture) => (
              <LectureCard key={lecture.id} lecture={lecture} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
