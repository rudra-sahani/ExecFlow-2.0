import { prisma } from '../config/db';
import { logger } from '../config/logger';

export interface LogActivityParams {
  profileId?: string;
  meetingId?: string;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface LogAuditParams {
  profileId?: string;
  resource: string;
  action: string;
  payload?: any;
}

export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    logger.info(`[ACTIVITY] ${params.action}`, {
      profileId: params.profileId,
      details: params.details,
      ip: params.ipAddress,
    });

    await prisma.activityLog.create({
      data: {
        profileId: params.profileId || null,
        meetingId: params.meetingId || null,
        action: params.action,
        details: params.details || null,
        ipAddress: params.ipAddress || null,
        userAgent: params.userAgent || null,
      },
    });
  } catch (err) {
    logger.warn('[AuditService] Failed to persist activity log to Prisma:', { error: String(err) });
  }
}

export async function logAudit(params: LogAuditParams): Promise<void> {
  try {
    const payloadStr = params.payload
      ? typeof params.payload === 'string'
        ? params.payload
        : JSON.stringify(params.payload)
      : null;

    logger.info(`[AUDIT] ${params.resource}:${params.action}`, {
      profileId: params.profileId,
    });

    await prisma.auditLog.create({
      data: {
        profileId: params.profileId || null,
        resource: params.resource,
        action: params.action,
        payload: payloadStr,
      },
    });
  } catch (err) {
    logger.warn('[AuditService] Failed to persist audit log to Prisma:', { error: String(err) });
  }
}
