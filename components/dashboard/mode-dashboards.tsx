import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Workspace } from "@/types";

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Card className="border-white/10 bg-[#0d1424]/80 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-[#F8FAFC]">{value}</p>
          {hint ? <p className="mt-0.5 text-[10px] text-[#10B981]">{hint}</p> : null}
        </div>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${color}20` }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </span>
      </div>
    </Card>
  );
}

export function StudentDashboard({ workspaces }: { workspaces: Workspace[] }) {
  const recent = workspaces.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F8FAFC] sm:text-3xl">Student Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Your AI-powered study command center
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Study Streak" value="7 days" hint="+2 this week" icon={Zap} color="#F59E0B" />
        <StatCard label="Flashcards Due" value="24" hint="Review today" icon={Brain} color="#8B5CF6" />
        <StatCard label="Quiz Avg" value="84%" hint="+6% vs last week" icon={TrendingUp} color="#3B82F6" />
        <StatCard label="Deadlines" value="3" hint="Next: Fri" icon={Calendar} color="#EC4899" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-white/10 bg-[#0d1424]/80 p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-[#F8FAFC]">
              <Target className="h-4 w-4 text-[#3B82F6]" />
              Today&apos;s Study Plan
            </h2>
            <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2.5 py-1 text-[10px] font-medium text-[#A78BFA]">
              AI Generated
            </span>
          </div>
          <ul className="space-y-3">
            {[
              { task: "Review Data Structures flashcards", time: "25 min", done: false },
              { task: "Complete OS practice quiz", time: "30 min", done: false },
              { task: "Summarize ML lecture notes", time: "20 min", done: true },
            ].map((item) => (
              <li
                key={item.task}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`h-4 w-4 ${item.done ? "text-[#10B981]" : "text-slate-600"}`}
                  />
                  <span className={`text-sm ${item.done ? "text-slate-500 line-through" : "text-slate-200"}`}>
                    {item.task}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{item.time}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-white/10 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-[#F8FAFC]">
            <Sparkles className="h-4 w-4 text-[#A78BFA]" />
            AI Recommendations
          </h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Focus on weak quiz topics from OS Lecture 8</li>
            <li>• 12 flashcards overdue for review</li>
            <li>• Schedule 45-min block for ML concepts</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6 border-white/10 bg-[#0d1424]/80 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-[#F8FAFC]">
            <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
            Recent Lectures
          </h2>
          <Link href="/library" className="flex items-center gap-1 text-xs text-[#A78BFA] hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-slate-500">
            No lectures yet.{" "}
            <Link href="/upload" className="text-[#A78BFA] hover:underline">
              Upload your first lecture
            </Link>
          </p>
        ) : (
          <ul className="space-y-2">
            {recent.map((w) => (
              <li key={w.id}>
                <Link
                  href={`/workspace/${w.id}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#8B5CF6]/30"
                >
                  <span className="text-sm text-slate-200">{w.title}</span>
                  <Badge status={w.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

export function ProfessionalDashboard({ workspaces }: { workspaces: Workspace[] }) {
  const recent = workspaces.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F8FAFC] sm:text-3xl">Professional Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Meetings, decisions, and action items — organized by AI
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Meetings" value="2" hint="Next in 1h" icon={Clock} color="#3B82F6" />
        <StatCard label="Open Actions" value="8" hint="3 due today" icon={CheckCircle2} color="#EC4899" />
        <StatCard label="Decisions" value="5" hint="This week" icon={Target} color="#8B5CF6" />
        <StatCard label="Follow-ups" value="4" hint="2 pending" icon={ArrowRight} color="#22D3EE" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-white/10 bg-[#0d1424]/80 p-5 lg:col-span-2">
          <h2 className="mb-4 font-semibold text-[#F8FAFC]">Action Items</h2>
          <ul className="space-y-2">
            {[
              { title: "Send Q3 rollout update to stakeholders", owner: "You", due: "Today" },
              { title: "Review API contract with platform team", owner: "Alex", due: "Tomorrow" },
              { title: "Finalize risk mitigation plan", owner: "Jordan", due: "Friday" },
            ].map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm text-slate-200">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.owner}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                  {item.due}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-white/10 bg-gradient-to-br from-[#8B5CF6]/10 to-[#EC4899]/10 p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-[#F8FAFC]">
            <Sparkles className="h-4 w-4 text-[#A78BFA]" />
            AI Recommendations
          </h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Follow up on open question from sprint review</li>
            <li>• 2 action items missing owners</li>
            <li>• Draft stakeholder email for Project Alpha</li>
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="border-white/10 bg-[#0d1424]/80 p-5">
          <h2 className="mb-4 font-semibold text-[#F8FAFC]">Recent Decisions</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="rounded-lg border border-white/10 bg-white/5 p-3">
              Approved phased rollout for Q3 pilot
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 p-3">
              Deferred infra migration until post-launch
            </li>
          </ul>
        </Card>

        <Card className="border-white/10 bg-[#0d1424]/80 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-[#F8FAFC]">Project Knowledge Base</h2>
            <Link href="/library" className="text-xs text-[#A78BFA] hover:underline">
              Browse
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-slate-500">
              <Link href="/upload" className="text-[#A78BFA] hover:underline">
                Upload a meeting or document
              </Link>{" "}
              to build your knowledge base.
            </p>
          ) : (
            <ul className="space-y-2">
              {recent.map((w) => (
                <li key={w.id}>
                  <Link
                    href={`/workspace/${w.id}`}
                    className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-[#8B5CF6]/30"
                  >
                    {w.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

export function CareerDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F8FAFC] sm:text-3xl">Career Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Track applications, prep interviews, and land your next role
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications Tracked" value="12" hint="+3 this month" icon={FileText} color="#3B82F6" />
        <StatCard label="Interviews This Week" value="2" hint="Stripe Fri" icon={Calendar} color="#8B5CF6" />
        <StatCard label="Companies Saved" value="8" hint="4 active" icon={Building2} color="#EC4899" />
        <StatCard label="Practice Questions" value="47" hint="12 new" icon={HelpCircle} color="#F59E0B" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-white/10 bg-[#0d1424]/80 p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-[#F8FAFC]">
              <Target className="h-4 w-4 text-[#3B82F6]" />
              Upcoming Deadlines
            </h2>
            <Link href="/applications" className="text-xs text-[#A78BFA] hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-2">
            {[
              { title: "Stripe onsite interview", due: "Jul 10", type: "Interview" },
              { title: "Google phone screen prep", due: "Jul 8", type: "Prep" },
              { title: "Meta OA deadline", due: "Jul 12", type: "Assessment" },
            ].map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm text-slate-200">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.type}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                  {item.due}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-white/10 bg-gradient-to-br from-[#EC4899]/10 to-[#F59E0B]/10 p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-[#F8FAFC]">
            <Sparkles className="h-4 w-4 text-[#A78BFA]" />
            AI Interview Coach
          </h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Practice STAR answers for Stripe onsite</li>
            <li>• Review system design for Google round</li>
            <li>• Update resume bullets for PM roles</li>
          </ul>
          <Link
            href="/interview-prep"
            className="mt-4 inline-flex items-center gap-1 text-xs text-[#A78BFA] hover:underline"
          >
            Start prep <ArrowRight className="h-3 w-3" />
          </Link>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="border-white/10 bg-[#0d1424]/80 p-5">
          <h2 className="mb-4 font-semibold text-[#F8FAFC]">Resume Versions</h2>
          <ul className="space-y-2">
            {[
              { name: "Resume v3 — Full Stack", used: 8, updated: "Jun 28" },
              { name: "Resume v2 — Backend Focus", used: 5, updated: "Jun 1" },
              { name: "Resume v1 — General", used: 2, updated: "May 10" },
            ].map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm text-slate-200">{r.name}</p>
                  <p className="text-xs text-slate-500">Used {r.used} times</p>
                </div>
                <span className="text-[10px] text-slate-500">{r.updated}</span>
              </li>
            ))}
          </ul>
          <Link href="/resume-tracker" className="mt-3 text-xs text-[#A78BFA] hover:underline">
            Manage resumes →
          </Link>
        </Card>

        <Card className="border-white/10 bg-[#0d1424]/80 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-[#F8FAFC]">Recent Companies</h2>
            <Link href="/companies" className="text-xs text-[#A78BFA] hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-2">
            {[
              { name: "Stripe", role: "Software Engineer", status: "Final Interview" },
              { name: "Google", role: "Product Manager", status: "Phone Interview" },
              { name: "Notion", role: "Full Stack Engineer", status: "Applied" },
            ].map((c) => (
              <li key={c.name}>
                <Link
                  href={`/company/${c.name.toLowerCase()}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#8B5CF6]/30"
                >
                  <div>
                    <p className="text-sm text-slate-200">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.role}</p>
                  </div>
                  <span className="text-[10px] text-[#A78BFA]">{c.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
