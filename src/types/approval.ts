/**
 * Human-in-the-Loop Approval Workflow Models
 */

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
export type ActionRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ProposedAction {
  type?: string;
  actionType?: string;
  toolName?: string;
  targetService?: string;
  parameters?: Record<string, unknown>;
  explanation: string;
  potentialImpact: string;
  riskLevel: ActionRiskLevel;
}

export interface ApprovalRequest {
  id: string;
  traceId: string;
  meetingId?: string;
  proposedAction: ProposedAction;
  status: ApprovalStatus;
  requestedByAgent: string;
  requestedAt: string;
  decidedByUserId?: string;
  decidedAt?: string;
  approverNotes?: string;
  rejectionReason?: string;
  modifiedParameters?: Record<string, unknown>;
  workspaceId: string;
}

export interface ApprovalDecisionPayload {
  approved: boolean;
  reason?: string;
  modifiedParameters?: Record<string, unknown>;
}
