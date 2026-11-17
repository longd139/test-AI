import { useEffect, useState } from 'react';
import { Task, TaskPriority } from '@course4/shared';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/client.js';
import { TaskForm } from './components/TaskForm.js';
import { TaskList } from './components/TaskList.js';
import { CheckSquare, AlertCircle, RefreshCw } from 'lucide-react';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to API server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (title: string, priority?: TaskPriority) => {
    try {
      setActionLoading(true);
      const newTask = await createTask(title, priority);
      setTasks((prev) => [newTask, ...prev]);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updated = await updateTask(id, { completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleEditTitle = async (id: string, newTitle: string) => {
    try {
      const updated = await updateTask(id, { title: newTitle });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md">
            <CheckSquare size={28} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Task Manager
          </h1>
        </div>
        <p className="text-slate-500 text-sm">
          Course 4: The Modern AI Software Developer — Teaching Baseline
        </p>
      </header>

      {/* Main Container */}
      <main className="bg-slate-50">
        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between text-red-700">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
            <button
              onClick={loadTasks}
              className="text-xs font-semibold px-2.5 py-1 bg-red-100 hover:bg-red-200 rounded transition flex items-center gap-1"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}

        {/* Task Form */}
        <TaskForm onAddTask={handleAddTask} isLoading={actionLoading} />

        {/* Task List */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="animate-spin" size={18} />
            <span>Loading tasks...</span>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onEditTitle={handleEditTitle}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}
