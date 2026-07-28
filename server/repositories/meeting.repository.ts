import { prisma } from '../config/db';
import { Meeting } from '@prisma/client';

export interface CreateMeetingDTO {
  workspaceId: string;
  title: string;
  description?: string;
  scheduledStart: Date;
  scheduledEnd?: Date;
  actualStart?: Date;
  actualEnd?: Date;
  status?: string;
  meetingUrl?: string;
  recordingUrl?: string;
  audioUrl?: string;
}

export interface SaveTranscriptSegmentDTO {
  speakerName: string;
  speakerEmail?: string;
  startTime: number;
  endTime: number;
  text: string;
  confidence?: number;
}

export interface SaveAiSummaryDTO {
  executiveSummary: string;
  keyTakeaways: string[];
  sentimentScore?: number;
  confidenceScore?: number;
  modelName?: string;
}

export class MeetingRepository {
  async findById(id: string): Promise<Meeting | null> {
    return prisma.meeting.findUnique({
      where: { id },
      include: {
        files: true,
        transcripts: {
          include: {
            speakerSegments: true,
          },
        },
        aiSummary: true,
        decisions: true,
        risks: true,
        actionItems: true,
        tasks: true,
        approvals: true,
      },
    });
  }

  async listByWorkspace(workspaceId: string): Promise<Meeting[]> {
    return prisma.meeting.findMany({
      where: { workspaceId },
      include: {
        files: true,
        aiSummary: true,
        transcripts: true,
      },
      orderBy: { scheduledStart: 'desc' },
    });
  }

  async create(data: CreateMeetingDTO): Promise<Meeting> {
    return prisma.meeting.create({
      data: {
        workspaceId: data.workspaceId,
        title: data.title,
        description: data.description,
        scheduledStart: data.scheduledStart,
        scheduledEnd: data.scheduledEnd,
        actualStart: data.actualStart,
        actualEnd: data.actualEnd,
        status: data.status || 'SCHEDULED',
        meetingUrl: data.meetingUrl,
        recordingUrl: data.recordingUrl,
        audioUrl: data.audioUrl,
      },
    });
  }

  async updateStatus(id: string, status: string): Promise<Meeting> {
    return prisma.meeting.update({
      where: { id },
      data: { status },
    });
  }

  async saveTranscript(
    meetingId: string,
    fullText: string,
    segments: SaveTranscriptSegmentDTO[],
    language = 'en',
    confidence = 0.95
  ) {
    return prisma.$transaction(async (tx) => {
      // Upsert transcript
      const transcript = await tx.transcript.upsert({
        where: { meetingId },
        create: {
          meetingId,
          fullText,
          language,
          confidence,
        },
        update: {
          fullText,
          language,
          confidence,
        },
      });

      // Clear existing speaker segments and create new ones
      await tx.speakerSegment.deleteMany({
        where: { transcriptId: transcript.id },
      });

      if (segments.length > 0) {
        await tx.speakerSegment.createMany({
          data: segments.map((s) => ({
            transcriptId: transcript.id,
            speakerName: s.speakerName,
            speakerEmail: s.speakerEmail,
            startTime: s.startTime,
            endTime: s.endTime,
            text: s.text,
            confidence: s.confidence ?? 0.95,
          })),
        });
      }

      return transcript;
    });
  }

  async saveAiSummary(meetingId: string, data: SaveAiSummaryDTO) {
    return prisma.aiSummary.upsert({
      where: { meetingId },
      create: {
        meetingId,
        executiveSummary: data.executiveSummary,
        keyTakeaways: data.keyTakeaways,
        sentimentScore: data.sentimentScore ?? 0.8,
        confidenceScore: data.confidenceScore ?? 0.96,
        modelName: data.modelName ?? 'gemini-3.6-flash',
      },
      update: {
        executiveSummary: data.executiveSummary,
        keyTakeaways: data.keyTakeaways,
        sentimentScore: data.sentimentScore ?? 0.8,
        confidenceScore: data.confidenceScore ?? 0.96,
        modelName: data.modelName ?? 'gemini-3.6-flash',
      },
    });
  }

  async saveDecisions(
    meetingId: string,
    decisions: Array<{ decision: string; category?: string; decisionMaker?: string; evidence?: string; confidence?: number }>
  ) {
    await prisma.decision.deleteMany({ where: { meetingId } });
    if (decisions.length > 0) {
      await prisma.decision.createMany({
        data: decisions.map((d) => ({
          meetingId,
          decision: d.decision,
          category: d.category || 'GENERAL',
          decisionMaker: d.decisionMaker,
          evidence: d.evidence,
          confidence: d.confidence ?? 0.95,
        })),
      });
    }
  }

  async saveRisks(
    meetingId: string,
    risks: Array<{ risk: string; severity?: string; trend?: string; owner?: string; mitigation?: string }>
  ) {
    await prisma.risk.deleteMany({ where: { meetingId } });
    if (risks.length > 0) {
      await prisma.risk.createMany({
        data: risks.map((r) => ({
          meetingId,
          risk: r.risk,
          severity: r.severity || 'MEDIUM',
          trend: r.trend || 'STABLE',
          owner: r.owner,
          mitigation: r.mitigation,
        })),
      });
    }
  }

  async saveActionItems(
    meetingId: string,
    actionItems: Array<{ title: string; description?: string; assignee?: string; dueDate?: Date; status?: string }>
  ) {
    await prisma.actionItem.deleteMany({ where: { meetingId } });
    if (actionItems.length > 0) {
      await prisma.actionItem.createMany({
        data: actionItems.map((a) => ({
          meetingId,
          title: a.title,
          description: a.description,
          assignee: a.assignee,
          dueDate: a.dueDate,
          status: a.status || 'PENDING',
        })),
      });
    }
  }

  async delete(id: string): Promise<Meeting> {
    return prisma.meeting.delete({
      where: { id },
    });
  }
}

export const meetingRepository = new MeetingRepository();
