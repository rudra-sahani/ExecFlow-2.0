import { prisma } from '../config/db';
import { Approval } from '@prisma/client';

export interface CreateApprovalDTO {
  approverId: string;
  title: string;
  description: string;
  meetingId?: string;
  taskId?: string;
  status?: string;
  payload?: Record<string, unknown>;
}

export interface DecideApprovalDTO {
  status: 'APPROVED' | 'REJECTED';
  decidedByUserId?: string;
  approverNotes?: string;
  rejectionReason?: string;
  modifiedParameters?: Record<string, unknown>;
}

export class ApprovalRepository {
  async findById(id: string): Promise<Approval | null> {
    return prisma.approval.findUnique({
      where: { id },
      include: {
        approver: true,
        meeting: true,
        task: true,
      },
    });
  }

  async list(status?: string, approverId?: string): Promise<Approval[]> {
    return prisma.approval.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(approverId ? { approverId } : {}),
      },
      include: {
        approver: true,
        meeting: true,
        task: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateApprovalDTO): Promise<Approval> {
    return prisma.approval.create({
      data: {
        approverId: data.approverId,
        title: data.title,
        description: data.description,
        meetingId: data.meetingId,
        taskId: data.taskId,
        status: data.status || 'PENDING',
        payload: data.payload ? JSON.stringify(data.payload) : null,
      },
    });
  }

  async decide(id: string, decision: DecideApprovalDTO): Promise<Approval> {
    const approval = await prisma.approval.findUnique({ where: { id } });
    if (!approval) {
      throw new Error(`Approval with id ${id} not found`);
    }

    let existingPayload: Record<string, unknown> = {};
    if (approval.payload) {
      try {
        existingPayload = JSON.parse(approval.payload);
      } catch {
        existingPayload = {};
      }
    }

    const updatedPayload = {
      ...existingPayload,
      ...(decision.approverNotes && { approverNotes: decision.approverNotes }),
      ...(decision.rejectionReason && { rejectionReason: decision.rejectionReason }),
      ...(decision.modifiedParameters && { modifiedParameters: decision.modifiedParameters }),
      ...(decision.decidedByUserId && { decidedByUserId: decision.decidedByUserId }),
    };

    return prisma.approval.update({
      where: { id },
      data: {
        status: decision.status,
        decidedAt: new Date(),
        payload: JSON.stringify(updatedPayload),
      },
    });
  }

  async delete(id: string): Promise<Approval> {
    return prisma.approval.delete({
      where: { id },
    });
  }
}

export const approvalRepository = new ApprovalRepository();
