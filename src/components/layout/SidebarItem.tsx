import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface SidebarItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string | number;
  badgeColor?: 'indigo' | 'emerald' | 'amber' | 'rose';
  isCollapsed?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  path,
  icon: Icon,
  badge,
  badgeColor = 'indigo',
  isCollapsed = false,
  onClick,
}) => {
  const location = useLocation();

  // Check active state
  const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(`${path}/`));

  const badgeColorMap = {
    indigo: 'bg-[#7CB518]/15 text-[#7CB518] border-[#7CB518]/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  };

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive: isExactActive }) => {
        const active = isActive || isExactActive;
        return cn(
          'group relative flex items-center rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#7CB518]',
          active
            ? 'bg-[#151817] text-white font-semibold border border-zinc-800 shadow-xs'
            : 'text-zinc-400 hover:bg-[#151817]/60 hover:text-white',
          isCollapsed && 'justify-center px-2'
        );
      }}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? label : undefined}
    >
      {/* Active Indicator Pillar */}
      {isActive && (
        <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#7CB518] rounded-r-full" />
      )}

      {/* Icon */}
      <Icon
        className={cn(
          'h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105',
          isActive
            ? 'text-[#7CB518]'
            : 'text-zinc-400 group-hover:text-white',
          !isCollapsed && 'mr-2.5'
        )}
      />

      {/* Label */}
      {!isCollapsed && <span className="truncate flex-1 font-sans">{label}</span>}

      {/* Badge */}
      {!isCollapsed && badge !== undefined && (
        <span
          className={cn(
            'ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium border font-sans',
            badgeColorMap[badgeColor]
          )}
        >
          {badge}
        </span>
      )}

      {/* Hover Tooltip when Collapsed */}
      {isCollapsed && (
        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#151817] border border-zinc-800 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap font-sans">
          {label}
          {badge !== undefined && (
            <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#7CB518] text-black text-[10px] font-semibold">
              {badge}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
};
