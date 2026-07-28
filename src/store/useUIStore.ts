import { create } from 'zustand';
import { DrawerState, ModalState } from '../types/ui';

export interface WorkspaceItem {
  id: string;
  name: string;
  plan: 'Enterprise' | 'Pro' | 'Starter';
  role: 'Owner' | 'Admin' | 'Member';
  avatarColor: string;
  membersCount: number;
}

interface UIState {
  modal: ModalState;
  drawer: DrawerState;
  isCommandPaletteOpen: boolean;
  globalSearchQuery: string;
  isNotificationCenterOpen: boolean;
  isKeyboardShortcutsOpen: boolean;
  activeWorkspaceId: string;
  workspaces: WorkspaceItem[];

  openModal: (modalId: string, title?: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  openDrawer: (drawerId: string, title?: string, position?: 'left' | 'right', data?: Record<string, unknown>) => void;
  closeDrawer: () => void;
  setCommandPaletteOpen: (isOpen: boolean) => void;
  setGlobalSearchQuery: (query: string) => void;
  setNotificationCenterOpen: (isOpen: boolean) => void;
  setKeyboardShortcutsOpen: (isOpen: boolean) => void;
  setActiveWorkspaceId: (id: string) => void;
}

const DEFAULT_WORKSPACES: WorkspaceItem[] = [
  {
    id: 'ws-acme',
    name: 'Acme Corp (Primary)',
    plan: 'Enterprise',
    role: 'Owner',
    avatarColor: 'bg-[#7CB518]',
    membersCount: 24,
  },
  {
    id: 'ws-techstars',
    name: 'TechStars Ventures',
    plan: 'Pro',
    role: 'Admin',
    avatarColor: 'bg-[#39FF14]',
    membersCount: 8,
  },
  {
    id: 'ws-personal',
    name: 'Personal Sandbox',
    plan: 'Starter',
    role: 'Owner',
    avatarColor: 'bg-[#95D600]',
    membersCount: 1,
  },
];

export const useUIStore = create<UIState>((set) => ({
  modal: { isOpen: false },
  drawer: { isOpen: false, position: 'right' },
  isCommandPaletteOpen: false,
  globalSearchQuery: '',
  isNotificationCenterOpen: false,
  isKeyboardShortcutsOpen: false,
  activeWorkspaceId: 'ws-acme',
  workspaces: DEFAULT_WORKSPACES,

  openModal: (modalId, title, data) => set({ modal: { isOpen: true, modalId, title, data } }),
  closeModal: () => set({ modal: { isOpen: false } }),
  openDrawer: (drawerId, title, position = 'right', data) =>
    set({ drawer: { isOpen: true, drawerId, title, position, data } }),
  closeDrawer: () => set({ drawer: { isOpen: false, position: 'right' } }),
  setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
  setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
  setNotificationCenterOpen: (isOpen) => set({ isNotificationCenterOpen: isOpen }),
  setKeyboardShortcutsOpen: (isOpen) => set({ isKeyboardShortcutsOpen: isOpen }),
  setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),
}));

