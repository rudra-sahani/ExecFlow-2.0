import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { forgotPasswordValidationSchema, ForgotPasswordSchemaType } from '../validation';
import { authService } from '../../../services/authService';
import { formatAuthError } from '../utils';
import { ROUTES } from '../../../utils/constants';

export const ForgotPasswordForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword(data.email);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (err) {
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4 font-sans">
        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white font-heading">
          Reset Link Sent
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          We sent password reset instructions to{' '}
          <span className="font-semibold text-zinc-200">{submittedEmail}</span>. Please check your inbox and spam folder.
        </p>

        <div className="pt-2 space-y-3 font-sans">
          <Button
            variant="secondary"
            className="w-full text-xs font-sans"
            onClick={() => setIsSubmitted(false)}
          >
            Resend Email Instructions
          </Button>

          <Link
            to={ROUTES.LOGIN}
            className="inline-flex items-center justify-center gap-2 text-xs font-sans font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
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
        Enter your work email address below and we'll send you a link to reset your account password.
      </p>

      <Input
        label="Work Email"
        type="email"
        placeholder="alex@company.com"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full mt-2 font-semibold shadow-xs"
      >
        Send Reset Instructions
      </Button>

      <div className="text-center pt-2">
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center gap-1.5 text-xs font-sans text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </form>
  );
};
