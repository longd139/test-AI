/**
 * apps/api/src/fixtures/simulated-ownership.ts
 *
 * Isolated Training Fixture: Controlled Ownership Check & IDOR Demonstration
 *
 * CRITICAL EDUCATIONAL & ARCHITECTURAL SAFETY RULES:
 * 1. X-User-Id is strictly SIMULATED IDENTITY for testing/training, NEVER AUTHENTICATION.
 * 2. This file is strictly prohibited in production mode.
 * 3. Enforces boot-time startup assertion via assertSafeEnvironment().
 */

import { Router, Request, Response } from 'express';

export function assertSafeEnvironment(): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'FATAL SECURITY HALT: Simulated identity fixture or training vulnerability active in production mode.'
    );
  }
}

export interface TrainingTask {
  id: string;
  title: string;
  ownerId: string;
  completed: boolean;
}

// In-memory isolated training store for simulated ownership testing
export const simulatedTasksStore: Map<string, TrainingTask> = new Map([
  [
    'task-alice-1',
    {
      id: 'task-alice-1',
      title: 'Confidential Strategy M1',
      ownerId: 'user-alice',
      completed: false,
    },
  ],
  [
    'task-bob-1',
    {
      id: 'task-bob-1',
      title: 'Bob Personal Task',
      ownerId: 'user-bob',
      completed: false,
    },
  ],
]);

/**
 * Resets the in-memory training store to default state
 */
export function resetSimulatedTasksStore(): void {
  simulatedTasksStore.clear();
  simulatedTasksStore.set('task-alice-1', {
    id: 'task-alice-1',
    title: 'Confidential Strategy M1',
    ownerId: 'user-alice',
    completed: false,
  });
  simulatedTasksStore.set('task-bob-1', {
    id: 'task-bob-1',
    title: 'Bob Personal Task',
    ownerId: 'user-bob',
    completed: false,
  });
}

export function createSimulatedOwnershipRouter(): Router {
  assertSafeEnvironment();

  const router = Router();

  // Helper to extract simulated identity
  const getCallerId = (req: Request): string => {
    return (req.headers['x-user-id'] as string) || 'anonymous-user';
  };

  // List all tasks visible to current simulated user
  router.get('/tasks', (req: Request, res: Response) => {
    const callerId = getCallerId(req);
    const visibleTasks = Array.from(simulatedTasksStore.values()).filter(
      (t) => t.ownerId === callerId
    );
    res.json(visibleTasks);
  });

  // VULNERABLE ENDPOINT: Missing Ownership Check (IDOR)
  // Deletes task solely by taskId without verifying caller is owner
  router.delete('/vulnerable/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const task = simulatedTasksStore.get(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // BUG: Missing check: if (task.ownerId !== callerId) return 403
    simulatedTasksStore.delete(id);
    res.json({ message: 'Task deleted successfully (Vulnerable path - no ownership checked)' });
  });

  // SECURE ENDPOINT: Strict Ownership Check Remediated
  // Verifies that the task exists AND belongs to the calling user
  router.delete('/secure/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const callerId = getCallerId(req);
    const task = simulatedTasksStore.get(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // REMEDIATED FIX: Fail-closed ownership authorization check
    if (task.ownerId !== callerId) {
      return res.status(403).json({
        error: 'Forbidden: You do not have permission to delete this task',
        code: 'OWNERSHIP_CHECK_FAILED',
      });
    }

    simulatedTasksStore.delete(id);
    res.json({ message: 'Task deleted successfully (Secure path - ownership verified)' });
  });

  return router;
}
