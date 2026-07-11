"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isAppShell =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/upload") ||
    pathname.startsWith("/workspace") ||
    pathname.startsWith("/library") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/ask") ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/analytics") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/companies") ||
    pathname.startsWith("/company") ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/interview-prep") ||
    pathname.startsWith("/resume-tracker") ||
    pathname.startsWith("/behavioral-practice") ||
    pathname.startsWith("/technical-practice") ||
    pathname.startsWith("/networking");
  const isOnboarding = pathname.startsWith("/onboarding");

  if (isAuthPage || isAppShell || isOnboarding) {
    return null;
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const isLanding = pathname === "/";

  return (
    <header className="relative z-10 border-b border-white/10 bg-[#050816]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[#F8FAFC]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white">
            <BookOpen className="h-5 w-5" />
          </span>
          StudySync AI
        </Link>

        {isLanding ? (
          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </nav>
        ) : (
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        )}
      </div>
    </header>
  );
}
