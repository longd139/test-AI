import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function reset() {
  console.log('Resetting SQLite database to clean baseline...');
  await prisma.task.deleteMany({});

  const initialTasks = [
    { title: 'Read Course Syllabus and Setup Guide', completed: true },
    { title: 'Clone repository and install dependencies', completed: true },
    { title: 'Run local development server', completed: false },
    { title: 'Inspect Task Manager codebase with AI', completed: false },
    { title: 'Draft Problem Statement and PRD v1', completed: false },
  ];

  for (const t of initialTasks) {
    await prisma.task.create({ data: t });
  }

  const count = await prisma.task.count();
  console.log(`Database reset complete: ${count} tasks seeded.`);
}

reset()
  .catch((err) => {
    console.error('Reset failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
