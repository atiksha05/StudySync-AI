"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AskAIPanel({
  workspaceId,
  context,
}: {
  workspaceId: string;
  context: string;
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId, question, context }),
    });

    const data = await res.json();
    setAnswer(data.answer ?? data.error ?? "No response");
    setLoading(false);
  }

  return (
    <Card className="border-white/10 bg-[#0d1424]/80 p-6">
      <form onSubmit={handleAsk} className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about this workspace..."
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none focus:border-[#8B5CF6]/50"
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Ask Gemini
        </Button>
      </form>

      {answer ? (
        <div className="mt-6 rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 p-4">
          <p className="mb-1 text-xs font-medium text-[#A78BFA]">AI Response</p>
          <p className="whitespace-pre-wrap text-sm text-slate-300">{answer}</p>
        </div>
      ) : null}
    </Card>
  );
}
