import React, { useState } from 'react';
import { Task, TASK_TITLE_MAX_LENGTH } from '@course4/shared';
import { Check, Edit2, Trash2, X } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onEditTitle: (id: string, newTitle: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const priorityColors: Record<string, string> = {
  HIGH: 'bg-red-100 text-red-700 border-red-200',
  MEDIUM: 'bg-amber-100 text-amber-700 border-amber-200',
  LOW: 'bg-blue-100 text-blue-700 border-blue-200',
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEditTitle,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setError('Title cannot be empty');
      return;
    }

    try {
      setError(null);
      await onEditTitle(task.id, trimmed);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setError(null);
    setIsEditing(false);
  };

  return (
    <li className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow transition flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'completed'}`}
          />
          {isEditing ? (
            <div className="flex-1 flex gap-2 items-center">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                maxLength={TASK_TITLE_MAX_LENGTH}
                aria-label={`Edit title for ${task.title}`}
              />
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-700"
                title="Save"
              >
                <Check size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-slate-400 hover:text-slate-600"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={`text-slate-800 break-words flex-1 ${
                  task.completed ? 'line-through text-slate-400' : ''
                }`}
              >
                {task.title}
              </span>
              <span
                data-testid={`task-priority-${task.id}`}
                className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                  priorityColors[task.priority || 'MEDIUM'] || priorityColors.MEDIUM
                }`}
              >
                {task.priority || 'MEDIUM'}
              </span>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-slate-500 hover:text-blue-600 rounded transition"
              title="Edit task"
              aria-label="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-slate-500 hover:text-red-600 rounded transition"
              title="Delete task"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 font-medium pl-8" role="alert">
          {error}
        </p>
      )}
    </li>
  );
};
