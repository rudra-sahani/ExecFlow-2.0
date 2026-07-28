/**
 * Task Execution Domain Models
 */

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TaskAssignee {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  avatarUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  meetingId?: string;
  meetingTitle?: string;
  assignee?: TaskAssignee;
  assigneeName?: string;
  creatorId: string;
  dueDate?: string;
  completedAt?: string;
  tags: string[];
  automatedToolName?: string;
  automatedExecutionStatus?: 'IDLE' | 'EXECUTING' | 'SUCCESS' | 'FAILED';
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  meetingId?: string;
  assigneeId?: string;
  dueDate?: string;
  tags?: string[];
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
  tags?: string[];
}
