import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { env } from './env';
import { logger } from './logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let client: PrismaClient;

try {
  if (globalForPrisma.prisma) {
    client = globalForPrisma.prisma;
  } else {
    const connectionString =
      env.DATABASE_URL ||
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/execflow';

    const pool = new pg.Pool({
      connectionString,
      connectionTimeoutMillis: 3000,
      idleTimeoutMillis: 10000,
    });

    // Handle pool errors gracefully without crashing the process
    pool.on('error', (err) => {
      logger.warn('PostgreSQL pool connection warning:', { error: err.message });
    });

    const adapter = new PrismaPg(pool);
    client = new PrismaClient({ adapter });

    if (env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = client;
    }
  }
} catch (err) {
  logger.warn('PrismaClient initialization fallback:', { error: String(err) });
  client = new PrismaClient({ adapter: new PrismaPg(new pg.Pool({ connectionString: 'postgresql://localhost:5432/fallback' })) });
}

export const prisma = client;

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    if (prisma) {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    }
    return false;
  } catch (error) {
    logger.warn('PostgreSQL database connection check failed:', { error: String(error) });
    return false;
  }
}
