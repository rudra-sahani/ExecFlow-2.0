import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().optional(),
  SYNC_DATABASE_URL: z.string().optional(),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  SECRET_KEY: z.string().default('execflow-jwt-secret-dev-key-change-in-production-32bytes'),
  JWT_SECRET: z.string().default('execflow-jwt-secret-dev-key-change-in-production-32bytes'),
  JWT_REFRESH_SECRET: z.string().default('execflow-jwt-refresh-dev-key-change-in-production-32bytes'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  JWT_ISSUER: z.string().default('execflow-ai'),
  JWT_AUDIENCE: z.string().default('execflow-app'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  VITE_API_BASE_URL: z.string().default('/api/v1'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
