import { prisma } from '../config/db';
import { Memory, KnowledgeDocument } from '@prisma/client';

export interface CreateMemoryDTO {
  workspaceId: string;
  category: string;
  content: string;
  sourceMeetingId?: string;
  sourceMeetingTitle?: string;
  relevanceScore?: number;
  tags?: string[];
}

export class MemoryRepository {
  async findById(id: string): Promise<Memory | null> {
    return prisma.memory.findUnique({
      where: { id },
    });
  }

  async listByWorkspace(workspaceId: string, category?: string, search?: string): Promise<Memory[]> {
    return prisma.memory.findMany({
      where: {
        workspaceId,
        ...(category ? { category } : {}),
        ...(search
          ? {
              OR: [
                { content: { contains: search, mode: 'insensitive' } },
                { sourceMeetingTitle: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateMemoryDTO): Promise<Memory> {
    return prisma.memory.create({
      data: {
        workspaceId: data.workspaceId,
        category: data.category,
        content: data.content,
        sourceMeetingId: data.sourceMeetingId,
        sourceMeetingTitle: data.sourceMeetingTitle,
        relevanceScore: data.relevanceScore ?? 1.0,
        tags: data.tags || [],
      },
    });
  }

  async createKnowledgeDocument(workspaceId: string, title: string, content: string, fileUrl?: string): Promise<KnowledgeDocument> {
    return prisma.knowledgeDocument.create({
      data: {
        workspaceId,
        title,
        content,
        fileUrl,
      },
    });
  }

  async listKnowledgeDocuments(workspaceId: string): Promise<KnowledgeDocument[]> {
    return prisma.knowledgeDocument.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string): Promise<Memory> {
    return prisma.memory.delete({
      where: { id },
    });
  }
}

export const memoryRepository = new MemoryRepository();
