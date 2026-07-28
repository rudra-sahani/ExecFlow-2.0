/**
 * Vector & Episodic Memory Models
 */

export type MemoryCategory = 'DECISION' | 'ACTION_ITEM' | 'PREFERENCE' | 'CONTEXT' | 'PROJECT_GOAL';

export interface MemoryEntry {
  id: string;
  category: MemoryCategory;
  content: string;
  sourceMeetingId?: string;
  sourceMeetingTitle?: string;
  relevanceScore?: number;
  tags: string[];
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchMemoryQuery {
  query: string;
  category?: MemoryCategory;
  limit?: number;
  minScore?: number;
}

export interface MemorySearchResult {
  entries: MemoryEntry[];
  totalMatches: number;
  queryDurationMs: number;
}
