import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useSidebarStore } from '../../store/useSidebarStore';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
import { MobileDrawer } from './MobileDrawer';
import { MobileNavigation } from './MobileNavigation';
import { CommandPalette } from './CommandPalette';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { PageTransition } from './PageTransition';
import { PageSkeleton } from '../ui/Skeleton';
import { cn } from '../../lib/cn';

interface AppShellProps {
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#7CB518] selection:text-black">
      {/* Desktop Sidebar Navigation */}
      <Sidebar />

      {/* Mobile Sidebar Overlay Drawer */}
      <MobileDrawer />

      {/* Main Content Wrapper */}
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 ease-in-out pb-16 lg:pb-0',
          isCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        )}
      >
        {/* Top Header Navigation */}
        <TopNavigation />

        {/* Dynamic Route Content Canvas with Suspense & Motion Transitions */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <PageTransition>
            <Suspense fallback={<PageSkeleton />}>
              {children || <Outlet />}
            </Suspense>
          </PageTransition>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNavigation />

      {/* Global Interactive Overlays */}
      <CommandPalette />
      <KeyboardShortcuts />
    </div>
  );
};
