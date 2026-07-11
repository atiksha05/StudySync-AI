"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, AtSign, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { AuthCard } from "./auth-card";
import { AuthDivider } from "./auth-divider";
import { AuthFormHeader } from "./auth-form-header";
import { AuthInput } from "./auth-input";
import { DemoModePicker } from "./demo-mode-picker";
import { SocialAuthButtons } from "./social-auth-buttons";
import { createClient } from "@/lib/supabase/client";
import {
  AUTH_NOT_CONFIGURED_MESSAGE,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(AUTH_NOT_CONFIGURED_MESSAGE);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      const profileRes = await fetch("/api/profile");
      if (profileRes.ok) {
        const { profile } = await profileRes.json();
        const destination =
          profile?.onboarding_completed && profile?.user_mode
            ? "/dashboard"
            : "/onboarding";
        router.push(destination);
        router.refresh();
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to connect to the server.";
      setError(
        message.toLowerCase().includes("fetch")
          ? "Connection failed. Supabase may not be configured yet."
          : message
      );
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      <AuthCard>
        <AuthFormHeader
          title="Welcome back"
          subtitle="Continue your AI knowledge workspace ✨"
        />

        <form onSubmit={handleSubmit} className="space-y-3">
          <AuthInput
            id="login-email"
            label="Email Address"
            type="email"
            icon={<AtSign className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <AuthInput
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            icon={<Lock className="h-4 w-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            minLength={6}
            required
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-slate-500 transition hover:text-slate-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
          />

          {error ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          ) : null}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] text-sm font-semibold text-white shadow-lg shadow-[#8B5CF6]/30 transition hover:shadow-[#8B5CF6]/45 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        <AuthDivider />

        <SocialAuthButtons onError={setError} />

        <div className="mt-5 border-t border-white/10 pt-5">
          <DemoModePicker compact />
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          New here?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#A78BFA] hover:text-[#C4B5FD] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </AuthCard>
    </motion.div>
  );
}
