"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AskAIPanel } from "@/components/workspace/ask-ai-panel";
import type { ProfessionalAIOutput, Workspace } from "@/types";

const professionalTabs = [
  { id: "Overview", label: "Overview" },
  { id: "Decisions", label: "Decisions" },
  { id: "Action Items", label: "Action Items" },
  { id: "Transcript", label: "Transcript" },
  { id: "Risks", label: "Risks" },
  { id: "Open Questions", label: "Open Questions" },
  { id: "Follow-up Email", label: "Follow-up Email" },
  { id: "Ask AI", label: "Ask AI" },
];

export function ProfessionalWorkspaceView({ workspace }: { workspace: Workspace }) {
  const output = workspace.ai_output as ProfessionalAIOutput;
  const [activeTab, setActiveTab] = useState<string>("Overview");

  return (
    <div className="space-y-6">
      <Tabs tabs={professionalTabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Overview" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <h2 className="mb-3 font-semibold text-[#F8FAFC]">Meeting Summary</h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
            {output.meeting_summary}
          </p>
        </Card>
      )}

      {activeTab === "Decisions" && (
        <ul className="space-y-3">
          {output.decisions.map((d, i) => (
            <li key={i} className="rounded-xl border border-white/10 bg-[#0d1424]/80 p-5">
              <p className="font-medium text-[#F8FAFC]">{d.decision}</p>
              <p className="mt-1 text-sm text-slate-400">{d.context}</p>
              {d.owner ? (
                <p className="mt-2 text-xs text-[#A78BFA]">Owner: {d.owner}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Action Items" && (
        <ul className="space-y-2">
          {output.action_items.map((item, i) => (
            <li
              key={i}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#0d1424]/80 px-4 py-3"
            >
              <span className="text-sm text-slate-200">{item.title}</span>
              <div className="flex gap-2 text-xs text-slate-500">
                {item.owner ? <span>{item.owner}</span> : null}
                {item.deadline ? <span>Due {item.deadline}</span> : null}
                <span className="capitalize">{item.priority}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Transcript" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
            {workspace.transcript}
          </p>
        </Card>
      )}

      {activeTab === "Risks" && (
        <ul className="space-y-3">
          {output.risks.map((r, i) => (
            <li key={i} className="rounded-xl border border-white/10 bg-[#0d1424]/80 p-5">
              <p className="font-medium text-[#F8FAFC]">{r.risk}</p>
              <p className="mt-1 text-sm text-slate-400">Mitigation: {r.mitigation}</p>
              <span className="mt-2 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] capitalize text-amber-300">
                {r.severity}
              </span>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Open Questions" && (
        <ul className="space-y-2">
          {output.open_questions.map((q, i) => (
            <li
              key={i}
              className="rounded-xl border border-white/10 bg-[#0d1424]/80 px-4 py-3 text-sm text-slate-300"
            >
              {q}
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Follow-up Email" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
            {output.follow_up_email}
          </pre>
        </Card>
      )}

      {activeTab === "Ask AI" && (
        <AskAIPanel
          workspaceId={workspace.id}
          context={workspace.transcript ?? output.meeting_summary}
        />
      )}
    </div>
  );
}
