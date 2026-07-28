import { MemoryCategory, MemoryEntry } from '../../../types/memory';

export interface MeetingPerson {
  name: string;
  avatarUrl?: string;
  role?: string;
}

export interface TranscriptExcerpt {
  id: string;
  speaker: string;
  timestamp: string;
  text: string;
  confidence: number;
}

export interface KnowledgeSearchResult {
  id: string;
  meetingId: string;
  meetingTitle: string;
  meetingDate: string;
  summarySnippet: string;
  similarityScore: number; // 0 to 1
  topics: string[];
  people: MeetingPerson[];
  decisions: string[];
  tasks: string[];
  risks: string[];
  transcriptExcerpts: TranscriptExcerpt[];
}

export interface AIKnowledgeSummaryData {
  summary: string;
  keyThemes: string[];
  frequentlyDiscussedTopics: string[];
  relatedTeams: string[];
  confidence: number;
  synthesizedAt: string;
}

export interface TopicClusterItem {
  id: string;
  category: string;
  count: number;
  relevance: number;
  keywords: string[];
}

export interface DecisionHistoryItem {
  id: string;
  decision: string;
  meetingId: string;
  meetingTitle: string;
  date: string;
  decisionMaker: string;
  evidence: string;
  confidence: number;
  category?: 'ARCHITECTURE' | 'SECURITY' | 'INFRASTRUCTURE' | 'PRODUCT' | 'OPERATIONS';
}

export interface AffectedMeeting {
  id: string;
  title: string;
  date: string;
}

export interface MitigationStep {
  date: string;
  action: string;
  owner: string;
}

export interface RecurringRiskItem {
  id: string;
  risk: string;
  frequency: number;
  affectedMeetings: AffectedMeeting[];
  trend: 'INCREASING' | 'STABLE' | 'DECREASING';
  mitigationHistory: MitigationStep[];
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface RelatedPersonItem {
  id: string;
  person: string;
  email: string;
  avatarUrl?: string;
  meetingsCount: number;
  responsibilities: string[];
  frequentlyAssignedWork: string[];
  speakingFrequency: number; // percentage
}

export interface KnowledgeTimelineItem {
  id: string;
  type: 'DECISION' | 'RISK' | 'PROJECT' | 'TASK';
  title: string;
  description: string;
  date: string;
  meetingTitle: string;
  meetingId: string;
  owner: string;
  status?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'MEETING' | 'PERSON' | 'PROJECT' | 'RISK' | 'TASK' | 'DECISION';
  details?: string;
  status?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface RelationshipGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface MemoryFilterState {
  workspace: string;
  meetingId?: string;
  dateRange: 'ALL' | '7D' | '30D' | '90D';
  people: string[];
  projects: string[];
  riskLevel: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';
  decisionType: 'ALL' | 'ARCHITECTURE' | 'SECURITY' | 'INFRASTRUCTURE' | 'PRODUCT' | 'OPERATIONS';
  taskOwner?: string;
}

export interface SavedSearch {
  id: string;
  query: string;
  filters?: Partial<MemoryFilterState>;
  createdAt: string;
  isPinned: boolean;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  resultsCount: number;
}

export interface KnowledgeSearchResponse {
  query: string;
  results: KnowledgeSearchResult[];
  entries: MemoryEntry[];
  summary: AIKnowledgeSummaryData;
  topicClusters: TopicClusterItem[];
  decisionHistory: DecisionHistoryItem[];
  recurringRisks: RecurringRiskItem[];
  relatedPeople: RelatedPersonItem[];
  timeline: KnowledgeTimelineItem[];
  graph: RelationshipGraphData;
  totalMatches: number;
  queryDurationMs: number;
}
