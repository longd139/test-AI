#!/usr/bin/env node
/**
 * scripts/test-and-fix.mjs
 * Automated test diagnostic and runner script for Slot 3 automations.
 */

import { execSync } from 'node:child_process';

const workspace = process.argv[2] ? `-w ${process.argv[2]}` : '';

console.log(`=== Automated Test-and-Fix Runner ===`);
console.log(`Executing test suite ${workspace || 'across all workspaces'}...\n`);

try {
  const output = execSync(`npm test ${workspace}`, { encoding: 'utf-8', stdio: 'pipe' });
  console.log(output);
  console.log(`\n[RESULT] All tests passed! No repairs required.`);
} catch (error) {
  console.error(`\n[FAILURE DETECTED] Test runner exited with non-zero status.`);
  const stdout = error.stdout?.toString() || '';
  const stderr = error.stderr?.toString() || '';
  const fullLog = stdout + '\n' + stderr;

  // Extract failing test hints
  const failedLines = fullLog
    .split('\n')
    .filter((line) => line.includes('FAIL') || line.includes('AssertionError') || line.includes('expected'));

  console.log(`\nDiagnostics:`);
  failedLines.slice(0, 10).forEach((l) => console.log(`  ${l}`));

  console.log(`\nNext Steps for Coding Agent:`);
  console.log(`  1. Inspect the source file indicated in the assertion error.`);
  console.log(`  2. Apply the minimal bugfix without modifying the test assertion.`);
  console.log(`  3. Re-run: node scripts/test-and-fix.mjs ${process.argv[2] || ''}`);

  process.exit(1);
}
