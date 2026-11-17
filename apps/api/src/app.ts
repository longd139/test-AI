import express from 'express';
import cors from 'cors';
import { CreateTaskSchema, UpdateTaskSchema } from '@course4/shared';
import { prisma } from './db.js';
import { createSimulatedOwnershipRouter } from './fixtures/simulated-ownership.js';

export const app = express();

app.use(cors());
// Bound request parsing before validation to reduce oversized-input resource exhaustion.
app.use(express.json({ limit: '16kb' }));

// Strip simulated identity headers if running in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, _res, next) => {
    delete req.headers['x-user-id'];
    next();
  });
} else {
  // Mount isolated Slot 4 training fixtures in development/test only
  app.use('/api/training', createSimulatedOwnershipRouter());
}

// Health check endpoint (Sanitized response with HTTP 503 on failure)
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    // Retain internal diagnostics in server-side log only
    console.error('[Health Check Failure] Database connectivity error:', err);
    // Return fixed, sanitized error response to client
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: 'Database connection unavailable',
    });
  }
});

// GET /api/tasks - list all tasks
app.get('/api/tasks', async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    console.error('[API Error] Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET /api/tasks/:id - get single task
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('[API Error] Failed to fetch task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// POST /api/tasks - create a new task with validation
app.post('/api/tasks', async (req, res) => {
  const parseResult = CreateTaskSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: parseResult.error.issues[0]?.message || 'Invalid task input',
      details: parseResult.error.issues,
    });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title: parseResult.data.title,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('[API Error] Failed to create task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PATCH /api/tasks/:id - edit task (title or toggle completed)
app.patch('/api/tasks/:id', async (req, res) => {
  const parseResult = UpdateTaskSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: parseResult.error.issues[0]?.message || 'Invalid update input',
      details: parseResult.error.issues,
    });
  }

  try {
    const existing = await prisma.task.findUnique({
      where: { id: req.params.id },
    });
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: req.params.id },
      data: parseResult.data,
    });
    res.json(updatedTask);
  } catch (error) {
    console.error('[API Error] Failed to update task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - remove task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const existing = await prisma.task.findUnique({
      where: { id: req.params.id },
    });
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('[API Error] Failed to delete task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});
