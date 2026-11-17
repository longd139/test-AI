#!/usr/bin/env node
/**
 * scripts/review-pr.mjs
 * Automated PR Review tool grounded in requirements and Git diff.
 * Used for Slot 3 automated workflows and CI integration.
 */

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

const baseBranch = process.argv[2] || 'HEAD~1';

console.log(`=== Automated PR Review Workflow ===`);
console.log(`Comparing against base: ${baseBranch}\n`);

// 1. Get Git Diff summary
let diffFiles = [];
let diffStat = '';
try {
  const rawFiles = execSync(`git diff --name-only ${baseBranch} HEAD`, { encoding: 'utf-8' });
  diffFiles = rawFiles.trim().split('\n').filter(Boolean);
  diffStat = execSync(`git diff --stat ${baseBranch} HEAD`, { encoding: 'utf-8' });
} catch (err) {
  console.error(`[Error] Failed to read git diff:`, err.message);
  process.exit(1);
}

console.log(`Changed files (${diffFiles.length}):`);
diffFiles.forEach((f) => console.log(`  - ${f}`));
console.log(`\nDiff Summary:\n${diffStat}`);

// 2. Scope boundary audit
const forbiddenPatterns = [
  { pattern: /auth0|passport|jwt|bcrypt/i, reason: 'Authentication pulled in before Slot 4/5' },
  { pattern: /postgres|mysql|pg/i, reason: 'External database engine outside SQLite baseline' },
  { pattern: /docker-compose|kubernetes|k8s/i, reason: 'Infrastructure files outside Slot scope' },
];

const scopeViolations = [];
for (const file of diffFiles) {
  if (!existsSync(file)) continue;
  const content = readFileSync(file, 'utf-8');
  for (const { pattern, reason } of forbiddenPatterns) {
    if (pattern.test(content) && !file.includes('review-pr.mjs') && !file.includes('prd.md')) {
      scopeViolations.push(`${file}: ${reason}`);
    }
  }
}

// 3. Verification checks
console.log(`\nRunning automated typecheck and tests...`);
let typecheckPassed = false;
let testsPassed = false;

try {
  execSync('npm run typecheck', { stdio: 'inherit' });
  typecheckPassed = true;
} catch {
  typecheckPassed = false;
}

try {
  execSync('npm test', { stdio: 'inherit' });
  testsPassed = true;
} catch {
  testsPassed = false;
}

// 4. Output Final Decision
const isApproved = scopeViolations.length === 0 && typecheckPassed && testsPassed;

console.log(`\n========================================`);
console.log(`AUTOMATED PR REVIEW DECISION: ${isApproved ? 'APPROVED' : 'CHANGES REQUESTED'}`);
console.log(`========================================`);
console.log(`- Scope Violations: ${scopeViolations.length === 0 ? 'None (PASS)' : scopeViolations.join(', ')}`);
console.log(`- TypeScript Typecheck: ${typecheckPassed ? 'PASS' : 'FAIL'}`);
console.log(`- Automated Test Suites: ${testsPassed ? 'PASS' : 'FAIL'}`);

if (!isApproved) {
  process.exitCode = 1;
}
