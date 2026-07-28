import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string) => {
  if (typeof import.meta !== 'undefined' && import.meta?.env?.[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key];
  }
  return undefined;
};

const supabaseUrl =
  getEnv('VITE_SUPABASE_URL') ||
  getEnv('SUPABASE_URL') ||
  'https://rqiesyijhccmnajomuez.supabase.co';

const supabaseKey =
  getEnv('VITE_SUPABASE_ANON_KEY') ||
  getEnv('SUPABASE_ANON_KEY') ||
  getEnv('SUPABASE_SERVICE_ROLE_KEY') ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxaWVzeWlqaGNjbW5ham9tdWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwMjIyNDUsImV4cCI6MjEwMDU5ODI0NX0.fUbdZeoUJUse65mh10wWseJ2jdGM48zffRT0MrsLjUA';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
    detectSessionInUrl: typeof window !== 'undefined',
  },
});


