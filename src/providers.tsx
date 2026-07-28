import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import { setupInterceptors } from './services/interceptors';
import { useAuthStore } from './store/useAuthStore';
import { ErrorState } from './components/common/ErrorState';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      retry: (failureCount, error: unknown) => {
        // Don't retry on 401 or 403
        const status = (error as { response?: { status?: number } })?.response?.status;
        if (status === 401 || status === 403) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initializeAuth, logout } = useAuthStore();

  useEffect(() => {
    // Setup Axios interceptors with logout trigger on unhandled 401
    setupInterceptors(() => {
      logout();
    });

    // Initialize Auth state from stored JWT token
    initializeAuth();
  }, [initializeAuth, logout]);

  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
          <ErrorState
            title="Application Error"
            description={(error as Error)?.message || 'An unexpected error occurred in the platform.'}
            onRetry={resetErrorBoundary}
          />
        </div>
      )}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '13px',
              borderRadius: '12px',
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
