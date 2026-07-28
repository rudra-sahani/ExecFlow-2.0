import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { loginValidationSchema, LoginSchemaType } from '../validation';
import { useLogin } from '../hooks/useLogin';
import { RememberMe } from './RememberMe';
import { SocialLoginSection } from './SocialLoginSection';
import { ROUTES } from '../../../utils/constants';

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const rememberMeValue = watch('rememberMe');

  const onSubmit = async (data: LoginSchemaType) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert Box */}
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Authentication Error</p>
            <p className="mt-0.5 text-red-300">{error}</p>
          </div>
          <button
            type="button"
            onClick={clearError}
            className="text-red-400 hover:text-red-200 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Email Input */}
      <Input
        label="Work Email"
        type="email"
        placeholder="alex@company.com"
        autoComplete="email"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Password Input */}
      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        autoComplete="current-password"
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

      {/* Remember Me & Forgot Password */}
      <RememberMe
        checked={rememberMeValue}
        onChange={(e) => setValue('rememberMe', e.target.checked)}
        showForgotPassword={true}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full mt-2 font-semibold shadow-xs"
      >
        Sign In to Workspace
      </Button>

      {/* Social Provider Login */}
      <SocialLoginSection isLoading={isLoading} />

      {/* Redirect to Register */}
      <div className="text-center text-xs sm:text-sm text-zinc-400 font-sans mt-6">
        Don't have an account?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="font-medium text-[#7CB518] hover:text-[#8DC621] transition-colors"
        >
          Create workspace account
        </Link>
      </div>
    </form>
  );
};
