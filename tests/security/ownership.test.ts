import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../apps/api/src/app.js';
import {
  simulatedTasksStore,
  resetSimulatedTasksStore,
  assertSafeEnvironment,
} from '../../apps/api/src/fixtures/simulated-ownership.js';

describe('Slot 4 Security: Simulated Ownership & IDOR Authorization Tests', () => {
  beforeEach(() => {
    resetSimulatedTasksStore();
  });

  describe('Architectural Safeguard: assertSafeEnvironment()', () => {
    it('allows execution when NODE_ENV is test or development', () => {
      expect(() => assertSafeEnvironment()).not.toThrow();
    });

    it('halts immediately if NODE_ENV is production', () => {
      const originalEnv = process.env.NODE_ENV;
      try {
        process.env.NODE_ENV = 'production';
        expect(() => assertSafeEnvironment()).toThrow(/FATAL SECURITY HALT/);
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });
  });

  describe('Vulnerability Demonstration: Broken Object-Level Authorization (IDOR)', () => {
    it('demonstrates that the vulnerable endpoint allows Bob to delete Alice task without ownership check', async () => {
      // Alice owns task-alice-1
      expect(simulatedTasksStore.has('task-alice-1')).toBe(true);

      // Bob makes request with his own simulated identity header
      const res = await request(app)
        .delete('/api/training/vulnerable/tasks/task-alice-1')
        .set('X-User-Id', 'user-bob');

      // VULNERABLE BEHAVIOR: Deletion succeeds without ownership verification
      expect(res.status).toBe(200);
      expect(res.body.message).toContain('Vulnerable path - no ownership checked');
      expect(simulatedTasksStore.has('task-alice-1')).toBe(false);
    });
  });

  describe('Remediated Security Fix: Enforced Ownership Verification', () => {
    it('rejects Bob attempt to delete Alice task with HTTP 403 Forbidden', async () => {
      // Alice owns task-alice-1
      expect(simulatedTasksStore.has('task-alice-1')).toBe(true);

      // Bob attempts to delete Alice's task via secure endpoint
      const res = await request(app)
        .delete('/api/training/secure/tasks/task-alice-1')
        .set('X-User-Id', 'user-bob');

      // REMEDIATED BEHAVIOR: Access denied
      expect(res.status).toBe(403);
      expect(res.body.error).toContain('Forbidden: You do not have permission to delete this task');
      expect(res.body.code).toBe('OWNERSHIP_CHECK_FAILED');

      // Task remains intact in database/store
      expect(simulatedTasksStore.has('task-alice-1')).toBe(true);
    });

    it('allows Alice (the legitimate owner) to delete her own task with HTTP 200', async () => {
      const res = await request(app)
        .delete('/api/training/secure/tasks/task-alice-1')
        .set('X-User-Id', 'user-alice');

      expect(res.status).toBe(200);
      expect(res.body.message).toContain('Secure path - ownership verified');
      expect(simulatedTasksStore.has('task-alice-1')).toBe(false);
    });

    it('returns 404 if the requested task does not exist', async () => {
      const res = await request(app)
        .delete('/api/training/secure/tasks/non-existent-task')
        .set('X-User-Id', 'user-alice');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Task not found');
    });
  });
});
