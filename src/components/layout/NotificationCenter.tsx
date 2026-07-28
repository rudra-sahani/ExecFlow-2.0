import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  Trash2,
  Inbox,
  Sparkles,
} from 'lucide-react';
import { useNotificationStore, NotificationItem } from '../../store/useNotificationStore';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../lib/cn';

export const NotificationCenter: React.FC = () => {
  const { isNotificationCenterOpen, setNotificationCenterOpen } = useUIStore();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotificationStore();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#39FF14] shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-[#7CB518] shrink-0" />;
    }
  };

  return (
    <>
      {/* Trigger Button Component (used in TopNavigation) */}
      <button
        type="button"
        onClick={() => setNotificationCenterOpen(true)}
        className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#111315] transition-colors cursor-pointer"
        aria-label="Open notifications"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#7CB518] text-[10px] font-bold text-black shadow-sm font-mono animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Slide-over Drawer Modal */}
      <AnimatePresence>
        {isNotificationCenterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
              onClick={() => setNotificationCenterOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-[#0F1110] border-l border-[#7CB518]/20 shadow-2xl flex flex-col"
              >
                {/* Drawer Header */}
                <div className="p-4 sm:p-6 border-b border-[#7CB518]/15 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white font-heading">
                        Notification Center
                      </h2>
                      <p className="text-xs text-zinc-400 font-mono">
                        {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setNotificationCenterOpen(false)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#111315] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Filter Tabs & Actions */}
                <div className="px-4 sm:px-6 py-3 bg-[#050505] border-b border-[#7CB518]/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1 bg-[#111315] p-0.5 rounded-lg border border-[#7CB518]/20">
                    <button
                      type="button"
                      onClick={() => setFilter('all')}
                      className={cn(
                        'px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer',
                        filter === 'all'
                          ? 'bg-[#7CB518] text-black shadow-xs'
                          : 'text-zinc-400 hover:text-white'
                      )}
                    >
                      All ({notifications.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilter('unread')}
                      className={cn(
                        'px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer',
                        filter === 'unread'
                          ? 'bg-[#7CB518] text-black shadow-xs'
                          : 'text-zinc-400 hover:text-white'
                      )}
                    >
                      Unread ({unreadCount})
                    </button>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="font-medium text-[#7CB518] hover:text-[#95D600] flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {filteredNotifications.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#111315] border border-[#7CB518]/20 text-zinc-400 flex items-center justify-center mx-auto">
                        <Inbox className="w-6 h-6 text-[#7CB518]" />
                      </div>
                      <h3 className="text-sm font-semibold text-white font-heading">
                        No notifications found
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                        {filter === 'unread'
                          ? 'You are all caught up! No unread notifications.'
                          : 'Your notification inbox is currently empty.'}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          'p-3.5 rounded-xl border transition-all duration-200 relative group',
                          !item.read
                            ? 'bg-[#111315] border-[#7CB518]/40 shadow-sm'
                            : 'bg-[#0F1110] border-[#7CB518]/15'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getIcon(item.type)}</div>

                          <div className="flex-1 min-w-0 pr-6">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white truncate font-heading">
                                {item.title}
                              </h4>
                              {!item.read && (
                                <span className="w-2 h-2 rounded-full bg-[#39FF14] shrink-0" />
                              )}
                            </div>

                            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                              {item.description}
                            </p>

                            <div className="flex items-center justify-between mt-2.5 text-[10px] text-zinc-400 font-mono">
                              {item.source && (
                                <span className="font-semibold text-[#7CB518]">
                                  {item.source}
                                </span>
                              )}
                              <span>{item.timestamp}</span>
                            </div>
                          </div>

                          {/* Quick Actions overlay */}
                          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!item.read && (
                              <button
                                type="button"
                                onClick={() => markAsRead(item.id)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-[#39FF14] hover:bg-[#171A1C]"
                                title="Mark as read"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => deleteNotification(item.id)}
                              className="p-1 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-[#171A1C]"
                              title="Delete notification"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Info */}
                <div className="p-4 border-t border-[#7CB518]/15 bg-[#050505] flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" />
                    Agent Alerts Sync Active
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotificationCenterOpen(false)}
                    className="font-semibold text-[#7CB518] hover:text-[#95D600] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
