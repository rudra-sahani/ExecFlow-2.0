import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { MailCheck, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthCard } from '../components/AuthCard';
import { Button } from '../../../components/ui/Button';
import { authService } from '../../../services/authService';
import { useAuthStore } from '../../../store/useAuthStore';
import { ROUTES } from '../../../utils/constants';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Auto-verify if token is present in URL
  useEffect(() => {
    if (token) {
      handleVerifyToken(token);
    }
  }, [token]);

  const handleVerifyToken = async (verificationToken: string) => {
    setIsVerifying(true);
    setError(null);
    try {
      const res = await authService.verifyEmail({ token: verificationToken });
      if (res?.user && res?.tokens) {
        setAuth(res.user, res.tokens);
      }
      setIsSuccess(true);
      toast.success('Email verified successfully!');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Verification link is invalid or has expired.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError(null);
    try {
      const res = await authService.verifyEmail({ code: fullCode, email: emailParam || undefined });
      if (res?.user && res?.tokens) {
        setAuth(res.user, res.tokens);
      }
      setIsSuccess(true);
      toast.success('Email verified successfully!');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Invalid or expired 6-digit code.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    const userEmail = prompt('Please enter your work email to resend verification code:');
    if (!userEmail) return;

    try {
      await authService.resendVerification(userEmail);
      toast.success(`Verification email resent to ${userEmail}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to resend verification email.';
      toast.error(msg);
    }
  };

  return (
    <AuthCard
      title="Verify Email"
      subtitle="Confirm your identity to unlock full workspace capabilities."
      badge="Identity Verification"
    >
      {isSuccess ? (
        <div className="text-center space-y-4 font-sans">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <MailCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading">
            Email Verified Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Your workspace address has been verified. You can now access all AI meeting features and automated task dispatches.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="w-full font-semibold mt-2 shadow-xs"
            onClick={() => {
              const currentAuth = useAuthStore.getState().isAuthenticated;
              if (currentAuth) {
                navigate(ROUTES.DASHBOARD, { replace: true });
              } else {
                navigate(ROUTES.LOGIN, { replace: true });
              }
            }}
          >
            Go to Workspace Dashboard
          </Button>
        </div>
      ) : (
        <form onSubmit={handleCodeSubmit} className="space-y-5 font-sans">
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="flex-1">{error}</p>
            </div>
          )}

          <p className="text-xs sm:text-sm text-zinc-400 text-center font-sans">
            Please enter the 6-digit verification code sent to your work email.
          </p>

          {/* 6-Digit Code Inputs */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-4">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-10 h-12 sm:w-11 sm:h-12 text-center text-lg font-bold font-mono rounded-xl border border-zinc-800 bg-[#151817] text-white focus:border-[#7CB518] focus:ring-1 focus:ring-[#7CB518] outline-none transition-all"
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isVerifying}
            className="w-full font-semibold shadow-xs"
          >
            Verify Email Address
          </Button>

          <div className="flex flex-col items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResend}
              className="inline-flex items-center gap-1.5 text-xs font-sans text-[#7CB518] hover:text-[#8DC621] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resend Verification Code / Email</span>
            </button>

            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center gap-1.5 text-xs font-sans text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </AuthCard>
  );
};

export default VerifyEmailPage;
