import {Prisma, PrismaClient} from '@prisma/client';
import {logger} from '@/lib/common/logger/logger';

type LogEvents = 'query' | 'info' | 'warn' | 'error';

const globalForPrisma = global as unknown as { prisma: PrismaClient<Prisma.PrismaClientOptions, LogEvents> };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient<Prisma.PrismaClientOptions, LogEvents>({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'warn', emit: 'event' },
      { level: 'error', emit: 'event' },
    ],
  });

prisma.$on('query', (e: Prisma.QueryEvent) => {
  logger.info(`[Prisma Query] ${e.query} params=${e.params} duration=${e.duration}ms`);
});

prisma.$on('info', (e: Prisma.LogEvent) => logger.info(e.message));
prisma.$on('warn', (e: Prisma.LogEvent) => logger.warn(e.message));
prisma.$on('error', (e: Prisma.LogEvent) => logger.error(e.message));

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

logger.info('✅ PrismaClient initialized with Winston logging only');
