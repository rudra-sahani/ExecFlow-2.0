import { apiClient } from './api';
import {
  CreateMeetingPayload,
  Meeting,
  TranscriptSegment,
  UpdateMeetingPayload,
} from '../types/meeting';
import { APIQueryParams, PaginatedResponse } from '../types/api';

export const meetingService = {
  async getMeetings(params?: APIQueryParams): Promise<PaginatedResponse<Meeting>> {
    return apiClient.get<PaginatedResponse<Meeting>>('/meetings', { params });
  },

  async getMeetingById(id: string): Promise<Meeting> {
    return apiClient.get<Meeting>(`/meetings/${id}`);
  },

  async createMeeting(payload: CreateMeetingPayload): Promise<Meeting> {
    return apiClient.post<Meeting, CreateMeetingPayload>('/meetings', payload);
  },

  async updateMeeting(id: string, payload: UpdateMeetingPayload): Promise<Meeting> {
    return apiClient.patch<Meeting, UpdateMeetingPayload>(`/meetings/${id}`, payload);
  },

  async deleteMeeting(id: string): Promise<void> {
    return apiClient.delete<void>(`/meetings/${id}`);
  },

  async uploadAudio(meetingId: string, file: File, onProgress?: (pct: number) => void): Promise<Meeting> {
    return apiClient.upload<Meeting>(`/meetings/${meetingId}/upload-audio`, file, onProgress);
  },

  async getTranscript(meetingId: string): Promise<TranscriptSegment[]> {
    return apiClient.get<TranscriptSegment[]>(`/meetings/${meetingId}/transcript`);
  },

  async addTranscriptSegment(meetingId: string, segment: Partial<TranscriptSegment>): Promise<TranscriptSegment> {
    return apiClient.post<TranscriptSegment>(`/meetings/${meetingId}/transcript`, segment);
  },

  async triggerAIAnalysis(meetingId: string): Promise<{ traceId: string }> {
    return apiClient.post<{ traceId: string }>(`/meetings/${meetingId}/analyze`);
  },

  async sendMeetingChatMessage(meetingId: string, question: string): Promise<{ reply: string; references?: { segmentId?: string; textSnippet?: string }[] }> {
    return apiClient.post<{ reply: string; references?: { segmentId?: string; textSnippet?: string }[] }>(`/meetings/${meetingId}/chat`, { question });
  },

  async reprocessMeeting(meetingId: string): Promise<{ traceId: string }> {
    return apiClient.post<{ traceId: string }>(`/meetings/${meetingId}/analyze`);
  },
};
