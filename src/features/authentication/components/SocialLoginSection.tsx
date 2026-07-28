import React from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../../config/supabase';
import { SocialProvider } from '../types';

interface SocialLoginSectionProps {
  onSelectProvider?: (provider: SocialProvider) => void;
  isLoading?: boolean;
}

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onSelectProvider,
  isLoading = false,
}) => {
  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (onSelectProvider) {
        onSelectProvider('google');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to initiate Google Single Sign-On');
    }
  };

  return (
    <div className="space-y-4 my-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0F1110] px-3 text-zinc-500 font-sans text-[11px] font-medium tracking-wider">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        {/* Google */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center h-12 px-4 border border-zinc-800 rounded-xl bg-[#151817] hover:bg-[#1C201E] text-zinc-200 text-xs sm:text-sm font-medium font-sans transition-all disabled:opacity-50 cursor-pointer shadow-xs"
        >
          <svg className="w-4 h-4 mr-2.5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
