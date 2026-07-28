import React from 'react';
import { Icons, IconName } from '../../lib/icons';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'Sparkles',
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  const IconComponent = Icons[icon] || Icons.Sparkles;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300/80 bg-slate-50/50 p-10 text-center dark:border-slate-800 dark:bg-slate-900/30',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <IconComponent className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} leftIcon={<Icons.Plus className="h-4 w-4" />} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
