import { User, AuthTokens, LoginRequest, RegisterRequest } from '../../../types/auth';

export type SocialProvider = 'google';

export interface ExtendedLoginRequest extends LoginRequest {
  rememberMe?: boolean;
}

export interface ExtendedRegisterRequest extends RegisterRequest {
  confirmPassword?: string;
  termsAccepted?: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword?: string;
}

export interface VerifyEmailRequest {
  token?: string;
  code?: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  color: string;
  percentage: number;
  checks: {
    length: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}
