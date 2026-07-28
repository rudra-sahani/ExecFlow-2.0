import { prisma } from '../config/db';
import { AutomationWorkflow, WorkflowRun } from '@prisma/client';

export interface CreateWorkflowDTO {
  workspaceId: string;
  name: string;
  description?: string;
  triggerType: string;
  nodesJson: string;
  edgesJson: string;
  isActive?: boolean;
}

export class AutomationRepository {
  async findById(id: string): Promise<AutomationWorkflow | null> {
    return prisma.automationWorkflow.findUnique({
      where: { id },
      include: {
        runs: {
          orderBy: { startedAt: 'desc' },
          take: 20,
        },
      },
    });
  }

  async listByWorkspace(workspaceId: string): Promise<AutomationWorkflow[]> {
    return prisma.automationWorkflow.findMany({
      where: { workspaceId },
      include: {
        runs: {
          orderBy: { startedAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateWorkflowDTO): Promise<AutomationWorkflow> {
    return prisma.automationWorkflow.create({
      data: {
        workspaceId: data.workspaceId,
        name: data.name,
        description: data.description,
        triggerType: data.triggerType,
        nodesJson: data.nodesJson,
        edgesJson: data.edgesJson,
        isActive: data.isActive ?? true,
      },
    });
  }

  async update(id: string, data: Partial<CreateWorkflowDTO>): Promise<AutomationWorkflow> {
    return prisma.automationWorkflow.update({
      where: { id },
      data,
    });
  }

  async recordRun(workflowId: string, status: string, logs?: string): Promise<WorkflowRun> {
    return prisma.workflowRun.create({
      data: {
        workflowId,
        status,
        logs,
        startedAt: new Date(),
        finishedAt: status === 'RUNNING' ? null : new Date(),
      },
    });
  }

  async delete(id: string): Promise<AutomationWorkflow> {
    return prisma.automationWorkflow.delete({
      where: { id },
    });
  }
}

export const automationRepository = new AutomationRepository();
