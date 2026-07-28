import { create } from 'zustand';
import { AuthTokens, User } from '../types/auth';
import { STORAGE_KEYS } from '../utils/constants';
import { storage } from '../utils/storage';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setAuth: (user: User, tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: storage.get<User>(STORAGE_KEYS.USER_DATA),
  tokens: (() => {
    const accessToken = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
    return accessToken ? { accessToken, refreshToken: refreshToken || '', expiresIn: 3600, tokenType: 'Bearer' } : null;
  })(),
  isAuthenticated: !!storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN),
  isLoading: true,
  error: null,

  setAuth: (user, tokens) => {
    storage.set(STORAGE_KEYS.USER_DATA, user);
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);

    set({
      user,
      tokens,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  setUser: (user) => {
    storage.set(STORAGE_KEYS.USER_DATA, user);
    set({ user });
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      storage.remove(STORAGE_KEYS.USER_DATA);
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);

      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  initializeAuth: async () => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      set({ isLoading: false, isAuthenticated: false, user: null });
      return;
    }

    try {
      set({ isLoading: true });
      const user = await authService.getCurrentUser();
      storage.set(STORAGE_KEYS.USER_DATA, user);
      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch {
      storage.remove(STORAGE_KEYS.USER_DATA);
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      set({ user: null, tokens: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
