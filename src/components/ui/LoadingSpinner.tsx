import React from 'react';
import { Icons } from '../../lib/icons';
import { cn } from '../../lib/cn';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  label,
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  return (
    <div className="inline-flex flex-col items-center justify-center space-y-2">
      <Icons.Spinner className={cn('animate-spin text-indigo-600 dark:text-indigo-400', sizes[size], className)} />
      {label && <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>}
    </div>
  );
};
