import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Building, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { registerValidationSchema, RegisterSchemaType } from '../validation';
import { useRegister } from '../hooks/useRegister';
import { PasswordStrength } from './PasswordStrength';
import { SocialLoginSection } from './SocialLoginSection';
import { ROUTES } from '../../../utils/constants';

export const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerAccount, isLoading, error, clearError } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      workspaceName: '',
      termsAccepted: false,
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterSchemaType) => {
    await registerAccount(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Registration Error</p>
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

      {/* Full Name */}
      <Input
        label="Full Name"
        type="text"
        placeholder="Alex Morgan"
        autoComplete="name"
        leftIcon={<UserIcon className="w-4 h-4" />}
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      {/* Work Email */}
      <Input
        label="Work Email"
        type="email"
        placeholder="alex@company.com"
        autoComplete="email"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Workspace Name */}
      <Input
        label="Workspace Name (Optional)"
        type="text"
        placeholder="Acme Corp"
        leftIcon={<Building className="w-4 h-4" />}
        error={errors.workspaceName?.message}
        {...register('workspaceName')}
      />

      {/* Password & Strength Meter */}
      <div>
        <Input
          label="Password"
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
        label="Confirm Password"
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

      {/* Terms and Privacy Checkbox */}
      <div className="space-y-1">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-400 font-sans">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded border-zinc-800 bg-[#151817] text-[#7CB518] focus:ring-[#7CB518] accent-[#7CB518] cursor-pointer"
            {...register('termsAccepted')}
          />
          <span>
            I agree to the{' '}
            <a href="#terms" onClick={(e) => e.preventDefault()} className="font-medium text-[#7CB518] hover:text-[#8DC621] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="font-medium text-[#7CB518] hover:text-[#8DC621] hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-xs text-red-400 pl-6.5 font-sans">
            {errors.termsAccepted.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full mt-2 font-semibold shadow-xs"
      >
        Create Workspace Account
      </Button>

      {/* Social Register */}
      <SocialLoginSection isLoading={isLoading} />

      {/* Redirect to Login */}
      <div className="text-center text-xs sm:text-sm text-zinc-400 font-sans mt-6">
        Already have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="font-medium text-[#7CB518] hover:text-[#8DC621] transition-colors"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
};
