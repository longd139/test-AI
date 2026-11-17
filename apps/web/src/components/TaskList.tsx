import React from 'react';
import { Task } from '@course4/shared';
import { TaskItem } from './TaskItem.js';
import { CheckCircle2, ListFilter } from 'lucide-react';
import { FilterStatus } from './TaskFilterBar.js';

interface TaskListProps {
  tasks: Task[];
  totalCount: number;
  completedCount: number;
  activeFilter: FilterStatus;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onEditTitle: (id: string, newTitle: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  totalCount,
  completedCount,
  activeFilter,
  onToggleComplete,
  onEditTitle,
  onDelete,
}) => {
  if (totalCount === 0) {
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

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-slate-50 border border-slate-200 rounded-lg">
        <ListFilter className="mx-auto text-slate-400 mb-2" size={32} />
        <h3 className="text-slate-700 font-medium">
          No {activeFilter} tasks
        </h3>
        <p className="text-slate-500 text-sm mt-1">
          {activeFilter === 'active'
            ? 'Great job! All tasks are completed.'
            : 'No tasks marked as completed yet.'}
        </p>
      </div>
    );
  }

  return (
    <div id="task-list-panel" role="region" aria-label="Tasks list">
      <div className="flex justify-between items-center mb-3 text-sm text-slate-500 font-medium">
        <span>
          Showing {tasks.length} {tasks.length === totalCount ? '' : `of ${totalCount}`} tasks
        </span>
        <span>
          {completedCount} of {totalCount} completed
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
