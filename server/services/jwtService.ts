import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { env } from '../config/env';
import { JwtPayload, Role } from '../types/auth';

const BCRYPT_SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  // Graceful handling if legacy plaintext passwords existed during migration
  if (!hash.startsWith('$2a$') && !hash.startsWith('$2b$') && !hash.startsWith('$2y$')) {
    return password === hash;
  }
  return bcrypt.compare(password, hash);
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateAccessToken(payload: {
  userId: string;
  email: string;
  role: Role;
  workspaceId: string;
}): string {
  const jwtPayload: JwtPayload = {
    sub: payload.userId,
    email: payload.email,
    role: payload.role,
    workspaceId: payload.workspaceId,
    type: 'access',
  };

  return jwt.sign(jwtPayload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });
}

export function generateRefreshToken(payload: {
  userId: string;
  email: string;
  role: Role;
  workspaceId: string;
}): string {
  const jwtPayload: JwtPayload = {
    sub: payload.userId,
    email: payload.email,
    role: payload.role,
    workspaceId: payload.workspaceId,
    type: 'refresh',
  };

  return jwt.sign(jwtPayload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    }) as JwtPayload;

    if (decoded.type !== 'access') {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    }) as JwtPayload;

    if (decoded.type !== 'refresh') {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function getRefreshTokenExpiryDate(): Date {
  // Parse expiration, default to 7 days
  const now = new Date();
  now.setDate(now.getDate() + 7);
  return now;
}
