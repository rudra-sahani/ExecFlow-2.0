import { prisma } from '../config/db';
import { ActivityLog, AuditLog } from '@prisma/client';

export interface RecordActivityDTO {
  profileId?: string;
  meetingId?: string;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface RecordAuditDTO {
  profileId?: string;
  resource: string;
  action: string;
  payload?: Record<string, unknown>;
}

export class AgentRepository {
  async recordActivity(data: RecordActivityDTO): Promise<ActivityLog> {
    return prisma.activityLog.create({
      data: {
        profileId: data.profileId,
        meetingId: data.meetingId,
        action: data.action,
        details: data.details,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }

  async recordAudit(data: RecordAuditDTO): Promise<AuditLog> {
    return prisma.auditLog.create({
      data: {
        profileId: data.profileId,
        resource: data.resource,
        action: data.action,
        payload: data.payload ? JSON.stringify(data.payload) : null,
      },
    });
  }

  async listActivities(meetingId?: string, profileId?: string): Promise<ActivityLog[]> {
    return prisma.activityLog.findMany({
      where: {
        ...(meetingId ? { meetingId } : {}),
        ...(profileId ? { profileId } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}

export const agentRepository = new AgentRepository();
