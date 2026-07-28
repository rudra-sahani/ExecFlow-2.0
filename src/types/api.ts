/**
 * Standardized API Response and Request schemas for ExecFlow.
 */

export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    timestamp: string;
    requestId?: string;
    version?: string;
  };
}

export interface PaginatedResponse<T = unknown> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface APIQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  from?: string;
  to?: string;
  [key: string]: unknown;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
}
