# Master Instructor Demo Inventory — Course 4

> Complete specification for every instructor live demo across all five 4-hour slots.

## Slot 1: AI-Native Engineering Foundations & Requirements

### DEMO-1.1: Run the Teaching Task Manager Application
- **Slide Reference:** SLOT 1, Slide 16
- **Learning Objective:** Demonstrate a running modern web application (React + Vite, Node + Express, Prisma SQLite) to establish baseline context before making AI changes.
- **Starting Checkpoint:** `checkpoint/slot-01-start`
- **Key Files:** `package.json`, `apps/web/src/App.tsx`, `apps/api/src/index.ts`, `prisma/schema.prisma`
- **Commands to Execute:**
```bash
git checkout checkpoint/slot-01-start
npm install
npm run db:seed
npm run dev
```
- **Expected Observable Result:** Terminal shows API listening on http://localhost:3000 and Vite dev server on http://localhost:5173. Browser opens Task Manager displaying initial seeded tasks (e.g., 'Write PRD draft', 'Set up repository').
- **Reset / Recovery Instructions:**
```bash
npm run db:reset
git checkout .
```
- **Instructor Run Sheet Notes:** Point out the monorepo architecture: apps/web, apps/api, packages/shared, prisma. Show students that code must run and be understood before AI writes new code.

### DEMO-1.2: Controlled AI Change via Inspect-Before-Edit
- **Slide Reference:** SLOT 1, Slide 17
- **Learning Objective:** Demonstrate the disciplined agent execution loop: give context, prompt agent to inspect code, review proposed plan, inspect diff, and verify in the running app.
- **Starting Checkpoint:** `checkpoint/slot-01-start`
- **Key Files:** `apps/api/src/routes/tasks.ts`, `packages/shared/src/schemas/task.ts`
- **Commands to Execute:**
```bash
claude
# Prompt: 'Read apps/api/src/routes/tasks.ts and packages/shared/src/schemas/task.ts. Propose a plan to add a task priority field (LOW, MEDIUM, HIGH) with validation. Do NOT edit code yet.'
```
- **Expected Observable Result:** Agent outputs a concise plan listing the exact files to change, rejects touching unrelated modules, and waits for confirmation before editing.
- **Reset / Recovery Instructions:**
```bash
git checkout .
```
- **Instructor Run Sheet Notes:** Emphasize Plan Mode and human approval gate. Show students that accepting AI code blindly without reading diffs leads to hallucinated dependencies.

## Slot 2: Controlled AI Development, Git Collaboration & Automated Testing

### DEMO-2.1: Controlled Feature Change via Git Branch & Pull Request
- **Slide Reference:** SLOT 2, Slide 16
- **Learning Objective:** Demonstrate branch-per-feature workflow with AI assistance, reviewing Git diffs, and submitting a clean Pull Request.
- **Starting Checkpoint:** `checkpoint/slot-02-start`
- **Key Files:** `apps/api/src/routes/tasks.ts`, `apps/web/src/components/TaskEditModal.tsx`
- **Commands to Execute:**
```bash
git checkout -b feat/edit-task-due-date
claude
# Instruct agent to implement due date editing with validation
git diff
git commit -m 'feat(tasks): allow updating task due date with ISO validation'
git push origin feat/edit-task-due-date
```
- **Expected Observable Result:** Git diff shows minimal scoped changes to task schema, route, and UI modal. No unrelated files modified. Clean commit ready for PR review.
- **Reset / Recovery Instructions:**
```bash
git checkout main
git branch -D feat/edit-task-due-date
```
- **Instructor Run Sheet Notes:** Teach students to inspect git diff in terminal or VS Code before committing. Verify the AI didn't rewrite the entire file or change formatting conventions.

