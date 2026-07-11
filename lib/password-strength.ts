export type PasswordStrength = {
  score: number;
  label: string;
  color: string;
};

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: "", color: "#374151" };
  }

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const normalized = Math.min(4, Math.max(1, Math.ceil((score / 5) * 4)));

  const levels: Record<number, PasswordStrength> = {
    1: { score: 1, label: "Weak", color: "#EF4444" },
    2: { score: 2, label: "Fair", color: "#F59E0B" },
    3: { score: 3, label: "Good", color: "#22D3EE" },
    4: { score: 4, label: "Strong", color: "#10B981" },
  };

  return levels[normalized];
}
