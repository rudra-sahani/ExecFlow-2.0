import { apiClient } from './api';
import { ExecutionGraph, Span, SystemHealthReport, Trace } from '../types/agent';
import { APIQueryParams, PaginatedResponse } from '../types/api';

export const agentService = {
  async getTraces(params?: APIQueryParams): Promise<PaginatedResponse<Trace>> {
    return apiClient.get<PaginatedResponse<Trace>>('/observability/traces', { params });
  },

  async getTraceById(traceId: string): Promise<Trace> {
    return apiClient.get<Trace>(`/observability/traces/${traceId}`);
  },

  async getTraceSpans(traceId: string): Promise<Span[]> {
    return apiClient.get<Span[]>(`/observability/spans/${traceId}`);
  },

  async getExecutionGraph(traceId: string): Promise<ExecutionGraph> {
    return apiClient.get<ExecutionGraph>(`/observability/graph/${traceId}`);
  },

  async getHealthReport(): Promise<SystemHealthReport> {
    return apiClient.get<SystemHealthReport>('/observability/health');
  },
};
