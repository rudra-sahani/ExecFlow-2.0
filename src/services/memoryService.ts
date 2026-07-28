import { apiClient } from './api';
import { MemoryEntry, MemorySearchResult, SearchMemoryQuery } from '../types/memory';
import { APIQueryParams, PaginatedResponse } from '../types/api';

export const memoryService = {
  async getMemoryEntries(params?: APIQueryParams): Promise<PaginatedResponse<MemoryEntry>> {
    return apiClient.get<PaginatedResponse<MemoryEntry>>('/memory/entries', { params });
  },

  async searchMemory(query: SearchMemoryQuery): Promise<MemorySearchResult> {
    return apiClient.post<MemorySearchResult, SearchMemoryQuery>('/memory/search', query);
  },

  async deleteMemoryEntry(id: string): Promise<void> {
    return apiClient.delete<void>(`/memory/entries/${id}`);
  },
};
