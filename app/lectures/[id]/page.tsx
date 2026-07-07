import { notFound } from "next/navigation";
import { LectureDetail } from "@/components/lectures/lecture-detail";
import { createClient } from "@/lib/supabase/server";
import type { Lecture } from "@/types";

export const dynamic = "force-dynamic";

export default async function LecturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("lectures")
    .select("*")
    .eq("id", id)
    .eq("user_id", user!.id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <LectureDetail initialLecture={data as Lecture} />
    </div>
  );
}
