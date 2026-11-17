import { z } from 'zod';

/**
 * Slot 1 Teaching Task Schema
 * Baseline fields only: id, title, completed, createdAt, updatedAt
 * (No priority, no deadline, no user ownership in Slot 1)
 */

export const TASK_TITLE_MAX_LENGTH = 120;

export const TaskPriority = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export type TaskPriority = z.infer<typeof TaskPriority>;

const TaskTitleSchema = z
  .string({ required_error: 'Title is required' })
  .trim()
  .min(1, 'Title cannot be empty')
  .max(TASK_TITLE_MAX_LENGTH, `Title must be ${TASK_TITLE_MAX_LENGTH} characters or fewer`);

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: TaskTitleSchema,
  completed: z.boolean().default(false),
  priority: TaskPriority.default('MEDIUM'),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
});

export type Task = z.infer<typeof TaskSchema>;

/**
 * Schema for creating a new task
 * Rejects empty or whitespace-only titles with a clean error message.
 * Supports optional priority (defaults to MEDIUM).
 */
export const CreateTaskSchema = z.object({
  title: TaskTitleSchema,
  priority: TaskPriority.default('MEDIUM'),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

/**
 * Schema for updating an existing task (editing title, toggling completed, or changing priority)
 */
export const UpdateTaskSchema = z
  .object({
    title: TaskTitleSchema.optional(),
    completed: z.boolean().optional(),
    priority: TaskPriority.optional(),
  })
  .refine(
    (data) => data.title !== undefined || data.completed !== undefined || data.priority !== undefined,
    {
      message: 'At least one field (title, completed, or priority) must be provided for update',
    }
  );

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
