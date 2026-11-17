import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { CreateTaskSchema, UpdateTaskSchema } from '@course4/shared';
import { prisma } from './db.js';
import { getConfig, parseAllowedOrigins } from './config.js';
import { httpLoggerMiddleware, logger } from './logger.js';
import { createSimulatedOwnershipRouter } from './fixtures/simulated-ownership.js';

export const app = express();

const config = getConfig();
const allowedOrigins = parseAllowedOrigins(config.CORS_ORIGIN);

// Restricted CORS configuration (Slot 5 Production Hardening)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin server requests)
      if (!origin) return callback(null, true);

      // Check against explicit whitelist
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // In non-production, permit localhost origins or wildcard if configured
      if (config.NODE_ENV !== 'production' && (allowedOrigins.includes('*') || origin.startsWith('http://localhost:'))) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: Origin ${origin} not permitted`));
    },
    credentials: true,
  })
);

// Structured HTTP logging with request correlation ID (Slot 5 Slide 10)
app.use(httpLoggerMiddleware);

// Bound request parsing before validation to reduce oversized-input resource exhaustion.
app.use(express.json({ limit: '16kb' }));

// Strip simulated identity headers if running in production
if (config.NODE_ENV === 'production') {
  app.use((req, _res, next) => {
    delete req.headers['x-user-id'];
    next();
  });
} else {
  // Mount isolated Slot 4 training fixtures in development/test only
  app.use('/api/training', createSimulatedOwnershipRouter());
}

// Health check endpoint with database dependency status and incident drill support
// (Slot 5 Slides 10, 12-15)
app.get('/health', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const reqId = (req as Request & { reqId?: string }).reqId;

  // Safe and reversible incident-drill mechanism:
  // If INCIDENT_DRILL_ENABLED is active and drill trigger is present, simulate database outage
  const isDrillSimulateOutage =
    config.INCIDENT_DRILL_ENABLED &&
    (req.headers['x-incident-drill'] === 'simulate-outage' ||
      process.env.SIMULATE_DB_OUTAGE === 'true');

  if (isDrillSimulateOutage) {
    logger.warn('Educational incident drill simulated database outage triggered', {
      reqId,
      trigger: 'drill-active',
    });
    return res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: 'Database connection unavailable (Simulated incident drill)',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      reqId,
    });
  }

  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - dbStart;

    res.json({
      status: 'ok',
      database: 'connected',
      latencyMs,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
      reqId,
    });
  } catch (err: unknown) {
    // Retain internal diagnostics in server-side structured log only
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error('Health Check Failure: Database connectivity error', {
      reqId,
      error: {
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined,
      },
    });

    // Return fixed, sanitized error response to client without internal system leaks
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: 'Database connection unavailable',
      timestamp: new Date().toISOString(),
      reqId,
    });
  }
});

// GET /api/tasks - list all tasks
app.get('/api/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// GET /api/tasks/:id - get single task
app.get('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// POST /api/tasks - create a new task with validation
app.post('/api/tasks', async (req: Request, res: Response, next: NextFunction) => {
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
    next(error);
  }
});

// PATCH /api/tasks/:id - edit task (title or toggle completed)
app.patch('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  const parseResult = UpdateTaskSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: parseResult.error.issues[0]?.message || 'Invalid update input',
      details: parseResult.error.issues,
    });
  }

  try {
    const existing = await prisma.task.findUnique({
      where: { id },
    });
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: parseResult.data,
    });
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tasks/:id - remove task
app.delete('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  try {
    const existing = await prisma.task.findUnique({
      where: { id },
    });
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id },
    });
    res.json({ message: 'Task deleted successfully', id });
  } catch (error) {
    next(error);
  }
});

// Centralized Safe Error Handling Middleware (Slot 5 Slide 10)
// Server-only diagnostic errors and safe sanitized client responses
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const reqId = (req as Request & { reqId?: string }).reqId || 'req-unknown';
  const errorMessage = err instanceof Error ? err.message : String(err);
  const errorStack = err instanceof Error ? err.stack : undefined;

  // Log full diagnostic details server-side
  logger.error('Unhandled internal server error', {
    reqId,
    error: {
      message: errorMessage,
      stack: errorStack,
    },
    method: req.method,
    url: req.originalUrl || req.url,
  });

  // Client gets sanitized, safe error response without stack trace or system paths
  res.status(500).json({
    error: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
    reqId,
  });
});
