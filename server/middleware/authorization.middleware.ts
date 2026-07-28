import { Request, Response, NextFunction } from 'express';
import { Role } from '../types/auth';

const ROLE_HIERARCHY: Record<string, number> = {
  OWNER: 100,
  ADMIN: 80,
  MANAGER: 60,
  MEMBER: 40,
  GUEST: 20,
};

export function requireRole(allowedRoles: Role | Role[]) {
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required prior to authorization check.',
        code: 'UNAUTHORIZED',
      });
    }

    const userRole = (req.user.role || 'MEMBER').toUpperCase();

    // Direct match or hierarchy match
    const hasPermission = rolesArray.some((requiredRole) => {
      const requiredRoleUpper = requiredRole.toUpperCase();
      if (userRole === requiredRoleUpper) return true;
      const userLevel = ROLE_HIERARCHY[userRole] || 0;
      const requiredLevel = ROLE_HIERARCHY[requiredRoleUpper] || 0;
      return userLevel >= requiredLevel;
    });

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Insufficient permissions. Action requires one of roles: [${rolesArray.join(', ')}].`,
        code: 'FORBIDDEN',
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.requestId || `req_${Date.now()}`,
        },
      });
    }

    next();
  };
}

export function requireWorkspaceAccess(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const requestedWorkspace = (req.query.workspaceId || req.body.workspaceId || req.params.workspaceId) as string;
  if (requestedWorkspace && req.user.role !== 'ADMIN' && req.user.role !== 'OWNER') {
    if (requestedWorkspace !== req.user.workspaceId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have permission to access requested workspace.',
        code: 'WORKSPACE_ACCESS_DENIED',
      });
    }
  }

  next();
}
