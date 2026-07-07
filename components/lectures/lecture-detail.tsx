"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Lecture } from "@/types";

const TABS = [
  { id: "summary", label: "Summary" },
  { id: "notes", label: "Notes" },
  { id: "flashcards", label: "Flashcards" },
  { id: "quiz", label: "Quiz" },
  { id: "tasks", label: "Tasks" },
];

export function LectureDetail({ initialLecture }: { initialLecture: Lecture }) {
  const router = useRouter();
  const [lecture, setLecture] = useState(initialLecture);
  const [activeTab, setActiveTab] = useState("summary");
  const [retrying, setRetrying] = useState(false);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (lecture.status !== "processing" && lecture.status !== "pending") {
      return;
    }

    const interval = setInterval(async () => {
      const response = await fetch(`/api/lectures/${lecture.id}`);
      if (!response.ok) return;
      const data = (await response.json()) as Lecture;
      setLecture(data);
      if (data.status === "completed" || data.status === "failed") {
        clearInterval(interval);
        router.refresh();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [lecture.id, lecture.status, router]);

  async function handleRetry() {
    setRetrying(true);
    const response = await fetch(`/api/lectures/${lecture.id}/process`, {
      method: "POST",
    });
    if (response.ok) {
      setLecture((prev) => ({ ...prev, status: "processing", error_message: null }));
    }
    setRetrying(false);
  }

  const isProcessing =
    lecture.status === "processing" || lecture.status === "pending";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
              {lecture.title}
            </h1>
            <Badge status={lecture.status} />
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Uploaded {formatDate(lecture.created_at)}
            {lecture.file_name ? ` · ${lecture.file_name}` : ""}
          </p>
        </div>
        {lecture.status === "failed" ? (
          <Button onClick={handleRetry} disabled={retrying}>
            <RefreshCw className={`h-4 w-4 ${retrying ? "animate-spin" : ""}`} />
            Retry processing
          </Button>
        ) : null}
      </div>

      {isProcessing ? (
        <Alert variant="info" title="Generating study materials">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Your lecture is being transcribed and analyzed. This may take a minute.
          </div>
        </Alert>
      ) : null}

      {lecture.status === "failed" && lecture.error_message ? (
        <Alert variant="error" title="Processing failed">
          {lecture.error_message}
        </Alert>
      ) : null}

      {lecture.status === "completed" ? (
        <>
          <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

          {activeTab === "summary" ? (
            <Card>
              <CardContent className="prose prose-slate max-w-none dark:prose-invert">
                <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                  {lecture.summary}
                </p>
              </CardContent>
            </Card>
          ) : null}

          {activeTab === "notes" ? (
            <Card>
              <CardContent>
                <ul className="space-y-3">
                  {(lecture.notes ?? []).map((note, i) => (
                    <li
                      key={i}
                      className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          {activeTab === "flashcards" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {(lecture.flashcards ?? []).map((card, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))
                  }
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-900"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                    {flipped[i] ? "Answer" : "Question"}
                  </p>
                  <p className="mt-3 text-sm text-slate-800 dark:text-slate-100">
                    {flipped[i] ? card.back : card.front}
                  </p>
                  <p className="mt-4 text-xs text-slate-500">Tap to flip</p>
                </button>
              ))}
            </div>
          ) : null}

          {activeTab === "quiz" ? (
            <div className="space-y-4">
              {(lecture.quizzes ?? []).map((q, i) => (
                <Card key={i}>
                  <CardContent className="space-y-4">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {i + 1}. {q.question}
                    </p>
                    <div className="grid gap-2">
                      {q.options.map((option, optionIndex) => {
                        const selected = quizAnswers[i] === optionIndex;
                        const showResult = quizAnswers[i] !== null && quizAnswers[i] !== undefined;
                        const isCorrect = optionIndex === q.correctIndex;

                        return (
                          <button
                            key={optionIndex}
                            type="button"
                            onClick={() =>
                              setQuizAnswers((prev) => ({
                                ...prev,
                                [i]: optionIndex,
                              }))
                            }
                            className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                              showResult && isCorrect
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                                : showResult && selected
                                  ? "border-red-500 bg-red-50 dark:bg-red-950"
                                  : selected
                                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                                    : "border-slate-200 hover:border-indigo-200 dark:border-slate-700"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {quizAnswers[i] !== null && quizAnswers[i] !== undefined ? (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {q.explanation}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}

          {activeTab === "tasks" ? (
            <Card>
              <CardContent className="space-y-3">
                {(lecture.tasks ?? []).map((task, i) => (
                  <label
                    key={i}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                  >
                    <input
                      type="checkbox"
                      checked={checkedTasks[i] ?? false}
                      onChange={(e) =>
                        setCheckedTasks((prev) => ({
                          ...prev,
                          [i]: e.target.checked,
                        }))
                      }
                      className="mt-1"
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          checkedTasks[i]
                            ? "text-slate-400 line-through"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Priority: {task.priority}
                        {task.dueHint ? ` · ${task.dueHint}` : ""}
                      </p>
                    </div>
                  </label>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
