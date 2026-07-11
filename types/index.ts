export type UserMode = "student" | "professional" | "career";

export type WorkspaceStatus = "pending" | "processing" | "completed" | "failed";

export type ContentType =
  | "lecture_audio"
  | "meeting_recording"
  | "pdf"
  | "text_notes"
  | "image_notes";

export type ApplicationStatus =
  | "saved"
  | "applied"
  | "oa"
  | "recruiter_screen"
  | "phone_interview"
  | "final_interview"
  | "offer"
  | "rejected";

export type Profile = {
  id: string;
  user_mode: UserMode | null;
  onboarding_completed: boolean;
  full_name: string | null;
  nickname: string | null;
  created_at: string;
  updated_at: string;
};

export type Flashcard = { front: string; back: string };

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ActionItem = {
  title: string;
  owner?: string;
  dueHint?: string;
  deadline?: string;
  priority: "low" | "medium" | "high";
};

export type StudyPlanItem = {
  day: string;
  focus: string;
  tasks: string[];
};

export type Decision = {
  decision: string;
  context: string;
  owner?: string;
};

export type Risk = {
  risk: string;
  mitigation: string;
  severity: "low" | "medium" | "high";
};

export type StudentAIOutput = {
  summary: string;
  notes: string[];
  key_concepts: string[];
  flashcards: Flashcard[];
  quizzes: QuizQuestion[];
  action_items: ActionItem[];
  study_plan: StudyPlanItem[];
  mind_map: { label: string; children?: string[] }[];
};

export type ProfessionalAIOutput = {
  meeting_summary: string;
  decisions: Decision[];
  action_items: ActionItem[];
  risks: Risk[];
  open_questions: string[];
  follow_up_email: string;
};

export type InterviewQuestion = {
  question: string;
  category: "behavioral" | "technical" | "system_design" | "general";
  tips?: string;
};

export type InterviewTimelineEvent = {
  stage: string;
  date: string;
  notes?: string;
  status: "upcoming" | "completed" | "cancelled";
};

export type CompanyAIOutput = {
  company_overview: string;
  role_details: string;
  application_status: ApplicationStatus;
  interview_timeline: InterviewTimelineEvent[];
  job_description: string;
  resume_used: string;
  recruiter_notes: string;
  interview_questions: InterviewQuestion[];
  company_research: string[];
  ai_coach_tips: string[];
};

export type CareerAIOutput = {
  summary: string;
  interview_questions: InterviewQuestion[];
  resume_bullets: string[];
  company_research: string[];
  networking_tips: string[];
  action_items: ActionItem[];
  ai_coach_tips: string[];
};

export type Company = {
  id: string;
  name: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  applied_at: string | null;
  salary_range: string | null;
  ai_output: CompanyAIOutput;
};

export type Application = {
  id: string;
  company_id: string;
  company_name: string;
  role: string;
  status: ApplicationStatus;
  applied_at: string | null;
  deadline: string | null;
  notes: string | null;
};

export type Workspace = {
  id: string;
  user_id: string;
  title: string;
  content_type: ContentType;
  user_mode: UserMode;
  file_url: string | null;
  file_name: string | null;
  raw_content: string | null;
  status: WorkspaceStatus;
  transcript: string | null;
  summary: string | null;
  ai_output: StudentAIOutput | ProfessionalAIOutput | CareerAIOutput | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
};

/** @deprecated Use Workspace */
export type Lecture = Workspace;
export type LectureStatus = WorkspaceStatus;
export type FileType = "audio" | "pdf";
export type GeneratedContent = StudentAIOutput;
