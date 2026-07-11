import { ReactNode } from "react";

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-20 w-full max-w-[440px]">
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[32px] bg-gradient-to-br from-[#3B82F6]/40 via-[#8B5CF6]/25 to-[#EC4899]/35 opacity-80 blur-[1px]"
        aria-hidden
      />
      <div className="relative max-h-[calc(100vh-40px)] overflow-y-auto rounded-[32px] border border-white/[0.08] bg-[#0a0f1c]/95 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
        {children}
      </div>
    </div>
  );
}
