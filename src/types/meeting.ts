/**
 * Meeting Intelligence Domain Models
 */

export type MeetingStatus = 'SCHEDULED' | 'RECORDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface Speaker {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
}

export interface TranscriptSegment {
  id: string;
  meetingId?: string;
  speakerId?: string;
  speakerName: string;
  speakerEmail?: string;
  startTime?: number; // in seconds
  startTimeSeconds?: number;
  endTime?: number;
  endTimeSeconds?: number;
  text: string;
  confidence: number;
  language?: string;
  sentiment?: string;
}

export interface MeetingSummary {
  overview: string;
  keyDecisions: string[];
  actionItemsCount: number;
  sentimentScore: number; // -1.0 to 1.0
  topicsCovered: string[];
  confidenceScore: number;
}

export interface DetailedDecision {
  id: string;
  decision: string;
  decisionMaker: string;
  reason: string;
  evidence: string;
  confidence: number;
  timestamp?: string;
}

export interface MeetingRisk {
  id: string;
  title: string;
  description?: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  likelihood: 'HIGH' | 'MEDIUM' | 'LOW';
  owner: string;
  mitigation?: string;
  mitigationPlan?: string;
  evidence?: string;
  confidence?: number;
}

export interface MeetingDependency {
  id: string;
  taskTitle: string;
  dependsOn: string;
  status: 'BLOCKED' | 'DEPENDENT' | 'EXTERNAL';
  externalSystem?: string;
}

export interface ParticipantMetric {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  speakingTimeSeconds: number;
  participationPercent: number;
  assignedTasksCount: number;
}

export interface TimelineStep {
  id: string;
  stepName: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  timestamp?: string;
  durationMs?: number;
  details?: string;
}

export interface ExtendedMeetingSummary extends MeetingSummary {
  executiveSummary?: string;
  meetingGoal?: string;
  keyOutcomes?: string[];
  nextSteps?: string[];
  openQuestions?: string[];
  decisionsDetail?: DetailedDecision[];
  risks?: MeetingRisk[];
  dependencies?: MeetingDependency[];
  participantMetrics?: ParticipantMetric[];
  timelineSteps?: TimelineStep[];
}

export interface MeetingChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  references?: { segmentId?: string; textSnippet?: string }[];
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  scheduledStartTime: string;
  scheduledEndTime?: string;
  actualDurationSeconds?: number;
  status: MeetingStatus;
  organizer: Speaker;
  participants: Speaker[];
  audioUrl?: string;
  videoUrl?: string;
  transcript?: TranscriptSegment[];
  summary?: ExtendedMeetingSummary;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMeetingPayload {
  title: string;
  description?: string;
  scheduledStartTime: string;
  scheduledEndTime?: string;
  participantEmails?: string[];
}

export interface UpdateMeetingPayload {
  title?: string;
  description?: string;
  status?: MeetingStatus;
}
