import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabase';
import { useAuthStore } from '../../../store/useAuthStore';
import { ROUTES } from '../../../utils/constants';
import { formatAuthError } from '../utils';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          throw new Error(sessionError?.message || 'Failed to retrieve authenticated session from Google OAuth');
        }

        const user = session.user;
        const email = user.email;
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || email?.split('@')[0];
        const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

        // Sync user profile to backend PostgreSQL database via Prisma
        const syncResponse = await axios.post('/api/v1/auth/google/sync', {
          email,
          fullName,
          avatarUrl,
        });

        if (!syncResponse.data?.success) {
          throw new Error(syncResponse.data?.message || 'Failed to synchronize user profile');
        }

        const profile = syncResponse.data.data.user;
        const tokens = syncResponse.data.data.tokens || {
          accessToken: session.access_token,
          refreshToken: session.refresh_token || '',
          expiresIn: session.expires_in || 3600,
          tokenType: 'Bearer',
        };

        setAuth(
          {
            id: profile.id,
            email: profile.email,
            fullName: profile.fullName || fullName,
            avatarUrl: profile.avatarUrl || avatarUrl,
            role: (profile.role?.toLowerCase() as any) || 'member',
            workspaceId: profile.workspaceId || 'ws_default',
            createdAt: profile.createdAt || new Date().toISOString(),
            updatedAt: profile.updatedAt || new Date().toISOString(),
            preferences: {
              theme: 'dark',
              emailNotifications: true,
              pushNotifications: true,
              autoSummarizeMeetings: true,
              defaultMeetingView: 'list',
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
            },
          },
          tokens
        );

        toast.success('Signed in with Google successfully!');
        navigate(ROUTES.DASHBOARD, { replace: true });
      } catch (err: any) {
        const errorMessage = formatAuthError(err);
        console.error('Google OAuth Callback Error:', err);
        setError(errorMessage);
        toast.error(errorMessage);
        setTimeout(() => {
          navigate(ROUTES.LOGIN, { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate, setAuth]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 p-6">
      {error ? (
        <div className="text-center">
          <p className="text-red-400 font-medium text-lg mb-2">Authentication Failed</p>
          <p className="text-zinc-400 text-sm">{error}</p>
          <p className="text-zinc-500 text-xs mt-4">Redirecting to login...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-300 font-medium text-sm">Completing Google Sign In...</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallbackPage;
