import React from 'react';
import { Menu } from 'lucide-react';
import { useSidebarStore } from '../../store/useSidebarStore';
import { Breadcrumbs } from './Breadcrumbs';
import { GlobalSearch } from './GlobalSearch';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { QuickActions } from './QuickActions';
import { NotificationCenter } from './NotificationCenter';
import { ThemeSwitcher } from './ThemeSwitcher';
import { UserMenu } from './UserMenu';

export const TopNavigation: React.FC = () => {
  const toggleMobileOpen = useSidebarStore((state) => state.toggleMobileOpen);

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-[#7CB518]/15 bg-[#050505]/90 backdrop-blur-md transition-colors">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 gap-2 sm:gap-4">
        {/* Left Section: Mobile Trigger & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={toggleMobileOpen}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#111315] transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block truncate">
            <Breadcrumbs />
          </div>
        </div>

        {/* Middle Section: Global Command Search */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2">
          <GlobalSearch />
        </div>

        {/* Right Section: Workspace Switcher, Quick Actions, Notifications, Theme, User Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div className="hidden xl:block">
            <WorkspaceSwitcher />
          </div>

          <QuickActions />

          <div className="h-5 w-px bg-[#7CB518]/20 mx-0.5 hidden sm:block" />

          <NotificationCenter />

          <ThemeSwitcher />

          <div className="h-5 w-px bg-[#7CB518]/20 mx-0.5 hidden sm:block" />

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
