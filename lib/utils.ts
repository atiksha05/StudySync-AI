import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "Pending",
    processing: "Processing",
    completed: "Ready",
    failed: "Failed",
  };
  return labels[status] ?? status;
}
