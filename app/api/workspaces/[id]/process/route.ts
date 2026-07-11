import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { getAIProvider, transcribeWithGemini, extractTextFromImage, isGeminiConfigured } from "@/lib/ai";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import type { ContentType, UserMode } from "@/types";

export const maxDuration = 300;

const AUDIO_TYPES = new Set<ContentType>(["lecture_audio", "meeting_recording"]);
const IMAGE_TYPES = new Set<ContentType>(["image_notes"]);

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

  const { data: workspace, error: fetchError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const admin = createAdminClient();
  await admin
    .from("workspaces")
    .update({ status: "processing", error_message: null })
    .eq("id", id);

  try {
    let text = workspace.raw_content ?? "";

    if (workspace.file_url) {
      const { data: fileBlob, error: downloadError } = await admin.storage
        .from("lectures")
        .download(workspace.file_url);

      if (downloadError || !fileBlob) {
        throw new Error(downloadError?.message ?? "Failed to download file.");
      }

      const buffer = await fileBlob.arrayBuffer();
      const contentType = workspace.content_type as ContentType;

      if (AUDIO_TYPES.has(contentType)) {
        if (isGeminiConfigured()) {
          text = await transcribeWithGemini(buffer, "audio/mpeg");
        } else {
          text = `Demo transcript for ${workspace.title}. Add GEMINI_API_KEY for real transcription.`;
        }
      } else if (contentType === "pdf") {
        const parser = new PDFParse({ data: Buffer.from(buffer) });
        const parsed = await parser.getText();
        await parser.destroy();
        text = parsed.text;
      } else if (IMAGE_TYPES.has(contentType)) {
        if (isGeminiConfigured()) {
          text = await extractTextFromImage(buffer, "image/png");
        } else {
          text = `Demo extracted notes from image: ${workspace.title}`;
        }
      }
    }

    if (!text.trim()) {
      throw new Error("Could not extract text from the uploaded content.");
    }

    const ai = getAIProvider();
    const result = await ai.processContent({
      text,
      mode: workspace.user_mode as UserMode,
      title: workspace.title,
      contentType: workspace.content_type,
    });

    await admin
      .from("workspaces")
      .update({
        status: "completed",
        transcript: result.transcript,
        summary: result.summary,
        ai_output: result.ai_output,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ success: true, isDemo: result.isDemo });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Processing failed unexpectedly.";

    await admin
      .from("workspaces")
      .update({
        status: "failed",
        error_message: message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
