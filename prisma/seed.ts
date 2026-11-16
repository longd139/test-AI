import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

export async function seed() {
  console.log('Seeding baseline tasks for Slot 1...');
  
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
  console.log(`Seeding complete: ${count} tasks inserted.`);
}

// Auto-run if executed directly via CLI
seed()
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
