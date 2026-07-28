import { apiClient } from './api';
import { ApprovalDecisionPayload, ApprovalRequest } from '../types/approval';
import { APIQueryParams, PaginatedResponse } from '../types/api';

export const approvalService = {
  async getPendingApprovals(params?: APIQueryParams): Promise<PaginatedResponse<ApprovalRequest>> {
    return apiClient.get<PaginatedResponse<ApprovalRequest>>('/approvals/pending', { params });
  },

  async getApprovalById(id: string): Promise<ApprovalRequest> {
    return apiClient.get<ApprovalRequest>(`/approvals/${id}`);
  },

  async decideApproval(id: string, payload: ApprovalDecisionPayload): Promise<ApprovalRequest> {
    return apiClient.post<ApprovalRequest, ApprovalDecisionPayload>(`/approvals/${id}/decide`, payload);
  },
};
