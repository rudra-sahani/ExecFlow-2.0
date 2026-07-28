import React from 'react';
import { cn } from '../../lib/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  action,
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn('space-y-4', className)} {...props}>
      {(title || action) && (
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
          <div>
            {title && (
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
};