### DEMO-2.2: From Failing Test to Fix (TDD RED → GREEN)
- **Slide Reference:** SLOT 2, Slide 25
- **Learning Objective:** Demonstrate test-driven development: translate Acceptance Criteria into an automated integration test, observe failure, implement minimal fix, and verify pass.
- **Starting Checkpoint:** `checkpoint/slot-02-start`
- **Key Files:** `tests/integration/tasks.test.ts`, `apps/api/src/routes/tasks.ts`
- **Commands to Execute:**
```bash
npm test -w tests/integration -- -t 'rejects whitespace title'
# Fails (RED)
# Apply fix in packages/shared/src/schemas/task.ts (z.string().trim().min(1))
npm test -w tests/integration -- -t 'rejects whitespace title'
# Passes (GREEN)
```
- **Expected Observable Result:** Initial test fails with expected assertion error (API returned 201 instead of 400). After one-line Zod schema fix, test passes with 0 failures.
- **Reset / Recovery Instructions:**
```bash
git checkout tests/ apps/
```
- **Instructor Run Sheet Notes:** Show students that a test proves the defect existed, and rerun proves the fix actually solved the root cause without regressions.

### DEMO-2.3: Continuous Integration via GitHub Actions
- **Slide Reference:** SLOT 2, Slide 28
- **Learning Objective:** Demonstrate automated CI pipeline running lint, typecheck, unit tests, and integration tests on PR submission.
- **Starting Checkpoint:** `checkpoint/slot-02-start`
- **Key Files:** `.github/workflows/ci.yml`
- **Commands to Execute:**
```bash
gh workflow view ci.yml
gh run list --limit 3
# Or simulate locally: npm run typecheck && npm test
```
- **Expected Observable Result:** All CI jobs (lint, typecheck, test:api, test:web) execute and report green checkmarks. Show how a simulated broken test blocks merging.
- **Reset / Recovery Instructions:**
```bash
None required.
```
- **Instructor Run Sheet Notes:** Explain that CI is the automated safety net preventing broken AI code from landing in main branch.

## Slot 3: Agent Automations, Subagents, MCP & Rapid AI UI Development

### DEMO-3.1: Automated PR Review via Custom Agent Command/Skill
- **Slide Reference:** SLOT 3, Slide 09
- **Learning Objective:** Demonstrate a repeatable agent automation (`/review-pr`) that analyzes git diffs against Acceptance Criteria, flags scope creep, and produces structured markdown reports.
- **Starting Checkpoint:** `checkpoint/slot-03-start`
- **Key Files:** `.claude/commands/review-pr.md`, `.claude/skills/code-review.md`
- **Commands to Execute:**
```bash
claude
# Prompt: /review-pr feat/edit-task-due-date
```
- **Expected Observable Result:** Agent parses git diff, cross-references docs/PRD.md, evaluates test coverage, and outputs structured review table with Clear/Reject decision.
- **Reset / Recovery Instructions:**
```bash
None required.
```
- **Instructor Run Sheet Notes:** Explain difference between one-off prompting and repeatable project-scoped commands committed to git.

### DEMO-3.2: Playwright MCP Browser Automation
- **Slide Reference:** SLOT 3, Slide 16
- **Learning Objective:** Demonstrate Model Context Protocol (MCP) by giving the coding agent browser tools to inspect live DOM, execute UI actions, and verify behavior.
- **Starting Checkpoint:** `checkpoint/slot-03-start`
- **Key Files:** `.mcp.json`, `apps/web/src/App.tsx`
- **Commands to Execute:**
```bash
npm run dev
claude
# Prompt: 'Using Playwright MCP, navigate to http://localhost:5173, click the Add Task button, enter "Complete Slot 3 Demo", and report the resulting DOM state.'
```
- **Expected Observable Result:** Agent calls MCP tool `browser_navigate` and `browser_click`, opens headless/headed Chromium, interacts with the UI, and returns snapshot confirmation.
- **Reset / Recovery Instructions:**
```bash
npm run db:reset
```
- **Instructor Run Sheet Notes:** Show the MCP architecture: Client (Agent) <-> Protocol (JSON-RPC) <-> Server (Playwright). Point out permissions and safety boundaries.

