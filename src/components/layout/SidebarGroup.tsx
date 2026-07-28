import React from 'react';
import { cn } from '../../lib/cn';

interface SidebarGroupProps {
  title?: string;
  isCollapsed?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  isCollapsed = false,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-1 py-1.5', className)}>
      {title && (
        <div className={cn('px-3 my-1.5', isCollapsed && 'px-0 text-center')}>
          {!isCollapsed ? (
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 select-none font-mono">
              {title}
            </h3>
          ) : (
            <div className="w-8 h-px bg-[#7CB518]/20 mx-auto my-2" />
          )}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
};
