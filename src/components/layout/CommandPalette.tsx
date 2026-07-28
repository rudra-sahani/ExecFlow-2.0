import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
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
  PlusCircle,
  Sun,
  Moon,
  Clock,
  ArrowRight,
  Command,
} from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useThemeStore } from '../../store/useThemeStore';
import { ROUTES } from '../../utils/constants';
import toast from 'react-hot-toast';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Pages' | 'Quick Actions' | 'Recent Meetings' | 'Recent Searches';
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
}

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const { toggleTheme, theme } = useThemeStore();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  // Command items definitions
  const items: CommandItem[] = [
    // Pages
    {
      id: 'cmd-dash',
      title: 'Dashboard',
      subtitle: 'Overview of workspace metrics and agent statuses',
      category: 'Pages',
      icon: LayoutDashboard,
      action: () => navigate(ROUTES.DASHBOARD),
      keywords: ['home', 'analytics', 'overview'],
    },
    {
      id: 'cmd-meet',
      title: 'Meetings',
      subtitle: 'Live recordings, transcripts, and AI summaries',
      category: 'Pages',
      icon: Video,
      action: () => navigate(ROUTES.MEETINGS),
      keywords: ['video', 'transcripts', 'recording'],
    },
    {
      id: 'cmd-tasks',
      title: 'Action Tasks',
      subtitle: 'AI-generated task tracking and Jira sync',
      category: 'Pages',
      icon: CheckSquare,
      action: () => navigate(ROUTES.TASKS),
      keywords: ['jira', 'todo', 'actions'],
    },
    {
      id: 'cmd-analytics',
      title: 'Analytics & Reports',
      subtitle: 'Meeting velocity, engagement, and agent metrics',
      category: 'Pages',
      icon: BarChart3,
      action: () => navigate(ROUTES.ANALYTICS),
      keywords: ['charts', 'metrics', 'velocity'],
    },
    {
      id: 'cmd-memory',
      title: 'Vector Memory Database',
      subtitle: 'Semantic search across all past transcripts and decisions',
      category: 'Pages',
      icon: Database,
      action: () => navigate(ROUTES.MEMORY),
      keywords: ['embeddings', 'rag', 'context', 'search'],
    },
    {
      id: 'cmd-approvals',
      title: 'Human-in-the-Loop Approvals',
      subtitle: 'Review and approve high-stakes agent actions',
      category: 'Pages',
      icon: ShieldCheck,
      action: () => navigate(ROUTES.APPROVAL),
      keywords: ['security', 'compliance', 'workflow'],
    },
    {
      id: 'cmd-agent-mon',
      title: 'Agent Observability Monitor',
      subtitle: 'Real-time telemetry, trace logs, and latency spikes',
      category: 'Pages',
      icon: Cpu,
      action: () => navigate(ROUTES.AGENT_MONITOR),
      keywords: ['telemetry', 'logs', 'spikes'],
    },
    {
      id: 'cmd-settings',
      title: 'Workspace Settings',
      subtitle: 'Manage integrations, team members, and API keys',
      category: 'Pages',
      icon: Settings,
      action: () => navigate(ROUTES.SETTINGS),
      keywords: ['api', 'team', 'integrations'],
    },
    {
      id: 'cmd-profile',
      title: 'User Profile & Preferences',
      subtitle: 'Account credentials and notification preferences',
      category: 'Pages',
      icon: User,
      action: () => navigate(ROUTES.PROFILE),
      keywords: ['account', 'email', 'avatar'],
    },

    // Quick Actions
    {
      id: 'cmd-upload',
      title: 'Upload Meeting Transcript',
      subtitle: 'Ingest VTT, MP4, or TXT file for instant AI analysis',
      category: 'Quick Actions',
      icon: PlusCircle,
      action: () => {
        navigate(ROUTES.MEETINGS);
        toast.success('Upload panel opened in Meetings view');
      },
      keywords: ['vtt', 'mp4', 'import'],
    },
    {
      id: 'cmd-toggle-theme',
      title: `Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
      subtitle: 'Switch application visual appearance mode',
      category: 'Quick Actions',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        toast.success('Theme mode updated');
      },
      keywords: ['dark mode', 'light mode', 'color'],
    },
    {
      id: 'cmd-run-audit',
      title: 'Trigger Agent Audit Log Export',
      subtitle: 'Export recent agent executions to JSON/CSV',
      category: 'Quick Actions',
      icon: Sparkles,
      action: () => {
        toast.success('Agent audit log export initialized');
      },
      keywords: ['export', 'log', 'csv'],
    },

    // Recent Meetings
    {
      id: 'cmd-rec-1',
      title: 'Q3 Product Roadmap & Agent Strategy Sync',
      subtitle: 'Conducted today at 10:00 AM • 45 mins',
      category: 'Recent Meetings',
      icon: Video,
      action: () => {
        navigate(ROUTES.MEETINGS);
        toast.success('Opened Q3 Strategy Sync transcript');
      },
    },
    {
      id: 'cmd-rec-2',
      title: 'Executive Board Review & Budget Allocation',
      subtitle: 'Conducted yesterday at 2:30 PM • 60 mins',
      category: 'Recent Meetings',
      icon: Video,
      action: () => {
        navigate(ROUTES.MEETINGS);
      },
    },

    // Recent Searches
    {
      id: 'cmd-s1',
      title: 'Jira ticket synchronization latency',
      subtitle: 'Recent Memory Search query',
      category: 'Recent Searches',
      icon: Clock,
      action: () => {
        navigate(ROUTES.MEMORY);
      },
    },
  ];

  // Filter items
  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchSub = item.subtitle?.toLowerCase().includes(q);
    const matchCat = item.category.toLowerCase().includes(q);
    const matchKw = item.keywords?.some((k) => k.toLowerCase().includes(q));
    return matchTitle || matchSub || matchCat || matchKw;
  });

  // Group items by category
  const categories = Array.from(new Set(filteredItems.map((item) => item.category)));

  // Flattened array for keyboard navigation
  const flatList = filteredItems;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flatList.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatList.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatList[selectedIndex]) {
        flatList[selectedIndex].action();
        setCommandPaletteOpen(false);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setCommandPaletteOpen(false);
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-xl bg-[#0F1110] border border-[#7CB518]/30 shadow-2xl overflow-hidden z-50"
            onKeyDown={handleKeyDown}
          >
            {/* Search Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#7CB518]/15 bg-[#050505]">
              <Search className="w-5 h-5 text-[#39FF14] shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search (e.g. 'meetings', 'tasks', 'theme')..."
                className="w-full bg-transparent text-sm sm:text-base font-medium text-white placeholder:text-zinc-500 outline-none font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-zinc-400 hover:text-white mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex px-2 py-1 rounded bg-[#111315] text-[10px] font-mono text-[#95D600] border border-[#7CB518]/30">
                ESC
              </kbd>
            </div>

            {/* Content List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-4 custom-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-zinc-400">
                  <Command className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
                  <p className="text-sm font-medium text-white font-heading">No commands found for "{query}"</p>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    Try searching for 'Meetings', 'Tasks', 'Memory', or 'Settings'.
                  </p>
                </div>
              ) : (
                categories.map((category) => {
                  const categoryItems = filteredItems.filter((item) => item.category === category);
                  if (categoryItems.length === 0) return null;

                  return (
                    <div key={category} className="space-y-1">
                      <div className="px-3 py-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                          {category}
                        </span>
                      </div>

                      {categoryItems.map((item) => {
                        const globalIdx = flatList.findIndex((i) => i.id === item.id);
                        const isSelected = globalIdx === selectedIndex;
                        const ItemIcon = item.icon;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              item.action();
                              setCommandPaletteOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors cursor-pointer group ${
                              isSelected
                                ? 'bg-[#7CB518] text-black shadow-md'
                                : 'hover:bg-[#111315] text-zinc-200'
                            }`}
                          >
                            <div className="flex items-center gap-3 truncate">
                              <div
                                className={`p-2 rounded-md shrink-0 ${
                                  isSelected
                                    ? 'bg-black/20 text-black'
                                    : 'bg-[#111315] text-[#39FF14] border border-[#7CB518]/30'
                                }`}
                              >
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <p className={`text-xs sm:text-sm font-semibold truncate font-heading ${
                                  isSelected ? 'text-black' : 'text-white'
                                }`}>
                                  {item.title}
                                </p>
                                {item.subtitle && (
                                  <p
                                    className={`text-[11px] truncate mt-0.5 font-mono ${
                                      isSelected
                                        ? 'text-black/80'
                                        : 'text-zinc-400'
                                    }`}
                                  >
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                            </div>

                            <ArrowRight
                              className={`w-4 h-4 shrink-0 transition-transform ${
                                isSelected
                                  ? 'opacity-100 translate-x-0 text-black'
                                  : 'opacity-0 -translate-x-2'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer tips */}
            <div className="px-4 py-2.5 bg-[#050505] border-t border-[#7CB518]/15 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#111315] border border-[#7CB518]/30 text-[#95D600]">
                    ↑↓
                  </kbd>{' '}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#111315] border border-[#7CB518]/30 text-[#95D600]">
                    ↵
                  </kbd>{' '}
                  Select
                </span>
              </div>
              <span className="hidden sm:inline text-zinc-500">ExecFlow Command Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