### DEMO-3.3: Rapid AI UI Integration into Task Manager
- **Slide Reference:** SLOT 3, Slide 25
- **Learning Objective:** Demonstrate taking an AI-generated UI component (e.g. from v0 or Tailwind preview), integrating it into apps/web, connecting it to backend API, and checking accessibility.
- **Starting Checkpoint:** `checkpoint/slot-03-start`
- **Key Files:** `apps/web/src/components/TaskFilterBar.tsx`, `apps/web/src/App.tsx`
- **Commands to Execute:**
```bash
npm run dev -w apps/web
# Review TaskFilterBar keyboard accessibility (tabIndex, aria-label, role='group')
```
- **Expected Observable Result:** Polished responsive filter bar renders in browser, filters tasks by status (ALL, ACTIVE, COMPLETED), and can be fully navigated using only keyboard Tab/Enter.
- **Reset / Recovery Instructions:**
```bash
git checkout apps/web/
```
- **Instructor Run Sheet Notes:** Stress that 'Beautiful is not the same as functional or accessible.' Generated UI must be wired to real state and keyboard tested.

## Slot 4: Secure AI Code, Human vs AI Code Review & Debugging

### DEMO-4.1: Security Investigation (SAST & SCA Scanning)
- **Slide Reference:** SLOT 4, Slide 13
- **Learning Objective:** Demonstrate automated security scanning with Semgrep and npm audit to discover Broken Access Control (IDOR) and vulnerable dependencies.
- **Starting Checkpoint:** `checkpoint/slot-04-security-vulns`
- **Key Files:** `apps/api/src/routes/tasks.ts`, `package.json`
- **Commands to Execute:**
```bash
git checkout checkpoint/slot-04-security-vulns
npm run security:scan
```
- **Expected Observable Result:** Semgrep identifies missing ownership check in `PUT /api/tasks/:id` (CWE-639 / IDOR) and dangerous eval/prompt vulnerability. npm audit reports dependency severity.
- **Reset / Recovery Instructions:**
```bash
git checkout checkpoint/slot-04-start
```
- **Instructor Run Sheet Notes:** Demonstrate the root-cause fix: adding `where: { id, userId: req.user.id }` to Prisma query. Show rescan passing with zero findings.

### DEMO-4.2: Human vs AI Code Review Comparison
- **Slide Reference:** SLOT 4, Slide 19
- **Learning Objective:** Demonstrate side-by-side review comparison: perform manual human review first, run AI code review second, and evaluate false positives vs genuine catches.
- **Starting Checkpoint:** `checkpoint/slot-04-start`
- **Key Files:** `docs/review-comparison.md`, `tests/integration/tasks.test.ts`
- **Commands to Execute:**
```bash
git diff main..sample-pr
# Instructor presents 3 human review comments
# Instructor triggers AI code review prompt
# Compare results on slide matrix
```
- **Expected Observable Result:** Human caught business requirement omission (task deadline in past allowed). AI caught edge-case type issue and missing error log. Both combined yield comprehensive review.
- **Reset / Recovery Instructions:**
```bash
None required.
```
- **Instructor Run Sheet Notes:** Emphasize: 'Record human review before showing AI findings.' AI is an assistant, not an unsupervised approver.

### DEMO-4.3: Structured Bug Hunt (5 Seeded Bugs)
- **Slide Reference:** SLOT 4, Slide 25
- **Learning Objective:** Demonstrate the scientific debugging loop (Reproduce -> Isolate -> Hypothesize -> Fix -> Regression Test) on seeded bugs.
- **Starting Checkpoint:** `checkpoint/slot-04-bug-hunt`
- **Key Files:** `tests/bug-hunt/bugs.test.ts`, `apps/api/src/routes/tasks.ts`
- **Commands to Execute:**
```bash
git checkout checkpoint/slot-04-bug-hunt
npm test -w tests/bug-hunt -- -t 'Bug 1: pagination off-by-one'
# Observe failure: page 1 skips first item (start = page * limit instead of (page - 1) * limit)
# Fix one line in tasks.ts
npm test -w tests/bug-hunt -- -t 'Bug 1: pagination off-by-one'
```
- **Expected Observable Result:** Failing test cleanly reproduces user symptom. Minimal fix resolves calculation. Test passes without modifying other endpoints.
- **Reset / Recovery Instructions:**
```bash
git checkout checkpoint/slot-04-start
```
- **Instructor Run Sheet Notes:** Show the 5 seeded bugs: 1. Pagination off-by-one, 2. Case-sensitive search, 3. Boolean query parsing ('false' truthy), 4. Missing ownership check (IDOR), 5. Shared state/prototype pollution.

