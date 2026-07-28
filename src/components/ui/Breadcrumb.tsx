import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../../lib/icons';
import { BreadcrumbItem } from '../../types/ui';
import { cn } from '../../lib/cn';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && <Icons.ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600 shrink-0" />}
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast && 'font-semibold text-slate-900 dark:text-slate-100')}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
