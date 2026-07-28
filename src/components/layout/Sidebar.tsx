import React from 'react';
import {
  LayoutDashboard,
  Video,
  CheckSquare,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Database,
  Cpu,
  Settings,
  User,
} from 'lucide-react';
import { useSidebarStore } from '../../store/useSidebarStore';
import { SidebarLogo } from './SidebarLogo';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';
import { SidebarFooter } from './SidebarFooter';
import { cn } from '../../lib/cn';
import { ROUTES } from '../../utils/constants';

export const Sidebar: React.FC = () => {
  const { isCollapsed, toggleCollapsed, isMobileOpen, setMobileOpen } = useSidebarStore();

  const handleItemClick = () => {
    if (isMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Drawer */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-zinc-800 bg-[#0F1110] transition-all duration-300 ease-in-out shadow-lg',
          isCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <SidebarLogo
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapsed}
        />

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3 custom-scrollbar">
          {/* Main Navigation Section */}
          <SidebarGroup title="MAIN NAVIGATION" isCollapsed={isCollapsed}>
            <SidebarItem
              label="Dashboard"
              path={ROUTES.DASHBOARD}
              icon={LayoutDashboard}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
            <SidebarItem
              label="Meetings"
              path={ROUTES.MEETINGS}
              icon={Video}
              badge="Live"
              badgeColor="emerald"
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
            <SidebarItem
              label="Tasks"
              path={ROUTES.TASKS}
              icon={CheckSquare}
              badge={5}
              badgeColor="indigo"
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
          </SidebarGroup>

          {/* AI & Automation Engine */}
          <SidebarGroup title="INTELLIGENCE ENGINE" isCollapsed={isCollapsed}>
            <SidebarItem
              label="AI Insights"
              path="/ai-insights"
              icon={Sparkles}
              badge="New"
              badgeColor="amber"
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
            <SidebarItem
              label="Approvals"
              path={ROUTES.APPROVAL}
              icon={ShieldCheck}
              badge="Action"
              badgeColor="rose"
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
            <SidebarItem
              label="Analytics"
              path={ROUTES.ANALYTICS}
              icon={BarChart3}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
            <SidebarItem
              label="Memory"
              path={ROUTES.MEMORY}
              icon={Database}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
            <SidebarItem
              label="Agent Monitor"
              path={ROUTES.AGENT_MONITOR}
              icon={Cpu}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
            <SidebarItem
              label="Automation"
              path="/automation"
              icon={Sparkles}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
          </SidebarGroup>

          {/* Workspace Settings */}
          <SidebarGroup title="PREFERENCES" isCollapsed={isCollapsed}>
            <SidebarItem
              label="Settings"
              path={ROUTES.SETTINGS}
              icon={Settings}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
            <SidebarItem
              label="Profile"
              path={ROUTES.PROFILE}
              icon={User}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
          </SidebarGroup>
        </div>

        {/* Sidebar Footer */}
        <SidebarFooter
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapsed}
        />
      </aside>
    </>
  );
};
