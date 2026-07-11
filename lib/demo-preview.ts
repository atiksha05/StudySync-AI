import { cookies } from "next/headers";
import type { UserMode } from "@/types";
import { DEMO_COOKIE, isValidDemoMode } from "@/lib/demo-preview-shared";

export { DEMO_COOKIE, isValidDemoMode } from "@/lib/demo-preview-shared";

export async function getDemoMode(): Promise<UserMode | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(DEMO_COOKIE)?.value;
  return isValidDemoMode(value) ? value : null;
}
