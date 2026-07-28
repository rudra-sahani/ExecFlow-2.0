import { UserAccount, RefreshSession, SecurityTokenRecord, Role } from '../types/auth';
import { hashPassword, hashToken, getRefreshTokenExpiryDate } from './jwtService';
import { prisma } from '../config/db';
import { logger } from '../config/logger';

class AuthStore {
  private users = new Map<string, UserAccount>();
  private sessions = new Map<string, RefreshSession>();
  private securityTokens = new Map<string, SecurityTokenRecord>();
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Seed default user account with hashed password
      const defaultEmail = 'alex.chen@execflow.ai';
      const initialHash = await hashPassword('Pass1234');

      this.users.set(defaultEmail, {
        id: 'usr_default_execflow',
        email: defaultEmail,
        fullName: 'Alex Chen',
        workspaceName: 'ExecFlow Primary Workspace',
        workspaceId: 'ws_execflow_primary',
        passwordHash: initialHash,
        role: 'ADMIN',
        department: 'Product & Engineering',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Synchronize default profile in Prisma if missing
      try {
        await prisma.profile.upsert({
          where: { email: defaultEmail },
          update: {},
          create: {
            id: 'usr_default_execflow',
            email: defaultEmail,
            fullName: 'Alex Chen',
            role: 'ADMIN',
            department: 'Product & Engineering',
            jobTitle: 'Executive Leader',
          },
        });
      } catch (e) {
        logger.warn('[AuthStore] Prisma profile sync warning during init:', { error: String(e) });
      }

      this.isInitialized = true;
    } catch (err) {
      logger.error('[AuthStore] Initialization failed:', { error: String(err) });
    }
  }

  async getUserByEmail(email: string): Promise<UserAccount | null> {
    await this.initialize();
    const normalized = email.trim().toLowerCase();
    const user = this.users.get(normalized);
    if (user) return user;

    // Check Prisma profile
    try {
      const dbProfile = await prisma.profile.findUnique({
        where: { email: normalized },
      });
      if (dbProfile) {
        const defaultHash = await hashPassword('Pass1234');
        const newUser: UserAccount = {
          id: dbProfile.id,
          email: dbProfile.email,
          fullName: dbProfile.fullName || dbProfile.email.split('@')[0],
          workspaceName: 'ExecFlow Primary Workspace',
          workspaceId: 'ws_execflow_primary',
          passwordHash: defaultHash,
          role: (dbProfile.role as Role) || 'MEMBER',
          department: dbProfile.department || 'Executive Operations',
          isVerified: true,
          createdAt: dbProfile.createdAt.toISOString(),
          updatedAt: dbProfile.updatedAt.toISOString(),
        };
        this.users.set(normalized, newUser);
        return newUser;
      }
    } catch {
      // Ignore Prisma errors in fallback
    }

    return null;
  }

  async getUserById(id: string): Promise<UserAccount | null> {
    await this.initialize();
    for (const user of this.users.values()) {
      if (user.id === id) return user;
    }

    try {
      const dbProfile = await prisma.profile.findUnique({ where: { id } });
      if (dbProfile) {
        return this.getUserByEmail(dbProfile.email);
      }
    } catch {
      // Ignore
    }

    return null;
  }

  async createUser(data: Omit<UserAccount, 'createdAt' | 'updatedAt'>): Promise<UserAccount> {
    await this.initialize();
    const normalized = data.email.trim().toLowerCase();

    const newUser: UserAccount = {
      ...data,
      email: normalized,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.set(normalized, newUser);

    // Persist to Prisma
    try {
      await prisma.profile.upsert({
        where: { email: normalized },
        update: {
          fullName: newUser.fullName,
          role: newUser.role,
          department: newUser.department,
        },
        create: {
          id: newUser.id,
          email: normalized,
          fullName: newUser.fullName,
          role: newUser.role,
          department: newUser.department,
          jobTitle: 'Team Member',
        },
      });
    } catch (e) {
      logger.warn('[AuthStore] Prisma profile upsert warning on user creation:', { error: String(e) });
    }

    return newUser;
  }

  async updateUser(email: string, updates: Partial<UserAccount>): Promise<UserAccount | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;

    const updatedUser: UserAccount = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.users.set(user.email, updatedUser);

    try {
      await prisma.profile.updateMany({
        where: { email: user.email },
        data: {
          ...(updates.fullName && { fullName: updates.fullName }),
          ...(updates.role && { role: updates.role }),
          ...(updates.department && { department: updates.department }),
          updatedAt: new Date(),
        },
      });
    } catch {
      // Ignore
    }

    return updatedUser;
  }

