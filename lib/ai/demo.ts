import type {
  ActionItem,
  CareerAIOutput,
  ProfessionalAIOutput,
  QuizQuestion,
  StudentAIOutput,
  UserMode,
} from "@/types";

export function getDemoStudentOutput(title: string): StudentAIOutput {
  return {
    summary: `Demo analysis for "${title}". StudySync organized this lecture into structured notes, flashcards, and a study plan. Connect GEMINI_API_KEY for live AI processing.`,
    notes: [
      "Core thesis: knowledge compounds when lectures are captured and reviewed within 24 hours.",
      "Key framework: input → synthesis → retrieval practice → application.",
      "Exam tip: prioritize concepts that appeared multiple times in the source material.",
      "Common pitfall: re-reading without active recall reduces retention.",
      "Study habit: chunk material into 25-minute focused sessions with 5-minute breaks.",
    ],
    key_concepts: [
      "Active Recall",
      "Spaced Repetition",
      "Concept Mapping",
      "Priority Matrix",
      "Retrieval Practice",
    ],
    flashcards: [
      { front: "What is active recall?", back: "Testing yourself on material instead of passively re-reading." },
      { front: "Why use spaced repetition?", back: "It strengthens memory by reviewing just before you forget." },
      { front: "What is a concept map?", back: "A visual diagram linking ideas and their relationships." },
      { front: "Best review window?", back: "Within 24 hours of initial learning for maximum retention." },
      { front: "Chunking strategy?", back: "Break study sessions into focused 25-minute blocks." },
    ],
    quizzes: [
      {
        question: "Which technique improves retention most?",
        options: ["Passive re-reading", "Highlighting only", "Active recall", "Skipping review"],
        correctIndex: 2,
        explanation: "Active recall forces retrieval, strengthening neural pathways.",
      },
      {
        question: "When should you first review new lecture material?",
        options: ["After 1 week", "Within 24 hours", "Only before exams", "Never"],
        correctIndex: 1,
        explanation: "The forgetting curve shows rapid decay without early review.",
      },
      {
        question: "A concept map is primarily used to:",
        options: ["Memorize dates", "Link related ideas", "Track grades", "Schedule meetings"],
        correctIndex: 1,
        explanation: "Concept maps visualize relationships between topics.",
      },
    ] as QuizQuestion[],
    action_items: [
      { title: "Review flashcards — Set 1", dueHint: "Today", priority: "high" },
      { title: "Complete practice quiz", dueHint: "Tomorrow", priority: "medium" },
      { title: "Summarize key concepts in own words", dueHint: "This week", priority: "medium" },
    ] as ActionItem[],
    study_plan: [
      { day: "Today", focus: "Overview & key concepts", tasks: ["Read summary", "Review mind map"] },
      { day: "Tomorrow", focus: "Active recall", tasks: ["Flashcards Set 1", "Quiz attempt"] },
      { day: "Day 3", focus: "Deep dive", tasks: ["Rewrite notes", "Practice problems"] },
    ],
    mind_map: [
      { label: title, children: ["Key Concepts", "Flashcards", "Quiz", "Action Items"] },
      { label: "Key Concepts", children: ["Active Recall", "Spaced Repetition", "Concept Mapping"] },
    ],
  };
}

export function getDemoProfessionalOutput(title: string): ProfessionalAIOutput {
  return {
    meeting_summary: `Demo meeting analysis for "${title}". StudySync extracted decisions, owners, and follow-ups. Add GEMINI_API_KEY for live Gemini processing.`,
    decisions: [
      { decision: "Proceed with phased rollout", context: "Team agreed on Q3 pilot with 2 squads.", owner: "Product" },
      { decision: "Defer infrastructure migration", context: "Risk outweighs benefit before launch.", owner: "Engineering" },
      { decision: "Weekly stakeholder sync", context: "Align cross-functional dependencies.", owner: "Program Manager" },
    ],
    action_items: [
      { title: "Draft rollout checklist", owner: "Alex", deadline: "Friday", priority: "high" },
      { title: "Share risk register update", owner: "Jordan", deadline: "Monday", priority: "medium" },
      { title: "Schedule design review", owner: "Sam", deadline: "Next week", priority: "medium" },
    ] as ActionItem[],
    risks: [
      { risk: "Timeline slip on integration work", mitigation: "Add buffer week and daily standups", severity: "medium" },
      { risk: "Unclear ownership on API contract", mitigation: "Assign DRI and document in wiki", severity: "high" },
    ],
    open_questions: [
      "Who signs off on the compliance checklist?",
      "Do we need legal review before external beta?",
      "What is the rollback plan if adoption is low?",
    ],
    follow_up_email: `Subject: Follow-up — ${title}\n\nHi team,\n\nThanks for a productive session. Here are the key outcomes:\n\n• Decisions: phased rollout approved; infra migration deferred\n• Action items: see workspace for owners and deadlines\n• Next sync: same time next week\n\nPlease review the workspace and flag any corrections.\n\nBest,\nStudySync AI`,
  };
}

export function getDemoCareerOutput(title: string): CareerAIOutput {
  return {
    summary: `Demo career prep analysis for "${title}". StudySync organized interview questions, resume bullets, and networking tips. Connect GEMINI_API_KEY for live AI processing.`,
    interview_questions: [
      { question: "Tell me about yourself.", category: "general", tips: "Keep it under 2 minutes. Focus on relevant experience." },
      { question: "Why are you interested in this role?", category: "behavioral", tips: "Research the company and connect to your goals." },
      { question: "Describe a challenging project.", category: "behavioral", tips: "Use STAR format with measurable impact." },
    ],
    resume_bullets: [
      "Led full-stack development of AI-powered study platform serving 500+ users",
      "Reduced API response time by 40% through caching and query optimization",
      "Mentored 3 junior developers on React best practices and code review",
    ],
    company_research: [
      "Review the company's recent product launches and engineering blog.",
      "Understand the team's tech stack and engineering culture.",
      "Prepare thoughtful questions about growth and team structure.",
    ],
    networking_tips: [
      "Reach out to alumni working at target companies on LinkedIn.",
      "Ask for informational interviews before applying.",
      "Follow up within 24 hours after every networking conversation.",
    ],
    action_items: [
      { title: "Update resume for target role", dueHint: "Today", priority: "high" },
      { title: "Practice 5 behavioral questions", dueHint: "Tomorrow", priority: "medium" },
      { title: "Research company culture and values", dueHint: "This week", priority: "medium" },
    ] as ActionItem[],
    ai_coach_tips: [
      "Practice your 'Tell me about yourself' answer until it's natural.",
      "Prepare 3 questions to ask the interviewer.",
      "Review the job description and map your experience to each requirement.",
    ],
  };
}

export function getDemoProcessResult(
  mode: UserMode,
  title: string,
  transcript: string
) {
  const output =
    mode === "student"
      ? getDemoStudentOutput(title)
      : mode === "professional"
        ? getDemoProfessionalOutput(title)
        : getDemoCareerOutput(title);

  const summary =
    mode === "student"
      ? (output as StudentAIOutput).summary
      : mode === "professional"
        ? (output as ProfessionalAIOutput).meeting_summary
        : (output as CareerAIOutput).summary;

  return {
    transcript: transcript || `Demo transcript for ${title}.`,
    summary,
    ai_output: output,
    isDemo: true,
  };
}
