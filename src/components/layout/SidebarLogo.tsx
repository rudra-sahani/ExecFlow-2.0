import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/cn';
import { ROUTES } from '../../utils/constants';
import { ExecFlowIcon } from '../common/ExecFlowLogo';

interface SidebarLogoProps {
  isCollapsed: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({
  isCollapsed,
  onToggleCollapse,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex h-16 items-center justify-between border-b border-zinc-800 bg-[#0F1110] transition-all duration-300',
        isCollapsed ? 'justify-center px-2' : 'px-4',
        className
      )}
    >
      <NavLink
        to={ROUTES.DASHBOARD}
        className="flex items-center gap-3 overflow-hidden group select-none"
      >
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#151817] border border-zinc-800 group-hover:border-zinc-700 transition-colors shadow-xs">
          <ExecFlowIcon sizeClass="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </div>

        {!isCollapsed && (
          <div className="flex flex-col truncate">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base tracking-tight text-white truncate">
                Exec<span className="text-[#7CB518]">Flow</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#7CB518]/15 text-[10px] font-semibold text-[#7CB518] border border-[#7CB518]/30">
                AI
              </span>
            </div>
            <span className="text-[10px] font-medium text-zinc-400 tracking-wider uppercase truncate">
              Execution Platform
            </span>
          </div>
        )}
      </NavLink>

      {!isCollapsed && onToggleCollapse && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center h-8 w-8 rounded-lg text-zinc-400 hover:bg-[#111315] hover:text-white transition-colors cursor-pointer"
          aria-label="Collapse sidebar"
          title="Collapse sidebar (Ctrl+B)"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

