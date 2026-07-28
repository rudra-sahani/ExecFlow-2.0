import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../../store/useAuthStore';
import { ROUTES } from '../../../utils/constants';

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const logoutStore = useAuthStore((state) => state.logout);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutStore();
      toast.success('Signed out successfully');
      navigate(ROUTES.LOGIN, { replace: true });
    } catch {
      toast.error('Failed to log out cleanly');
      navigate(ROUTES.LOGIN, { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
  };
}
