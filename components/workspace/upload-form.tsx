"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileAudio,
  FileText,
  Image,
  Mic,
  StickyNote,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/client";
import type { ContentType, UserMode } from "@/types";

const contentTypes: {
  id: ContentType;
  label: string;
  description: string;
  icon: React.ElementType;
  accept?: string;
}[] = [
  {
    id: "lecture_audio",
    label: "Lecture Audio",
    description: "MP3, M4A, WAV recordings",
    icon: FileAudio,
    accept: "audio/*",
  },
  {
    id: "meeting_recording",
    label: "Meeting Recording",
    description: "Team calls and standups",
    icon: Mic,
    accept: "audio/*",
  },
  {
    id: "pdf",
    label: "PDF",
    description: "Slides, papers, documents",
    icon: FileText,
    accept: "application/pdf",
  },
  {
    id: "text_notes",
    label: "Text Notes",
    description: "Paste or type notes directly",
    icon: StickyNote,
  },
  {
    id: "image_notes",
    label: "Image Notes",
    description: "Photos of whiteboards or notes",
    icon: Image,
    accept: "image/*",
  },
];

type UploadFormProps = {
  userMode: UserMode;
};

export function WorkspaceUploadForm({ userMode }: UploadFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [contentType, setContentType] = useState<ContentType>("lecture_audio");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = contentTypes.find((c) => c.id === contentType)!;
  const isTextOnly = contentType === "text_notes";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }
    if (!isTextOnly && !file) {
      setError("Please select a file to upload.");
      return;
    }
    if (isTextOnly && !textContent.trim()) {
      setError("Please enter your notes.");
      return;
    }

    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be signed in.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/workspaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        content_type: contentType,
        user_mode: userMode,
        raw_content: isTextOnly ? textContent : null,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to create workspace");
      setLoading(false);
      return;
    }

    const workspaceId = data.workspace.id;

    if (!isTextOnly && file) {
      const path = `${user.id}/${workspaceId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("lectures")
        .upload(path, file, { upsert: true });

      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }

      await supabase
        .from("workspaces")
        .update({ file_url: path, file_name: file.name })
        .eq("id", workspaceId);
    }

    await fetch(`/api/workspaces/${workspaceId}/process`, { method: "POST" });
    router.push(`/workspace/${workspaceId}`);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F8FAFC] sm:text-3xl">Upload</h1>
        <p className="mt-1 text-sm text-slate-400">
          Turn messy content into organized knowledge with Gemini AI
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-medium text-slate-300">Content type</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  setContentType(type.id);
                  setFile(null);
                  setError(null);
                }}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                  contentType === type.id
                    ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/10"
                    : "border-white/10 bg-[#0d1424]/60 hover:border-white/20"
                }`}
              >
                <type.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#A78BFA]" />
                <div>
                  <p className="text-sm font-medium text-[#F8FAFC]">{type.label}</p>
                  <p className="text-xs text-slate-500">{type.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Card className="border-white/10 bg-[#0d1424]/80 p-5">
          <label className="mb-1.5 block text-sm font-medium text-slate-300">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              userMode === "student"
                ? "e.g. Data Structures Lecture 12"
                : "e.g. Q3 Planning Meeting"
            }
            className="w-full rounded-xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none focus:border-[#8B5CF6]/50"
            required
          />

          {isTextOnly ? (
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Notes
              </label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={8}
                placeholder="Paste or type your notes here..."
                className="w-full rounded-xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none focus:border-[#8B5CF6]/50"
              />
            </div>
          ) : (
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                File
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-10 transition hover:border-[#8B5CF6]/40 hover:bg-white/[0.07]">
                <Upload className="mb-2 h-8 w-8 text-[#8B5CF6]" />
                <span className="text-sm text-slate-300">
                  {file ? file.name : "Click to select a file"}
                </span>
                <input
                  type="file"
                  accept={selected.accept}
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </Card>

        {error ? (
          <Alert variant="error" title="Upload failed">
            {error}
          </Alert>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Processing..." : "Upload & Process with AI"}
        </Button>
      </form>
    </div>
  );
}
