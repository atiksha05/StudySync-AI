"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <BookOpen className="h-5 w-5" />
          </span>
          StudySync AI
        </Link>

        {!isAuthPage ? (
          <nav className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant={pathname.startsWith("/dashboard") ? "primary" : "ghost"} size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/lectures/new">
              <Button size="sm">
                <Plus className="h-4 w-4" />
                Upload
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
