import React, { useState, useRef, useEffect } from 'react';
import { Building2, Check, ChevronDown, Plus, Sparkles, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUIStore, WorkspaceItem } from '../../store/useUIStore';
import { cn } from '../../lib/cn';

export const WorkspaceSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { workspaces, activeWorkspaceId, setActiveWorkspaceId } = useUIStore();

  const currentWorkspace =
    workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectWorkspace = (workspace: WorkspaceItem) => {
    setActiveWorkspaceId(workspace.id);
    setIsOpen(false);
    toast.success(`Switched to ${workspace.name}`);
  };

  const handleCreateWorkspace = () => {
    setIsOpen(false);
    toast('Workspace creation dialog is available in Enterprise settings.', {
      icon: '🏢',
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Workspace Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-[#7CB518]/20 bg-[#0F1110] hover:bg-[#111315] hover:border-[#7CB518]/40 transition-colors cursor-pointer text-left shadow-sm group focus:outline-none focus:ring-2 focus:ring-[#7CB518]/30"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div
          className="w-6 h-6 rounded bg-[#7CB518] text-black font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
        >
          {currentWorkspace.name[0]}
        </div>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-white max-w-[120px] lg:max-w-[160px] truncate font-heading">
              {currentWorkspace.name}
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
              {currentWorkspace.plan}
            </span>
          </div>
        </div>

        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform duration-200 ml-0.5',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-[#7CB518]/15">
            <p className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 font-mono">
              Workspaces ({workspaces.length})
            </p>
          </div>

          <div className="py-1 space-y-1">
            {workspaces.map((ws) => {
              const isSelected = ws.id === currentWorkspace.id;
              return (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => handleSelectWorkspace(ws)}
                  className={cn(
                    'w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer group',
                    isSelected
                      ? 'bg-[#111315] text-white border border-[#7CB518]/30'
                      : 'hover:bg-[#111315]/80 text-zinc-300 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className="w-8 h-8 rounded-lg bg-[#7CB518] text-black font-bold text-sm flex items-center justify-center shrink-0 shadow-xs"
                    >
                      {ws.name[0]}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold truncate group-hover:text-[#95D600] font-heading">
                        {ws.name}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5 font-mono">
                        <span className="flex items-center gap-0.5">
                          <Shield className="w-3 h-3 text-[#7CB518]" />
                          {ws.role}
                        </span>
                        <span>•</span>
                        <span>{ws.membersCount} members</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#7CB518] text-black flex items-center justify-center shrink-0 ml-2">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 mt-1 border-t border-[#7CB518]/15">
            <button
              type="button"
              onClick={handleCreateWorkspace}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:bg-[#111315] hover:text-white transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#7CB518]" />
              <span>Create New Workspace</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
