import React from 'react';
import { APP_NAME, APP_VERSION } from '../../utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#7CB518]/15 bg-[#050505] px-6 py-4 text-xs text-zinc-400 font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-white font-heading">{APP_NAME}</span>
          <span className="text-zinc-500">v{APP_VERSION}</span>
          <span className="text-zinc-600">•</span>
          <span>AI Multi-Agent Execution Platform</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="text-[11px] text-[#39FF14]">System Normal</span>
          </div>
          <span className="text-zinc-600">•</span>
          <span>&copy; {new Date().getFullYear()} ExecFlow Enterprise</span>
        </div>
      </div>
    </footer>
  );
};
