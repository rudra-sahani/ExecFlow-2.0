import React from 'react';
import { Breadcrumb } from '../ui/Breadcrumb';
import { BreadcrumbItem } from '../../types/ui';
import { cn } from '../../lib/cn';

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}) => {
  return (
    <div className={cn('space-y-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/60', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center space-x-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
