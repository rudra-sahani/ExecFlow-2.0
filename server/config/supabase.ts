import { createClient } from '@supabase/supabase-js';
import { env } from './env';

const supabaseUrl = env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

if (isSupabaseConfigured) {
  console.log('[Supabase] Initialized server-side client with URL:', supabaseUrl);
} else {
  console.log('[Supabase] Credentials not detected in environment variables. Operating in dynamic store mode.');
}
