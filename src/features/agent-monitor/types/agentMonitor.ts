export type AgentStatus =
  | 'IDLE'
  | 'QUEUED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'WARNING'
  | 'RETRYING'
  | 'FAILED'
  | 'CANCELLED';

export type AgentCategory =
  | 'INGESTION'
  | 'PLANNER'
  | 'UNDERSTANDING'
  | 'EXTRACTION'
  | 'MEMORY'
  | 'REFLECTION'
  | 'APPROVAL'
  | 'EXECUTION';

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  model: string;
}

export interface MemoryContextItem {
  id: string;
  content: string;
  similarityScore: number;
  sourceMeeting: string;
  category?: string;
}

export interface PromptVersion {
  version: string;
  templateName: string;
  checksum: string;
  temperature: number;
}

export interface ValidationCheck {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  details?: string;
}

export interface ValidationResult {
  passed: boolean;
  score: number;
  checks: ValidationCheck[];
}

export interface EvidenceReference {
  id: string;
  snippet: string;
  timestamp: string;
  speakerName?: string;
}

export interface ToolInvocation {
  id: string;
  toolName: string;
  targetService: string;
  result: 'SUCCESS' | 'FAILED' | 'PENDING';
  approvalStatus: 'APPROVED' | 'PENDING' | 'REJECTED' | 'N/A';
  durationMs: number;
  parameters?: Record<string, unknown>;
  outputSnippet?: string;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  agentName: string;
  nodeId: string;
  metadata?: Record<string, unknown>;
}

export interface AgentNodeData extends Record<string, unknown> {
  id: string;
  label: string;
  agentName: string;
  agentCategory: AgentCategory;
  status: AgentStatus;
  durationMs: number;
  confidenceScore: number;
  healthIndicator: 'HEALTHY' | 'DEGRADED' | 'FAILED' | 'OPTIMAL';
  description: string;
  inputSummary: string;
  outputSummary: string;
  tokenUsage: TokenUsage;
  memoryContext: MemoryContextItem[];
  promptVersion: PromptVersion;
  validationResult: ValidationResult;
  reflectionNotes: string[];
  evidenceReferences: EvidenceReference[];
  retryCount: number;
  toolInvocations: ToolInvocation[];
  logs: AgentLog[];
  startTime?: string;
  endTime?: string;
  stepIndex: number;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  label?: string;
  status?: 'ACTIVE' | 'COMPLETED' | 'FAILED' | 'PENDING';
  dataTransferRate?: string;
}

export interface ExecutionGraphData {
  traceId: string;
  meetingId?: string;
  meetingTitle: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PAUSED';
  startTime: string;
  endTime?: string;
  totalRuntimeMs: number;
  avgAgentRuntimeMs: number;
  longestAgentName: string;
  fastestAgentName: string;
  totalTokensUsed: number;
  totalEstimatedCost: number;
  avgConfidenceScore: number;
  totalRetries: number;
  nodes: AgentNodeData[];
  edges: GraphEdgeData[];
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  agentName: string;
  nodeId: string;
  event: string;
  status: AgentStatus;
  details: string;
  durationMs?: number;
}
