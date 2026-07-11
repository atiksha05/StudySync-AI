import { GoogleGenerativeAI } from "@google/generative-ai";
import type { CareerAIOutput, ProfessionalAIOutput, StudentAIOutput, UserMode } from "@/types";
import { getDemoProcessResult } from "./demo";
import type { AIProvider, ProcessInput, ProcessResult } from "./types";
import { isGeminiConfigured } from "./types";

const MODEL = "gemini-2.0-flash";

const STUDENT_PROMPT = `You are StudySync AI for students. Return ONLY valid JSON with this shape:
{
  "summary": "2-3 paragraph overview",
  "notes": ["structured note strings"],
  "key_concepts": ["concept names"],
  "flashcards": [{"front": "term", "back": "definition"}],
  "quizzes": [{"question": "string", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "why"}],
  "action_items": [{"title": "string", "dueHint": "optional", "priority": "low|medium|high"}],
  "study_plan": [{"day": "string", "focus": "string", "tasks": ["string"]}],
  "mind_map": [{"label": "root", "children": ["branch"]}]
}
Minimum: 5 notes, 5 flashcards, 3 quizzes, 3 action items, 3 study plan days.`;

const PROFESSIONAL_PROMPT = `You are StudySync AI for professionals. Return ONLY valid JSON with this shape:
{
  "meeting_summary": "2-3 paragraph executive summary",
  "decisions": [{"decision": "string", "context": "string", "owner": "optional"}],
  "action_items": [{"title": "string", "owner": "string", "deadline": "string", "priority": "low|medium|high"}],
  "risks": [{"risk": "string", "mitigation": "string", "severity": "low|medium|high"}],
  "open_questions": ["string"],
  "follow_up_email": "full email draft with subject line"
}
Minimum: 3 decisions, 3 action items, 2 risks, 3 open questions.`;

const CAREER_PROMPT = `You are StudySync AI for career and interview prep. Return ONLY valid JSON with this shape:
{
  "summary": "2-3 paragraph career prep overview",
  "interview_questions": [{"question": "string", "category": "behavioral|technical|system_design|general", "tips": "optional"}],
  "resume_bullets": ["achievement bullet strings"],
  "company_research": ["research insight strings"],
  "networking_tips": ["tip strings"],
  "action_items": [{"title": "string", "dueHint": "optional", "priority": "low|medium|high"}],
  "ai_coach_tips": ["coaching tip strings"]
}
Minimum: 5 interview questions, 3 resume bullets, 3 company research items, 3 action items, 3 coach tips.`;

function parseJson<T>(raw: string): T {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return JSON.parse(cleaned) as T;
}

function getClient() {
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
}

async function generateJson<T>(
  systemPrompt: string,
  userContent: string
): Promise<T> {
  const model = getClient().getGenerativeModel({
    model: MODEL,
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: userContent.slice(0, 120000) }] }],
    generationConfig: { responseMimeType: "application/json" },
  });

  const text = result.response.text();
  if (!text) throw new Error("Gemini returned an empty response.");
  return parseJson<T>(text);
}

export async function transcribeWithGemini(
  buffer: ArrayBuffer,
  mimeType: string
): Promise<string> {
  const model = getClient().getGenerativeModel({ model: MODEL });
  const base64 = Buffer.from(buffer).toString("base64");

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: "Transcribe this audio accurately. Return only the transcript text, no commentary." },
          { inlineData: { mimeType, data: base64 } },
        ],
      },
    ],
  });

  return result.response.text()?.trim() ?? "";
}

export async function extractTextFromImage(
  buffer: ArrayBuffer,
  mimeType: string
): Promise<string> {
  const model = getClient().getGenerativeModel({ model: MODEL });
  const base64 = Buffer.from(buffer).toString("base64");

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: "Extract all readable text and describe key visual notes from this image. Return plain text." },
          { inlineData: { mimeType, data: base64 } },
        ],
      },
    ],
  });

  return result.response.text()?.trim() ?? "";
}

export const geminiProvider: AIProvider = {
  async processContent(input: ProcessInput): Promise<ProcessResult> {
    if (!isGeminiConfigured()) {
      return getDemoProcessResult(input.mode, input.title, input.text);
    }

    const prompt =
      input.mode === "student"
        ? STUDENT_PROMPT
        : input.mode === "professional"
          ? PROFESSIONAL_PROMPT
          : CAREER_PROMPT;
    const userMessage = `Title: ${input.title}\nContent type: ${input.contentType}\n\nContent:\n${input.text}`;

    if (input.mode === "student") {
      const ai_output = await generateJson<StudentAIOutput>(prompt, userMessage);
      return {
        transcript: input.text,
        summary: ai_output.summary,
        ai_output,
        isDemo: false,
      };
    }

    if (input.mode === "professional") {
      const ai_output = await generateJson<ProfessionalAIOutput>(prompt, userMessage);
      return {
        transcript: input.text,
        summary: ai_output.meeting_summary,
        ai_output,
        isDemo: false,
      };
    }

    const ai_output = await generateJson<CareerAIOutput>(prompt, userMessage);
    return {
      transcript: input.text,
      summary: ai_output.summary,
      ai_output,
      isDemo: false,
    };
  },

  async ask(question: string, context: string): Promise<string> {
    if (!isGeminiConfigured()) {
      return `Demo response: Based on your workspace context, "${question}" would be answered here with Gemini. Add GEMINI_API_KEY to enable live answers.`;
    }

    const model = getClient().getGenerativeModel({ model: MODEL });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Context:\n${context.slice(0, 50000)}\n\nQuestion: ${question}\n\nAnswer concisely and helpfully.`,
            },
          ],
        },
      ],
    });

    return result.response.text() ?? "No response generated.";
  },
};

export function getAIProvider(): AIProvider {
  return geminiProvider;
}
