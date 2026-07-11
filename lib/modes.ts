import type { ApplicationStatus, UserMode } from "@/types";
import {
  BarChart3,
  Building2,
  CheckSquare,
  ClipboardList,
  Code2,
  FileText,
  FolderOpen,
  LayoutDashboard,
  MessageCircle,
  MessageSquare,
  Mic,
  Search,
  Settings,
  Upload,
  Users,
} from "lucide-react";

export const MODE_LABELS: Record<UserMode, string> = {
  student: "Student Mode",
  professional: "Professional Mode",
  career: "Career Mode",
};

export const MODE_TAGLINES: Record<UserMode, string> = {
  student: "Learn better",
  professional: "Work smarter",
  career: "Get hired",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  oa: "OA",
  recruiter_screen: "Recruiter Screen",
  phone_interview: "Phone Interview",
  final_interview: "Final Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  saved: "#94A3B8",
  applied: "#3B82F6",
  oa: "#8B5CF6",
  recruiter_screen: "#A78BFA",
  phone_interview: "#22D3EE",
  final_interview: "#F59E0B",
  offer: "#10B981",
  rejected: "#EF4444",
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const sharedNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/library", label: "Library", icon: FolderOpen },
  { href: "/search", label: "Search", icon: Search },
  { href: "/ask", label: "Ask AI", icon: MessageCircle },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

const careerNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/applications", label: "Applications", icon: ClipboardList },
  { href: "/interview-prep", label: "Interview Prep", icon: Mic },
  { href: "/resume-tracker", label: "Resume Tracker", icon: FileText },
  { href: "/behavioral-practice", label: "Behavioral Practice", icon: MessageSquare },
  { href: "/technical-practice", label: "Technical Practice", icon: Code2 },
  { href: "/networking", label: "Networking", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function getNavItems(mode: UserMode): NavItem[] {
  if (mode === "career") return careerNav;
  return sharedNav;
}

export function getModeLabel(mode: UserMode) {
  return MODE_LABELS[mode];
}

export function isValidUserMode(value: string): value is UserMode {
  return value === "student" || value === "professional" || value === "career";
}
