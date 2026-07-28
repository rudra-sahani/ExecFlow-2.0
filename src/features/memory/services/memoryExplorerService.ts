import { apiClient } from '../../../services/api';
import { KnowledgeSearchResponse, MemoryFilterState } from '../types/memoryExplorer';
import { MemoryEntry } from '../../../types/memory';
import { PaginatedResponse } from '../../../types/api';

export const memoryExplorerService = {
  async searchKnowledge(
    query: string,
    filters?: Partial<MemoryFilterState>,
    category?: string
  ): Promise<KnowledgeSearchResponse> {
    return apiClient.post<KnowledgeSearchResponse>('/memory/search', {
      query,
      filters,
      category,
    });
  },

  async getMemoryEntries(params?: Record<string, unknown>): Promise<PaginatedResponse<MemoryEntry>> {
    return apiClient.get<PaginatedResponse<MemoryEntry>>('/memory/entries', { params });
  },

  async deleteMemoryEntry(id: string): Promise<void> {
    return apiClient.delete<void>(`/memory/entries/${id}`);
  },
};
