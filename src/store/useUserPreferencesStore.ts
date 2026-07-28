import { create } from 'zustand';
import { UserPreferences } from '../types/auth';
import { STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/storage';

interface UserPreferencesState {
  preferences: UserPreferences;
  updatePreferences: (newPrefs: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  emailNotifications: true,
  pushNotifications: true,
  autoSummarizeMeetings: true,
  defaultMeetingView: 'list',
  timezone: 'UTC',
};

export const useUserPreferencesStore = create<UserPreferencesState>((set, get) => ({
  preferences: storage.get<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES, defaultPreferences) || defaultPreferences,

  updatePreferences: (newPrefs) => {
    const updated = { ...get().preferences, ...newPrefs };
    storage.set(STORAGE_KEYS.USER_PREFERENCES, updated);
    set({ preferences: updated });
  },
}));
