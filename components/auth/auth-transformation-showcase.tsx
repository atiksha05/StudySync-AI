"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  ClipboardList,
  FileAudio,
  FileText,
  Flame,
  HelpCircle,
  Home,
  Layers,
  ListTodo,
  MessageCircle,
  Mic,
  NotebookPen,
  Settings,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

const SCENE_MS = 5000;
const TRANSITION_MS = 800;

const sceneTransition = {
  duration: TRANSITION_MS / 1000,
  ease: [0.4, 0, 0.2, 1] as const,
};

const inputCards = [
  {
    label: "Lecture Audio",
    icon: Mic,
    status: "Recording...",
    color: "#3B82F6",
    progress: 72,
  },
  {
    label: "Slides / PDF",
    icon: FileText,
    status: "Uploading...",
    color: "#8B5CF6",
    progress: 58,
  },
  {
    label: "Class Notes",
    icon: NotebookPen,
    status: "Processing...",
    color: "#EC4899",
    progress: 84,
  },
];

const outputCards = [
  {
    label: "Smart Notes",
    status: "Organizing key points...",
    color: "#3B82F6",
  },
  {
    label: "Flashcards",
    status: "Creating flashcards...",
    color: "#8B5CF6",
  },
  {
    label: "Quiz",
    status: "Generating questions...",
    color: "#EC4899",
  },
  {
    label: "Action Items",
    status: "Extracting tasks...",
    color: "#22D3EE",
  },
];

const metrics = [
  { label: "Lectures", value: "24", delta: "+8", icon: Layers, color: "#3B82F6" },
  { label: "Flashcards", value: "386", delta: "+54", icon: Zap, color: "#8B5CF6" },
  { label: "Quizzes", value: "18", delta: "+6", icon: Sparkles, color: "#EC4899" },
  { label: "Tasks", value: "32", delta: "+12", icon: ListTodo, color: "#22D3EE" },
];

const recentLectures = [
  { title: "Data Structures Lecture 12", time: "Today" },
  { title: "Operating Systems Lecture 8", time: "Yesterday" },
  { title: "Machine Learning Lecture 4", time: "2 days ago" },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const weekActive = [true, true, true, true, true, true, false];

const navIcons = [Home, BookOpen, MessageCircle, HelpCircle, Settings];

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-[#0d1424]/75 p-2.5 shadow-lg shadow-black/20 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        initial={{ width: "20%" }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </div>
  );
}

function BrainVisual() {
  return (
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
      <motion.div
        className="absolute bottom-2 left-1/2 h-8 w-36 -translate-x-1/2 rounded-[100%] bg-[#8B5CF6]/40 blur-xl"
        animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-3 w-28 -translate-x-1/2 rounded-full border border-[#8B5CF6]/50 bg-gradient-to-r from-[#3B82F6]/20 via-[#8B5CF6]/30 to-[#EC4899]/20"
        animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.3)", "0 0 40px rgba(139,92,246,0.6)", "0 0 20px rgba(139,92,246,0.3)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg
        viewBox="0 0 200 200"
        className="relative z-10 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="brainGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = 100 + Math.cos(angle) * 55;
          const y1 = 100 + Math.sin(angle) * 45;
          const x2 = 100 + Math.cos(angle + 0.5) * 30;
          const y2 = 100 + Math.sin(angle + 0.5) * 25;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#brainGrad)"
              strokeWidth="1.2"
              filter="url(#brainGlow)"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.12 }}
            />
          );
        })}
        <motion.ellipse
          cx="100"
          cy="105"
          rx="52"
          ry="58"
          fill="none"
          stroke="url(#brainGrad)"
          strokeWidth="2"
          filter="url(#brainGlow)"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M72 88 Q100 55 128 88 Q135 110 120 130 Q100 150 80 130 Q65 110 72 88"
          fill="none"
          stroke="url(#brainGrad)"
          strokeWidth="1.5"
          filter="url(#brainGlow)"
          animate={{ opacity: [0.5, 0.95, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
      </svg>
      <motion.div
        className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Brain className="h-10 w-10 text-[#C4B5FD] drop-shadow-[0_0_12px_rgba(139,92,246,0.8)] sm:h-12 sm:w-12" />
      </motion.div>
    </div>
  );
}

function NeuralConnections() {
  const lines = [
    { x1: "18%", y1: "28%", x2: "38%", y2: "42%" },
    { x1: "18%", y1: "48%", x2: "38%", y2: "50%" },
    { x1: "18%", y1: "68%", x2: "38%", y2: "58%" },
    { x1: "62%", y1: "42%", x2: "82%", y2: "26%" },
    { x1: "62%", y1: "50%", x2: "82%", y2: "44%" },
    { x1: "62%", y1: "54%", x2: "82%", y2: "58%" },
    { x1: "62%", y1: "58%", x2: "82%", y2: "72%" },
  ];

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="url(#connGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </svg>
  );
}

