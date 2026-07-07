import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold">Lecture not found</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        This lecture may have been deleted or you do not have access.
      </p>
      <Link href="/dashboard" className="mt-6">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
