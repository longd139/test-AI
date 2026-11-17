import React from 'react';

export type FilterStatus = 'all' | 'active' | 'completed';

interface TaskFilterBarProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

/**
 * Option B: Segmented Pill Filter Bar (Selected Production Component)
 * Designed for WCAG 2.1 AA accessibility, keyboard operability, and real-time state feedback.
 */
export const TaskFilterBar: React.FC<TaskFilterBarProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  const filters: { id: FilterStatus; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <nav
      className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3"
      aria-label="Task view filter"
    >
      <div
        role="tablist"
        aria-label="Filter tasks by completion status"
        className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl"
      >
        {filters.map(({ id, label, count }) => {
          const isSelected = currentFilter === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isSelected}
              aria-controls="task-list-panel"
              tabIndex={0}
              onClick={() => onFilterChange(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                isSelected
                  ? 'bg-white text-blue-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>{label}</span>
              <span
                className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-xs text-slate-500 font-medium" aria-live="polite">
        Showing: <span className="capitalize font-semibold text-slate-700">{currentFilter}</span> tasks
      </div>
    </nav>
  );
};
