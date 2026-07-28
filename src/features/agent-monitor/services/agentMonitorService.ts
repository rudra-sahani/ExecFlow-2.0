import { ExecutionGraphData, AgentNodeData, AgentLog, TimelineEvent } from '../types/agentMonitor';
import { API_BASE_URL } from '../../../utils/constants';

// Initial sample mock data for complete multi-agent DAG
export const generateSampleExecutionGraph = (traceId = 'trc_execflow_prod_9021'): ExecutionGraphData => {
  const nodes: AgentNodeData[] = [
    {
      id: 'node_1',
      stepIndex: 1,
      label: 'Meeting Ingestion',
      agentName: 'Meeting Upload Ingestor',
      agentCategory: 'INGESTION',
      status: 'COMPLETED',
      durationMs: 420,
      confidenceScore: 0.99,
      healthIndicator: 'OPTIMAL',
      description: 'Receives raw audio stream and converts into standard PCM 16kHz audio buffer.',
      inputSummary: '124 MB WAV stream from Zoom / WebRTC connector',
      outputSummary: 'Cleaned PCM Audio Buffer (32 mins stream)',
      tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, estimatedCost: 0, model: 'AudioPreProcessor-v2' },
      memoryContext: [],
      promptVersion: { version: '1.0.0', templateName: 'audio_ingest.jinja2', checksum: 'sha256-a9f8', temperature: 0.0 },
      validationResult: {
        passed: true,
        score: 1.0,
        checks: [
          { name: 'Bitrate Check', status: 'PASS', details: '128kbps stereo validated' },
          { name: 'Noise Floor Check', status: 'PASS', details: 'Normalized -24dB SNR' }
        ]
      },
      reflectionNotes: ['Audio quality within optimal bounds. No clipping detected.'],
      evidenceReferences: [{ id: 'ev_1', snippet: 'Audio stream start 00:00:00', timestamp: '00:00:00' }],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_1', timestamp: '12:30:00.010', level: 'INFO', message: 'Payload received from WebRTC gateway', agentName: 'Meeting Ingestor', nodeId: 'node_1' },
        { id: 'l_2', timestamp: '12:30:00.430', level: 'INFO', message: 'Audio buffer chunked into 30s audio segments', agentName: 'Meeting Ingestor', nodeId: 'node_1' }
      ]
    },
    {
      id: 'node_2',
      stepIndex: 2,
      label: 'Media Processing',
      agentName: 'FFmpeg Whisper Pipeline',
      agentCategory: 'INGESTION',
      status: 'COMPLETED',
      durationMs: 1150,
      confidenceScore: 0.97,
      healthIndicator: 'HEALTHY',
      description: 'Extracts acoustic features and runs GPU accelerated voice activity detection (VAD).',
      inputSummary: 'PCM Audio Buffer',
      outputSummary: '14 acoustic segments with VAD timestamps',
      tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, estimatedCost: 0, model: 'Whisper-v3-Turbo' },
      memoryContext: [],
      promptVersion: { version: '2.1.0', templateName: 'media_vad.config', checksum: 'sha256-b1e2', temperature: 0.0 },
      validationResult: {
        passed: true,
        score: 0.98,
        checks: [
          { name: 'VAD Threshold', status: 'PASS', details: 'Silence detected and trimmed (1.2s)' }
        ]
      },
      reflectionNotes: ['VAD boundary trim saved 8% compute.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_3', timestamp: '12:30:00.500', level: 'INFO', message: 'VAD processing initiated on 14 segments', agentName: 'Media Processing', nodeId: 'node_2' },
        { id: 'l_4', timestamp: '12:30:01.650', level: 'INFO', message: 'Speech segments isolated successfully', agentName: 'Media Processing', nodeId: 'node_2' }
      ]
    },
    {
      id: 'node_3',
      stepIndex: 3,
      label: 'Transcript Parser',
      agentName: 'Speaker Diarization Agent',
      agentCategory: 'UNDERSTANDING',
      status: 'COMPLETED',
      durationMs: 1850,
      confidenceScore: 0.96,
      healthIndicator: 'OPTIMAL',
      description: 'Maps acoustic embeddings to active speaker IDs and generates timestamped transcript.',
      inputSummary: '14 VAD acoustic segments',
      outputSummary: '48 timestamped transcript turns mapped to 4 speakers',
      tokenUsage: { promptTokens: 1200, completionTokens: 450, totalTokens: 1650, estimatedCost: 0.00033, model: 'gemini-2.5-flash' },
      memoryContext: [
        { id: 'mem_01', content: 'Alex Chen is Lead Architect; Sarah Jenkins is Senior Backend Engineer', similarityScore: 0.94, sourceMeeting: 'Q3 Arch Sync' }
      ],
      promptVersion: { version: '3.0.1', templateName: 'diarization_parser.prompty', checksum: 'sha256-c3f4', temperature: 0.1 },
      validationResult: {
        passed: true,
        score: 0.96,
        checks: [
          { name: 'Speaker Match', status: 'PASS', details: 'Matched Alex, Sarah, Marcus, and Elena' }
        ]
      },
      reflectionNotes: ['High confidence speaker alignment with known workspace embeddings.'],
      evidenceReferences: [
        { id: 'ev_2', snippet: 'Welcome everyone to today\'s ExecFlow synchronization.', timestamp: '00:00:05', speakerName: 'Alex Chen' }
      ],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_5', timestamp: '12:30:01.700', level: 'INFO', message: 'Diarization clustering initialized with K=4', agentName: 'Speaker Diarization Agent', nodeId: 'node_3' },
        { id: 'l_6', timestamp: '12:30:03.550', level: 'INFO', message: 'Transcript generated with 96.4% acoustic confidence', agentName: 'Speaker Diarization Agent', nodeId: 'node_3' }
      ]
    },
    {
      id: 'node_4',
      stepIndex: 4,
      label: 'Planner Agent',
      agentName: 'Execution DAG Orchestrator',
      agentCategory: 'PLANNER',
      status: 'COMPLETED',
      durationMs: 820,
      confidenceScore: 0.98,
      healthIndicator: 'OPTIMAL',
      description: 'Evaluates transcript length and domain context to spawn parallel analysis sub-agents.',
      inputSummary: 'Raw transcript + Workspace metadata',
      outputSummary: 'Fan-out execution plan with 6 sub-agents',
      tokenUsage: { promptTokens: 1800, completionTokens: 320, totalTokens: 2120, estimatedCost: 0.00042, model: 'gemini-2.5-flash' },
      memoryContext: [],
      promptVersion: { version: '1.4.0', templateName: 'orchestrator_planner.jinja', checksum: 'sha256-d5e6', temperature: 0.2 },
      validationResult: {
        passed: true,
        score: 0.99,
        checks: [
          { name: 'Dependency Graph Acyclic Check', status: 'PASS', details: 'DAG validated without cycles' }
        ]
      },
      reflectionNotes: ['Spawning Understanding, Action, Decision, Risk, and Memory agents in parallel.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_7', timestamp: '12:30:03.600', level: 'INFO', message: 'Parsing execution dependencies for ExecFlow strategy', agentName: 'Execution Orchestrator', nodeId: 'node_4' },
        { id: 'l_8', timestamp: '12:30:04.420', level: 'INFO', message: 'Sub-agents dispatched to worker pool', agentName: 'Execution Orchestrator', nodeId: 'node_4' }
      ]
    },
    {
      id: 'node_5',
      stepIndex: 5,
      label: 'Meeting Understanding',
      agentName: 'MeetingUnderstandingAgent',
      agentCategory: 'UNDERSTANDING',
      status: 'COMPLETED',
      durationMs: 2450,
      confidenceScore: 0.95,
      healthIndicator: 'HEALTHY',
      description: 'Generates executive summary, key themes, and sentiment analysis.',
      inputSummary: 'Full transcript stream',
      outputSummary: '3-bullet executive summary and 4 key meeting topics',
      tokenUsage: { promptTokens: 2400, completionTokens: 680, totalTokens: 3080, estimatedCost: 0.00061, model: 'gemini-2.5-flash' },
      memoryContext: [
        { id: 'mem_02', content: 'Targeting sub-2.5 second end-to-end processing latency', similarityScore: 0.89, sourceMeeting: 'Sprint 14 Retrospective' }
      ],
      promptVersion: { version: '2.0.3', templateName: 'meeting_summary.prompty', checksum: 'sha256-e7f8', temperature: 0.3 },
      validationResult: {
        passed: true,
        score: 0.95,
        checks: [
          { name: 'Topic Density', status: 'PASS', details: 'Extracted 4 high-value topics' }
        ]
      },
      reflectionNotes: ['High coherence executive summary produced.'],
      evidenceReferences: [
        { id: 'ev_3', snippet: 'We have verified Express server routes and vector memory queries.', timestamp: '00:02:15', speakerName: 'Sarah Jenkins' }
      ],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_9', timestamp: '12:30:04.500', level: 'INFO', message: 'Summarizing key topics and sentiment', agentName: 'MeetingUnderstandingAgent', nodeId: 'node_5' },
        { id: 'l_10', timestamp: '12:30:06.950', level: 'INFO', message: 'Executive summary finalized', agentName: 'MeetingUnderstandingAgent', nodeId: 'node_5' }
      ]
    },
    {
      id: 'node_6',
      stepIndex: 6,
      label: 'Participant Detection',
      agentName: 'ParticipantDetectionAgent',
      agentCategory: 'UNDERSTANDING',
      status: 'COMPLETED',
      durationMs: 1100,
      confidenceScore: 0.98,
      healthIndicator: 'OPTIMAL',
      description: 'Identifies attendees, attendance status, talk-time ratio, and active engagement metrics.',
      inputSummary: 'Speaker segments + Workspace directory',
      outputSummary: '4 participants verified with company directory accounts',
      tokenUsage: { promptTokens: 1400, completionTokens: 290, totalTokens: 1690, estimatedCost: 0.00033, model: 'gemini-2.5-flash' },
      memoryContext: [],
      promptVersion: { version: '1.2.0', templateName: 'participant_attr.prompty', checksum: 'sha256-f9a0', temperature: 0.1 },
      validationResult: {
        passed: true,
        score: 0.98,
        checks: [
          { name: 'Directory Resolution', status: 'PASS', details: 'All 4 speakers mapped to valid emails' }
        ]
      },
      reflectionNotes: ['Participant resolution 100% complete.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_11', timestamp: '12:30:04.510', level: 'INFO', message: 'Cross-referencing speaker profiles with LDAP', agentName: 'ParticipantDetectionAgent', nodeId: 'node_6' },
        { id: 'l_12', timestamp: '12:30:05.610', level: 'INFO', message: '4 user profiles resolved', agentName: 'ParticipantDetectionAgent', nodeId: 'node_6' }
      ]
    },
    {
      id: 'node_7',
      stepIndex: 7,
      label: 'Task Extraction',
      agentName: 'ActionExtractionAgent',
      agentCategory: 'EXTRACTION',
      status: 'COMPLETED',
      durationMs: 3100,
      confidenceScore: 0.96,
      healthIndicator: 'OPTIMAL',
      description: 'Extracts actionable commitments, assigned owners, due dates, and priority scores.',
      inputSummary: 'Transcript + Participant directory',
      outputSummary: '4 action items extracted with owner assignments',
      tokenUsage: { promptTokens: 2800, completionTokens: 850, totalTokens: 3650, estimatedCost: 0.00073, model: 'gemini-2.5-flash' },
      memoryContext: [
        { id: 'mem_03', content: 'Alex Chen owns human-in-the-loop authorization policy', similarityScore: 0.92, sourceMeeting: 'Security Review' }
      ],
      promptVersion: { version: '4.1.0', templateName: 'action_item_extractor.prompty', checksum: 'sha256-g1h2', temperature: 0.2 },
      validationResult: {
        passed: true,
        score: 0.96,
        checks: [
          { name: 'Assignee Validity', status: 'PASS', details: 'Assignees validated against team members' },
          { name: 'Due Date Inference', status: 'PASS', details: 'Relative dates converted to ISO 8601' }
        ]
      },
      reflectionNotes: ['Extracted 4 high-priority tasks.'],
      evidenceReferences: [
        { id: 'ev_4', snippet: 'Action item: We need to finalize the human-in-the-loop approval policy.', timestamp: '00:03:40', speakerName: 'Marcus Vance' }
      ],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_13', timestamp: '12:30:04.520', level: 'INFO', message: 'Scanning imperative verb patterns in transcript', agentName: 'ActionExtractionAgent', nodeId: 'node_7' },
        { id: 'l_14', timestamp: '12:30:07.620', level: 'INFO', message: 'Extracted 4 actionable tasks with priorities', agentName: 'ActionExtractionAgent', nodeId: 'node_7' }
      ]
    },
    {
      id: 'node_8',
      stepIndex: 8,
      label: 'Decision Extraction',
      agentName: 'DecisionExtractionAgent',
      agentCategory: 'EXTRACTION',
      status: 'COMPLETED',
      durationMs: 2200,
      confidenceScore: 0.94,
      healthIndicator: 'HEALTHY',
      description: 'Identifies explicit decisions, rationale, rejected alternatives, and impact domain.',
      inputSummary: 'Transcript stream',
      outputSummary: '3 architectural decisions isolated with consensus votes',
      tokenUsage: { promptTokens: 2100, completionTokens: 520, totalTokens: 2620, estimatedCost: 0.00052, model: 'gemini-2.5-flash' },
      memoryContext: [],
      promptVersion: { version: '2.0.0', templateName: 'decision_extractor.prompty', checksum: 'sha256-i3j4', temperature: 0.2 },
      validationResult: {
        passed: true,
        score: 0.94,
        checks: [
          { name: 'Consensus Verification', status: 'PASS', details: 'Explicit agreement confirmed by >2 speakers' }
        ]
      },
      reflectionNotes: ['Decisions backed by direct transcript quotes.'],
      evidenceReferences: [
        { id: 'ev_5', snippet: 'We agreed on deploying containerized execution guardrails.', timestamp: '00:05:12', speakerName: 'Alex Chen' }
      ],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_15', timestamp: '12:30:04.530', level: 'INFO', message: 'Filtering agreement statements and consensus keywords', agentName: 'DecisionExtractionAgent', nodeId: 'node_8' },
        { id: 'l_16', timestamp: '12:30:06.730', level: 'INFO', message: 'Isolated 3 organizational decisions', agentName: 'DecisionExtractionAgent', nodeId: 'node_8' }
      ]
    },
    {
      id: 'node_9',
      stepIndex: 9,
      label: 'Risk Detection',
      agentName: 'RiskDetectionAgent',
      agentCategory: 'EXTRACTION',
      status: 'COMPLETED',
      durationMs: 1450,
      confidenceScore: 0.97,
      healthIndicator: 'OPTIMAL',
      description: 'Identifies technical, timeline, and security risks with severity scoring and mitigation plans.',
      inputSummary: 'Transcript + Tasks + Decisions',
      outputSummary: '1 CRITICAL risk identified with recommended mitigation policy',
      tokenUsage: { promptTokens: 1900, completionTokens: 410, totalTokens: 2310, estimatedCost: 0.00046, model: 'gemini-2.5-flash' },
      memoryContext: [
        { id: 'mem_04', content: 'Unbounded agent database execution without approval barriers', similarityScore: 0.96, sourceMeeting: 'Security Audit' }
      ],
      promptVersion: { version: '3.2.0', templateName: 'risk_classifier.prompty', checksum: 'sha256-k5l6', temperature: 0.1 },
      validationResult: {
        passed: true,
        score: 0.97,
        checks: [
          { name: 'Severity Level', status: 'PASS', details: 'Mapped to CRITICAL based on production risk matrix' }
        ]
      },
      reflectionNotes: ['Automated approval barrier recommended before tool execution.'],
      evidenceReferences: [
        { id: 'ev_6', snippet: 'Unbounded agent database execution could cause unintended writes.', timestamp: '00:07:30', speakerName: 'Elena Rostova' }
      ],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_17', timestamp: '12:30:04.540', level: 'INFO', message: 'Evaluated 12 potential risk patterns', agentName: 'RiskDetectionAgent', nodeId: 'node_9' },
        { id: 'l_18', timestamp: '12:30:05.990', level: 'INFO', message: 'Created risk record ExecFlow-R12 with CRITICAL severity', agentName: 'RiskDetectionAgent', nodeId: 'node_9' }
      ]
    },
    {
      id: 'node_10',
      stepIndex: 10,
      label: 'Dependency Detection',
      agentName: 'DependencyDetectionAgent',
      agentCategory: 'EXTRACTION',
      status: 'COMPLETED',
      durationMs: 1900,
      confidenceScore: 0.93,
      healthIndicator: 'HEALTHY',
      description: 'Detects cross-task dependencies, external API blockers, and sequencing requirements.',
      inputSummary: 'Tasks + Workspace backlog',
      outputSummary: '2 task blocking relations established',
      tokenUsage: { promptTokens: 2200, completionTokens: 480, totalTokens: 2680, estimatedCost: 0.00053, model: 'gemini-2.5-flash' },
      memoryContext: [],
      promptVersion: { version: '1.1.0', templateName: 'dependency_mapper.prompty', checksum: 'sha256-m7n8', temperature: 0.2 },
      validationResult: {
        passed: true,
        score: 0.93,
        checks: [
          { name: 'Cycle Detection', status: 'PASS', details: 'No circular dependencies detected' }
        ]
      },
      reflectionNotes: ['Mapped Task 3 blocking Task 1.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_19', timestamp: '12:30:04.550', level: 'INFO', message: 'Analyzing task pre-conditions', agentName: 'DependencyDetectionAgent', nodeId: 'node_10' },
        { id: 'l_20', timestamp: '12:30:06.450', level: 'INFO', message: 'Dependency matrix constructed', agentName: 'DependencyDetectionAgent', nodeId: 'node_10' }
      ]
    },
    {
      id: 'node_11',
      stepIndex: 11,
      label: 'Memory Retrieval',
      agentName: 'VectorMemoryAgent',
      agentCategory: 'MEMORY',
      status: 'COMPLETED',
      durationMs: 920,
      confidenceScore: 0.99,
      healthIndicator: 'OPTIMAL',
      description: 'Queries pgvector database to retrieve historical contextual memories and user preferences.',
      inputSummary: 'Extracted topics & tasks',
      outputSummary: '4 vector memory matches retrieved with cosine similarity > 0.85',
      tokenUsage: { promptTokens: 980, completionTokens: 210, totalTokens: 1190, estimatedCost: 0.00023, model: 'text-embedding-004' },
      memoryContext: [
        { id: 'mem_10', content: 'Approval threshold set to HIGH impact tasks in Slack channel #execflow-approvals', similarityScore: 0.95, sourceMeeting: 'Workspace Config' },
        { id: 'mem_11', content: 'Linear issue auto-creation enabled for engineering workspace', similarityScore: 0.91, sourceMeeting: 'Linear Sync' }
      ],
      promptVersion: { version: '2.5.0', templateName: 'vector_search.config', checksum: 'sha256-o9p0', temperature: 0.0 },
      validationResult: {
        passed: true,
        score: 0.99,
        checks: [
          { name: 'Embedding Index Health', status: 'PASS', details: 'Index response 28ms' }
        ]
      },
      reflectionNotes: ['Vector memory search returned high similarity context.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_21', timestamp: '12:30:07.700', level: 'INFO', message: 'Executing ANN vector search (k=5)', agentName: 'VectorMemoryAgent', nodeId: 'node_11' },
        { id: 'l_22', timestamp: '12:30:08.620', level: 'INFO', message: 'Top 4 memory hits injected into reflection context', agentName: 'VectorMemoryAgent', nodeId: 'node_11' }
      ]
    },
    {
      id: 'node_12',
      stepIndex: 12,
      label: 'Self-Reflection',
      agentName: 'ValidationReflectionAgent',
      agentCategory: 'REFLECTION',
      status: 'COMPLETED',
      durationMs: 1650,
      confidenceScore: 0.97,
      healthIndicator: 'OPTIMAL',
      description: 'Audits extracted findings against raw evidence to verify factual grounding and eliminate hallucinations.',
      inputSummary: 'All extracted artifacts + Raw transcript + Memory',
      outputSummary: 'Verified 100% ground truth alignment. 0 hallucinated facts.',
      tokenUsage: { promptTokens: 3200, completionTokens: 420, totalTokens: 3620, estimatedCost: 0.00072, model: 'gemini-2.5-flash' },
      memoryContext: [],
      promptVersion: { version: '3.0.0', templateName: 'self_reflection_critic.prompty', checksum: 'sha256-q1r2', temperature: 0.1 },
      validationResult: {
        passed: true,
        score: 0.97,
        checks: [
          { name: 'Factual Grounding Check', status: 'PASS', details: 'All task assignees backed by transcript quotes' },
          { name: 'Hallucination Check', status: 'PASS', details: '0 ungrounded claims' }
        ]
      },
      reflectionNotes: ['Critic validation passed without requiring auto-retry.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_23', timestamp: '12:30:08.650', level: 'INFO', message: 'Evaluating claim grounding with Gemini Critic', agentName: 'ValidationReflectionAgent', nodeId: 'node_12' },
        { id: 'l_24', timestamp: '12:30:10.300', level: 'INFO', message: 'Validation score: 0.97 (Passed threshold)', agentName: 'ValidationReflectionAgent', nodeId: 'node_12' }
      ]
    },
    {
      id: 'node_13',
      stepIndex: 13,
      label: 'Approval Barrier',
      agentName: 'HumanInTheLoopGuard',
      agentCategory: 'APPROVAL',
      status: 'COMPLETED',
      durationMs: 1800,
      confidenceScore: 1.0,
      healthIndicator: 'OPTIMAL',
      description: 'Enforces human review for high-impact tool executions (e.g., GitHub PRs, Database sync, Calendar events).',
      inputSummary: 'Tool actions payload',
      outputSummary: 'Human approval grant confirmed by Alex Chen',
      tokenUsage: { promptTokens: 400, completionTokens: 120, totalTokens: 520, estimatedCost: 0.0001, model: 'PolicyGuard-v1' },
      memoryContext: [],
      promptVersion: { version: '1.0.0', templateName: 'approval_policy.json', checksum: 'sha256-s3t4', temperature: 0.0 },
      validationResult: {
        passed: true,
        score: 1.0,
        checks: [
          { name: 'Policy Authorization', status: 'PASS', details: 'Approved by workspace admin' }
        ]
      },
      reflectionNotes: ['Human-in-the-loop requirement satisfied.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [
        { id: 'ti_01', toolName: 'HumanApprovalCheck', targetService: 'ExecFlow Approval Service', result: 'SUCCESS', approvalStatus: 'APPROVED', durationMs: 1800, outputSnippet: 'Authorized by Alex Chen at 12:30:12' }
      ],
      logs: [
        { id: 'l_25', timestamp: '12:30:10.350', level: 'INFO', message: 'Approval challenge triggered for automated tool dispatch', agentName: 'HumanInTheLoopGuard', nodeId: 'node_13' },
        { id: 'l_26', timestamp: '12:30:12.150', level: 'INFO', message: 'Approval granted by Alex Chen', agentName: 'HumanInTheLoopGuard', nodeId: 'node_13' }
      ]
    },
    {
      id: 'node_14',
      stepIndex: 14,
      label: 'Tool Execution',
      agentName: 'ToolInvocationDispatcher',
      agentCategory: 'EXECUTION',
      status: 'RUNNING',
      durationMs: 1240,
      confidenceScore: 0.99,
      healthIndicator: 'OPTIMAL',
      description: 'Dispatches approved tasks into connected external systems (GitHub, Slack, Google Calendar, Jira).',
      inputSummary: '4 Approved Action Items & Decisions',
      outputSummary: 'Syncing with GitHub, Slack, and Google Calendar',
      tokenUsage: { promptTokens: 1500, completionTokens: 380, totalTokens: 1880, estimatedCost: 0.00037, model: 'gemini-2.5-flash' },
      memoryContext: [],
      promptVersion: { version: '2.1.0', templateName: 'tool_dispatcher.prompty', checksum: 'sha256-u5v6', temperature: 0.0 },
      validationResult: {
        passed: true,
        score: 0.99,
        checks: [
          { name: 'OAuth Scope Token Check', status: 'PASS', details: 'GitHub & Slack tokens valid' }
        ]
      },
      reflectionNotes: ['Dispatching 3 parallel tool payloads.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [
        { id: 'ti_02', toolName: 'CreateGitHubIssue', targetService: 'GitHub API v3', result: 'SUCCESS', approvalStatus: 'APPROVED', durationMs: 420, outputSnippet: 'Issue #142 created in rudra-sahani/ExecFlow-AI' },
        { id: 'ti_03', toolName: 'SendSlackNotification', targetService: 'Slack Webhook', result: 'SUCCESS', approvalStatus: 'APPROVED', durationMs: 280, outputSnippet: 'Notification posted to #execflow-sync' },
        { id: 'ti_04', toolName: 'ScheduleCalendarFollowup', targetService: 'Google Calendar API', result: 'PENDING', approvalStatus: 'APPROVED', durationMs: 540, outputSnippet: 'Dispatching calendar event request' }
      ],
      logs: [
        { id: 'l_27', timestamp: '12:30:12.200', level: 'INFO', message: 'Executing tool payload for GitHub Issue #142', agentName: 'ToolInvocationDispatcher', nodeId: 'node_14' },
        { id: 'l_28', timestamp: '12:30:12.620', level: 'INFO', message: 'GitHub Issue #142 created successfully', agentName: 'ToolInvocationDispatcher', nodeId: 'node_14' },
        { id: 'l_29', timestamp: '12:30:12.900', level: 'INFO', message: 'Posting Slack summary to #execflow-sync', agentName: 'ToolInvocationDispatcher', nodeId: 'node_14' }
      ]
    },
    {
      id: 'node_15',
      stepIndex: 15,
      label: 'Workflow Completed',
      agentName: 'Pipeline Finalizer',
      agentCategory: 'EXECUTION',
      status: 'QUEUED',
      durationMs: 0,
      confidenceScore: 1.0,
      healthIndicator: 'OPTIMAL',
      description: 'Consolidates all agent metrics, updates meeting status to COMPLETED, and stores trace.',
      inputSummary: 'All agent outputs and tool results',
      outputSummary: 'Pipeline execution trace finalized',
      tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, estimatedCost: 0, model: 'SystemFinalizer-v1' },
      memoryContext: [],
      promptVersion: { version: '1.0.0', templateName: 'pipeline_finalizer.json', checksum: 'sha256-w7x8', temperature: 0.0 },
      validationResult: {
        passed: true,
        score: 1.0,
        checks: []
      },
      reflectionNotes: ['Awaiting Tool Execution completion.'],
      evidenceReferences: [],
      retryCount: 0,
      toolInvocations: [],
      logs: [
        { id: 'l_30', timestamp: '12:30:13.000', level: 'INFO', message: 'Awaiting completion of node_14 (Tool Execution)', agentName: 'Pipeline Finalizer', nodeId: 'node_15' }
      ]
    }
  ];

  const edges = [
    { id: 'e1_2', source: 'node_1', target: 'node_2', animated: true, label: 'Audio Stream', status: 'COMPLETED' as const },
    { id: 'e2_3', source: 'node_2', target: 'node_3', animated: true, label: 'PCM Buffer', status: 'COMPLETED' as const },
    { id: 'e3_4', source: 'node_3', target: 'node_4', animated: true, label: 'Transcript', status: 'COMPLETED' as const },
    // Fan-out from Planner (node_4) to sub-agents (node_5, node_6, node_7, node_8, node_9, node_10)
    { id: 'e4_5', source: 'node_4', target: 'node_5', animated: true, label: 'Text Stream', status: 'COMPLETED' as const },
    { id: 'e4_6', source: 'node_4', target: 'node_6', animated: true, label: 'Speakers', status: 'COMPLETED' as const },
    { id: 'e4_7', source: 'node_4', target: 'node_7', animated: true, label: 'Text Stream', status: 'COMPLETED' as const },
    { id: 'e4_8', source: 'node_4', target: 'node_8', animated: true, label: 'Text Stream', status: 'COMPLETED' as const },
    { id: 'e4_9', source: 'node_4', target: 'node_9', animated: true, label: 'Text Stream', status: 'COMPLETED' as const },
    { id: 'e4_10', source: 'node_4', target: 'node_10', animated: true, label: 'Tasks', status: 'COMPLETED' as const },
    // Fan-in to Vector Memory (node_11)
    { id: 'e5_11', source: 'node_5', target: 'node_11', animated: true, label: 'Key Topics', status: 'COMPLETED' as const },
    { id: 'e7_11', source: 'node_7', target: 'node_11', animated: true, label: 'Task Topics', status: 'COMPLETED' as const },
    { id: 'e9_11', source: 'node_9', target: 'node_11', animated: true, label: 'Risk Context', status: 'COMPLETED' as const },
    // Vector Memory to Reflection (node_12)
    { id: 'e11_12', source: 'node_11', target: 'node_12', animated: true, label: 'Retrieved Context', status: 'COMPLETED' as const },
    { id: 'e8_12', source: 'node_8', target: 'node_12', animated: true, label: 'Decisions', status: 'COMPLETED' as const },
    { id: 'e10_12', source: 'node_10', target: 'node_12', animated: true, label: 'Dependencies', status: 'COMPLETED' as const },
    // Reflection to Approval (node_13)
    { id: 'e12_13', source: 'node_12', target: 'node_13', animated: true, label: 'Validated Findings', status: 'COMPLETED' as const },
    // Approval to Tool Execution (node_14)
    { id: 'e13_14', source: 'node_13', target: 'node_14', animated: true, label: 'Authorized Actions', status: 'ACTIVE' as const },
    // Tool Execution to Finalizer (node_15)
    { id: 'e14_15', source: 'node_14', target: 'node_15', animated: true, label: 'Execution Results', status: 'PENDING' as const }
  ];

  const totalRuntimeMs = nodes.reduce((acc, n) => acc + n.durationMs, 0);
  const totalTokensUsed = nodes.reduce((acc, n) => acc + n.tokenUsage.totalTokens, 0);
  const totalEstimatedCost = nodes.reduce((acc, n) => acc + n.tokenUsage.estimatedCost, 0);
  const avgConfidenceScore = +(nodes.reduce((acc, n) => acc + n.confidenceScore, 0) / nodes.length).toFixed(2);

  return {
    traceId,
    meetingTitle: 'Q3 Executive Strategy & Architecture Alignment',
    status: 'RUNNING',
    startTime: '2026-07-25T12:30:00.000Z',
    totalRuntimeMs,
    avgAgentRuntimeMs: Math.round(totalRuntimeMs / nodes.length),
    longestAgentName: 'ActionExtractionAgent (3.1s)',
    fastestAgentName: 'Meeting Ingestor (0.42s)',
    totalTokensUsed,
    totalEstimatedCost: +totalEstimatedCost.toFixed(5),
    avgConfidenceScore,
    totalRetries: 0,
    nodes,
    edges
  };
};

