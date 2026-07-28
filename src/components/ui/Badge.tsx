import React from 'react';
import { cn } from '../../lib/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'indigo' | 'outline' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-md whitespace-nowrap';

  const variants = {
    success:
      'bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30',
    warning:
      'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    error:
      'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    danger:
      'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    info:
      'bg-[#7CB518]/10 text-[#95D600] border border-[#7CB518]/25',
    indigo:
      'bg-[#7CB518]/20 text-[#39FF14] border border-[#7CB518]/40 font-bold',
    neutral:
      'bg-[#111315] text-zinc-300 border border-[#7CB518]/15',
    secondary:
      'bg-[#111315] text-zinc-300 border border-zinc-800',
    outline:
      'bg-transparent text-zinc-300 border border-zinc-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <div className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </div>
  );
};
