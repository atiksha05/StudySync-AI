import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { generateStudyMaterials, transcribeAudio } from "@/lib/openai";

export const maxDuration = 300;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: lecture, error: fetchError } = await supabase
    .from("lectures")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !lecture) {
    return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
  }

  if (!lecture.file_url) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const admin = createAdminClient();

  await admin
    .from("lectures")
    .update({ status: "processing", error_message: null })
    .eq("id", id);

  try {
    const { data: fileBlob, error: downloadError } = await admin.storage
      .from("lectures")
      .download(lecture.file_url);

    if (downloadError || !fileBlob) {
      throw new Error(downloadError?.message ?? "Failed to download file.");
    }

    let transcript = "";

    if (lecture.file_type === "audio") {
      const audioFile = new File(
        [await fileBlob.arrayBuffer()],
        lecture.file_name ?? "lecture.mp3",
        { type: "audio/mpeg" }
      );
      transcript = await transcribeAudio(audioFile, lecture.file_name ?? "lecture.mp3");
    } else {
      const buffer = Buffer.from(await fileBlob.arrayBuffer());
      const parser = new PDFParse({ data: buffer });
      const parsed = await parser.getText();
      await parser.destroy();
      transcript = parsed.text;
    }

    if (!transcript.trim()) {
      throw new Error("Could not extract text from the uploaded file.");
    }

    const generated = await generateStudyMaterials(transcript);

    await admin
      .from("lectures")
      .update({
        status: "completed",
        transcript,
        summary: generated.summary,
        notes: generated.notes,
        flashcards: generated.flashcards,
        quizzes: generated.quizzes,
        tasks: generated.tasks,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Processing failed unexpectedly.";

    await admin
      .from("lectures")
      .update({
        status: "failed",
        error_message: message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
