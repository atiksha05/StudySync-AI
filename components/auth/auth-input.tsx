import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: string;
  helperText?: string;
  suffix?: ReactNode;
  compact?: boolean;
};

export function AuthInput({
  id,
  label,
  icon,
  badge,
  helperText,
  suffix,
  compact,
  className,
  ...props
}: AuthInputProps) {
  return (
    <div className={cn("space-y-0.5", compact && "space-y-0")}>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-xs font-medium text-slate-300">
          {label}
        </label>
        {badge ? (
          <span className="rounded-full bg-[#8B5CF6]/15 px-1.5 py-0.5 text-[9px] text-[#C4B5FD]">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>
        <input
          id={id}
          className={cn(
            "flex h-12 min-h-[48px] w-full rounded-2xl border border-white/10 bg-[#050816]/70 pl-10 text-sm text-[#F8FAFC] outline-none transition placeholder:text-slate-500 focus:border-[#8B5CF6]/60 focus:bg-[#050816]/90 focus:ring-2 focus:ring-[#8B5CF6]/15",
            suffix ? "pr-9" : "pr-3",
            className
          )}
          {...props}
        />
        {suffix ? (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">{suffix}</div>
        ) : null}
      </div>
      {helperText ? (
        <p className="text-[9px] leading-tight text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
