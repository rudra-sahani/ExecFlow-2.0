import { create } from 'zustand';
import { ThemeMode } from '../types/ui';
import { STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/storage';

interface ThemeState {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const getInitialTheme = (): ThemeMode => {
  const saved = storage.get<ThemeMode>(STORAGE_KEYS.THEME);
  return saved || 'system';
};

const resolveTheme = (theme: ThemeMode): 'light' | 'dark' => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
};

const applyThemeToDOM = (resolved: 'light' | 'dark') => {
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
};

const initialTheme = getInitialTheme();
const initialResolved = resolveTheme(initialTheme);
applyThemeToDOM(initialResolved);

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: initialTheme,
  resolvedTheme: initialResolved,

  setTheme: (theme) => {
    storage.set(STORAGE_KEYS.THEME, theme);
    const resolved = resolveTheme(theme);
    set({ theme, resolvedTheme: resolved });
    applyThemeToDOM(resolved);
  },

  toggleTheme: () => {
    const currentResolved = get().resolvedTheme;
    const nextTheme: ThemeMode = currentResolved === 'dark' ? 'light' : 'dark';
    get().setTheme(nextTheme);
  },
}));

// System theme change listener
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const state = useThemeStore.getState();
    if (state.theme === 'system') {
      const resolved = resolveTheme('system');
      useThemeStore.setState({ resolvedTheme: resolved });
      applyThemeToDOM(resolved);
    }
  });
}
