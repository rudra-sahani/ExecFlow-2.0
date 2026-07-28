export type Role = 'OWNER' | 'ADMIN' | 'MANAGER' | 'MEMBER' | 'GUEST';

export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: Role;
  workspaceId: string;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  workspaceName?: string;
  workspaceId?: string;
  passwordHash: string;
  role: Role;
  department?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshSession {
  id: string;
  userId: string;
  tokenHash: string;
  deviceMetadata?: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
  isRevoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityTokenRecord {
  id: string;
  token: string;
  code?: string;
  userId: string;
  email: string;
  type: 'VERIFICATION' | 'PASSWORD_RESET' | 'INVITATION';
  expiresAt: Date;
  createdAt: Date;
}

export interface AuthResponseData {
  user: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    role: Role;
    workspaceId: string;
    department?: string;
    preferences?: any;
    isVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
}
