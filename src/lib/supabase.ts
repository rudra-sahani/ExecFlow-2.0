import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variable resolution for browser and server contexts
const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
  '';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
  '';

const supabaseServiceKey =
  (typeof process !== 'undefined' && process.env?.SUPABASE_SERVICE_ROLE_KEY) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_SERVICE_ROLE_KEY) ||
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const isSupabaseAdminConfigured = Boolean(supabaseUrl && supabaseServiceKey);

/**
 * Public Supabase Client
 * Used for standard client-side queries, auth operations, and public RLS access.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Admin Service Role Supabase Client
 * Used for backend administrative operations bypassing Row Level Security (RLS).
 * MUST only be used in secure environments or controlled API handlers.
 */
export const supabaseAdmin: SupabaseClient | null = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : supabase; // Fallback to public client if admin key is not separately specified

export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase client is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'
    );
  }
  return supabase;
}

export function getSupabaseAdminClient(): SupabaseClient {
  if (!supabaseAdmin) {
    throw new Error(
      'Supabase admin client is not configured. Please set SUPABASE_SERVICE_ROLE_KEY in your environment variables.'
    );
  }
  return supabaseAdmin;
}
