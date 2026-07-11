"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AskAIPanel } from "@/components/workspace/ask-ai-panel";
import type { StudentAIOutput, Workspace } from "@/types";

const studentTabs = [
  { id: "Overview", label: "Overview" },
  { id: "Smart Notes", label: "Smart Notes" },
  { id: "Transcript", label: "Transcript" },
  { id: "Flashcards", label: "Flashcards" },
  { id: "Quiz", label: "Quiz" },
  { id: "Mind Map", label: "Mind Map" },
  { id: "Action Items", label: "Action Items" },
  { id: "Ask AI", label: "Ask AI" },
];

export function StudentWorkspaceView({
  workspace,
}: {
  workspace: Workspace;
}) {
  const output = workspace.ai_output as StudentAIOutput;
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, number>>({});

  return (
    <div className="space-y-6">
      <Tabs tabs={studentTabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Overview" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <h2 className="mb-3 font-semibold text-[#F8FAFC]">Summary</h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
            {output.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {output.key_concepts.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-xs text-[#C4B5FD]"
              >
                {c}
              </span>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "Smart Notes" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <ul className="space-y-3">
            {output.notes.map((note, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
              >
                <span className="text-[#8B5CF6]">•</span>
                {note}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {activeTab === "Transcript" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
            {workspace.transcript}
          </p>
        </Card>
      )}

      {activeTab === "Flashcards" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {output.flashcards.map((card, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setFlipped((p) => ({ ...p, [i]: !p[i] }))}
              className="min-h-[120px] rounded-xl border border-white/10 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 p-5 text-left transition hover:border-[#8B5CF6]/30"
            >
              <p className="text-sm text-[#F8FAFC]">
                {flipped[i] ? card.back : card.front}
              </p>
              <p className="mt-2 text-[10px] text-slate-500">Tap to flip</p>
            </button>
          ))}
        </div>
      )}

      {activeTab === "Quiz" && (
        <div className="space-y-4">
          {output.quizzes.map((q, i) => (
            <Card key={i} className="border-white/10 bg-[#0d1424]/80 p-5">
              <p className="mb-3 font-medium text-[#F8FAFC]">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setAnswers((p) => ({ ...p, [i]: oi }))}
                    className={`block w-full rounded-lg border px-4 py-2 text-left text-sm transition ${
                      answers[i] === oi
                        ? oi === q.correctIndex
                          ? "border-[#10B981]/50 bg-[#10B981]/10 text-[#F8FAFC]"
                          : "border-red-500/50 bg-red-500/10 text-[#F8FAFC]"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {answers[i] !== undefined ? (
                <p className="mt-3 text-xs text-slate-400">{q.explanation}</p>
              ) : null}
            </Card>
          ))}
        </div>
      )}

      {activeTab === "Mind Map" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <div className="space-y-4">
            {output.mind_map.map((node, i) => (
              <div key={i}>
                <p className="font-medium text-[#A78BFA]">{node.label}</p>
                {node.children ? (
                  <ul className="ml-4 mt-1 space-y-1">
                    {node.children.map((child) => (
                      <li key={child} className="text-sm text-slate-400">
                        └ {child}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "Action Items" && (
        <ul className="space-y-2">
          {output.action_items.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0d1424]/80 px-4 py-3"
            >
              <span className="text-sm text-slate-200">{item.title}</span>
              <span className="text-xs capitalize text-slate-500">
                {item.priority}
                {item.dueHint ? ` · ${item.dueHint}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Ask AI" && (
        <AskAIPanel
          workspaceId={workspace.id}
          context={workspace.transcript ?? output.summary}
        />
      )}
    </div>
  );
}
