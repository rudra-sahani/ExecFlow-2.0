import { create } from 'zustand';
import { STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/storage';

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  activeSection: string;

  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
  toggleMobileOpen: () => void;
  setMobileOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isCollapsed: storage.get<boolean>(STORAGE_KEYS.SIDEBAR_COLLAPSED, false) ?? false,
  isMobileOpen: false,
  activeSection: 'dashboard',

  toggleCollapsed: () => {
    const nextState = !get().isCollapsed;
    storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, nextState);
    set({ isCollapsed: nextState });
  },

  setCollapsed: (collapsed) => {
    storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, collapsed);
    set({ isCollapsed: collapsed });
  },

  toggleMobileOpen: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setMobileOpen: (open) => set({ isMobileOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
