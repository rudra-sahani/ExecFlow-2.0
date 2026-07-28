import React from 'react';
import { Icons } from '../../lib/icons';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'An error occurred while loading this section. Please try again or contact support if the issue persists.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-rose-200/80 bg-rose-50/50 p-8 text-center dark:border-rose-900/50 dark:bg-rose-950/20',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
        <Icons.AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">{description}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<Icons.Refresh className="h-3.5 w-3.5" />}
          className="mt-5 border-rose-200 dark:border-rose-800 hover:bg-rose-100/50"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
