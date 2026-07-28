import React from 'react';
import { Search } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const GlobalSearch: React.FC = () => {
  const setCommandPaletteOpen = useUIStore((state) => state.setCommandPaletteOpen);

  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  return (
    <button
      type="button"
      onClick={() => setCommandPaletteOpen(true)}
      className="flex items-center justify-between w-full sm:w-64 md:w-72 lg:w-80 h-9 px-3 rounded-lg border border-[#7CB518]/20 bg-[#0F1110] hover:bg-[#111315] hover:border-[#7CB518]/40 text-zinc-400 text-xs font-normal transition-all cursor-pointer shadow-sm group font-mono"
      aria-label="Open command palette search"
    >
      <div className="flex items-center gap-2 truncate">
        <Search className="w-4 h-4 text-zinc-400 group-hover:text-[#39FF14] transition-colors shrink-0" />
        <span className="truncate group-hover:text-white">
          Search meetings, tasks, memory...
        </span>
      </div>

      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-[#7CB518]/30 bg-[#111315] text-[10px] font-mono font-medium text-[#95D600] shadow-xs">
        <span>{isMac ? '⌘' : 'Ctrl'}</span>
        <span>K</span>
      </kbd>
    </button>
  );
};
