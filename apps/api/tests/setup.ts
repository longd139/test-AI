import { PrismaClient } from '@prisma/client';

// 1. SAFETY ASSERTION: Ensure tests NEVER run against the development/instructor database
const dbUrl = process.env.DATABASE_URL || '';
if (dbUrl !== 'file:./test.db') {
  throw new Error(
    `FATAL TEST SAFETY HALT: Tests must run against an isolated test database (e.g. test.db). Current DATABASE_URL: "${dbUrl}". Aborting test execution to protect development database.`
  );
}

// 2. Create the minimal test schema through Prisma's query engine. This works in a
// clean checkout without relying on a globally resolved `npx` or an existing DB.
const bootstrapPrisma = new PrismaClient({
  datasources: { db: { url: dbUrl } },
});

try {
  await bootstrapPrisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Task" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "completed" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);
} catch (err) {
  console.error('Failed to initialize test SQLite database:', err);
  throw err;
} finally {
  await bootstrapPrisma.$disconnect();
}
