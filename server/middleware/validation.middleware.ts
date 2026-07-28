import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export function validateRequest(schemas: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(req.query)) as any;
      }
      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(req.params)) as any;
      }
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: issues[0]?.message || 'Input validation failed',
          code: 'VALIDATION_ERROR',
          errors: issues,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: req.requestId || `req_${Date.now()}`,
          },
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Invalid request payload format',
        code: 'BAD_REQUEST',
      });
    }
  };
}

// STRICT AUTHENTICATION VALIDATION SCHEMAS
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const strongPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(100, 'Password is too long');

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid work email address'),
  password: strongPasswordSchema,
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  workspaceName: z.string().optional(),
});

export const verifyEmailSchema = z.object({
  token: z.string().optional(),
  code: z.string().optional(),
  email: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Password reset token is required'),
  newPassword: strongPasswordSchema,
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const createMeetingSchema = z.object({
  title: z.string().min(1, 'Meeting title is required'),
  description: z.string().optional(),
  scheduledStartTime: z.string().optional(),
  scheduledEndTime: z.string().optional(),
  participantEmails: z.array(z.string().email()).optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  meetingId: z.string().optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  assigneeName: z.string().optional(),
});
