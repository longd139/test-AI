import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { prisma } from '../src/db.js';

describe('Task Manager API Integration Tests', () => {
  beforeEach(async () => {
    // Reset test database before each run
    await prisma.task.deleteMany({});
    await prisma.task.createMany({
      data: [
        { title: 'Initial Test Task 1', completed: false },
        { title: 'Initial Test Task 2', completed: true },
      ],
    });
  });

  describe('GET /health', () => {
    it('returns 200 ok and connected database status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.database).toBe('connected');
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

  describe('POST /api/tasks', () => {
    it('creates a new task with a valid title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Learn Controlled AI Development' });
      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Learn Controlled AI Development');
      expect(res.body.completed).toBe(false);
      expect(typeof res.body.id).toBe('string');
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

    it('rejects missing title property with 400 Bad Request', async () => {
      const res = await request(app).post('/api/tasks').send({});
      expect(res.status).toBe(400);
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

    it('toggles task completed status', async () => {
      const tasks = await prisma.task.findMany({ where: { completed: false } });
      const target = tasks[0];

      const res = await request(app)
        .patch(`/api/tasks/${target.id}`)
        .send({ completed: true });
      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
    });

    it('rejects whitespace-only title on update', async () => {
      const tasks = await prisma.task.findMany({});
      const target = tasks[0];

      const res = await request(app)
        .patch(`/api/tasks/${target.id}`)
        .send({ title: '   ' });
      expect(res.status).toBe(400);
    });

    it('returns 404 when updating non-existent task', async () => {
      const res = await request(app)
        .patch('/api/tasks/non-existent-uuid')
        .send({ title: 'Ghost' });
      expect(res.status).toBe(404);
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
    });
  });
});
