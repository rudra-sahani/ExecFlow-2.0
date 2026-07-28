import React from 'react';
import { cn } from '../../lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-zinc-300 font-sans"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 text-zinc-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'flex h-12 w-full rounded-xl border border-zinc-800 bg-[#151817] px-3.5 text-sm text-white transition-all placeholder:text-zinc-500 focus:border-[#7CB518] focus:outline-none focus:ring-1 focus:ring-[#7CB518] disabled:cursor-not-allowed disabled:opacity-50 font-sans',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-zinc-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-400 font-sans">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-zinc-400 font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
