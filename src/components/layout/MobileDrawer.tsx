import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bot } from 'lucide-react';
import { useSidebarStore } from '../../store/useSidebarStore';
import { Sidebar } from './Sidebar';

export const MobileDrawer: React.FC = () => {
  const { isMobileOpen, setMobileOpen } = useSidebarStore();

  if (!isMobileOpen) return null;

  return (
    <AnimatePresence>
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-80 max-w-[85vw] h-full bg-[#050505] border-r border-[#7CB518]/30 shadow-2xl flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#7CB518]/15 bg-[#0F1110]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7CB518] text-black font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-bold text-base text-white font-heading">
                  Exec<span className="text-[#39FF14]">Flow</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#111315]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Contents */}
            <div className="flex-1 overflow-hidden relative">
              <Sidebar />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
