import OpenAI from "openai";
import type { GeneratedContent } from "@/types";

export function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const SYSTEM_PROMPT = `You are StudySync AI, an expert study assistant for students.
Analyze lecture content and return valid JSON with this exact shape:
{
  "summary": "2-3 paragraph overview",
  "notes": ["concise bullet note strings"],
  "flashcards": [{"front": "question or term", "back": "answer or definition"}],
  "quizzes": [{"question": "string", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "why correct"}],
  "tasks": [{"title": "action item", "dueHint": "optional timing hint", "priority": "low|medium|high"}]
}
Provide at least 5 notes, 5 flashcards, 3 quiz questions, and 3 tasks.`;

export async function generateStudyMaterials(
  transcript: string
): Promise<GeneratedContent> {
  const openai = getOpenAIClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analyze this lecture content:\n\n${transcript.slice(0, 100000)}`,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response.");
  }

  return JSON.parse(content) as GeneratedContent;
}

export async function transcribeAudio(
  file: File,
  fileName: string
): Promise<string> {
  const openai = getOpenAIClient();

  const transcription = await openai.audio.transcriptions.create({
    file: new File([await file.arrayBuffer()], fileName, { type: file.type }),
    model: "whisper-1",
  });

  return transcription.text;
}
