import React from 'react';
import { Cpu, HelpCircle, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '../../lib/cn';

interface SidebarFooterProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  isCollapsed,
  onToggleCollapse,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-3 border-t border-[#7CB518]/15 bg-[#0F1110] space-y-2',
        className
      )}
    >
      {/* Agent Status Card */}
      {!isCollapsed ? (
        <div className="rounded-lg border border-[#7CB518]/20 bg-[#111315] p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
              </span>
              <span className="text-[11px] font-semibold text-white">
                Orchestrator Online
              </span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#7CB518]/15 text-[#39FF14] font-semibold border border-[#7CB518]/30">
              100%
            </span>
          </div>
          <p className="mt-1 text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
            <Cpu className="w-3 h-3 text-[#7CB518]" />
            <span>Multi-Agent Engine v1.0.4</span>
          </p>
        </div>
      ) : (
        <div
          className="flex items-center justify-center py-2"
          title="AI Orchestrator Online (100% Active)"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]"></span>
          </span>
        </div>
      )}

      {/* Footer Quick Controls */}
      <div className={cn('flex items-center', isCollapsed ? 'justify-center' : 'justify-between px-1')}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
            <span>ExecFlow OS</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('support-help-btn');
                if (el) el.click();
              }}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#111315] transition-colors cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-[#7CB518]" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
