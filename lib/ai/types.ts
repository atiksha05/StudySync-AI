import type { CareerAIOutput, ProfessionalAIOutput, StudentAIOutput, UserMode } from "@/types";

export function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY ?? "";
  if (!key || key.includes("placeholder") || key.includes("your-")) return false;
  return true;
}

export type ProcessInput = {
  text: string;
  mode: UserMode;
  title: string;
  contentType: string;
};

export type ProcessResult = {
  transcript: string;
  summary: string;
  ai_output: StudentAIOutput | ProfessionalAIOutput | CareerAIOutput;
  isDemo: boolean;
};

export interface AIProvider {
  processContent(input: ProcessInput): Promise<ProcessResult>;
  ask(question: string, context: string): Promise<string>;
}
