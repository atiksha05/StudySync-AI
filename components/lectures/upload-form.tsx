"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/client";

const ACCEPTED_TYPES = [
  "audio/mpeg",
  "audio/mp4",
  "audio/wav",
  "audio/x-m4a",
  "application/pdf",
];

export function UploadForm() {
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) {
      setFile(null);
      return;
    }

    const isPdf = selected.type === "application/pdf";
    const isAudio = selected.type.startsWith("audio/");

    if (!isPdf && !isAudio) {
      setError("Please upload an audio file (MP3, M4A, WAV) or PDF.");
      setFile(null);
      return;
    }

    setError(null);
    setFile(selected);
    if (!title) {
      setTitle(selected.name.replace(/\.[^/.]+$/, ""));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in to upload lectures.");
      setLoading(false);
      return;
    }

    const fileType = file.type === "application/pdf" ? "pdf" : "audio";

    const { data: lecture, error: insertError } = await supabase
      .from("lectures")
      .insert({
        title,
        user_id: user.id,
        status: "pending",
      })
      .select()
      .single();

    if (insertError || !lecture) {
      setError(insertError?.message ?? "Failed to create lecture.");
      setLoading(false);
      return;
    }

    const path = `${user.id}/${lecture.id}/${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("lectures")
      .upload(path, file);

    if (uploadError) {
      await supabase.from("lectures").delete().eq("id", lecture.id);
      setError(uploadError.message);
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("lectures")
      .update({
        file_url: path,
        file_type: fileType,
        file_name: file.name,
      })
      .eq("id", lecture.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    const processResponse = await fetch(`/api/lectures/${lecture.id}/process`, {
      method: "POST",
    });

    if (!processResponse.ok) {
      const body = await processResponse.json().catch(() => ({}));
      setError(body.error ?? "Upload succeeded but processing failed to start.");
      setLoading(false);
      router.push(`/lectures/${lecture.id}`);
      return;
    }

    router.push(`/lectures/${lecture.id}`);
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Upload lecture
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Add audio or PDF from class. StudySync will generate notes, flashcards,
          quizzes, and tasks.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Lecture title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Intro to Product Management"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Audio or PDF</Label>
            <label
              htmlFor="file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-indigo-700"
            >
              <Upload className="h-8 w-8 text-indigo-600" />
              <span className="mt-3 text-sm font-medium text-slate-900 dark:text-white">
                {file ? file.name : "Click to choose a file"}
              </span>
              <span className="mt-1 text-xs text-slate-500">
                MP3, M4A, WAV, or PDF
              </span>
              <input
                id="file"
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {error ? <Alert variant="error">{error}</Alert> : null}

          <Button type="submit" disabled={loading || !file} className="w-full sm:w-auto">
            {loading ? "Uploading and processing..." : "Upload and generate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
