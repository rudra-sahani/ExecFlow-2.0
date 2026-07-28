export interface DemoSpeaker {
  id: string;
  name: string;
  role: string;
  department: 'Engineering' | 'Product' | 'Marketing' | 'Operations' | 'Finance';
  avatarBg: string;
}

export interface DemoTranscriptUtterance {
  id: string;
  speakerId: string;
  timestamp: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'caution' | 'actionable';
  highlightCategory?: 'task' | 'decision' | 'risk';
}

export interface DemoActionItem {
  id: string;
  title: string;
  assigneeName: string;
  assigneeRole: string;
  department: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  status: 'Dispatched' | 'Pending Approval' | 'In Progress';
  targetTool: 'GitHub Issue' | 'Jira Ticket' | 'Asana Task';
  contextQuote: string;
  confidenceScore: number;
}

export interface DemoDecision {
  id: string;
  statement: string;
  ownerName: string;
  department: string;
  impactLevel: 'Critical' | 'High' | 'Strategic';
  rationale: string;
  timestamp: string;
}

export interface DemoRisk {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium';
  department: string;
  mitigationPlan: string;
  ownerName: string;
  detectedAt: string;
}

export interface DemoWorkflowExecution {
  id: string;
  name: string;
  status: 'Completed' | 'Executed';
  triggerEvent: string;
  steps: {
    stepNumber: number;
    title: string;
    targetSystem: 'Meeting Complete' | 'GitHub' | 'Slack' | 'Google Calendar' | 'Executive Approval';
    details: string;
    timestamp: string;
    status: 'success' | 'running' | 'pending';
  }[];
}

export interface DemoStepDefinition {
  id: number;
  slug: string;
  title: string;
  shortLabel: string;
  description: string;
  narration: string;
  estSecondsRemaining: number;
  iconName: string;
}
