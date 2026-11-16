import React from 'react';
import { Task } from '@course4/shared';
import { TaskItem } from './TaskItem.js';
import { CheckCircle2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onEditTitle: (id: string, newTitle: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEditTitle,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-lg">
        <CheckCircle2 className="mx-auto text-slate-300 mb-3" size={40} />
        <h3 className="text-slate-600 font-medium">No tasks found</h3>
        <p className="text-slate-400 text-sm mt-1">
          Add your first task above to start tracking work.
        </p>
      </div>
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-3 text-sm text-slate-500 font-medium">
        <span>Tasks ({tasks.length})</span>
        <span>
          {completedCount} of {tasks.length} completed
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEditTitle={onEditTitle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};
