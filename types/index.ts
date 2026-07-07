export type LectureStatus = "pending" | "processing" | "completed" | "failed";
export type FileType = "audio" | "pdf";

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Task {
  title: string;
  dueHint?: string;
  priority: "low" | "medium" | "high";
}

export interface GeneratedContent {
  summary: string;
  notes: string[];
  flashcards: Flashcard[];
  quizzes: QuizQuestion[];
  tasks: Task[];
}

export interface Lecture {
  id: string;
  user_id: string;
  title: string;
  file_url: string | null;
  file_type: FileType | null;
  file_name: string | null;
  status: LectureStatus;
  transcript: string | null;
  summary: string | null;
  notes: string[] | null;
  flashcards: Flashcard[] | null;
  quizzes: QuizQuestion[] | null;
  tasks: Task[] | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}
