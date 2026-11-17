import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../src/App.js';
import * as client from '../src/api/client.js';

vi.mock('../src/api/client.js');

describe('Task Manager Frontend App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header and task input form', async () => {
    vi.mocked(client.fetchTasks).mockResolvedValueOnce([]);

    render(<App />);

    expect(screen.getByText('Task Manager')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toHaveAttribute('maxlength', '120');
    expect(screen.getByText('0/120')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });
  });

  it('renders list of tasks when fetched from API', async () => {
    vi.mocked(client.fetchTasks).mockResolvedValueOnce([
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Review PRD v1 draft',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Run test suite',
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Review PRD v1 draft')).toBeInTheDocument();
      expect(screen.getByText('Run test suite')).toBeInTheDocument();
      expect(screen.getByText('1 of 2 completed')).toBeInTheDocument();
    });
  });

  it('validates against empty input on submit', async () => {
    vi.mocked(client.fetchTasks).mockResolvedValueOnce([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });

    const submitBtn = screen.getByRole('button', { name: /add task/i });
    expect(submitBtn).toBeDisabled();

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: '   ' } });
    expect(submitBtn).toBeDisabled();
  });

  it('filters tasks by active and completed status when filter tabs are clicked', async () => {
    vi.mocked(client.fetchTasks).mockResolvedValueOnce([
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Active Task 1',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Completed Task 2',
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Active Task 1')).toBeInTheDocument();
      expect(screen.getByText('Completed Task 2')).toBeInTheDocument();
    });

    // Click Active filter tab
    const activeTab = screen.getByRole('tab', { name: /active/i });
    fireEvent.click(activeTab);

    expect(screen.getByText('Active Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Completed Task 2')).not.toBeInTheDocument();
    expect(activeTab).toHaveAttribute('aria-selected', 'true');

    // Click Completed filter tab
    const completedTab = screen.getByRole('tab', { name: /completed/i });
    fireEvent.click(completedTab);

    expect(screen.queryByText('Active Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Completed Task 2')).toBeInTheDocument();
    expect(completedTab).toHaveAttribute('aria-selected', 'true');

    // Click All filter tab
    const allTab = screen.getByRole('tab', { name: /^all/i });
    fireEvent.click(allTab);

    expect(screen.getByText('Active Task 1')).toBeInTheDocument();
    expect(screen.getByText('Completed Task 2')).toBeInTheDocument();
    expect(allTab).toHaveAttribute('aria-selected', 'true');
  });
});