function ProgressChart() {
  const points = "4,36 20,28 36,32 52,18 68,22 84,10 96,14";
  return (
    <svg viewBox="0 0 100 40" className="h-10 w-full" aria-hidden>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${points} 96,40 4,40`} fill="url(#chartGrad)" />
      <motion.polyline
        points={points}
        fill="none"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
    </svg>
  );
}

function BrainScene() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
      transition={sceneTransition}
    >
      <NeuralConnections />

      <motion.div
        className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-[10px] text-[#C4B5FD] sm:text-xs"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <FileAudio className="h-3 w-3" />
        AI is analyzing your lecture...
      </motion.div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 pt-2">
        <div className="absolute left-4 top-1/2 flex w-[30%] max-w-[140px] -translate-y-1/2 flex-col gap-2 sm:left-8 sm:max-w-[160px]">
          {inputCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <GlassPanel>
                <div className="flex items-center gap-2">
                  <card.icon className="h-3.5 w-3.5 shrink-0" style={{ color: card.color }} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-medium text-[#F8FAFC] sm:text-[10px]">
                      {card.label}
                    </p>
                    <p className="text-[8px] text-slate-400 sm:text-[9px]">{card.status}</p>
                  </div>
                </div>
                <ProgressBar value={card.progress} color={card.color} />
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        <BrainVisual />

        <div className="absolute right-4 top-1/2 flex w-[30%] max-w-[150px] -translate-y-1/2 flex-col gap-2 sm:right-8 sm:max-w-[170px]">
          {outputCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <GlassPanel>
                <p className="text-[9px] font-semibold sm:text-[10px]" style={{ color: card.color }}>
                  {card.label}
                </p>
                <p className="mt-0.5 text-[8px] text-slate-400 sm:text-[9px]">{card.status}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DashboardScene() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col p-5 sm:p-6"
      initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
      transition={sceneTransition}
    >
      <div className="mb-4 text-center">
        <motion.h2
          className="font-[family-name:var(--font-sora)] text-2xl font-bold sm:text-3xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
            Everything organized.
          </span>
        </motion.h2>
        <motion.p
          className="mt-1 text-xs text-slate-400 sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your study hub is ready ✨
        </motion.p>
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        <motion.div
          className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#0d1424]/60 p-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          {navIcons.map((Icon, i) => (
            <div
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                i === 0 ? "bg-[#8B5CF6]/20 text-[#A78BFA]" : "text-slate-500"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
          ))}
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="grid grid-cols-4 gap-2">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="rounded-xl border border-white/10 bg-[#0d1424]/75 p-2 backdrop-blur-md"
              >
                <m.icon className="mb-1 h-3 w-3" style={{ color: m.color }} />
                <p className="text-sm font-bold text-[#F8FAFC]">{m.value}</p>
                <p className="text-[8px] text-slate-500">{m.label}</p>
                <p className="text-[8px] font-medium text-[#10B981]">{m.delta}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1fr_auto] gap-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="rounded-xl border border-white/10 bg-[#0d1424]/75 p-3 backdrop-blur-md"
            >
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                Recent Lectures
              </p>
              <ul className="space-y-2">
                {recentLectures.map((lecture, i) => (
                  <motion.li
                    key={lecture.title}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="truncate text-[10px] text-slate-300">{lecture.title}</span>
                    <span className="shrink-0 text-[8px] text-slate-500">{lecture.time}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="flex w-[7.5rem] flex-col gap-2 sm:w-[8.5rem]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5 text-center"
              >
                <Flame className="mx-auto mb-1 h-4 w-4 text-amber-400" />
                <p className="text-lg font-bold text-amber-300">14</p>
                <p className="text-[8px] text-amber-200/80">Days streak</p>
                <div className="mt-2 flex justify-center gap-0.5">
                  {weekDays.map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5">
                      <span className="text-[6px] text-slate-500">{day}</span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          weekActive[i] ? "bg-[#10B981]" : "bg-white/15"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-1 flex-col rounded-xl border border-white/10 bg-[#0d1424]/75 p-2.5 backdrop-blur-md"
              >
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-[8px] text-slate-500">Weekly Progress</p>
                  <TrendingUp className="h-3 w-3 text-[#10B981]" />
                </div>
                <p className="text-sm font-bold text-[#F8FAFC]">78%</p>
                <p className="mb-1 text-[7px] text-slate-500">Goal progress</p>
                <ProgressChart />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileStaticShowcase() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424]/80 p-3 backdrop-blur-md lg:hidden"
      aria-label="StudySync AI workflow preview"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_70%)]" />
      <div className="relative flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/15">
            <Brain className="h-4 w-4 text-[#A78BFA]" />
          </div>
          <p className="text-[8px] text-slate-500">AI processes</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#8B5CF6]/60" />
        <div className="grid flex-1 grid-cols-2 gap-1.5">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center"
            >
              <p className="text-[10px] font-bold text-[#F8FAFC]">{m.value}</p>
              <p className="text-[7px] text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedShowcase() {
  const [scene, setScene] = useState<"brain" | "dashboard">("brain");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setScene((prev) => (prev === "brain" ? "dashboard" : "brain"));
    }, SCENE_MS);
    return () => clearTimeout(timer);
  }, [scene, paused]);

  return (
    <div
      className="relative hidden h-full min-h-0 w-full overflow-hidden lg:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-scene={scene}
      aria-label="StudySync AI workflow demonstration"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(ellipse_at_70%_70%,rgba(236,72,153,0.08),transparent_50%)]" />
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/30"
          style={{ left: `${5 + i * 8}%`, top: `${10 + (i % 5) * 16}%` }}
          animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -4, 0] }}
          transition={{ duration: 2.5 + i * 0.1, repeat: Infinity }}
        />
      ))}
      <AnimatePresence mode="wait">
        {scene === "brain" ? (
          <BrainScene key="brain" />
        ) : (
          <DashboardScene key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}

export function AuthTransformationShowcase() {
  return (
    <>
      <MobileStaticShowcase />
      <AnimatedShowcase />
    </>
  );
}
