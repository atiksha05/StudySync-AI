"use client";

import { ReactNode } from "react";
import { AuthBackground } from "./auth-background";
import { AuthTransformationShowcase } from "./auth-transformation-showcase";

export type AuthHeroVariant = "login" | "signup";

type AuthLayoutProps = {
  variant: AuthHeroVariant;
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden font-[family-name:var(--font-inter)] text-[#F8FAFC] lg:h-screen lg:overflow-hidden">
      <AuthBackground />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-2">
        <section className="relative hidden h-full min-h-0 overflow-hidden border-r border-white/5 lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[#050816]/40" />
          <AuthTransformationShowcase />
        </section>

        <section className="relative z-20 flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-8 sm:px-8 lg:px-10 lg:py-6">
          <div className="mb-5 w-full max-w-[420px] lg:hidden">
            <AuthTransformationShowcase />
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
