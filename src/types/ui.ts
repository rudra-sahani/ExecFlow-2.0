/**
 * Frontend UI, Theme, Layout, Modal, and Notification state types
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  modalId?: string;
  title?: string;
  data?: Record<string, unknown>;
}

export interface DrawerState {
  isOpen: boolean;
  drawerId?: string;
  title?: string;
  position?: 'left' | 'right';
  data?: Record<string, unknown>;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}
