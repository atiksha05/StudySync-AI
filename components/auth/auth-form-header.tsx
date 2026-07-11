import { BookOpen } from "lucide-react";

type AuthFormHeaderProps = {
  title: string;
  subtitle: string;
};

export function AuthFormHeader({ title, subtitle }: AuthFormHeaderProps) {
  return (
    <div className="mb-6 text-center">
      <div className="mb-4 inline-flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/20">
          <BookOpen className="h-4 w-4 text-white" />
        </span>
        <span className="font-[family-name:var(--font-sora)] text-base font-semibold tracking-tight text-[#F8FAFC]">
          StudySync AI
        </span>
      </div>
      <h1 className="font-[family-name:var(--font-sora)] text-[1.75rem] font-bold leading-tight text-[#F8FAFC] sm:text-3xl">
        {title}
      </h1>
      <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}
