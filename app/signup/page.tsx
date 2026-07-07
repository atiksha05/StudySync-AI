import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4 py-12 sm:px-6">
      <AuthForm key="signup" mode="signup" />
    </div>
  );
}
