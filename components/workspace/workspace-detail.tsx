"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ProfessionalWorkspaceView } from "@/components/workspace/professional-workspace";
import { StudentWorkspaceView } from "@/components/workspace/student-workspace";
import type { Workspace } from "@/types";

export function WorkspaceDetail({ initial }: { initial: Workspace }) {
  const [workspace, setWorkspace] = useState(initial);
  const [retrying, setRetrying] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/workspaces/${workspace.id}`);
    if (res.ok) {
      const data = await res.json();
      setWorkspace(data.workspace);
    }
  }, [workspace.id]);

  useEffect(() => {
    if (workspace.status === "pending" || workspace.status === "processing") {
      const interval = setInterval(refresh, 3000);
      return () => clearInterval(interval);
    }
  }, [workspace.status, refresh]);

  async function handleRetry() {
    setRetrying(true);
    await fetch(`/api/workspaces/${workspace.id}/process`, { method: "POST" });
    await refresh();
    setRetrying(false);
  }

  const isProcessing =
    workspace.status === "pending" || workspace.status === "processing";

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F8FAFC]">{workspace.title}</h1>
        <p className="mt-1 text-sm capitalize text-slate-500">
          {workspace.content_type.replace(/_/g, " ")} · {workspace.user_mode} mode
        </p>
      </div>

      {isProcessing ? (
        <Alert variant="info" title="AI is processing your content">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Gemini is generating your workspace materials...
          </div>
        </Alert>
      ) : null}

      {workspace.status === "failed" ? (
        <Alert variant="error" title="Processing failed">
          <p>{workspace.error_message}</p>
          <Button
            size="sm"
            className="mt-3"
            onClick={handleRetry}
            disabled={retrying}
          >
            <RefreshCw className={`h-4 w-4 ${retrying ? "animate-spin" : ""}`} />
            Retry
          </Button>
        </Alert>
      ) : null}

      {workspace.status === "completed" && workspace.ai_output ? (
        workspace.user_mode === "student" ? (
          <StudentWorkspaceView workspace={workspace} />
        ) : (
          <ProfessionalWorkspaceView workspace={workspace} />
        )
      ) : null}
    </div>
  );
}
