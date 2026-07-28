import { z } from 'zod';

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'yopmail.com',
  'guerrillamail.com', 'dispostable.com', 'trashmail.com', 'sharklasers.com',
  'getnada.com', 'throwawaymail.com', 'fakeinbox.com', 'temp-mail.org',
  'generator.email', 'inboxkitten.com', 'example.com', 'test.com', 'fake.com',
  'asdf.com', 'qwerty.com', 'foo.com', 'bar.com', 'temp.com', 'disposable.com',
  'maildrop.cc', '007.cx', '10minutemail.net', 'byom.de', 'dropmail.me'
]);

export const isStrictValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return false;

  const parts = trimmed.split('@');
  if (parts.length !== 2) return false;
  const [localPart, domainPart] = parts;

  if (!localPart || localPart.length < 2) return false;
  if (!domainPart || domainPart.length < 3) return false;

  if (DISPOSABLE_DOMAINS.has(domainPart)) return false;

  const domainParts = domainPart.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2 || !/^[a-z]+$/.test(tld)) return false;

  return true;
};

export const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .refine((val) => isStrictValidEmail(val), {
      message: 'Disposable or fake emails are not allowed. Please enter a valid work or personal email.',
    }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginValidationSchema>;

export const registerValidationSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Please enter a valid email address')
      .refine((val) => isStrictValidEmail(val), {
        message: 'Disposable or fake emails are strictly prohibited. Please use a valid personal or corporate email.',
      }),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
    workspaceName: z
      .string()
      .min(2, 'Workspace name must be at least 2 characters')
      .optional()
      .or(z.literal('')),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must agree to the terms and privacy policy',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterSchemaType = z.infer<typeof registerValidationSchema>;

export const forgotPasswordValidationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordValidationSchema>;

export const resetPasswordValidationSchema = z
  .object({
    password: z
      .string()
      .min(1, 'New password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordValidationSchema>;

export const verifyEmailValidationSchema = z.object({
  code: z
    .string()
    .length(6, 'Verification code must be exactly 6 digits')
    .regex(/^[0-9]+$/, 'Code must contain numbers only'),
});

export type VerifyEmailSchemaType = z.infer<typeof verifyEmailValidationSchema>;
