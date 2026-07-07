import Link from "next/link";
import { FileAudio, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Lecture } from "@/types";

export function LectureCard({ lecture }: { lecture: Lecture }) {
  const Icon = lecture.file_type === "pdf" ? FileText : FileAudio;

  return (
    <Link href={`/lectures/${lecture.id}`}>
      <Card className="h-full transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:hover:border-indigo-900">
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <Icon className="h-5 w-5" />
            </div>
            <Badge status={lecture.status} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {lecture.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {formatDate(lecture.created_at)}
              {lecture.file_name ? ` · ${lecture.file_name}` : ""}
            </p>
          </div>
          {lecture.summary ? (
            <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
              {lecture.summary}
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              {lecture.status === "processing"
                ? "Generating study materials..."
                : "Open to view details"}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
