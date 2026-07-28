import { PasswordStrengthResult } from '../types';

/**
 * Calculates password strength score and detailed criteria checks.
 */
export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  const checks = {
    length: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  let score = 0;
  if (checks.length) score += 1;
  if (checks.hasUppercase && checks.hasLowercase) score += 1;
  if (checks.hasNumber) score += 1;
  if (checks.hasSpecial) score += 1;

  // Bonus for extra length
  if (password.length >= 12 && score > 0) {
    score = Math.min(4, score + 1);
  }

  const strengthMap: Record<number, { label: PasswordStrengthResult['label']; color: string; percentage: number }> = {
    0: { label: 'Very Weak', color: 'bg-red-500', percentage: 10 },
    1: { label: 'Weak', color: 'bg-orange-500', percentage: 25 },
    2: { label: 'Fair', color: 'bg-yellow-500', percentage: 50 },
    3: { label: 'Strong', color: 'bg-emerald-500', percentage: 75 },
    4: { label: 'Very Strong', color: 'bg-indigo-600', percentage: 100 },
  };

  const currentStrength = password.length === 0 
    ? { label: 'Very Weak' as const, color: 'bg-slate-300 dark:bg-slate-700', percentage: 0 }
    : strengthMap[score] || strengthMap[0];

  return {
    score,
    label: currentStrength.label,
    color: currentStrength.color,
    percentage: currentStrength.percentage,
    checks,
  };
}

/**
 * Extracts a human-readable error message from backend error responses.
 */
export function formatAuthError(error: unknown): string {
  if (typeof error === 'string') return error;

  if (error && typeof error === 'object') {
    const errObj = error as any;
    const data = errObj.response?.data;

    if (data) {
      if (typeof data.error === 'string' && data.error) return data.error;
      if (typeof data.message === 'string' && data.message) return data.message;
      if (data.error && typeof data.error === 'object') {
        if (typeof data.error.message === 'string' && data.error.message) return data.error.message;
        if (typeof data.error.code === 'string') return `Error ${data.error.code}: ${data.error.message || 'Database error'}`;
      }
      if (data.message && typeof data.message === 'object') {
        if (typeof data.message.message === 'string') return data.message.message;
      }
    }

    if (typeof errObj.message === 'string' && errObj.message) {
      return errObj.message;
    }

    if (typeof errObj.error === 'string' && errObj.error) {
      return errObj.error;
    }
  }

  return 'An unexpected error occurred. Please try again.';
}
