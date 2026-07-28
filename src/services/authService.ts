import { apiClient } from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User, UserPreferences } from '../types/auth';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse, LoginRequest>('/auth/login', credentials);
  },

  async register(data: RegisterRequest): Promise<AuthResponse & { requiresVerification?: boolean; emailSent?: boolean }> {
    return apiClient.post<AuthResponse & { requiresVerification?: boolean; emailSent?: boolean }, RegisterRequest>('/auth/register', data);
  },

  async verifyEmail(payload: { token?: string; code?: string; email?: string }): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/verify-email', payload);
  },

  async resendVerification(email: string): Promise<{ emailSent: boolean }> {
    return apiClient.post<{ emailSent: boolean }>('/auth/resend-verification', { email });
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  },

  async resetPassword(payload: { token: string; password?: string; newPassword?: string }): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/reset-password', payload);
  },

  async sendInvite(email: string, role?: string): Promise<{ emailSent: boolean; inviteToken: string }> {
    return apiClient.post<{ emailSent: boolean; inviteToken: string }>('/workspace/invite', { email, role });
  },

  async testEmail(type: string, to?: string): Promise<any> {
    return apiClient.post<any>('/email/test', { type, to });
  },

  async logout(): Promise<void> {
    return apiClient.post<void>('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  async updateProfile(profileData: Partial<User>): Promise<User> {
    return apiClient.patch<User, Partial<User>>('/auth/profile', profileData);
  },

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    return apiClient.patch<UserPreferences, Partial<UserPreferences>>('/auth/preferences', preferences);
  },
};
