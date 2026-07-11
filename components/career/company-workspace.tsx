"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AskAIPanel } from "@/components/workspace/ask-ai-panel";
import {
  APPLICATION_STATUS_COLORS,
  APPLICATION_STATUS_LABELS,
} from "@/lib/modes";
import type { Company } from "@/types";

const companyTabs = [
  { id: "Company Overview", label: "Company Overview" },
  { id: "Role Details", label: "Role Details" },
  { id: "Application Status", label: "Application Status" },
  { id: "Interview Timeline", label: "Interview Timeline" },
  { id: "Job Description", label: "Job Description" },
  { id: "Resume Used", label: "Resume Used" },
  { id: "Recruiter Notes", label: "Recruiter Notes" },
  { id: "Interview Questions", label: "Interview Questions" },
  { id: "Company Research", label: "Company Research" },
  { id: "AI Coach", label: "AI Coach" },
];

export function CompanyWorkspace({ company }: { company: Company }) {
  const [activeTab, setActiveTab] = useState("Company Overview");
  const output = company.ai_output;

  return (
    <div className="space-y-6">
      <Tabs tabs={companyTabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "Company Overview" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <h2 className="mb-3 font-semibold text-[#F8FAFC]">{company.name}</h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
            {output.company_overview}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
            <span>{company.role}</span>
            <span>·</span>
            <span>{company.location}</span>
            {company.salary_range ? (
              <>
                <span>·</span>
                <span>{company.salary_range}</span>
              </>
            ) : null}
          </div>
        </Card>
      )}

      {activeTab === "Role Details" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
            {output.role_details}
          </pre>
        </Card>
      )}

      {activeTab === "Application Status" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <span
            className="inline-flex rounded-full px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: `${APPLICATION_STATUS_COLORS[output.application_status]}20`,
              color: APPLICATION_STATUS_COLORS[output.application_status],
            }}
          >
            {APPLICATION_STATUS_LABELS[output.application_status]}
          </span>
          {company.applied_at ? (
            <p className="mt-3 text-sm text-slate-400">
              Applied on {new Date(company.applied_at).toLocaleDateString()}
            </p>
          ) : null}
        </Card>
      )}

      {activeTab === "Interview Timeline" && (
        <ul className="space-y-3">
          {output.interview_timeline.map((event, i) => (
            <li
              key={i}
              className="rounded-xl border border-white/10 bg-[#0d1424]/80 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-[#F8FAFC]">{event.stage}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${
                    event.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : event.status === "upcoming"
                        ? "bg-blue-500/10 text-blue-300"
                        : "bg-slate-500/10 text-slate-400"
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{event.date}</p>
              {event.notes ? (
                <p className="mt-2 text-sm text-slate-400">{event.notes}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Job Description" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
            {output.job_description}
          </pre>
        </Card>
      )}

      {activeTab === "Resume Used" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <p className="text-sm text-slate-300">{output.resume_used}</p>
        </Card>
      )}

      {activeTab === "Recruiter Notes" && (
        <Card className="border-white/10 bg-[#0d1424]/80 p-6">
          <p className="text-sm leading-relaxed text-slate-300">
            {output.recruiter_notes}
          </p>
        </Card>
      )}

      {activeTab === "Interview Questions" && (
        <ul className="space-y-3">
          {output.interview_questions.map((q, i) => (
            <li
              key={i}
              className="rounded-xl border border-white/10 bg-[#0d1424]/80 p-5"
            >
              <p className="font-medium text-[#F8FAFC]">{q.question}</p>
              <span className="mt-2 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] capitalize text-[#A78BFA]">
                {q.category.replace(/_/g, " ")}
              </span>
              {q.tips ? (
                <p className="mt-2 text-sm text-slate-400">Tip: {q.tips}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {activeTab === "Company Research" && (
        <ul className="space-y-2">
          {output.company_research.map((item, i) => (
            <li
              key={i}
              className="rounded-xl border border-white/10 bg-[#0d1424]/80 px-4 py-3 text-sm text-slate-300"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {activeTab === "AI Coach" && (
        <div className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 p-6">
            <h2 className="mb-3 font-semibold text-[#F8FAFC]">AI Interview Coach</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {output.ai_coach_tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </Card>
          <AskAIPanel
            workspaceId={`company-${company.id}`}
            context={`${company.name} - ${company.role}\n${output.company_overview}`}
          />
        </div>
      )}
    </div>
  );
}
