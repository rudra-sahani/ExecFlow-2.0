import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Video, CheckSquare, Search, BarChart3, Database, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUIStore } from '../../store/useUIStore';
import { ROUTES } from '../../utils/constants';
import { cn } from '../../lib/cn';

export const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const setCommandPaletteOpen = useUIStore((state) => state.setCommandPaletteOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    {
      label: 'Upload Meeting Transcript',
      icon: Video,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80',
      handler: () => {
        navigate(ROUTES.MEETINGS);
        toast.success('Navigated to Meetings for transcript ingestion');
      },
    },
    {
      label: 'Create Action Task',
      icon: CheckSquare,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80',
      handler: () => {
        navigate(ROUTES.TASKS);
        toast.success('Navigated to Action Tasks');
      },
    },
    {
      label: 'Search Vector Memory',
      icon: Search,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80',
      handler: () => {
        setCommandPaletteOpen(true);
      },
    },
    {
      label: 'Open Analytics Reports',
      icon: BarChart3,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80',
      handler: () => {
        navigate(ROUTES.ANALYTICS);
      },
    },
    {
      label: 'Go to Memory Store',
      icon: Database,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80',
      handler: () => {
        navigate(ROUTES.MEMORY);
      },
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Top Nav Quick Action Plus Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7CB518] hover:bg-[#95D600] text-black text-xs font-bold shadow-md shadow-[#7CB518]/20 transition-all cursor-pointer active:scale-95 font-mono"
        aria-label="Quick action menu"
        title="Create new item or trigger quick action"
      >
        <Plus className={cn('w-4 h-4 stroke-[3] transition-transform duration-200', isOpen && 'rotate-45')} />
        <span className="hidden lg:inline">Create</span>
      </button>

      {/* Quick Action Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-[#7CB518]/15 flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 font-mono">
              Quick Actions
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" />
          </div>

          <div className="space-y-1 py-1">
            {actions.map((act) => {
              const ActionIcon = act.icon;
              return (
                <button
                  key={act.label}
                  type="button"
                  onClick={() => {
                    act.handler();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left hover:bg-[#111315] transition-colors cursor-pointer group"
                >
                  <div className="p-2 rounded-md shrink-0 bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14]">
                    <ActionIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-200 group-hover:text-white font-heading">
                    {act.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
