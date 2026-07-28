import { prisma } from '../config/db';
import { Workspace, WorkspaceMember } from '@prisma/client';

export interface CreateWorkspaceDTO {
  name: string;
  slug: string;
  organizationId: string;
  description?: string;
}

export class WorkspaceRepository {
  async findById(id: string): Promise<Workspace | null> {
    return prisma.workspace.findUnique({
      where: { id },
      include: {
        organization: true,
        members: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<Workspace | null> {
    return prisma.workspace.findUnique({
      where: { slug },
      include: {
        organization: true,
      },
    });
  }

  async listForProfile(profileId: string): Promise<Workspace[]> {
    const members = await prisma.workspaceMember.findMany({
      where: { profileId },
      include: {
        workspace: {
          include: {
            organization: true,
          },
        },
      },
    });
    return members.map((m) => m.workspace);
  }

  async createWithMember(data: CreateWorkspaceDTO, profileId: string, role = 'ADMIN'): Promise<Workspace> {
    return prisma.$transaction(async (tx) => {
      const workspace = await tx.workspace.create({
        data: {
          name: data.name,
          slug: data.slug,
          organizationId: data.organizationId,
          description: data.description,
        },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          profileId,
          role,
        },
      });

      return workspace;
    });
  }

  async addMember(workspaceId: string, profileId: string, role = 'MEMBER'): Promise<WorkspaceMember> {
    return prisma.workspaceMember.create({
      data: {
        workspaceId,
        profileId,
        role,
      },
    });
  }

  async removeMember(workspaceId: string, profileId: string): Promise<void> {
    await prisma.workspaceMember.delete({
      where: {
        workspaceId_profileId: {
          workspaceId,
          profileId,
        },
      },
    });
  }

  async listAll(): Promise<Workspace[]> {
    return prisma.workspace.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const workspaceRepository = new WorkspaceRepository();
