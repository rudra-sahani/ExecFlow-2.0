import crypto from 'crypto';
import { authStore } from './authStore';
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './jwtService';
import { logActivity, logAudit } from './auditService';
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendLoginAlertEmail,
} from './emailService';
import { AuthResponseData, Role, SecurityTokenRecord } from '../types/auth';
import { logger } from '../config/logger';

// Strict disposable email validator
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'yopmail.com',
  'guerrillamail.com', 'dispostable.com', 'trashmail.com', 'sharklasers.com',
  'getnada.com', 'throwawaymail.com', 'fakeinbox.com', 'temp-mail.org',
  'generator.email', 'inboxkitten.com', 'example.com', 'test.com', 'fake.com',
  'asdf.com', 'qwerty.com', 'foo.com', 'bar.com', 'temp.com', 'disposable.com',
  'maildrop.cc', '007.cx', '10minutemail.net', 'byom.de', 'dropmail.me',
]);

export function validateWorkEmail(email: string): { isValid: boolean; message?: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email address is required.' };
  }
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, message: 'Invalid email address format.' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) return { isValid: false, message: 'Invalid email address format.' };
  const [localPart, domainPart] = parts;

  if (localPart.length < 2) {
    return { isValid: false, message: 'Email username must be at least 2 characters.' };
  }

  if (DISPOSABLE_EMAIL_DOMAINS.has(domainPart)) {
    return { isValid: false, message: 'Disposable or temporary email addresses are strictly prohibited.' };
  }

  return { isValid: true };
}

