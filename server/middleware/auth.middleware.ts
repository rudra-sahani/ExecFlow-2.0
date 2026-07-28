import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/jwtService';
import { authStore } from '../services/authStore';
import { JwtPayload } from '../types/auth';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        fullName: string;
        avatarUrl?: string;
        role: string;
        workspaceId: string;
        department?: string;
        preferences?: any;
      };
      tokenPayload?: JwtPayload;
      requestId?: string;
    }
  }
}

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token && req.headers['x-access-token']) {
      token = req.headers['x-access-token'] as string;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Missing Bearer authorization token.',
        code: 'UNAUTHORIZED',
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.requestId || `req_${Date.now()}`,
        },
      });
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return res.status(401).json({
        success: false,
        message: 'Invalid, expired, or revoked access token.',
        code: 'INVALID_TOKEN',
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.requestId || `req_${Date.now()}`,
        },
      });
    }

    const account = await authStore.getUserById(payload.sub);
    if (!account) {
      return res.status(401).json({
        success: false,
        message: 'User account associated with token no longer exists.',
        code: 'USER_NOT_FOUND',
      });
    }

    req.tokenPayload = payload;
    req.user = {
      id: account.id,
      email: account.email,
      fullName: account.fullName,
      role: account.role,
      workspaceId: account.workspaceId || payload.workspaceId || 'ws_execflow_primary',
      department: account.department,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.',
      code: 'AUTH_FAILED',
    });
  }
}

export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (token) {
      const payload = verifyAccessToken(token);
      if (payload) {
        const account = await authStore.getUserById(payload.sub);
        if (account) {
          req.tokenPayload = payload;
          req.user = {
            id: account.id,
            email: account.email,
            fullName: account.fullName,
            role: account.role,
            workspaceId: account.workspaceId || payload.workspaceId || 'ws_execflow_primary',
            department: account.department,
          };
        }
      }
    }
  } catch {
    // Ignore error for optional auth
  }
  next();
}
