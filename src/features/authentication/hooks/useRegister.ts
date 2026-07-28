import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../../services/authService';
import { useAuthStore } from '../../../store/useAuthStore';
import { RegisterSchemaType } from '../validation';
import { formatAuthError } from '../utils';
import { ROUTES } from '../../../utils/constants';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const register = async (data: RegisterSchemaType) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        workspaceName: data.workspaceName || undefined,
      });

      if (response.requiresVerification) {
        toast.success('Registration successful! Verification email sent to your inbox.');
        navigate(`${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`, { replace: true });
        return true;
      }

      setAuth(response.user, response.tokens);
      toast.success('Account created successfully! Welcome to ExecFlow.');
      navigate(ROUTES.DASHBOARD, { replace: true });
      return true;
    } catch (err) {
      const errorMessage = formatAuthError(err);
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
