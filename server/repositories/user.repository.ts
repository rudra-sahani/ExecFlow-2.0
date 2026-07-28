import { prisma } from '../config/db';
import { Profile } from '@prisma/client';

export interface CreateProfileDTO {
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role?: string;
  department?: string;
  jobTitle?: string;
}

export interface UpdateProfileDTO {
  fullName?: string;
  avatarUrl?: string;
  role?: string;
  department?: string;
  jobTitle?: string;
  isActive?: boolean;
}

export class UserRepository {
  async findById(id: string): Promise<Profile | null> {
    return prisma.profile.findUnique({
      where: { id },
      include: {
        workspaceMembers: {
          include: {
            workspace: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<Profile | null> {
    return prisma.profile.findUnique({
      where: { email },
      include: {
        workspaceMembers: {
          include: {
            workspace: true,
          },
        },
      },
    });
  }

  async create(data: CreateProfileDTO): Promise<Profile> {
    return prisma.profile.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
        role: data.role || 'MEMBER',
        department: data.department,
        jobTitle: data.jobTitle,
      },
    });
  }

  async update(id: string, data: UpdateProfileDTO): Promise<Profile> {
    return prisma.profile.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Profile> {
    return prisma.profile.delete({
      where: { id },
    });
  }

  async listAll(): Promise<Profile[]> {
    return prisma.profile.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const userRepository = new UserRepository();
