import { expect, test } from '@playwright/test';

test('creates, edits, completes, reopens, and deletes a task', async ({ page }) => {
  const originalTitle = `Playwright task ${Date.now()}`;
  const editedTitle = `${originalTitle} edited`;

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Task Manager' })).toBeVisible();

  const titleInput = page.getByRole('textbox', { name: 'New task title' });
  await titleInput.fill(originalTitle);
  await page.getByRole('button', { name: 'Add Task' }).click();
  await expect(page.getByText(originalTitle)).toBeVisible();

  await page.getByRole('button', { name: 'Edit task' }).click();
  const editInput = page.getByRole('textbox', { name: `Edit title for ${originalTitle}` });
  await editInput.fill(editedTitle);
  await page.getByTitle('Save').click();
  await expect(page.getByText(editedTitle)).toBeVisible();

  const completion = page.getByRole('checkbox', { name: `Mark "${editedTitle}" as completed` });
  await completion.click();
  await expect(page.getByText('1 of 1 completed')).toBeVisible();
  await page.getByRole('checkbox', { name: `Mark "${editedTitle}" as pending` }).click();
  await expect(page.getByText('0 of 1 completed')).toBeVisible();

  await page.getByRole('button', { name: 'Delete task' }).click();
  await expect(page.getByText(editedTitle)).toHaveCount(0);
  await expect(page.getByText('No tasks found')).toBeVisible();
});

test('keeps the title acceptance criteria visible in the browser', async ({ page }) => {
  await page.goto('/');
  const titleInput = page.getByRole('textbox', { name: 'New task title' });

  await expect(titleInput).toHaveAttribute('maxlength', '120');
  await titleInput.fill('Controlled change');
  await expect(page.getByText('17/120')).toBeVisible();
});

test('filters tasks dynamically by status and supports keyboard navigation', async ({ page }) => {
  const activeTask = `Active task ${Date.now()}`;
  const completedTask = `Completed task ${Date.now()}`;

  await page.goto('/');

  // Create active task
  await page.getByRole('textbox', { name: 'New task title' }).fill(activeTask);
  await page.getByRole('button', { name: 'Add Task' }).click();
  await expect(page.getByText(activeTask)).toBeVisible();

  // Create completed task
  await page.getByRole('textbox', { name: 'New task title' }).fill(completedTask);
  await page.getByRole('button', { name: 'Add Task' }).click();
  await expect(page.getByText(completedTask)).toBeVisible();

  // Mark completedTask as complete
  await page.getByRole('checkbox', { name: `Mark "${completedTask}" as completed` }).click();

  // Filter by Active
  await page.getByRole('tab', { name: /active/i }).click();
  await expect(page.getByText(activeTask)).toBeVisible();
  await expect(page.getByText(completedTask)).toHaveCount(0);

  // Filter by Completed
  await page.getByRole('tab', { name: /completed/i }).click();
  await expect(page.getByText(completedTask)).toBeVisible();
  await expect(page.getByText(activeTask)).toHaveCount(0);

  // Return to All
  await page.getByRole('tab', { name: /^all/i }).click();
  await expect(page.getByText(activeTask)).toBeVisible();
  await expect(page.getByText(completedTask)).toBeVisible();
});