export class AuthService {
  async login(params: {
    email: string;
    password?: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<{ success: boolean; data?: AuthResponseData; message?: string; requiresVerification?: boolean; status?: number }> {
    const emailValidation = validateWorkEmail(params.email);
    if (!emailValidation.isValid) {
      return { success: false, message: emailValidation.message, status: 400 };
    }

    const normalizedEmail = params.email.trim().toLowerCase();

    // Check account lockout status
    const lockoutStatus = authStore.checkLockout(normalizedEmail);
    if (lockoutStatus.isLocked) {
      await logActivity({
        action: 'LOGIN_BLOCKED_LOCKOUT',
        details: `Login blocked due to active account lockout for ${normalizedEmail}`,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      });
      return {
        success: false,
        message: `Account temporarily locked due to too many failed login attempts. Please try again in ${lockoutStatus.remainingMinutes} minutes.`,
        status: 429,
      };
    }

    const user = await authStore.getUserByEmail(normalizedEmail);

    if (!user) {
      authStore.recordFailedLogin(normalizedEmail);
      await logActivity({
        action: 'LOGIN_FAILED',
        details: `Account not found for email: ${normalizedEmail}`,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      });
      return {
        success: false,
        message: 'Account not found. Please register first with a valid work email address.',
        status: 401,
      };
    }

    // Verify password with bcryptjs
    if (params.password) {
      const isPasswordValid = await comparePassword(params.password, user.passwordHash);
      if (!isPasswordValid) {
        const lockoutResult = authStore.recordFailedLogin(normalizedEmail);
        await logActivity({
          profileId: user.id,
          action: 'LOGIN_FAILED',
          details: `Invalid password provided. ${lockoutResult.attemptsLeft} attempts remaining.`,
          ipAddress: params.ipAddress,
          userAgent: params.userAgent,
        });

        if (lockoutResult.isLocked) {
          await logAudit({
            profileId: user.id,
            resource: 'AUTH',
            action: 'ACCOUNT_LOCKED',
            payload: { email: user.email, ip: params.ipAddress },
          });
          return {
            success: false,
            message: `Account locked after 5 failed login attempts. Please try again in ${lockoutResult.remainingMinutes} minutes.`,
            status: 429,
          };
        }

        return {
          success: false,
          message: `Invalid password. Authentication failed. ${lockoutResult.attemptsLeft} attempt(s) remaining before lockout.`,
          status: 401,
        };
      }
    }

    // Reset failed login attempts on success
    authStore.resetFailedLogin(normalizedEmail);

    // Require email verification
    if (!user.isVerified) {
      return {
        success: false,
        requiresVerification: true,
        message: 'Your email address is not verified. Please verify your email before logging in.',
        status: 403,
      };
    }

    // Issue JWTs
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      workspaceId: user.workspaceId || 'ws_execflow_primary',
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      workspaceId: user.workspaceId || 'ws_execflow_primary',
    });

    // Create persistent session
    await authStore.createSession({
      userId: user.id,
      refreshToken,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    });

    // Audit and Activity logs
    await logActivity({
      profileId: user.id,
      action: 'LOGIN_SUCCESS',
      details: 'User authenticated successfully via email and password',
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    });

    await logAudit({
      profileId: user.id,
      resource: 'AUTH',
      action: 'LOGIN',
      payload: { email: user.email, ip: params.ipAddress },
    });

    // Dispatch login alert email in background
    sendLoginAlertEmail({
      email: user.email,
      fullName: user.fullName,
      browser: params.userAgent ? params.userAgent.slice(0, 60) : 'Web Browser',
      ip: params.ipAddress || '127.0.0.1',
      time: new Date().toUTCString(),
    }).catch((err) => logger.warn('[Login Alert Error]:', { error: String(err) }));

    return {
      success: true,
      message: 'Login authenticated and verified successfully.',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          workspaceId: user.workspaceId || 'ws_execflow_primary',
          department: user.department,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 3600,
          tokenType: 'Bearer',
        },
      },
    };
  }

  async register(params: {
    email: string;
    password: string;
    fullName: string;
    workspaceName?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    const emailValidation = validateWorkEmail(params.email);
    if (!emailValidation.isValid) {
      return { success: false, message: emailValidation.message, status: 400 };
    }

    const normalizedEmail = params.email.trim().toLowerCase();
    const existingUser = await authStore.getUserByEmail(normalizedEmail);

    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email address already exists. Please sign in instead.',
        status: 400,
      };
    }

    // Hash password using bcryptjs (salt factor 10)
    const passwordHash = await hashPassword(params.password);
    const userId = `usr_${Date.now()}`;

    const newUser = await authStore.createUser({
      id: userId,
      email: normalizedEmail,
      fullName: params.fullName || normalizedEmail.split('@')[0],
      workspaceName: params.workspaceName || 'My Workspace',
      workspaceId: 'ws_execflow_primary',
      passwordHash,
      role: 'MEMBER',
      department: 'Executive Operations',
      isVerified: false,
    });

    // Generate security token & verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 3600 * 1000); // 24 Hours

    const tokenRecord: SecurityTokenRecord = {
      id: `tok_${Date.now()}`,
      token,
      code,
      userId: newUser.id,
      email: normalizedEmail,
      type: 'VERIFICATION',
      expiresAt,
      createdAt: new Date(),
    };

    await authStore.saveSecurityToken(tokenRecord);

    await logActivity({
      profileId: newUser.id,
      action: 'USER_REGISTERED',
      details: 'New user registered account. Verification code dispatched.',
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    });

    await logAudit({
      profileId: newUser.id,
      resource: 'USER',
      action: 'REGISTER',
      payload: { email: newUser.email },
    });

    // Dispatch verification email
    const emailResult = await sendVerificationEmail({
      email: normalizedEmail,
      fullName: newUser.fullName,
      token,
      code,
    });

    return {
      success: true,
      status: 201,
      message: 'Registration successful! A verification email with a 6-digit code has been sent to your inbox.',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          isVerified: false,
        },
        requiresVerification: true,
        emailSent: emailResult.success,
      },
    };
  }

  async verifyEmail(params: {
    token?: string;
    code?: string;
    email?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    let tokenRecord: SecurityTokenRecord | null = null;

    if (params.token) {
      tokenRecord = await authStore.getSecurityToken(params.token);
    } else if (params.code) {
      tokenRecord = await authStore.findVerificationCode(params.code, params.email);
    }

    if (!tokenRecord || tokenRecord.type !== 'VERIFICATION') {
      return { success: false, message: 'Invalid verification token or code.', status: 400 };
    }

    const user = await authStore.getUserByEmail(tokenRecord.email);
    if (!user) {
      return { success: false, message: 'User account not found.', status: 404 };
    }

    await authStore.updateUser(user.email, { isVerified: true });
    await authStore.deleteSecurityToken(tokenRecord.token);

    // Issue tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      workspaceId: user.workspaceId || 'ws_execflow_primary',
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      workspaceId: user.workspaceId || 'ws_execflow_primary',
    });

    await authStore.createSession({
      userId: user.id,
      refreshToken,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    });

    await logActivity({
      profileId: user.id,
      action: 'EMAIL_VERIFIED',
      details: 'User email verified successfully',
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    });

    await logAudit({
      profileId: user.id,
      resource: 'AUTH',
      action: 'EMAIL_VERIFICATION',
      payload: { email: user.email },
    });

    sendWelcomeEmail({
      email: user.email,
      fullName: user.fullName,
      workspaceName: user.workspaceName || 'ExecFlow Primary',
    }).catch((err) => logger.warn('[Welcome Email Error]:', { error: String(err) }));

    return {
      success: true,
      message: 'Email verified successfully! Welcome to ExecFlow AI.',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          workspaceId: user.workspaceId || 'ws_execflow_primary',
          isVerified: true,
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 3600,
          tokenType: 'Bearer',
        },
      },
    };
  }

  async resendVerification(email: string) {
    const emailValidation = validateWorkEmail(email);
    if (!emailValidation.isValid) {
      return { success: false, message: emailValidation.message, status: 400 };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await authStore.getUserByEmail(normalizedEmail);

    if (!user) {
      return { success: false, message: 'No account found with this email address.', status: 404 };
    }

    if (user.isVerified) {
      return { success: false, message: 'This email address is already verified.', status: 400 };
    }

    await authStore.removeStaleSecurityTokens(normalizedEmail, 'VERIFICATION');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 3600 * 1000);

    await authStore.saveSecurityToken({
      id: `tok_${Date.now()}`,
      token,
      code,
      userId: user.id,
      email: normalizedEmail,
      type: 'VERIFICATION',
      expiresAt,
      createdAt: new Date(),
    });

    const emailResult = await sendVerificationEmail({
      email: normalizedEmail,
      fullName: user.fullName,
      token,
      code,
    });

    return {
      success: true,
      message: 'A new verification email has been dispatched to your inbox.',
      emailSent: emailResult.success,
    };
  }

  async forgotPassword(email: string) {
    const emailValidation = validateWorkEmail(email);
    if (!emailValidation.isValid) {
      return { success: false, message: emailValidation.message, status: 400 };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await authStore.getUserByEmail(normalizedEmail);

    if (user) {
      await authStore.removeStaleSecurityTokens(normalizedEmail, 'PASSWORD_RESET');

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 Hour

      await authStore.saveSecurityToken({
        id: `tok_${Date.now()}`,
        token,
        userId: user.id,
        email: normalizedEmail,
        type: 'PASSWORD_RESET',
        expiresAt,
        createdAt: new Date(),
      });

      await logActivity({
        profileId: user.id,
        action: 'PASSWORD_RESET_REQUESTED',
        details: 'Password reset link dispatched',
      });

      await logAudit({
        profileId: user.id,
        resource: 'AUTH',
        action: 'FORGOT_PASSWORD_REQUEST',
        payload: { email: user.email },
      });

      await sendPasswordResetEmail({
        email: normalizedEmail,
        fullName: user.fullName,
        token,
      });
    }

    return {
      success: true,
      message: 'If an account exists with that email address, password reset instructions have been sent.',
    };
  }

  async resetPassword(params: { token: string; newPassword: string }) {
    if (!params.token) {
      return { success: false, message: 'Password reset token is required.', status: 400 };
    }

    if (!params.newPassword || params.newPassword.length < 8) {
      return { success: false, message: 'New password must be at least 8 characters long.', status: 400 };
    }

    const tokenRecord = await authStore.getSecurityToken(params.token);
    if (!tokenRecord || tokenRecord.type !== 'PASSWORD_RESET') {
      return { success: false, message: 'Invalid or expired password reset token.', status: 400 };
    }

    const user = await authStore.getUserByEmail(tokenRecord.email);
    if (!user) {
      return { success: false, message: 'User account not found.', status: 404 };
    }

    const newHash = await hashPassword(params.newPassword);
    await authStore.updateUser(user.email, { passwordHash: newHash });
    await authStore.deleteSecurityToken(params.token);

    // Invalidate old active refresh sessions
    await authStore.revokeUserSessions(user.id);

    await logActivity({
      profileId: user.id,
      action: 'PASSWORD_RESET_COMPLETED',
      details: 'User password reset completed and previous sessions invalidated',
    });

    await logAudit({
      profileId: user.id,
      resource: 'AUTH',
      action: 'PASSWORD_RESET',
      payload: { email: user.email },
    });

    return {
      success: true,
      message: 'Password reset successfully. You may now log in with your new password.',
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      return { success: false, message: 'Refresh token is required.', status: 400 };
    }

    const verifiedPayload = verifyRefreshToken(refreshToken);
    if (!verifiedPayload) {
      return { success: false, message: 'Invalid or expired refresh token.', status: 401 };
    }

    const activeSession = await authStore.findSessionByToken(refreshToken);
    if (!activeSession) {
      return { success: false, message: 'Refresh session has been revoked or expired.', status: 401 };
    }

    const user = await authStore.getUserById(verifiedPayload.sub);
    if (!user) {
      return { success: false, message: 'User account no longer exists.', status: 401 };
    }

    // ROTATION: Revoke old session and issue new access & refresh tokens
    await authStore.revokeSession(activeSession.id);

    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      workspaceId: user.workspaceId || 'ws_execflow_primary',
    });

    const newRefreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      workspaceId: user.workspaceId || 'ws_execflow_primary',
    });

    await authStore.createSession({
      userId: user.id,
      refreshToken: newRefreshToken,
      ipAddress: activeSession.ipAddress,
      userAgent: activeSession.userAgent,
    });

    await logActivity({
      profileId: user.id,
      action: 'TOKEN_REFRESHED',
      details: 'Refresh token session rotated successfully',
    });

    return {
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: 3600,
        tokenType: 'Bearer',
      },
    };
  }

  async logout(refreshToken?: string, userId?: string) {
    if (refreshToken) {
      const session = await authStore.findSessionByToken(refreshToken);
      if (session) {
        await authStore.revokeSession(session.id);
      }
    }

    if (userId) {
      await authStore.revokeUserSessions(userId);
      await logActivity({
        profileId: userId,
        action: 'LOGOUT',
        details: 'User logged out and session invalidated',
      });

      await logAudit({
        profileId: userId,
        resource: 'AUTH',
        action: 'LOGOUT',
      });
    }

    return { success: true, message: 'Logged out successfully.' };
  }

  async getUserSessions(userId: string) {
    const sessions = await authStore.getUserSessions(userId);
    return {
      success: true,
      data: sessions.map((s) => ({
        id: s.id,
        userId: s.userId,
        ipAddress: s.ipAddress || '127.0.0.1',
        userAgent: s.userAgent || 'Web Browser',
        deviceMetadata: s.deviceMetadata || 'Desktop Browser',
        createdAt: s.createdAt.toISOString(),
        lastActivity: s.updatedAt.toISOString(),
        expiresAt: s.expiresAt.toISOString(),
        isRevoked: s.isRevoked,
      })),
    };
  }

  async revokeSession(userId: string, sessionId: string) {
    const session = await authStore.getSessionById(sessionId);
    if (!session || session.userId !== userId) {
      return { success: false, message: 'Session not found or permission denied.', status: 404 };
    }

    await authStore.revokeSession(sessionId);

    await logActivity({
      profileId: userId,
      action: 'SESSION_REVOKED',
      details: `Session ${sessionId} manually revoked by user`,
    });

    await logAudit({
      profileId: userId,
      resource: 'SESSION',
      action: 'REVOKE',
      payload: { sessionId },
    });

    return { success: true, message: 'Session revoked successfully.' };
  }

  async revokeOtherSessions(userId: string, currentRefreshToken?: string) {
    let currentSessionId = '';
    if (currentRefreshToken) {
      const activeSession = await authStore.findSessionByToken(currentRefreshToken);
      if (activeSession) {
        currentSessionId = activeSession.id;
      }
    }

    const count = await authStore.revokeOtherUserSessions(userId, currentSessionId);

    await logActivity({
      profileId: userId,
      action: 'OTHER_SESSIONS_REVOKED',
      details: `Revoked ${count} other active session(s)`,
    });

    await logAudit({
      profileId: userId,
      resource: 'SESSION',
      action: 'REVOKE_ALL_OTHER',
      payload: { revokedCount: count },
    });

    return { success: true, message: `Successfully revoked ${count} other active session(s).` };
  }
}

export const authService = new AuthService();