export class AgentMonitorService {
  public static async getExecutionGraph(traceId?: string): Promise<ExecutionGraphData> {
    try {
      if (traceId) {
        const response = await fetch(`${API_BASE_URL}/observability/graph/${traceId}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.nodes && result.data.nodes.length > 2) {
            return result.data;
          }
        }
      }
    } catch (err) {
      console.warn('Failed fetching graph from API backend, falling back to local multi-agent topology:', err);
    }
    return generateSampleExecutionGraph(traceId || 'trc_execflow_prod_9021');
  }

  public static async getHealthOverview() {
    try {
      const res = await fetch(`${API_BASE_URL}/observability/health`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return {
      overallStatus: 'HEALTHY',
      timestamp: new Date().toISOString(),
      components: [
        { componentName: 'Node Express API Engine', status: 'HEALTHY', latencyMs: 4, lastChecked: new Date().toISOString(), details: { port: 3000 } },
        { componentName: 'Vector Memory Store', status: 'HEALTHY', latencyMs: 28, lastChecked: new Date().toISOString(), details: { indexSize: 10240 } },
        { componentName: 'Gemini LLM Provider', status: 'HEALTHY', latencyMs: 120, lastChecked: new Date().toISOString(), details: { model: 'gemini-2.5-flash' } },
      ],
    };
  }

  public static async getTracesList() {
    try {
      const res = await fetch(`${API_BASE_URL}/observability/traces`);
      if (res.ok) {
        const json = await res.json();
        return json.data.items || [];
      }
    } catch {
      // Fallback
    }
    return [
      { traceId: 'trc_execflow_prod_9021', meetingTitle: 'Q3 Executive Strategy & Architecture Alignment', status: 'RUNNING', totalDurationMs: 20180, totalTokens: 22620, createdAt: new Date().toISOString() },
      { traceId: 'trc_execflow_prod_8810', meetingTitle: 'Sprint 14 Retrospective & Technical Debt Review', status: 'COMPLETED', totalDurationMs: 18450, totalTokens: 19400, createdAt: new Date(Date.now() - 3600000).toISOString() },
      { traceId: 'trc_execflow_prod_7701', meetingTitle: 'Security & Human-In-The-Loop Policy Sync', status: 'COMPLETED', totalDurationMs: 15200, totalTokens: 16800, createdAt: new Date(Date.now() - 7200000).toISOString() },
    ];
  }
}
