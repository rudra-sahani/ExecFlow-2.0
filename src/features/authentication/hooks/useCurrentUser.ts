import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { authService } from '../../../services/authService';
import { User } from '../../../types/auth';

export function useCurrentUser() {
  const { user, setUser, isAuthenticated, isLoading: storeLoading } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async (): Promise<User | null> => {
    if (!isAuthenticated) return null;
    setIsRefreshing(true);
    setError(null);

    try {
      const fetchedUser = await authService.getCurrentUser();
      setUser(fetchedUser);
      return fetchedUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch user profile';
      setError(message);
      return null;
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !user) {
      refreshUser();
    }
  }, [isAuthenticated, user]);

  return {
    user,
    isAuthenticated,
    isLoading: storeLoading || isRefreshing,
    error,
    refreshUser,
  };
}
