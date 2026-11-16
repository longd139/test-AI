import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app } from '../src/app.js';
import { prisma } from '../src/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Task Manager API Integration Tests', () => {
  beforeEach(async () => {
    // Reset test database (test.db) before each test
    await prisma.task.deleteMany({});
    await prisma.task.createMany({
      data: [
        { title: 'Initial Test Task 1', completed: false },
        { title: 'Initial Test Task 2', completed: true },
      ],
    });
  });

  describe('Database Isolation & Safety', () => {
    it('proves tests run strictly against isolated test.db and cannot modify dev.db', async () => {
      // 1. Verify DATABASE_URL points to test database
      expect(process.env.DATABASE_URL).toContain('test.db');
      expect(process.env.DATABASE_URL).not.toContain('dev.db');

      // 2. If dev.db exists, verify its modification time is not altered by test execution
      const devDbPath = path.resolve(__dirname, '../../../prisma/dev.db');
      if (fs.existsSync(devDbPath)) {
        const statsBefore = fs.statSync(devDbPath);

        // Execute a destructive database delete in the test environment
        await prisma.task.deleteMany({});

        const statsAfter = fs.statSync(devDbPath);
        expect(statsAfter.mtimeMs).toBe(statsBefore.mtimeMs);
      }
    });
  });

  describe('GET /health', () => {
    it('returns 200 ok and connected database status when healthy', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.database).toBe('connected');
      expect(res.body.timestamp).toBeDefined();
    });

    it('returns sanitized 503 Service Unavailable when database connection fails', async () => {
      // Mock prisma.$queryRaw to simulate database disconnect
      const queryRawSpy = vi.spyOn(prisma, '$queryRaw').mockRejectedValueOnce(
        new Error('SQLITE_BUSY: database is locked at D:\\FPT\\internal\\secret\\path\\dev.db')
      );

      const res = await request(app).get('/health');
      expect(res.status).toBe(503);
      expect(res.body.status).toBe('error');
      expect(res.body.database).toBe('disconnected');
      expect(res.body.message).toBe('Database connection unavailable');
      // Assert zero internal paths or raw driver exception strings leaked to client
      expect(JSON.stringify(res.body)).not.toContain('SQLITE_BUSY');
      expect(JSON.stringify(res.body)).not.toContain('internal\\secret');

      queryRawSpy.mockRestore();
    });
  });

  describe('GET /api/tasks', () => {
    it('returns an array of seeded tasks', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('returns single task when valid ID exists', async () => {
      const tasks = await prisma.task.findMany({});
      const target = tasks[0];

      const res = await request(app).get(`/api/tasks/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(target.id);
      expect(res.body.title).toBe(target.title);
    });

    it('returns 404 Not Found when task ID does not exist', async () => {
      const res = await request(app).get('/api/tasks/non-existent-uuid-1234');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Task not found');
    });
  });

  describe('POST /api/tasks', () => {
    it('creates a new task with a valid title and persists it across fresh requests', async () => {
      const postRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Learn Controlled AI Development' });
      expect(postRes.status).toBe(201);
      expect(postRes.body.title).toBe('Learn Controlled AI Development');
      expect(postRes.body.completed).toBe(false);
      expect(typeof postRes.body.id).toBe('string');

      // Persistence check: verify fresh GET request returns the persisted task
      const getRes = await request(app).get('/api/tasks');
      expect(getRes.status).toBe(200);
      const found = getRes.body.find((t: { id: string }) => t.id === postRes.body.id);
      expect(found).toBeDefined();
      expect(found.title).toBe('Learn Controlled AI Development');
    });

    it('rejects empty title with 400 Bad Request', async () => {
      const res = await request(app).post('/api/tasks').send({ title: '' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Title cannot be empty');
    });

    it('rejects whitespace-only title with 400 Bad Request', async () => {
      const res = await request(app).post('/api/tasks').send({ title: '     ' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Title cannot be empty');
    });

    it('preserves the database when whitespace-only creation is rejected', async () => {
      const countBefore = await prisma.task.count();
      const res = await request(app).post('/api/tasks').send({ title: '     ' });
      const countAfter = await prisma.task.count();

      expect({ status: res.status, rowDelta: countAfter - countBefore }).toEqual({
        status: 400,
        rowDelta: 0,
      });
    });

    it('rejects missing title property with 400 Bad Request', async () => {
      const res = await request(app).post('/api/tasks').send({});
      expect(res.status).toBe(400);
    });

    it('rejects titles longer than 120 characters with 400 Bad Request', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'x'.repeat(121) });
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('120 characters or fewer');
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('edits an existing task title', async () => {
      const tasks = await prisma.task.findMany({});
      const target = tasks[0];

      const res = await request(app)
        .patch(`/api/tasks/${target.id}`)
        .send({ title: 'Updated Title' });
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Title');
    });

    it('toggles task completed status (false -> true)', async () => {
      const tasks = await prisma.task.findMany({ where: { completed: false } });
      const target = tasks[0];

      const res = await request(app)
        .patch(`/api/tasks/${target.id}`)
        .send({ completed: true });
      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
    });

    it('reopens task from completed to pending (true -> false transition)', async () => {
      const tasks = await prisma.task.findMany({ where: { completed: true } });
      const target = tasks[0];

      const res = await request(app)
        .patch(`/api/tasks/${target.id}`)
        .send({ completed: false });
      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(false);
    });

    it('rejects whitespace-only title on update with 400 Bad Request', async () => {
      const tasks = await prisma.task.findMany({});
      const target = tasks[0];

      const res = await request(app)
        .patch(`/api/tasks/${target.id}`)
        .send({ title: '   ' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Title cannot be empty');
    });

    it('returns 404 when updating non-existent task', async () => {
      const res = await request(app)
        .patch('/api/tasks/non-existent-uuid')
        .send({ title: 'Ghost' });
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Task not found');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('deletes an existing task', async () => {
      const tasks = await prisma.task.findMany({});
      const target = tasks[0];

      const res = await request(app).delete(`/api/tasks/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toContain('deleted successfully');

      const check = await prisma.task.findUnique({ where: { id: target.id } });
      expect(check).toBeNull();
    });

    it('returns 404 when deleting non-existent task', async () => {
      const res = await request(app).delete('/api/tasks/non-existent-uuid');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Task not found');
    });
  });
});
