import type { Application, Company, CompanyAIOutput } from "@/types";

function buildCompanyOutput(
  name: string,
  role: string,
  status: Company["status"]
): CompanyAIOutput {
  return {
    company_overview: `${name} is a leading technology company known for innovation, strong engineering culture, and competitive compensation. The ${role} role focuses on building scalable systems and collaborating cross-functionally.`,
    role_details: `Position: ${role}\nTeam: Product Engineering\nLevel: Mid-Senior\nFocus: Full-stack development, system design, and mentoring junior engineers.`,
    application_status: status,
    interview_timeline: [
      { stage: "Applied", date: "2026-06-15", status: "completed", notes: "Submitted via careers portal" },
      { stage: "Recruiter Screen", date: "2026-06-22", status: "completed", notes: "30-min intro call" },
      { stage: "Technical Phone", date: "2026-07-02", status: "completed", notes: "Coding + system design" },
      { stage: "Onsite / Final", date: "2026-07-10", status: "upcoming", notes: "4 rounds scheduled" },
    ],
    job_description: `We are looking for a ${role} to join our team at ${name}.\n\nResponsibilities:\n• Design and build scalable web applications\n• Collaborate with product and design teams\n• Write clean, tested, maintainable code\n• Participate in code reviews and architecture discussions\n\nRequirements:\n• 3+ years of software engineering experience\n• Strong fundamentals in data structures and algorithms\n• Experience with React, TypeScript, and cloud services`,
    resume_used: "Resume v3 — Full Stack (Tailored for " + name + ")",
    recruiter_notes: "Recruiter mentioned team is growing fast. Emphasize distributed systems experience. Ask about team structure and on-call expectations.",
    interview_questions: [
      { question: "Tell me about a challenging project you led.", category: "behavioral", tips: "Use STAR format. Focus on impact and trade-offs." },
      { question: "Design a URL shortener.", category: "system_design", tips: "Start with requirements, estimate scale, discuss storage and caching." },
      { question: "Implement an LRU cache.", category: "technical", tips: "HashMap + doubly linked list. Discuss O(1) operations." },
      { question: "Why do you want to work at " + name + "?", category: "general", tips: "Research company mission, recent products, and culture." },
    ],
    company_research: [
      `${name} recently expanded into AI-powered product features.`,
      "Engineering blog highlights focus on developer experience.",
      "Glassdoor reviews mention strong mentorship and work-life balance.",
      "Recent earnings beat analyst expectations — team is hiring aggressively.",
    ],
    ai_coach_tips: [
      "Review the company's engineering blog before your onsite.",
      "Prepare 3 thoughtful questions about team culture and growth.",
      "Practice explaining your most recent project in under 2 minutes.",
      "Brush up on system design fundamentals — expect at least one round.",
    ],
  };
}

export const DEMO_COMPANIES: Company[] = [
  {
    id: "stripe",
    name: "Stripe",
    role: "Software Engineer",
    location: "San Francisco, CA",
    status: "final_interview",
    applied_at: "2026-06-15",
    salary_range: "$180k–$220k",
    ai_output: buildCompanyOutput("Stripe", "Software Engineer", "final_interview"),
  },
  {
    id: "google",
    name: "Google",
    role: "Product Manager",
    location: "Mountain View, CA",
    status: "phone_interview",
    applied_at: "2026-06-20",
    salary_range: "$160k–$200k",
    ai_output: buildCompanyOutput("Google", "Product Manager", "phone_interview"),
  },
  {
    id: "notion",
    name: "Notion",
    role: "Full Stack Engineer",
    location: "New York, NY",
    status: "applied",
    applied_at: "2026-07-01",
    salary_range: "$150k–$190k",
    ai_output: buildCompanyOutput("Notion", "Full Stack Engineer", "applied"),
  },
  {
    id: "meta",
    name: "Meta",
    role: "Data Scientist",
    location: "Menlo Park, CA",
    status: "oa",
    applied_at: "2026-07-03",
    salary_range: "$170k–$210k",
    ai_output: buildCompanyOutput("Meta", "Data Scientist", "oa"),
  },
];

export const DEMO_APPLICATIONS: Application[] = DEMO_COMPANIES.map((c) => ({
  id: `app-${c.id}`,
  company_id: c.id,
  company_name: c.name,
  role: c.role,
  status: c.status,
  applied_at: c.applied_at,
  deadline: c.status === "final_interview" ? "2026-07-10" : null,
  notes: c.ai_output.recruiter_notes,
}));

export function getDemoCompany(id: string): Company | undefined {
  return DEMO_COMPANIES.find((c) => c.id === id);
}

export const DEMO_RESUME_VERSIONS = [
  { id: "v1", name: "Resume v1 — General", updated: "2026-05-10", used: 2 },
  { id: "v2", name: "Resume v2 — Backend Focus", updated: "2026-06-01", used: 5 },
  { id: "v3", name: "Resume v3 — Full Stack", updated: "2026-06-28", used: 8 },
];

export const DEMO_BEHAVIORAL_QUESTIONS = [
  { question: "Tell me about a time you failed and what you learned.", category: "Failure & Growth" },
  { question: "Describe a conflict with a teammate and how you resolved it.", category: "Teamwork" },
  { question: "Give an example of when you had to influence without authority.", category: "Leadership" },
  { question: "Tell me about a project where you had to learn something new quickly.", category: "Adaptability" },
  { question: "Describe a time you had to make a decision with incomplete information.", category: "Decision Making" },
];

export const DEMO_TECHNICAL_QUESTIONS = [
  { question: "Two Sum — find two numbers that add up to target.", difficulty: "Easy", topic: "Arrays" },
  { question: "LRU Cache — design and implement.", difficulty: "Medium", topic: "Data Structures" },
  { question: "Merge K Sorted Lists.", difficulty: "Hard", topic: "Heaps" },
  { question: "Design a rate limiter.", difficulty: "Medium", topic: "System Design" },
  { question: "Binary tree level-order traversal.", difficulty: "Medium", topic: "Trees" },
];

export const DEMO_NETWORKING_CONTACTS = [
  { name: "Sarah Chen", role: "Engineering Manager @ Stripe", lastContact: "3 days ago", status: "Follow up" },
  { name: "Alex Rivera", role: "Recruiter @ Google", lastContact: "1 week ago", status: "Scheduled call" },
  { name: "Jordan Kim", role: "SWE @ Notion", lastContact: "2 weeks ago", status: "Coffee chat done" },
];
