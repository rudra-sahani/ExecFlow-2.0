import React from 'react';
import { Check, X } from 'lucide-react';
import { calculatePasswordStrength } from '../utils';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  if (!password) return null;

  const { score, label, color, percentage, checks } = calculatePasswordStrength(password);

  const criteria = [
    { label: '8+ characters', pass: checks.length },
    { label: 'Uppercase & Lowercase', pass: checks.hasUppercase && checks.hasLowercase },
    { label: 'Number (0-9)', pass: checks.hasNumber },
    { label: 'Special character (!@#$)', pass: checks.hasSpecial },
  ];

  return (
    <div className="space-y-2 mt-2">
      {/* Strength Bar */}
      <div className="flex items-center justify-between text-xs font-sans">
        <span className="text-zinc-400">Password Strength:</span>
        <span className="font-semibold text-emerald-400">{label}</span>
      </div>

      <div className="h-1.5 w-full bg-[#151817] border border-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {criteria.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-[11px] font-sans">
            {item.pass ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            )}
            <span
              className={
                item.pass
                  ? 'text-zinc-300 font-medium'
                  : 'text-zinc-500'
              }
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
