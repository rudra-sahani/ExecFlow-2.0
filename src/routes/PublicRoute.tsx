import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { ROUTES } from '../utils/constants';

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingOverlay fullScreen message="Checking session..." />;
  }

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || ROUTES.DASHBOARD;
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
