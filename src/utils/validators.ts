import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  workspaceName: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const meetingSchema = z.object({
  title: z.string().min(3, 'Meeting title must be at least 3 characters'),
  description: z.string().optional(),
  scheduledStartTime: z.string().min(1, 'Scheduled start time is required'),
  scheduledEndTime: z.string().optional(),
  participantEmails: z.string().optional(),
});

export type MeetingFormData = z.infer<typeof meetingSchema>;

export const taskSchema = z.object({
  title: z.string().min(2, 'Task title is required'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  dueDate: z.string().optional(),
  assigneeId: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const userProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  department: z.string().optional(),
  timezone: z.string().default('UTC'),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;
