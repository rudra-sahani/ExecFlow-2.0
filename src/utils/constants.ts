/**
 * Global Constants & Configuration Flags
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'ExecFlow';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'execflow_access_token',
  REFRESH_TOKEN: 'execflow_refresh_token',
  USER_DATA: 'execflow_user_data',
  THEME: 'execflow_theme',
  SIDEBAR_COLLAPSED: 'execflow_sidebar_collapsed',
  USER_PREFERENCES: 'execflow_user_preferences',
} as const;

export const DEFAULT_PAGE_SIZE = 15;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCEPT_INVITE: '/accept-invite',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  AUTH_CALLBACK: '/auth/callback',
  DASHBOARD: '/dashboard',
  MEETINGS: '/meetings',
  MEETING_DETAIL: '/meetings/:id',
  TASKS: '/tasks',
  ANALYTICS: '/analytics',
  MEMORY: '/memory',
  APPROVAL: '/approval',
  AGENT_MONITOR: '/agent-monitor',
  AUTOMATION: '/automation',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;
