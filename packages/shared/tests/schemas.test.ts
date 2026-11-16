import { describe, it, expect } from 'vitest';
import {
  CreateTaskSchema,
  TASK_TITLE_MAX_LENGTH,
  UpdateTaskSchema,
} from '../src/index.js';

describe('CreateTaskSchema', () => {
  it('accepts a valid title and trims whitespace', () => {
    const result = CreateTaskSchema.safeParse({ title: '  Set up Git repository  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('Set up Git repository');
    }
  });

  it('rejects an empty title', () => {
    const result = CreateTaskSchema.safeParse({ title: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title cannot be empty');
    }
  });

  it('rejects a whitespace-only title', () => {
    const result = CreateTaskSchema.safeParse({ title: '    ' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title cannot be empty');
    }
  });

  it('rejects missing title', () => {
    const result = CreateTaskSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('rejects a title longer than the controlled 120-character limit', () => {
    const result = CreateTaskSchema.safeParse({ title: 'x'.repeat(TASK_TITLE_MAX_LENGTH + 1) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('120 characters or fewer');
    }
  });
});

describe('UpdateTaskSchema', () => {
  it('accepts title update', () => {
    const result = UpdateTaskSchema.safeParse({ title: 'Updated Title' });
    expect(result.success).toBe(true);
  });

  it('accepts completed boolean update', () => {
    const result = UpdateTaskSchema.safeParse({ completed: true });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.completed).toBe(true);
    }
  });

  it('accepts updating both title and completed status', () => {
    const result = UpdateTaskSchema.safeParse({ title: 'New Title', completed: false });
    expect(result.success).toBe(true);
  });

  it('rejects update with whitespace-only title', () => {
    const result = UpdateTaskSchema.safeParse({ title: '   ' });
    expect(result.success).toBe(false);
  });

  it('rejects update with neither field provided', () => {
    const result = UpdateTaskSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('At least one field');
    }
  });
});
