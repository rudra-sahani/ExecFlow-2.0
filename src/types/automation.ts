import { Node, Edge } from '@xyflow/react';

export type NodeType =
  | 'trigger'
  | 'condition'
  | 'action'
  | 'approval'
  | 'delay'
  | 'webhook'
  | 'agent';

export type TriggerType =
  | 'meeting_completed'
  | 'meeting_approved'
  | 'task_created'
  | 'task_completed'
  | 'risk_detected'
  | 'decision_approved'
  | 'manual_trigger'
  | 'scheduled_trigger';

export type ConditionType =
  | 'confidence_threshold'
  | 'risk_level'
  | 'owner_exists'
  | 'approval_received'
  | 'deadline_approaching'
  | 'meeting_type_match';

export type ActionType =
  | 'create_calendar_event'
  | 'create_github_issue'
  | 'create_jira_ticket'
  | 'send_email'
  | 'post_slack_message'
  | 'send_teams_notification'
  | 'create_reminder'
  | 'webhook_call';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type WorkflowStatus = 'active' | 'draft' | 'paused' | 'archived';
export type NodeExecutionStatus = 'idle' | 'running' | 'success' | 'failed' | 'paused_for_approval';

export interface WorkflowNodeData extends Record<string, unknown> {
  label: string;
  description: string;
  type: NodeType;
  category: string;
  iconName: string;
  config: Record<string, any>;
  status?: NodeExecutionStatus;
  executionMeta?: {
    lastExecuted?: string;
    durationMs?: number;
    outputSummary?: string;
    error?: string;
    approvalStatus?: 'pending' | 'approved' | 'rejected' | 'auto_approved';
    confidenceScore?: number;
    riskLevel?: RiskLevel;
  };
  linkedTool?: string;
  permissions?: string[];
  expectedInput?: string;
  expectedOutput?: string;
}

export type CustomWorkflowNode = Node<WorkflowNodeData>;
export type CustomWorkflowEdge = Edge;

export interface WorkflowTriggerDefinition {
  id: TriggerType;
  label: string;
  description: string;
  iconName: string;
  category: string;
  defaultConfig: Record<string, any>;
}

export interface WorkflowConditionDefinition {
  id: ConditionType;
  label: string;
  description: string;
  iconName: string;
  category: string;
  defaultConfig: Record<string, any>;
}

export interface WorkflowActionDefinition {
  id: ActionType;
  label: string;
  description: string;
  iconName: string;
  category: string;
  defaultConfig: Record<string, any>;
  requiresApprovalByDefault?: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  status: WorkflowStatus;
  version: string;
  nodes: CustomWorkflowNode[];
  edges: CustomWorkflowEdge[];
  createdAt: string;
  updatedAt: string;
  lastRunAt?: string;
  successRate: number; // percentage 0 - 100
  executionCount: number;
  averageDurationMs: number;
  isTemplate?: boolean;
  requiresApproval?: boolean;
  createdBy: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  tags: string[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'Sprint Planning' | 'Project Kickoff' | 'Weekly Stand-up' | 'Risk Escalation' | 'Client Follow-up' | 'Release Meeting' | 'Incident Review';
  iconName: string;
  badgeText: string;
  nodesCount: number;
  estimatedTimeSavedMinutes: number;
  workflowData: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt' | 'executionCount'>;
}

export interface AutomationLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success' | 'debug';
  workflowId: string;
  workflowName: string;
  nodeId?: string;
  nodeLabel?: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  status: 'success' | 'failed' | 'running' | 'awaiting_approval' | 'cancelled';
  triggerEvent: string;
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  stepsExecuted: number;
  actionsTriggered: number;
  approvalsTriggered: number;
  retriesCount: number;
  errorMessage?: string;
  logs: AutomationLogEntry[];
  simulated?: boolean;
  triggeredBy: string;
}

export interface ApprovalRule {
  id: string;
  name: string;
  triggerType: string;
  actionType: string;
  condition: string;
  riskLevelThreshold: RiskLevel;
  approverRole: string;
  autoApproveEnabled: boolean;
  status: 'active' | 'disabled';
  description: string;
  appliedCount: number;
}

export interface SimulationStep {
  stepNumber: number;
  nodeId: string;
  nodeLabel: string;
  nodeType: NodeType;
  status: 'success' | 'failed' | 'paused_for_approval';
  input: Record<string, any>;
  output: Record<string, any>;
  decisionPathBranch?: 'true' | 'false' | 'default';
  confidenceScore?: number;
  riskLevel?: RiskLevel;
  approvalRequired: boolean;
  expectedDurationMs: number;
  logMessage: string;
}

export interface SimulationResult {
  executionId: string;
  workflowId: string;
  workflowName: string;
  totalSteps: number;
  passedSteps: number;
  hasApprovalGates: boolean;
  overallStatus: 'completed' | 'approval_required' | 'failed';
  totalEstimatedDurationMs: number;
  steps: SimulationStep[];
  expectedOutputs: Record<string, any>;
}

export interface AutomationMetricsData {
  totalWorkflows: number;
  activeWorkflows: number;
  totalExecutions: number;
  successRate: number;
  failureRate: number;
  averageRuntimeMs: number;
  approvalRate: number;
  timeSavedHours: number;
  executionsTrend: { date: string; success: number; failed: number; pending: number }[];
  topActions: { name: string; count: number; iconName: string }[];
  riskDistribution: { level: string; count: number; color: string }[];
}

export type AutomationFilterState = {
  searchQuery: string;
  status: string;
  category: string;
};
