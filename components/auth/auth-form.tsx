"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/client";

function AuthFormFooter({ mode }: { mode: "login" | "signup" }) {
  if (mode === "login") {
    return (
      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        New here?{" "}
        <Link
          href="/signup"
          className="relative z-10 font-medium text-indigo-400 underline-offset-4 hover:text-indigo-300 hover:underline"
        >
          Create an account
        </Link>
      </p>
    );
  }

  return (
    <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
      Already have an account?{" "}
      <Link
        href="/login"
        className="relative z-10 font-medium text-indigo-400 underline-offset-4 hover:text-indigo-300 hover:underline"
      >
        Sign in
      </Link>
    </p>
  );
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!signInError) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setError(
      "Account created, but sign-in failed. If email confirmation is enabled, confirm your email first, then sign in."
    );
    setLoading(false);
  }

  return (
    <div className="relative z-0 w-full max-w-md">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {mode === "login"
              ? "Sign in to access your lecture study materials."
              : "Start turning lectures into notes, flashcards, and quizzes."}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${mode}-email`}>Email</Label>
              <Input
                id={`${mode}-email`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-password`}>Password</Label>
              <Input
                id={`${mode}-password`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                minLength={6}
                required
              />
            </div>

            {error ? <Alert variant="error">{error}</Alert> : null}
            {message ? <Alert variant="success">{message}</Alert> : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AuthFormFooter mode={mode} />
    </div>
  );
}
