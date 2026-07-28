import { apiClient } from './api';
import { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '../types/task';
import { APIQueryParams, PaginatedResponse } from '../types/api';

export const taskService = {
  async getTasks(params?: APIQueryParams): Promise<PaginatedResponse<Task>> {
    return apiClient.get<PaginatedResponse<Task>>('/tasks', { params });
  },

  async getTaskById(id: string): Promise<Task> {
    return apiClient.get<Task>(`/tasks/${id}`);
  },

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    return apiClient.post<Task, CreateTaskPayload>('/tasks', payload);
  },

  async updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
    return apiClient.patch<Task, UpdateTaskPayload>(`/tasks/${id}`, payload);
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return apiClient.patch<Task, { status: TaskStatus }>(`/tasks/${id}/status`, { status });
  },

  async deleteTask(id: string): Promise<void> {
    return apiClient.delete<void>(`/tasks/${id}`);
  },

  async executeAutomatedTask(id: string): Promise<{ success: boolean; result: string }> {
    return apiClient.post<{ success: boolean; result: string }>(`/tasks/${id}/execute`);
  },
};
