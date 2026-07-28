import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Video, CheckSquare, ShieldCheck, Settings } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { cn } from '../../lib/cn';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dash', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Meetings', path: ROUTES.MEETINGS, icon: Video },
    { label: 'Tasks', path: ROUTES.TASKS, icon: CheckSquare },
    { label: 'Approvals', path: ROUTES.APPROVAL, icon: ShieldCheck },
    { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t border-[#7CB518]/30 bg-[#0F1110]/95 backdrop-blur-lg px-2 py-1 shadow-xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive =
            location.pathname === item.path ||
            ((item.path as string) !== '/' && location.pathname.startsWith(`${item.path}/`));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: isExactActive }) => {
                const active = isActive || isExactActive;
                return cn(
                  'flex flex-col items-center justify-center py-1.5 px-3 rounded-lg text-[10px] font-semibold transition-colors font-mono',
                  active
                    ? 'text-[#39FF14] bg-[#7CB518]/15 border border-[#7CB518]/30'
                    : 'text-zinc-400 hover:text-white'
                );
              }}
            >
              <IconComponent className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
