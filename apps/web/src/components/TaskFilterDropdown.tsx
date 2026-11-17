import React from 'react';

export type FilterStatus = 'all' | 'active' | 'completed';

interface TaskFilterDropdownProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

/**
 * Option A: Compact Dropdown Menu
 * Evaluated in docs/slot-03/ui-design-decision.md.
 * Retained as an educational alternative for comparison against Option B.
 */
export const TaskFilterDropdown: React.FC<TaskFilterDropdownProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <label htmlFor="task-filter-select" className="text-sm font-medium text-slate-700">
        Filter tasks:
      </label>
      <select
        id="task-filter-select"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value as FilterStatus)}
        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Filter tasks by completion status"
      >
        <option value="all">All Tasks ({counts.all})</option>
        <option value="active">Active ({counts.active})</option>
        <option value="completed">Completed ({counts.completed})</option>
      </select>
    </div>
  );
};
