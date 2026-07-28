import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../../services/authService';
import { useAuthStore } from '../../../store/useAuthStore';
import { LoginSchemaType } from '../validation';
import { formatAuthError } from '../utils';
import { ROUTES } from '../../../utils/constants';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (data: LoginSchemaType) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      setAuth(response.user, response.tokens);
      toast.success(`Welcome back, ${response.user.fullName}!`);

      const redirectUrl = searchParams.get('redirect') || ROUTES.DASHBOARD;
      navigate(redirectUrl, { replace: true });
      return true;
    } catch (err: any) {
      if (err.response?.data?.requiresVerification) {
        toast.error('Your email is not verified. Redirecting to verification...');
        navigate(`${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`, { replace: true });
        return false;
      }
      const errorMessage = formatAuthError(err);
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
