import { PrismaClient } from '@prisma/client';

const E2E_DATABASE_URL = 'file:./e2e.db';

export async function prepareE2eDatabase() {
  process.env.DATABASE_URL = E2E_DATABASE_URL;
  if (process.env.DATABASE_URL !== 'file:./e2e.db') {
    throw new Error('E2E safety halt: isolated database binding failed.');
  }

  const prisma = new PrismaClient({
    datasources: { db: { url: E2E_DATABASE_URL } },
  });

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Task" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "completed" BOOLEAN NOT NULL DEFAULT false,
        "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "Task" ADD COLUMN "priority" TEXT NOT NULL DEFAULT 'MEDIUM'`);
    } catch {
      // Column already exists, ignore
    }
    await prisma.task.deleteMany({});
  } finally {
    await prisma.$disconnect();
  }
}

export default prepareE2eDatabase;