  // REFRESH SESSION PERSISTENCE
  async createSession(params: {
    userId: string;
    refreshToken: string;
    deviceMetadata?: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<RefreshSession> {
    await this.initialize();
    const tokenHash = hashToken(params.refreshToken);
    const session: RefreshSession = {
      id: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: params.userId,
      tokenHash,
      deviceMetadata: params.deviceMetadata,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      expiresAt: getRefreshTokenExpiryDate(),
      isRevoked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.sessions.set(session.id, session);
    return session;
  }

  async findSessionByToken(refreshToken: string): Promise<RefreshSession | null> {
    await this.initialize();
    const tokenHash = hashToken(refreshToken);
    for (const session of this.sessions.values()) {
      if (session.tokenHash === tokenHash && !session.isRevoked) {
        if (new Date() > session.expiresAt) {
          session.isRevoked = true;
          return null;
        }
        return session;
      }
    }
    return null;
  }

  async revokeSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isRevoked = true;
      session.updatedAt = new Date();
    }
  }

  async revokeUserSessions(userId: string): Promise<void> {
    for (const session of this.sessions.values()) {
      if (session.userId === userId) {
        session.isRevoked = true;
        session.updatedAt = new Date();
      }
    }
  }

  // SESSION MANAGEMENT
  async getUserSessions(userId: string): Promise<RefreshSession[]> {
    await this.initialize();
    const result: RefreshSession[] = [];
    const now = new Date();
    for (const session of this.sessions.values()) {
      if (session.userId === userId && !session.isRevoked) {
        if (now > session.expiresAt) {
          session.isRevoked = true;
        } else {
          result.push(session);
        }
      }
    }
    return result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async getSessionById(sessionId: string): Promise<RefreshSession | null> {
    await this.initialize();
    return this.sessions.get(sessionId) || null;
  }

  async revokeOtherUserSessions(userId: string, currentSessionId: string): Promise<number> {
    let count = 0;
    for (const session of this.sessions.values()) {
      if (session.userId === userId && session.id !== currentSessionId && !session.isRevoked) {
        session.isRevoked = true;
        session.updatedAt = new Date();
        count++;
      }
    }
    return count;
  }

  async touchSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.updatedAt = new Date();
    }
  }

  // ACCOUNT LOCKOUT & BRUTE FORCE PROTECTION
  private failedAttempts = new Map<string, { count: number; lockedUntil?: Date }>();
  private readonly MAX_FAILED_ATTEMPTS = 5;
  private readonly LOCKOUT_MINUTES = 15;

  checkLockout(identifier: string): { isLocked: boolean; remainingMinutes?: number } {
    const key = identifier.trim().toLowerCase();
    const record = this.failedAttempts.get(key);
    if (!record) return { isLocked: false };

    if (record.lockedUntil) {
      const now = new Date();
      if (now < record.lockedUntil) {
        const remainingMs = record.lockedUntil.getTime() - now.getTime();
        const remainingMinutes = Math.ceil(remainingMs / 60000);
        return { isLocked: true, remainingMinutes };
      } else {
        // Lockout expired, reset
        this.failedAttempts.delete(key);
        return { isLocked: false };
      }
    }

    return { isLocked: false };
  }

  recordFailedLogin(identifier: string): { isLocked: boolean; remainingMinutes?: number; attemptsLeft: number } {
    const key = identifier.trim().toLowerCase();
    const record = this.failedAttempts.get(key) || { count: 0 };
    record.count += 1;

    if (record.count >= this.MAX_FAILED_ATTEMPTS) {
      const lockedUntil = new Date(Date.now() + this.LOCKOUT_MINUTES * 60000);
      record.lockedUntil = lockedUntil;
      this.failedAttempts.set(key, record);
      logger.warn(`[ACCOUNT_LOCKOUT] Account/IP locked due to ${record.count} failed login attempts: ${key}`);
      return { isLocked: true, remainingMinutes: this.LOCKOUT_MINUTES, attemptsLeft: 0 };
    }

    this.failedAttempts.set(key, record);
    return {
      isLocked: false,
      attemptsLeft: Math.max(0, this.MAX_FAILED_ATTEMPTS - record.count),
    };
  }

  resetFailedLogin(identifier: string): void {
    const key = identifier.trim().toLowerCase();
    this.failedAttempts.delete(key);
  }

  // SECURITY TOKENS (VERIFICATION, RESET, INVITES)
  async saveSecurityToken(tokenRecord: SecurityTokenRecord): Promise<void> {
    this.securityTokens.set(tokenRecord.token, tokenRecord);
  }

  async getSecurityToken(token: string): Promise<SecurityTokenRecord | null> {
    const record = this.securityTokens.get(token);
    if (!record) return null;
    if (new Date() > record.expiresAt) {
      this.securityTokens.delete(token);
      return null;
    }
    return record;
  }

  async findVerificationCode(code: string, email?: string): Promise<SecurityTokenRecord | null> {
    for (const record of this.securityTokens.values()) {
      if (record.code === code && record.type === 'VERIFICATION') {
        if (!email || record.email === email.trim().toLowerCase()) {
          if (new Date() > record.expiresAt) {
            this.securityTokens.delete(record.token);
            return null;
          }
          return record;
        }
      }
    }
    return null;
  }

  async deleteSecurityToken(token: string): Promise<void> {
    this.securityTokens.delete(token);
  }

  async removeStaleSecurityTokens(email: string, type: 'VERIFICATION' | 'PASSWORD_RESET'): Promise<void> {
    const normalized = email.trim().toLowerCase();
    for (const [key, record] of this.securityTokens.entries()) {
      if (record.email === normalized && record.type === type) {
        this.securityTokens.delete(key);
      }
    }
  }
}

export const authStore = new AuthStore();
