import { prisma } from '../config/db';
import { supabase } from '../config/supabase';
import { Meeting, TranscriptSegment } from '../../src/types/meeting';
import { Task } from '../../src/types/task';
import { MemoryEntry } from '../../src/types/memory';
import { ApprovalRequest } from '../../src/types/approval';
import { logger } from '../config/logger';

export const defaultUser = {
  id: 'usr_default_execflow',
  email: 'alex.chen@execflow.ai',
  fullName: 'Alex Chen',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'admin' as const,
  workspaceId: 'ws_execflow_primary',
  department: 'Product & Engineering',
  preferences: {
    theme: 'light' as const,
    emailNotifications: true,
    pushNotifications: true,
    autoSummarizeMeetings: true,
    defaultMeetingView: 'list' as const,
    timezone: 'America/Los_Angeles',
  },
  createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
};

export const initialMeetingsData: Meeting[] = [
  {
    id: 'mtg_01',
    title: 'Q3 Product Roadmap & Architecture Strategy',
    description: 'Alignment on core AI execution engine, vector memory layer, and microservice infrastructure for Q3.',
    scheduledStartTime: new Date(Date.now() - 3600000 * 4).toISOString(),
    scheduledEndTime: new Date(Date.now() - 3600000 * 3).toISOString(),
    actualDurationSeconds: 3240,
    status: 'COMPLETED',
    organizer: {
      id: 'usr_default_execflow',
      name: 'Alex Chen',
      email: 'alex.chen@execflow.ai',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    participants: [
      { id: 'usr_default_execflow', name: 'Alex Chen', email: 'alex.chen@execflow.ai', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { id: 'usr_02', name: 'Sarah Jenkins', email: 'sarah.j@execflow.ai', avatarUrl: '' },
      { id: 'usr_03', name: 'Marcus Vance', email: 'marcus.v@execflow.ai', avatarUrl: '' },
      { id: 'usr_04', name: 'Elena Rostova', email: 'elena.r@execflow.ai', avatarUrl: '' },
    ],
    audioUrl: undefined,
    summary: {
      overview: 'Discussed Q3 technical strategy, agreed on migrating background task runners to Node/Express runtime, and established automated approval barriers for high-risk agent workflows.',
      executiveSummary: 'The executive committee reviewed the Q3 AI engineering roadmap. Primary consensus was achieved on migrating background worker threads to Express runtime on port 3000, setting tight latency SLAs (<2.5s chunk processing), and establishing mandatory human authorization bounds for high-risk database mutations.',
      meetingGoal: 'Align engineering leadership on Q3 system architecture, security guardrails, and vector memory retrieval SLAs.',
      keyOutcomes: [
        'Containerized Express server architecture finalized.',
        'Human-in-the-Loop approval bounds approved for database schema tools.',
        'Target vector retrieval SLA set to <150ms for 100k embedding indices.',
      ],
      keyDecisions: [
        'Approved full migration to containerized execution graph pipeline.',
        'Enforced Human-in-the-Loop authorization for automated database updates.',
        'Set target SLA of <2.5s for meeting transcript chunk processing.',
      ],
      nextSteps: [
        'Alex Chen to configure automated approval policy bounds in tool registry.',
        'Marcus Vance to benchmark vector memory cosine similarity latency.',
        'Sarah Jenkins to audit enterprise OAuth scope permissions.',
      ],
      openQuestions: [
        'Should we support multi-tenant vector namespaces in Q3 or defer to Q4?',
        'What is the failover strategy if Gemini API experiences transient rate limits?',
      ],
      actionItemsCount: 4,
      sentimentScore: 0.82,
      topicsCovered: ['AI Pipeline Architecture', 'Human-in-the-Loop Approvals', 'Vector Memory Storage', 'Performance SLA'],
      confidenceScore: 0.96,
      decisionsDetail: [
        {
          id: 'dec_01',
          decision: 'Migrate AI execution orchestrator to Node.js / Express backend.',
          decisionMaker: 'Alex Chen',
          reason: 'Ensures single process model on Port 3000 and standardizes server-side Gemini SDK integration.',
          evidence: 'Sarah verified Express routes responding under 150ms during stress test.',
          confidence: 0.98,
          timestamp: '00:18',
        },
        {
          id: 'dec_02',
          decision: 'Mandate Human-in-the-Loop approval for database mutation tools.',
          decisionMaker: 'Sarah Jenkins',
          reason: 'Prevents autonomous agents from modifying production tables without explicit administrator consent.',
          evidence: 'Marcus raised security risk regarding uncontrolled schema migration scripts.',
          confidence: 0.95,
          timestamp: '00:42',
        },
      ],
      risks: [
        {
          id: 'rsk_01',
          title: 'Unbounded Agent Database Execution',
          description: 'Risk of unauthorized schema mutations without explicit human approval gate.',
          severity: 'HIGH',
          likelihood: 'MEDIUM',
          mitigationPlan: 'Implement mandatory Human-in-the-Loop approval step for all DDL operations.',
          owner: 'Alex Chen',
        },
      ],
    },
    workspaceId: 'ws_execflow_primary',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
];

export const initialTasksData: Task[] = [
  {
    id: 'tsk_01',
    title: 'Configure Human-in-the-Loop approval rules for DB Schema updates',
    description: 'Set explicit permission bounds in agent policy configuration before enabling autonomous execution.',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    meetingId: 'mtg_01',
    meetingTitle: 'Q3 Product Roadmap & Architecture Strategy',
    assignee: {
      id: 'usr_default_execflow',
      name: 'Alex Chen',
      email: 'alex.chen@execflow.ai',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    creatorId: 'usr_default_execflow',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    tags: ['Security', 'Approvals', 'Architecture'],
    workspaceId: 'ws_execflow_primary',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialMemoryData: MemoryEntry[] = [
  {
    id: 'mem_01',
    workspaceId: 'ws_execflow_primary',
    category: 'DECISION',
    content: 'All database mutation agents must go through Human-in-the-Loop approval gates.',
    sourceMeetingId: 'mtg_01',
    sourceMeetingTitle: 'Q3 Product Roadmap & Architecture Strategy',
    relevanceScore: 0.98,
    tags: ['Security', 'Database', 'Agent Policy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialApprovalsData: ApprovalRequest[] = [
  {
    id: 'app_01',
    traceId: 'trc_99812',
    meetingId: 'mtg_01',
    proposedAction: {
      type: 'EXECUTE_DATABASE_MIGRATION',
      explanation: 'Autonomous agent requested execution of SQL index optimization script on production table',
      parameters: { indexName: 'idx_transcripts_meeting_id', tableName: 'transcripts' },
      potentialImpact: 'Brief lock on transcripts table (<50ms)',
      riskLevel: 'MEDIUM',
    },
    status: 'PENDING',
    requestedByAgent: 'ExecFlow DB Optimizer Agent v1.2',
    requestedAt: new Date(Date.now() - 1800000).toISOString(),
    workspaceId: 'ws_execflow_primary',
  },
];

class DbStore {
  private isSeeded = false;

  constructor() {
    this.seedPrismaIfEmpty().catch((err) => {
      logger.warn('Initial Prisma seeding check failed:', { error: String(err) });
    });
  }

  /**
   * Seeds initial data directly into Prisma (PostgreSQL) if empty.
   */
  async seedPrismaIfEmpty() {
    if (this.isSeeded) return;

    try {
      // Check if profile exists
      const profileCount = await prisma.profile.count();
      if (profileCount === 0) {
        logger.info('[Prisma] Database empty, auto-seeding core records...');

        // 1. Create Organization & Workspace
        const org = await prisma.organization.upsert({
          where: { slug: 'execflow-org' },
          update: {},
          create: { name: 'ExecFlow Organization', slug: 'execflow-org' },
        });

        const ws = await prisma.workspace.upsert({
          where: { slug: 'execflow-primary' },
          update: {},
          create: {
            id: 'ws_execflow_primary',
            name: 'ExecFlow Primary Workspace',
            slug: 'execflow-primary',
            organizationId: org.id,
          },
        });

        // 2. Create Profile
        const profile = await prisma.profile.upsert({
          where: { id: defaultUser.id },
          update: {},
          create: {
            id: defaultUser.id,
            email: defaultUser.email,
            fullName: defaultUser.fullName,
            avatarUrl: defaultUser.avatarUrl,
            role: 'ADMIN',
            department: defaultUser.department,
            jobTitle: 'Executive Leader',
          },
        });

        // Add to workspace
        await prisma.workspaceMember.upsert({
          where: { workspaceId_profileId: { workspaceId: ws.id, profileId: profile.id } },
          update: {},
          create: { workspaceId: ws.id, profileId: profile.id, role: 'ADMIN' },
        });

        // 3. Seed Meetings
        for (const mtg of initialMeetingsData) {
          await prisma.meeting.upsert({
            where: { id: mtg.id },
            update: {},
            create: {
              id: mtg.id,
              workspaceId: ws.id,
              title: mtg.title,
              description: mtg.description,
              scheduledStart: new Date(mtg.scheduledStartTime),
              scheduledEnd: new Date(mtg.scheduledEndTime),
              status: mtg.status,
              aiSummary: mtg.summary
                ? {
                    create: {
                      executiveSummary: mtg.summary.executiveSummary,
                      keyTakeaways: mtg.summary.keyOutcomes,
                      sentimentScore: mtg.summary.sentimentScore,
                      confidenceScore: mtg.summary.confidenceScore,
                      modelName: 'gemini-2.5-flash',
                    },
                  }
                : undefined,
            },
          });

          // Seed Transcripts
          const transcript = await prisma.transcript.upsert({
            where: { meetingId: mtg.id },
            update: {},
            create: {
              meetingId: mtg.id,
              fullText: "Welcome everyone to today's ExecFlow synchronization. Let's review our architecture migration and AI pipeline status.",
              language: 'en',
              confidence: 0.98,
            },
          });

          await prisma.speakerSegment.createMany({
            data: [
              {
                transcriptId: transcript.id,
                speakerName: 'Alex Chen',
                speakerEmail: 'alex.chen@execflow.ai',
                startTime: 0,
                endTime: 15,
                text: "Welcome everyone to today's ExecFlow synchronization. Let's review our architecture migration and AI pipeline status.",
                confidence: 0.98,
              },
              {
                transcriptId: transcript.id,
                speakerName: 'Sarah Jenkins',
                speakerEmail: 'sarah.j@execflow.ai',
                startTime: 16,
                endTime: 38,
                text: 'We have verified the Express server routes and confirmed all vector memory search queries are responding under 150ms.',
                confidence: 0.95,
              },
            ],
          });
        }

        // 4. Seed Tasks
        for (const task of initialTasksData) {
          await prisma.task.upsert({
            where: { id: task.id },
            update: {},
            create: {
              id: task.id,
              workspaceId: ws.id,
              createdById: profile.id,
              title: task.title,
              description: task.description,
              priority: task.priority,
              status: task.status,
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
              meetingId: task.meetingId,
            },
          });
        }

        // 5. Seed Memory
        for (const mem of initialMemoryData) {
          await prisma.memory.upsert({
            where: { id: mem.id },
            update: {},
            create: {
              id: mem.id,
              workspaceId: ws.id,
              category: mem.category,
              content: mem.content,
              sourceMeetingId: mem.sourceMeetingId,
              sourceMeetingTitle: mem.sourceMeetingTitle,
              relevanceScore: mem.relevanceScore,
              tags: mem.tags,
            },
          });
        }

        // 6. Seed Approvals
        for (const app of initialApprovalsData) {
          await prisma.approval.upsert({
            where: { id: app.id },
            update: {},
            create: {
              id: app.id,
              approverId: profile.id,
              title: app.proposedAction.explanation,
              description: app.proposedAction.potentialImpact,
              meetingId: app.meetingId,
              status: app.status,
              payload: JSON.stringify(app.proposedAction),
            },
          });
        }

        logger.info('[Prisma] Database auto-seeded successfully.');
      }
      this.isSeeded = true;
    } catch (err) {
      logger.warn('[Prisma] Auto-seeding warning:', { error: String(err) });
    }
  }

  // MEETINGS QUERIES
  async getMeetings(search?: string, status?: string, workspaceId?: string): Promise<Meeting[]> {
    await this.seedPrismaIfEmpty();

    try {
      const dbMeetings = await prisma.meeting.findMany({
        where: {
          ...(workspaceId ? { workspaceId } : {}),
          ...(status ? { status } : {}),
          ...(search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {}),
        },
        include: {
          files: true,
          transcripts: {
            include: { speakerSegments: true },
          },
          aiSummary: true,
          decisions: true,
          actionItems: true,
        },
        orderBy: { scheduledStart: 'desc' },
      });

      return dbMeetings.map((m) => ({
        id: m.id,
        title: m.title,
        description: m.description || '',
        scheduledStartTime: m.scheduledStart.toISOString(),
        scheduledEndTime: m.scheduledEnd?.toISOString() || new Date().toISOString(),
        actualDurationSeconds: 1800,
        status: m.status as any,
        organizer: {
          id: defaultUser.id,
          name: defaultUser.fullName,
          email: defaultUser.email,
          avatarUrl: defaultUser.avatarUrl,
        },
        participants: [
          {
            id: defaultUser.id,
            name: defaultUser.fullName,
            email: defaultUser.email,
            avatarUrl: defaultUser.avatarUrl,
          },
        ],
        summary: m.aiSummary
          ? {
              overview: m.aiSummary.executiveSummary,
              executiveSummary: m.aiSummary.executiveSummary,
              keyDecisions: m.decisions.map((d) => d.decision),
              actionItemsCount: m.actionItems.length,
              sentimentScore: m.aiSummary.sentimentScore,
              topicsCovered: m.aiSummary.keyTakeaways,
              confidenceScore: m.aiSummary.confidenceScore,
            }
          : undefined,
        workspaceId: m.workspaceId,
        createdAt: m.createdAt.toISOString(),
        updatedAt: m.updatedAt.toISOString(),
      }));
    } catch (err) {
      logger.error('Failed to get meetings from Prisma:', { error: String(err) });
      return [];
    }
  }

  async getMeetingById(id: string): Promise<Meeting | null> {
    const list = await this.getMeetings();
    return list.find((m) => m.id === id) || null;
  }

  async createMeeting(data: Partial<Meeting>): Promise<Meeting> {
    await this.seedPrismaIfEmpty();

    const meetingId = data.id || `mtg_${Date.now()}`;
    const wsId = data.workspaceId || defaultUser.workspaceId;

    try {
      const created = await prisma.meeting.create({
        data: {
          id: meetingId,
          workspaceId: wsId,
          title: data.title || 'Untitled Meeting',
          description: data.description || '',
          scheduledStart: data.scheduledStartTime ? new Date(data.scheduledStartTime) : new Date(),
          scheduledEnd: data.scheduledEndTime ? new Date(data.scheduledEndTime) : new Date(Date.now() + 3600000),
          status: data.status || 'SCHEDULED',
        },
      });

      return {
        id: created.id,
        title: created.title,
        description: created.description || '',
        scheduledStartTime: created.scheduledStart.toISOString(),
        scheduledEndTime: created.scheduledEnd?.toISOString() || new Date().toISOString(),
        actualDurationSeconds: 0,
        status: created.status as any,
        organizer: data.organizer || {
          id: defaultUser.id,
          name: defaultUser.fullName,
          email: defaultUser.email,
          avatarUrl: defaultUser.avatarUrl,
        },
        participants: data.participants || [
          {
            id: defaultUser.id,
            name: defaultUser.fullName,
            email: defaultUser.email,
            avatarUrl: defaultUser.avatarUrl,
          },
        ],
        workspaceId: created.workspaceId,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      };
    } catch (err) {
      logger.error('Failed to create meeting in Prisma:', { error: String(err) });
      throw err;
    }
  }

  async updateMeeting(id: string, data: Partial<Meeting>): Promise<Meeting | null> {
    try {
      const updated = await prisma.meeting.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.status && { status: data.status }),
        },
      });
      return this.getMeetingById(updated.id);
    } catch (err) {
      logger.error('Failed to update meeting in Prisma:', { error: String(err) });
      return null;
    }
  }

  async deleteMeeting(id: string): Promise<void> {
    try {
      await prisma.meeting.delete({ where: { id } });
    } catch (err) {
      logger.error('Failed to delete meeting in Prisma:', { error: String(err) });
    }
  }

  // TRANSCRIPT QUERIES
  async getTranscript(meetingId: string): Promise<TranscriptSegment[]> {
    try {
      const transcript = await prisma.transcript.findUnique({
        where: { meetingId },
        include: { speakerSegments: true },
      });

      if (transcript && transcript.speakerSegments.length > 0) {
        return transcript.speakerSegments.map((s) => ({
          id: s.id,
          meetingId,
          speakerName: s.speakerName,
          speakerEmail: s.speakerEmail || '',
          startTimeSeconds: s.startTime,
          endTimeSeconds: s.endTime,
          text: s.text,
          confidence: s.confidence,
          language: transcript.language,
        }));
      }
      return [];
    } catch (err) {
      logger.error('Failed to get transcript from Prisma:', { error: String(err) });
      return [];
    }
  }

  async addTranscriptSegment(meetingId: string, segment: Partial<TranscriptSegment>): Promise<TranscriptSegment> {
    try {
      let transcript = await prisma.transcript.findUnique({ where: { meetingId } });
      if (!transcript) {
        transcript = await prisma.transcript.create({
          data: {
            meetingId,
            fullText: segment.text || '',
            confidence: segment.confidence ?? 0.95,
          },
        });
      }

      const newSeg = await prisma.speakerSegment.create({
        data: {
          transcriptId: transcript.id,
          speakerName: segment.speakerName || 'Participant',
          speakerEmail: segment.speakerEmail || '',
          startTime: segment.startTimeSeconds ?? 0,
          endTime: segment.endTimeSeconds ?? 0,
          text: segment.text || '',
          confidence: segment.confidence ?? 0.95,
        },
      });

      return {
        id: newSeg.id,
        meetingId,
        speakerName: newSeg.speakerName,
        speakerEmail: newSeg.speakerEmail || '',
        startTimeSeconds: newSeg.startTime,
        endTimeSeconds: newSeg.endTime,
        text: newSeg.text,
        confidence: newSeg.confidence,
        language: 'en',
      };
    } catch (err) {
      logger.error('Failed to add transcript segment in Prisma:', { error: String(err) });
      throw err;
    }
  }

  // TASKS QUERIES
  async getTasks(search?: string, status?: string, priority?: string, workspaceId?: string): Promise<Task[]> {
    await this.seedPrismaIfEmpty();

    try {
      const tasks = await prisma.task.findMany({
        where: {
          ...(workspaceId ? { workspaceId } : {}),
          ...(status ? { status } : {}),
          ...(priority ? { priority } : {}),
          ...(search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {}),
        },
        include: {
          createdBy: true,
          assignments: {
            include: { profile: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return tasks.map((t) => ({
        id: t.id,
        workspaceId: t.workspaceId,
        meetingId: t.meetingId || undefined,
        title: t.title,
        description: t.description || '',
        priority: t.priority as any,
        status: t.status as any,
        assignee: t.assignments[0]?.profile
          ? {
              id: t.assignments[0].profile.id,
              name: t.assignments[0].profile.fullName || 'User',
              email: t.assignments[0].profile.email,
              avatarUrl: t.assignments[0].profile.avatarUrl || '',
            }
          : {
              id: defaultUser.id,
              name: defaultUser.fullName,
              email: defaultUser.email,
              avatarUrl: defaultUser.avatarUrl,
            },
        creatorId: t.createdById,
        dueDate: t.dueDate?.toISOString(),
        tags: ['General'],
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      }));
    } catch (err) {
      logger.error('Failed to get tasks from Prisma:', { error: String(err) });
      return [];
    }
  }

  async getTaskById(id: string): Promise<Task | null> {
    const tasks = await this.getTasks();
    return tasks.find((t) => t.id === id) || null;
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    await this.seedPrismaIfEmpty();

    try {
      const created = await prisma.task.create({
        data: {
          id: data.id || `tsk_${Date.now()}`,
          workspaceId: data.workspaceId || defaultUser.workspaceId,
          createdById: data.creatorId || defaultUser.id,
          title: data.title || 'New Action Item',
          description: data.description || '',
          priority: data.priority || 'MEDIUM',
          status: data.status || 'PENDING',
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
          meetingId: data.meetingId,
        },
      });

      return {
        id: created.id,
        workspaceId: created.workspaceId,
        meetingId: created.meetingId || undefined,
        title: created.title,
        description: created.description || '',
        priority: created.priority as any,
        status: created.status as any,
        assignee: data.assignee || {
          id: defaultUser.id,
          name: defaultUser.fullName,
          email: defaultUser.email,
          avatarUrl: defaultUser.avatarUrl,
        },
        creatorId: created.createdById,
        dueDate: created.dueDate?.toISOString(),
        tags: ['General'],
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      };
    } catch (err) {
      logger.error('Failed to create task in Prisma:', { error: String(err) });
      throw err;
    }
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task | null> {
    try {
      const updated = await prisma.task.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.priority && { priority: data.priority }),
          ...(data.status && { status: data.status }),
          ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
        },
      });
      return this.getTaskById(updated.id);
    } catch (err) {
      logger.error('Failed to update task in Prisma:', { error: String(err) });
      return null;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await prisma.task.delete({ where: { id } });
    } catch (err) {
      logger.error('Failed to delete task in Prisma:', { error: String(err) });
    }
  }

  // MEMORY QUERIES
  async getMemories(category?: string, search?: string, workspaceId?: string): Promise<MemoryEntry[]> {
    await this.seedPrismaIfEmpty();

    try {
      const memories = await prisma.memory.findMany({
        where: {
          ...(workspaceId ? { workspaceId } : {}),
          ...(category ? { category } : {}),
          ...(search
            ? {
                OR: [
                  { content: { contains: search, mode: 'insensitive' } },
                  { sourceMeetingTitle: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {}),
        },
        orderBy: { createdAt: 'desc' },
      });

      return memories.map((m) => ({
        id: m.id,
        workspaceId: m.workspaceId,
        category: m.category as any,
        content: m.content,
        sourceMeetingId: m.sourceMeetingId || undefined,
        sourceMeetingTitle: m.sourceMeetingTitle || undefined,
        relevanceScore: m.relevanceScore,
        tags: m.tags,
        createdAt: m.createdAt.toISOString(),
        updatedAt: m.createdAt.toISOString(),
      }));
    } catch (err) {
      logger.error('Failed to get memories from Prisma:', { error: String(err) });
      return [];
    }
  }

  async addMemory(data: Partial<MemoryEntry>): Promise<MemoryEntry> {
    await this.seedPrismaIfEmpty();

    try {
      const created = await prisma.memory.create({
        data: {
          id: data.id || `mem_${Date.now()}`,
          workspaceId: data.workspaceId || defaultUser.workspaceId,
          category: data.category || 'DECISION',
          content: data.content || '',
          sourceMeetingId: data.sourceMeetingId,
          sourceMeetingTitle: data.sourceMeetingTitle,
          relevanceScore: data.relevanceScore ?? 0.95,
          tags: data.tags || [],
        },
      });

      return {
        id: created.id,
        workspaceId: created.workspaceId,
        category: created.category as any,
        content: created.content,
        sourceMeetingId: created.sourceMeetingId || undefined,
        sourceMeetingTitle: created.sourceMeetingTitle || undefined,
        relevanceScore: created.relevanceScore,
        tags: created.tags,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.createdAt.toISOString(),
      };
    } catch (err) {
      logger.error('Failed to add memory in Prisma:', { error: String(err) });
      throw err;
    }
  }

  async deleteMemory(id: string): Promise<void> {
    try {
      await prisma.memory.delete({ where: { id } });
    } catch (err) {
      logger.error('Failed to delete memory in Prisma:', { error: String(err) });
    }
  }

  // APPROVALS QUERIES
  async getApprovals(status?: string, workspaceId?: string): Promise<ApprovalRequest[]> {
    await this.seedPrismaIfEmpty();

    try {
      const approvals = await prisma.approval.findMany({
        where: {
          ...(status ? { status } : {}),
        },
        orderBy: { createdAt: 'desc' },
      });

      return approvals.map((a) => {
        let proposedAction: any = {
          type: 'AGENT_ACTION',
          explanation: a.title,
          potentialImpact: a.description,
          riskLevel: 'MEDIUM',
        };
        if (a.payload) {
          try {
            proposedAction = JSON.parse(a.payload);
          } catch {
            // fallback
          }
        }

        return {
          id: a.id,
          traceId: `trc_${a.id}`,
          meetingId: a.meetingId || 'mtg_01',
          proposedAction,
          status: a.status as any,
          requestedByAgent: 'ExecFlow Agent',
          requestedAt: a.createdAt.toISOString(),
          decidedAt: a.decidedAt?.toISOString(),
          workspaceId: workspaceId || defaultUser.workspaceId,
        };
      });
    } catch (err) {
      logger.error('Failed to get approvals from Prisma:', { error: String(err) });
      return [];
    }
  }

  async getApprovalById(id: string): Promise<ApprovalRequest | null> {
    const list = await this.getApprovals();
    return list.find((a) => a.id === id) || null;
  }

  async createApproval(data: Partial<ApprovalRequest>): Promise<ApprovalRequest> {
    await this.seedPrismaIfEmpty();

    try {
      const created = await prisma.approval.create({
        data: {
          id: data.id || `app_${Date.now()}`,
          approverId: defaultUser.id,
          title: data.proposedAction?.explanation || 'Pending Approval Action',
          description: data.proposedAction?.potentialImpact || 'Requires review',
          meetingId: data.meetingId,
          status: data.status || 'PENDING',
          payload: data.proposedAction ? JSON.stringify(data.proposedAction) : null,
        },
      });

      return {
        id: created.id,
        traceId: `trc_${created.id}`,
        meetingId: created.meetingId || 'mtg_01',
        proposedAction: data.proposedAction || {
          type: 'AGENT_ACTION',
          explanation: created.title,
          potentialImpact: created.description,
          riskLevel: 'MEDIUM',
        },
        status: created.status as any,
        requestedByAgent: 'ExecFlow Agent',
        requestedAt: created.createdAt.toISOString(),
        workspaceId: data.workspaceId || defaultUser.workspaceId,
      };
    } catch (err) {
      logger.error('Failed to create approval in Prisma:', { error: String(err) });
      throw err;
    }
  }

  async updateApproval(
    id: string,
    status: 'APPROVED' | 'REJECTED',
    notes?: string
  ): Promise<ApprovalRequest | null> {
    try {
      const updated = await prisma.approval.update({
        where: { id },
        data: {
          status,
          decidedAt: new Date(),
        },
      });
      return this.getApprovalById(updated.id);
    } catch (err) {
      logger.error('Failed to update approval in Prisma:', { error: String(err) });
      return null;
    }
  }

  async getProfileByEmailOrUsername(identifier: string) {
    try {
      return await prisma.profile.findFirst({
        where: {
          OR: [{ email: identifier }, { id: identifier }],
        },
      });
    } catch {
      return null;
    }
  }

  async upsertProfile(data: any) {
    try {
      return await prisma.profile.upsert({
        where: { email: data.email || defaultUser.email },
        update: {
          fullName: data.fullName,
          avatarUrl: data.avatarUrl,
          department: data.department,
          role: data.role || 'MEMBER',
        },
        create: {
          id: data.id || `usr_${Date.now()}`,
          email: data.email || defaultUser.email,
          fullName: data.fullName || defaultUser.fullName,
          avatarUrl: data.avatarUrl,
          department: data.department,
          role: data.role || 'MEMBER',
        },
      });
    } catch (err) {
      logger.error('Failed to upsert profile in Prisma:', { error: String(err) });
      return null;
    }
  }

  async addApproval(data: Partial<ApprovalRequest>): Promise<ApprovalRequest> {
    return this.createApproval(data);
  }
}

export const dbStore = new DbStore();
