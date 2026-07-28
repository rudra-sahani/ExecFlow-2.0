import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from '../services/authService';
import { LoginRequest, RegisterRequest } from '../types/auth';

export function useAuth() {
  const { user, isAuthenticated, isLoading, error, setAuth, logout, clearError } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    clearError,
  };
}
