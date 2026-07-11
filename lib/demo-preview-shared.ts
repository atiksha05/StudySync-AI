import type { UserMode } from "@/types";
import { isValidUserMode } from "@/lib/modes";

export const DEMO_COOKIE = "studysync_demo_mode";

export function isValidDemoMode(value: string | undefined | null): value is UserMode {
  return !!value && isValidUserMode(value);
}
