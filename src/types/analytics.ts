/**
 * Executive Analytics & Predictive Intelligence Domain Models
 */

export interface AnalyticsOverview {
  totalMeetings: number;
  totalHoursRecorded: number;
  tasksGenerated: number;
  tasksCompletedRate: number; // percentage 0-100
  timeSavedHours: number;
  averageAgentConfidence: number;
  activeWorkspacesCount: number;
  // Executive Overview additions
  pendingApprovals: number;
  avgProcessingTimeSec: number;
  avgMeetingDurationMin: number;
  totalDecisions: number;
  totalRisks: number;
  totalActionItems: number;
}

export interface TrendDataPoint {
  date: string;
  meetingsCount: number;
  tasksCompleted: number;
  tokensConsumed: number;
  avgLatencySeconds: number;
  decisionsMade?: number;
  risksIdentified?: number;
  confidenceScore?: number;
  meetingDurationMins?: number;
  attendanceRate?: number;
}

export interface AgentPerformanceMetric {
  agentName: string;
  invocations: number;
  successRate: number; // 0 - 100
  avgDurationSec: number;
  avgTokens: number;
  errorRate: number;
  confidence: number;
  retries: number;
  failures: number;
}

export interface TeamPerformanceItem {
  teamName: string;
  membersCount: number;
  meetingsHeld: number;
  tasksCompleted: number;
  completionRate: number;
  avgDecisionVelocityDays: number;
  riskCount: number;
  timeSavedHours: number;
}

export interface DecisionMetric {
  category: string;
  count: number;
  avgResolutionDays: number;
  highImpactCount: number;
  topDecisionMaker: string;
}

export interface RiskTrendItem {
  period: string;
  highSeverity: number;
  mediumSeverity: number;
  lowSeverity: number;
  resolved: number;
}

export interface PredictiveInsightItem {
  id: string;
  title: string;
  category: 'efficiency' | 'risk' | 'velocity' | 'workload' | 'quality';
  trend: 'up' | 'down' | 'neutral';
  percentageChange: number;
  description: string;
  recommendation: string;
  impactScore: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceScore: number;
  affectedEntities: string[];
}

export interface AIRecommendationItem {
  id: string;
  title: string;
  impact: 'High ROI' | 'Process Improvement' | 'Risk Mitigation' | 'Bottleneck Removal';
  effort: 'Low' | 'Medium' | 'High';
  description: string;
  actionText: string;
  estimatedHoursSavedPerWeek: number;
  category: string;
}

export interface AnalyticsReport {
  overview: AnalyticsOverview;
  trends: TrendDataPoint[];
  agentPerformance: AgentPerformanceMetric[];
  topTopics: { topic: string; count: number }[];
  teamPerformance?: TeamPerformanceItem[];
  decisionsBreakdown?: DecisionMetric[];
  riskTrends?: RiskTrendItem[];
  predictiveInsights?: PredictiveInsightItem[];
  aiRecommendations?: AIRecommendationItem[];
}

export interface AnalyticsFilterState {
  dateRange: '7d' | '30d' | '90d' | 'year';
  workspace: string;
  meetingType: string;
  team: string;
  owner: string;
  riskLevel: string;
  agent: string;
}

export interface ComparisonState {
  enabled: boolean;
  type: 'previous_period' | 'team_vs_team' | 'workspace_vs_workspace';
  targetB: string;
}

export interface DrillDownItem {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'task' | 'risk' | 'decision' | 'agent' | 'topic';
  status?: string;
  owner?: string;
  confidence?: number;
  details: string;
  evidenceSnippet?: string;
  tags?: string[];
}
