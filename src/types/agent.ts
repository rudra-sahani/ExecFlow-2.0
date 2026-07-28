/**
 * Agent Observability & DAG Execution Graph Models
 */

export type ExecutionStatus = 'RUNNING' | 'COMPLETED' | 'FAILED' | 'RETRYING' | 'SKIPPED' | 'CANCELLED';

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  provider: string;
  model: string;
}

export interface LatencyBreakdown {
  planningTime: number;
  memoryRetrievalTime: number;
  llmResponseTime: number;
  parsingTime: number;
  validationTime: number;
  databaseTime: number;
  totalPipelineTime: number;
}

export interface Span {
  spanId: string;
  traceId: string;
  parentSpanId?: string;
  agentName: string;
  inputSummary: string;
  outputSummary: string;
  startTime: string;
  endTime?: string;
  duration: number;
  tokensUsed: TokenUsage;
  memoryUsedMb: number;
  status: ExecutionStatus;
  retryCount: number;
  errorMessage?: string;
  nodeType: string;
  dependencies: string[];
}

export interface Trace {
  traceId: string;
  meetingId: string;
  workspaceId: string;
  userId: string;
  executionStart: string;
  executionEnd?: string;
  duration: number;
  status: ExecutionStatus;
  plannerVersion: string;
  pipelineVersion: string;
  overallConfidence: number;
  latencyBreakdown: LatencyBreakdown;
  spans: Span[];
}

export interface GraphNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    agentName: string;
    status: ExecutionStatus;
    duration: number;
    tokens: number;
    retryCount: number;
    inputSummary: string;
    outputSummary: string;
    errorMessage?: string;
    nodeType: string;
  };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  label?: string;
}

export interface ExecutionGraph {
  traceId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  totalNodes: number;
  executionStatus: ExecutionStatus;
}

export interface SubsystemHealth {
  componentName: string;
  status: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
  latencyMs: number;
  lastChecked: string;
  details: Record<string, unknown>;
}

export interface SystemHealthReport {
  overallStatus: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
  timestamp: string;
  components: SubsystemHealth[];
}
