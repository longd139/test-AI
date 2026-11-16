import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../..');

// 1. SAFETY ASSERTION: Ensure tests NEVER run against the development/instructor database
const dbUrl = process.env.DATABASE_URL || '';
if (!dbUrl.includes('test.db') || dbUrl.includes('dev.db')) {
  throw new Error(
    `FATAL TEST SAFETY HALT: Tests must run against an isolated test database (e.g. test.db). Current DATABASE_URL: "${dbUrl}". Aborting test execution to protect development database.`
  );
}

// 2. Ensure test database schema is synchronized to test.db before tests run
try {
  execSync('npx prisma db push --schema=prisma/schema.prisma --skip-generate', {
    cwd: rootDir,
    env: { ...process.env, DATABASE_URL: 'file:./test.db' },
    stdio: 'ignore',
  });
} catch (err) {
  console.error('Failed to initialize test SQLite database:', err);
  throw err;
}
