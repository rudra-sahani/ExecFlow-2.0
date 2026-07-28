import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { resetPasswordValidationSchema, ResetPasswordSchemaType } from '../validation';
import { PasswordStrength } from './PasswordStrength';
import { authService } from '../../../services/authService';
import { formatAuthError } from '../utils';
import { ROUTES } from '../../../utils/constants';

export const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordValidationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword({
        token,
        newPassword: data.password,
      });
      setIsSuccess(true);
    } catch (err) {
      const msg = formatAuthError(err);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 font-sans">
        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white font-heading">
          Password Reset Complete
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          Your account password has been updated successfully. You can now sign in with your new password.
        </p>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            className="w-full font-semibold shadow-xs"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Sign In with New Password
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans">
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="flex-1">{error}</p>
        </div>
      )}

      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
        Create a new strong password for your account.
      </p>

      {/* New Password */}
      <div>
        <Input
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="new-password"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordStrength password={passwordValue || ''} />
      </div>

      {/* Confirm Password */}
      <Input
        label="Confirm New Password"
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder="••••••••"
        autoComplete="new-password"
        leftIcon={<Lock className="w-4 h-4" />}
        rightIcon={
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full mt-2 font-semibold shadow-xs"
      >
        Save New Password
      </Button>

      <div className="text-center pt-2">
        <Link
          to={ROUTES.LOGIN}
          className="text-xs font-sans text-zinc-400 hover:text-white transition-colors"
        >
          Cancel and return to Sign In
        </Link>
      </div>
    </form>
  );
};
