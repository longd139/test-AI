import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { TASK_TITLE_MAX_LENGTH, TaskPriority } from '@course4/shared';

interface TaskFormProps {
  onAddTask: (title: string, priority?: TaskPriority) => Promise<void>;
  isLoading: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, isLoading }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setValidationError('Title cannot be empty');
      return;
    }

    setValidationError(null);
    try {
      await onAddTask(trimmed, priority);
      setTitle('');
      setPriority('MEDIUM');
    } catch (err) {
      setValidationError(err instanceof Error ? err.message : 'Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (validationError) setValidationError(null);
          }}
          placeholder="What needs to be done?"
          disabled={isLoading}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800 disabled:bg-slate-100"
          aria-label="New task title"
          maxLength={TASK_TITLE_MAX_LENGTH}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          disabled={isLoading}
          className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 text-sm font-medium disabled:bg-slate-100"
          aria-label="Task priority"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg flex items-center gap-2 transition"
        >
          <PlusCircle size={18} />
          Add Task
        </button>
      </div>
      <p className="mt-1 text-xs text-slate-500 text-right" aria-live="polite">
        {title.length}/{TASK_TITLE_MAX_LENGTH}
      </p>
      {validationError && (
        <p className="mt-2 text-sm text-red-600 font-medium" role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
};
