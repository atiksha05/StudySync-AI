import { NextResponse } from "next/server";
import { DEMO_COOKIE, isValidDemoMode } from "@/lib/demo-preview-shared";
import type { UserMode } from "@/types";

export async function POST(request: Request) {
  const body = await request.json();
  const mode = body.mode as UserMode;

  if (!isValidDemoMode(mode)) {
    return NextResponse.json({ error: "Invalid demo mode" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true, mode });
  response.cookies.set(DEMO_COOKIE, mode, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(DEMO_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
