#!/usr/bin/env node
/**
 * scripts/demo-browser-interaction.mjs
 * Demonstrable browser interaction script for Slot 3 (Slide 16 / Slide 25).
 * Simulates the tool-call sequence executed by a Playwright MCP agent.
 */

import { chromium } from '@playwright/test';

const TARGET_URL = process.env.APP_URL || 'http://localhost:5173';

console.log(`=== Demonstrable Browser Interaction (Playwright MCP Sequence) ===`);
console.log(`Target URL: ${TARGET_URL}\n`);

async function runBrowserDemo() {
  let browser;
  try {
    console.log(`[1] Launching Chromium browser...`);
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log(`[2] Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { timeout: 15000 });

    console.log(`[3] Checking header & DOM readiness...`);
    const header = await page.getByRole('heading', { name: 'Task Manager' }).textContent();
    console.log(`    Header text observed: "${header}"`);

    const taskTitle = `MCP Browser Task ${Date.now()}`;
    console.log(`[4] Filling task title input: "${taskTitle}"...`);
    const input = page.getByRole('textbox', { name: 'New task title' });
    await input.fill(taskTitle);

    console.log(`[5] Clicking "Add Task" button...`);
    await page.getByRole('button', { name: 'Add Task' }).click();

    console.log(`[6] Verifying task appears in live DOM...`);
    await page.waitForSelector(`text="${taskTitle}"`, { timeout: 5000 });
    console.log(`    Task element successfully rendered in DOM!`);

    console.log(`[7] Toggling completion checkbox...`);
    const checkbox = page.getByRole('checkbox', { name: new RegExp(taskTitle, 'i') });
    await checkbox.click();

    console.log(`[8] Checking updated count and status...`);
    const countText = await page.locator('text=/\\d+ of \\d+ completed/').textContent();
    console.log(`    Progress counter observed: "${countText}"`);

    console.log(`\n=== Browser Interaction Completed Successfully ===`);
  } catch (err) {
    console.error(`\n[Execution Error] Browser automation failed:`, err.message);
    console.error(`Ensure local dev servers are running via "npm run dev" before executing this demo.`);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

runBrowserDemo();
