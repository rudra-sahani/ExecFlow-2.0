import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X, Command, CornerDownLeft } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useSidebarStore } from '../../store/useSidebarStore';

export const KeyboardShortcuts: React.FC = () => {
  const {
    isKeyboardShortcutsOpen,
    setKeyboardShortcutsOpen,
    setCommandPaletteOpen,
    isCommandPaletteOpen,
  } = useUIStore();
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);

  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing inside input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Cmd+K / Ctrl+K -> Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
        return;
      }

      // Cmd+B / Ctrl+B -> Toggle Sidebar
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapsed();
        return;
      }

      // '?' -> Open Keyboard Shortcuts
      if (e.key === '?' && !isInput && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setKeyboardShortcutsOpen(true);
        return;
      }

      // Escape -> Close dialogs
      if (e.key === 'Escape') {
        if (isKeyboardShortcutsOpen) {
          setKeyboardShortcutsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isCommandPaletteOpen,
    isKeyboardShortcutsOpen,
    setCommandPaletteOpen,
    setKeyboardShortcutsOpen,
    toggleCollapsed,
  ]);

  const shortcutGroups = [
    {
      category: 'Navigation & Command',
      shortcuts: [
        { keys: [isMac ? '⌘' : 'Ctrl', 'K'], label: 'Open Command Palette' },
        { keys: [isMac ? '⌘' : 'Ctrl', 'B'], label: 'Toggle Sidebar Expand/Collapse' },
        { keys: ['?'], label: 'Open Keyboard Shortcuts cheat sheet' },
        { keys: ['Esc'], label: 'Close open dialogs or drawers' },
      ],
    },
    {
      category: 'Command Palette Navigation',
      shortcuts: [
        { keys: ['↑', '↓'], label: 'Move focus up / down in search results' },
        { keys: ['Enter'], label: 'Select focused result or execute action' },
      ],
    },
  ];

  if (!isKeyboardShortcutsOpen) return null;

  return (
    <AnimatePresence>
      {isKeyboardShortcutsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setKeyboardShortcutsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg rounded-xl bg-[#0F1110] border border-[#7CB518]/30 shadow-2xl p-6 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#7CB518]/15">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Keyboard Shortcuts
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Supercharge your executive productivity
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setKeyboardShortcutsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#111315]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="py-4 space-y-5 max-h-96 overflow-y-auto custom-scrollbar">
              {shortcutGroups.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    {group.category}
                  </h4>
                  <div className="space-y-1.5">
                    {group.shortcuts.map((sc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#111315] border border-[#7CB518]/15"
                      >
                        <span className="text-xs font-medium text-zinc-200">
                          {sc.label}
                        </span>
                        <div className="flex items-center gap-1">
                          {sc.keys.map((k, kIdx) => (
                            <kbd
                              key={kIdx}
                              className="px-2 py-0.5 rounded bg-[#171A1C] border border-[#7CB518]/30 text-[11px] font-mono font-semibold text-[#39FF14] shadow-xs"
                            >
                              {k}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[#7CB518]/15 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Press <kbd className="font-mono text-[#39FF14] font-bold">Esc</kbd> to exit cheat sheet</span>
              <button
                type="button"
                onClick={() => setKeyboardShortcutsOpen(false)}
                className="font-semibold text-[#7CB518] hover:text-[#95D600] cursor-pointer"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
