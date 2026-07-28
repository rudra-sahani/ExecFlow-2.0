import { create } from 'zustand';
import { ToastOptions, ToastType } from '../types/ui';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: ToastType;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  source?: string;
}

interface NotificationState {
  unreadCount: number;
  notifications: NotificationItem[];
  activeToast: ToastOptions | null;

  showToast: (toast: ToastOptions) => void;
  clearToast: () => void;
  setUnreadCount: (count: number) => void;
  decrementUnread: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Human Approval Required',
    description: 'Agent requested approval to deploy Jira ticket automation for "Q3 Product Roadmap".',
    type: 'warning',
    timestamp: '10 mins ago',
    read: false,
    source: 'Approval Agent',
  },
  {
    id: 'notif-2',
    title: 'Transcript Ingested',
    description: 'Executive Strategy Call transcript analyzed. 8 action items extracted into memory.',
    type: 'success',
    timestamp: '1 hour ago',
    read: false,
    source: 'Memory Agent',
  },
  {
    id: 'notif-3',
    title: 'Agent Observability Alert',
    description: 'Task Dispatcher agent latency spiked to 1.2s during peak sync.',
    type: 'error',
    timestamp: '3 hours ago',
    read: true,
    source: 'Agent Monitor',
  },
  {
    id: 'notif-4',
    title: 'Weekly Analytics Digest',
    description: 'Meeting efficiency index increased by +18% across engineering workspace.',
    type: 'info',
    timestamp: 'Yesterday',
    read: true,
    source: 'Analytics Engine',
  },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: INITIAL_NOTIFICATIONS,
  unreadCount: INITIAL_NOTIFICATIONS.filter((n) => !n.read).length,
  activeToast: null,

  showToast: (toast) => set({ activeToast: { ...toast, id: toast.id || String(Date.now()) } }),
  clearToast: () => set({ activeToast: null }),
  setUnreadCount: (count) => set({ unreadCount: count }),
  decrementUnread: () => set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  deleteNotification: (id) =>
    set((state) => {
      const updated = state.notifications.filter((n) => n.id !== id);
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  addNotification: (item) =>
    set((state) => {
      const newNotif: NotificationItem = {
        ...item,
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        read: false,
      };
      const updated = [newNotif, ...state.notifications];
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),
}));

