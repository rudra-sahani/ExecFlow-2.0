import { prisma } from '../config/db';
import { Task } from '@prisma/client';

export interface CreateTaskDTO {
  workspaceId: string;
  createdById: string;
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  dueDate?: Date;
  meetingId?: string;
  assigneeProfileIds?: string[];
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  dueDate?: Date;
  assigneeProfileIds?: string[];
}

export class TaskRepository {
  async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({
      where: { id },
      include: {
        createdBy: true,
        meeting: true,
        assignments: {
          include: {
            profile: true,
          },
        },
        approvals: true,
      },
    });
  }

  async listByWorkspace(workspaceId: string, status?: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        workspaceId,
        ...(status ? { status } : {}),
      },
      include: {
        createdBy: true,
        assignments: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateTaskDTO): Promise<Task> {
    return prisma.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: {
          workspaceId: data.workspaceId,
          createdById: data.createdById,
          title: data.title,
          description: data.description,
          priority: data.priority || 'MEDIUM',
          status: data.status || 'TODO',
          dueDate: data.dueDate,
          meetingId: data.meetingId,
        },
      });

      if (data.assigneeProfileIds && data.assigneeProfileIds.length > 0) {
        await tx.taskAssignment.createMany({
          data: data.assigneeProfileIds.map((profileId) => ({
            taskId: task.id,
            profileId,
          })),
        });
      }

      return task;
    });
  }

  async update(id: string, data: UpdateTaskDTO): Promise<Task> {
    return prisma.$transaction(async (tx) => {
      const task = await tx.task.update({
        where: { id },
        data: {
          ...(data.title !== undefined && { title: data.title }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.priority !== undefined && { priority: data.priority }),
          ...(data.status !== undefined && { status: data.status }),
          ...(data.dueDate !== undefined && { dueDate: data.dueDate }),
        },
      });

      if (data.assigneeProfileIds !== undefined) {
        await tx.taskAssignment.deleteMany({
          where: { taskId: id },
        });

        if (data.assigneeProfileIds.length > 0) {
          await tx.taskAssignment.createMany({
            data: data.assigneeProfileIds.map((profileId) => ({
              taskId: id,
              profileId,
            })),
          });
        }
      }

      return task;
    });
  }

  async delete(id: string): Promise<Task> {
    return prisma.task.delete({
      where: { id },
    });
  }
}

export const taskRepository = new TaskRepository();
