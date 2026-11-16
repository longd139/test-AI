import { z } from 'zod';

/**
 * Slot 1 Teaching Task Schema
 * Baseline fields only: id, title, completed, createdAt, updatedAt
 * (No priority, no deadline, no user ownership in Slot 1)
 */

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1, 'Title cannot be empty'),
  completed: z.boolean().default(false),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
});

export type Task = z.infer<typeof TaskSchema>;

/**
 * Schema for creating a new task
 * Rejects empty or whitespace-only titles with a clean error message.
 */
export const CreateTaskSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title cannot be empty'),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

/**
 * Schema for updating an existing task (editing title or toggling completed status)
 */
export const UpdateTaskSchema = z
  .object({
    title: z.string().trim().min(1, 'Title cannot be empty').optional(),
    completed: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.completed !== undefined, {
    message: 'At least one field (title or completed) must be provided for update',
  });

export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

/**
 * Standard API Envelopes
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  details?: unknown;
}