## Slot 5: Production Deployment, Incident Response & Final Demo Day

### DEMO-5.1: Deployed Production Task Manager
- **Slide Reference:** SLOT 5, Slide 08
- **Learning Objective:** Demonstrate the live Task Manager deployed to cloud hosting (e.g. Render / Vercel) with production PostgreSQL database.
- **Starting Checkpoint:** `checkpoint/slot-05-deployed`
- **Key Files:** `Dockerfile`, `render.yaml`, `apps/api/src/index.ts`
- **Commands to Execute:**
```bash
curl -s https://course4-api.onrender.com/health | jq .
# Open https://course4-tasks.vercel.app in browser
# Create a task, mark complete, verify persistence
```
- **Expected Observable Result:** Health endpoint returns HTTP 200 with status: 'ok', database: 'connected', uptime, and version. Browser web app creates and modifies tasks against production PostgreSQL.
- **Reset / Recovery Instructions:**
```bash
None required.
```
- **Instructor Run Sheet Notes:** Verify environment variables in hosting dashboard without exposing secrets. Emphasize difference between development dev.db and managed PostgreSQL.

### DEMO-5.2: Health Check & Structured Pino Logging Observability
- **Slide Reference:** SLOT 5, Slide 10
- **Learning Objective:** Demonstrate production observability: machine-readable JSON logs with request IDs, response durations, and error sanitization.
- **Starting Checkpoint:** `checkpoint/slot-05-deployed`
- **Key Files:** `apps/api/src/middleware/logger.ts`, `apps/api/src/routes/health.ts`
- **Commands to Execute:**
```bash
npm run start -w apps/api
curl -i http://localhost:3000/health
curl -i http://localhost:3000/api/tasks/invalid-id
```
- **Expected Observable Result:** Terminal displays structured JSON log entries containing level, time, reqId, method, url, status, and responseTimeMs. Internal stack traces are suppressed from client responses.
- **Reset / Recovery Instructions:**
```bash
None required.
```
- **Instructor Run Sheet Notes:** Explain: 'You cannot fix what you cannot observe.' Contrast unformatted console.log with structured JSON logs ingested by log aggregators.

### DEMO-5.3: Production Incident Response Drill
- **Slide Reference:** SLOT 5, Slide 12-14
- **Learning Objective:** Demonstrate the incident triage workflow (Mitigate First -> Investigate Root Cause -> Fix -> Postmortem) during a simulated production failure.
- **Starting Checkpoint:** `checkpoint/slot-05-incident`
- **Key Files:** `docs/runbook.md`, `docs/postmortem-drill.md`
- **Commands to Execute:**
```bash
git checkout checkpoint/slot-05-incident
curl -i http://localhost:3000/health
# Returns 503 Service Unavailable (DB pool exhaustion or bad config)
# Execute runbook mitigation: revert deployment or reload config
git checkout checkpoint/slot-05-deployed
curl -i http://localhost:3000/health # Returns 200 OK
```
- **Expected Observable Result:** Immediate mitigation restores health check to 200 within 60 seconds. Postmortem document captures root cause, timeline, impact, and prevention action items.
- **Reset / Recovery Instructions:**
```bash
git checkout checkpoint/slot-05-deployed
```
- **Instructor Run Sheet Notes:** Reinforce: 'Mitigate first, investigate second.' Students learn to act calmly using the runbook rather than guessing in production.
