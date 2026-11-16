import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>;
  isLoading: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, isLoading }) => {
  const [title, setTitle] = useState('');
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
      await onAddTask(trimmed);
      setTitle('');
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
        />
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg flex items-center gap-2 transition"
        >
          <PlusCircle size={18} />
          Add Task
        </button>
      </div>
      {validationError && (
        <p className="mt-2 text-sm text-red-600 font-medium" role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
};
