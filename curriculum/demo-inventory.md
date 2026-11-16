# Master Instructor Demo Inventory — Course 4

> **Status:** APPROVED IMPLEMENTATION DESIGN (PHASE P0.1)  
> All checkpoints, files, commands, and expected outputs below are **PLANNED** for implementation in Phases P1–P5. No executable code or tags currently exist.

---

## 1. Demo Categorization & Slide Deck Reconciliation

An independent technical audit of the five PowerPoint decks in `SLIDE-4HOURS` established:
- **9 Explicitly Titled "Live Demo" Slides:**
  - `SLOT 1` Slide 16: "LIVE DEMO: Run the Application"
  - `SLOT 1` Slide 17: "LIVE DEMO: Controlled AI Change"
  - `SLOT 2` Slide 16: "Live Demo 1: Controlled Feature Change"
  - `SLOT 2` Slide 25: "Live Demo 2: From Failing Test to Fix"
  - `SLOT 2` Slide 28: "Live Demo: GitHub Actions"
  - `SLOT 3` Slide 16: "Playwright MCP" (explicitly titled "INSTRUCTOR LIVE DEMO")
  - `SLOT 4` Slide 13: "Live Demo: Security Investigation"
  - `SLOT 4` Slide 19: "Live Demo: Review a Pull Request"
  - `SLOT 4` Slide 25: "Live Demo: Bug Hunt"
  - `SLOT 5` Slide 08: "LIVE DEMO: DEPLOYED TASK MANAGER"
- **1 Explicit Live Incident Activity:**
  - `SLOT 5` Slide 15: "LIVE INCIDENT DRILL"
- **4 Supplementary Planned Demonstrations:**
  - `SLOT 3` Slide 09: Automated PR Review (Inferred from activity slide)
  - `SLOT 3` Slide 25: AI UI to Working Task Manager (Inferred from component integration slide)
  - `SLOT 5` Slide 10: Health Check & Structured Pino Logging (Inferred from observability slide)
  - `SLOT 5` Slide 12–14: Incident Response Workflow (Inferred from mitigation workflow slides)

**Total Demonstration Portfolio:** **14 Planned Demonstrations** (10 slide-labeled demos/drills + 4 supplementary planned demonstrations).

---

## 2. Global Prerequisites & Fallbacks

Before running any demonstration:
- **Host Runtime:** Node.js LTS (>= 20.12.0), npm (>= 10.5.0), Git (>= 2.40.0)
- **Browser Automation:** Chromium browser (`npx playwright install chromium`)
- **Coding Agent:** Claude Code CLI (or compatible MCP host)
- **Security Scanner:** Semgrep CLI (`pip install semgrep` or Docker)
- **Cloud Accounts (Slot 5):** Vercel, Render, Neon free-tier accounts
- **Offline Classroom Fallback:** If internet access fails, all Slot 1–4 demos operate 100% locally with SQLite and Vitest. Slot 5 uses local Docker Compose simulation.

---

## 3. Slot 1 Demonstrations

### DEMO-1.1: Run the Teaching Task Manager Application
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 1` Slide 16 ("LIVE DEMO: Run the Application")
- **Learning Objective:** Show a running baseline web application (React + Vite, Node + Express, Prisma SQLite) to establish project context before AI edits.
- **Starting State:** Clean checkout of planned `checkpoint/slot-01-start`
- **Key Files [PLANNED]:** `package.json`, `apps/web/src/App.tsx`, `apps/api/src/index.ts`, `prisma/schema.sqlite.prisma`
- **Prerequisites:** Node.js, npm, Git
- **Planned Commands:**
```bash
git checkout checkpoint/slot-01-start
npm install
npm run db:seed
npm run dev
```
- **Planned Observable Result:** Terminal displays API listening on `http://localhost:3000` [Planned Port] and Vite dev server on `http://localhost:5173` [Planned Port]. Browser shows Task Manager with baseline tasks (no priority, no due date, no auth).
- **Safe Reset / Recovery:**
```bash
git worktree remove ../task-manager-demo --force  # Recommended worktree flow
# Or guarded script:
node scripts/reset-checkpoint.mjs --target checkpoint/slot-01-start --force
```
- **Instructor Run Sheet Notes:** Emphasize the monorepo architecture: `apps/web`, `apps/api`, `packages/shared`, `prisma`.

---

### DEMO-1.2: Controlled AI Change via Inspect-Before-Edit
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 1` Slide 17 ("LIVE DEMO: Controlled AI Change")
- **Learning Objective:** Demonstrate the disciplined agent loop: prompt agent to inspect code, request plan, inspect diff, and verify in app.
- **Starting State:** Planned `checkpoint/slot-01-start`
- **Key Files [PLANNED]:** `apps/api/src/routes/tasks.ts`, `packages/shared/src/schemas/task.ts`
- **Prerequisites:** Claude Code CLI configured
- **Planned Commands:**
```bash
claude
# Prompt: 'Read apps/api/src/routes/tasks.ts and packages/shared/src/schemas/task.ts. Propose a plan to add an optional task description field (max 500 chars). Do NOT edit code yet.'
```
- **Planned Observable Result:** Agent outputs a concise plan listing affected files, avoids unrelated refactoring, and waits for human approval.
- **Curriculum Note:** *Task Priority is NOT required by Slot 1 slides. A generic controlled change (e.g. description field) is demonstrated.*
- **Safe Reset / Recovery:**
```bash
git checkout -- apps/ packages/
```

---

## 4. Slot 2 Demonstrations

### DEMO-2.1: Controlled Feature Change via Git Branch & Pull Request
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 2` Slide 16 ("Live Demo 1: Controlled Feature Change")
- **Learning Objective:** Demonstrate branch-per-feature workflow with AI assistance, reviewing Git diffs, and preparing a Pull Request.
- **Starting State:** Planned `checkpoint/slot-02-start`
- **Key Files [PLANNED]:** `apps/api/src/routes/tasks.ts`, `packages/shared/src/schemas/task.ts`
- **Prerequisites:** Git CLI, Claude Code
- **Planned Commands:**
```bash
git checkout -b feat/task-due-date
claude
# Instruct agent to implement nullable dueDate editing with ISO-8601 validation
git diff
git commit -m "feat(tasks): allow updating task due date"
```
- **Planned Observable Result:** Git diff shows minimal, scoped change to task schema and update route. No extraneous modifications.
- **Safe Reset / Recovery:**
```bash
git checkout main && git branch -D feat/task-due-date
```

---

### DEMO-2.2: From Failing Test to Fix (TDD RED → GREEN)
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 2` Slide 25 ("Live Demo 2: From Failing Test to Fix")
- **Learning Objective:** Demonstrate test-driven development: translate Acceptance Criteria into an automated test, observe failure, implement minimal fix, and verify green.
- **Starting State:** Planned `checkpoint/slot-02-start`
- **Key Files [PLANNED]:** `tests/integration/tasks.test.ts`, `packages/shared/src/schemas/task.ts`
- **Prerequisites:** Vitest, Supertest
- **Planned Commands:**
```bash
# 1. Run test expecting failure on whitespace-only title:
npm test -w tests/integration -- -t "rejects whitespace title"  # Planned result: FAILS (RED)
# 2. Apply fix in packages/shared/src/schemas/task.ts: z.string().trim().min(1)
npm test -w tests/integration -- -t "rejects whitespace title"  # Planned result: PASSES (GREEN)
```
- **Planned Observable Result:** Initial test fails with 400 assertion failure (returned 201). After schema refinement, test passes cleanly.
- **Safe Reset / Recovery:**
```bash
git checkout tests/ packages/
```

---

### DEMO-2.3: Continuous Integration via GitHub Actions
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 2` Slide 28 ("Live Demo: GitHub Actions")
- **Learning Objective:** Demonstrate CI pipeline running lint, typecheck, and test suites automatically on branch push.
- **Starting State:** Planned `checkpoint/slot-02-start`
- **Key Files [PLANNED]:** `.github/workflows/ci.yml`
- **Prerequisites:** GitHub repository access, internet connection (or local `npm run typecheck && npm test` simulation)
- **Planned Commands:**
```bash
git push origin feat/task-due-date
# Or simulate CI checks locally:
npm run typecheck && npm test
```
- **Planned Observable Result:** CI triggers and executes lint, typecheck, and unit/integration tests with green status.

---

## 5. Slot 3 Demonstrations

### DEMO-3.1: Automated PR Review via Custom Agent Command
- **Category:** `[SUPPLEMENTARY PLANNED DEMO]`
- **Slide Reference:** `SLOT 3` Slide 09 ("Automated PR Review")
- **Learning Objective:** Demonstrate a repeatable agent automation (`/review-pr`) that analyzes git diffs against Acceptance Criteria.
- **Starting State:** Planned `checkpoint/slot-03-start`
- **Key Files [PLANNED]:** `.claude/commands/review-pr.md`
- **Prerequisites:** Claude Code CLI
- **Planned Commands:**
```bash
claude
# Prompt: /review-pr feat/task-due-date
```
- **Planned Observable Result:** Agent parses git diff, checks Acceptance Criteria, flags scope creep, and outputs a structured review report.

---

### DEMO-3.2: Playwright MCP Browser Automation
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 3` Slide 16 ("Playwright MCP — INSTRUCTOR LIVE DEMO")
- **Learning Objective:** Connect agent to external browser tools via Model Context Protocol (MCP) to inspect live DOM and execute UI actions.
- **Starting State:** Planned `checkpoint/slot-03-start`
- **Key Files [PLANNED]:** `.mcp.json`, `apps/web/src/App.tsx`
- **Prerequisites:** Playwright Chromium installed, MCP-compatible host
- **Planned Commands:**
```bash
npm run dev
claude
# Prompt: 'Using Playwright MCP, navigate to http://localhost:5173, click the Add Task button, enter "Verify MCP Demo", and report the resulting DOM state.'
```
- **Planned Observable Result:** Agent invokes browser MCP tools, opens Chromium, performs click and input, and returns DOM verification snapshot.
- **Offline Fallback:** If MCP host is unavailable, run planned CLI script `npm run test:e2e` to show equivalent Playwright automation.

---

### DEMO-3.3: AI UI to Working Task Manager
- **Category:** `[SUPPLEMENTARY PLANNED DEMO]`
- **Slide Reference:** `SLOT 3` Slide 25 ("AI UI to Working Task Manager")
- **Learning Objective:** Take an AI-generated UI component, integrate it into `apps/web`, wire to real API endpoints, and verify keyboard accessibility.
- **Starting State:** Planned `checkpoint/slot-03-start`
- **Key Files [PLANNED]:** `apps/web/src/components/TaskFilterBar.tsx`
- **Prerequisites:** Node.js, browser
- **Planned Commands:**
```bash
npm run dev -w apps/web
# Navigate filter bar via Tab and Enter keys in browser
```
- **Planned Observable Result:** Filter bar updates active filter (All, Active, Completed) and maintains visible keyboard focus indicators.

---

## 6. Slot 4 Demonstrations

### DEMO-4.1: Security Investigation (SAST & SCA Scanning)
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 4` Slide 13 ("Live Demo: Security Investigation")
- **Learning Objective:** Demonstrate automated security scanning with Semgrep and npm audit to detect vulnerabilities.
- **Starting State:** Planned `checkpoint/slot-04-security-vulns` (Dedicated training branch)
- **Key Files [PLANNED]:** `apps/api/src/fixtures/simulated-auth.ts`, `apps/api/src/routes/tasks.ts`
- **Prerequisites:** Semgrep CLI (`pip install semgrep` or Docker)
- **Planned Commands:**
```bash
git checkout checkpoint/slot-04-security-vulns
npm run security:scan  # Runs Semgrep + npm audit
```
- **Planned Observable Result:** Semgrep flags missing ownership validation (CWE-639 / IDOR) in simulated identity training fixture.
- **Security Boundary Note:** *`X-User-Id` is strictly a simulated identity fixture for vulnerability demonstration, NOT authentication. It is guarded against production use.*
- **Safe Reset / Recovery:**
```bash
git checkout checkpoint/slot-04-start
```

---

### DEMO-4.2: Review a Pull Request (Human vs AI Review)
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 4` Slide 19 ("Live Demo: Review a Pull Request")
- **Learning Objective:** Demonstrate side-by-side review comparison: perform manual human review first, run AI review second, and evaluate catches.
- **Starting State:** Planned `checkpoint/slot-04-start`
- **Key Files [PLANNED]:** `docs/review-comparison.md`
- **Prerequisites:** Claude Code
- **Planned Commands:**
```bash
git diff main..sample-pr
# Instructor notes human observations first
claude
# Run AI code review prompt and compare side-by-side
```
- **Planned Observable Result:** Human catches business logic edge case; AI catches type edge case and missing error log.

---

### DEMO-4.3: Bug Hunt (5 Seeded Bugs)
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 4` Slide 25 ("Live Demo: Bug Hunt")
- **Learning Objective:** Demonstrate scientific debugging (Reproduce -> Isolate -> Hypothesize -> Fix -> Regression Test) on seeded training bugs.
- **Starting State:** Planned `checkpoint/slot-04-bug-hunt` (Isolated training branch)
- **Key Files [PLANNED]:** `tests/bug-hunt/bugs.test.ts`, `apps/api/src/routes/tasks.ts`
- **Prerequisites:** Vitest, Supertest
- **Planned Commands:**
```bash
git checkout checkpoint/slot-04-bug-hunt
npm test -w tests/bug-hunt -- -t "Bug 1: pagination off-by-one"
# Observe failure: page 1 skips first item (start = page * limit)
# Fix calculation: start = (page - 1) * limit
npm test -w tests/bug-hunt -- -t "Bug 1: pagination off-by-one"
```
- **Planned Observable Result:** Failing regression test reproduces defect. One-line calculation fix turns test green.
- **Safe Reset / Recovery:**
```bash
git checkout checkpoint/slot-04-start
```

---

## 7. Slot 5 Demonstrations

### DEMO-5.1: Deployed Task Manager
- **Category:** `[EXPLICIT SLIDE DEMO]`
- **Slide Reference:** `SLOT 5` Slide 08 ("LIVE DEMO: DEPLOYED TASK MANAGER")
- **Learning Objective:** Demonstrate deployed Task Manager on public cloud infrastructure (Vercel + Render + Neon PostgreSQL).
- **Starting State:** Planned `checkpoint/slot-05-deployed`
- **Key Files [PLANNED]:** `Dockerfile`, `render.yaml`, `vercel.json`
- **Prerequisites:** Active internet connection, cloud dashboard access
- **Planned Commands:**
```bash
# Example Planned URLs:
curl -s https://course4-api.onrender.com/health | jq .
# Open https://course4-tasks.vercel.app in browser
```
- **Planned Observable Result:** Health check returns HTTP 200 with database status `connected`. Browser interacts with live web app backed by Neon PostgreSQL.
- **Offline Fallback:** If internet fails, run planned local containerized demo: `docker compose up`.

---

### DEMO-5.2: Health Check & Structured Pino Logging Observability
- **Category:** `[SUPPLEMENTARY PLANNED DEMO]`
- **Slide Reference:** `SLOT 5` Slide 10 ("Know Whether Your System Is Healthy")
- **Learning Objective:** Demonstrate production observability: machine-readable JSON logs with request IDs and sanitized client errors.
- **Starting State:** Planned `checkpoint/slot-05-deployed`
- **Key Files [PLANNED]:** `apps/api/src/middleware/logger.ts`, `apps/api/src/routes/health.ts`
- **Prerequisites:** Node.js, curl
- **Planned Commands:**
```bash
curl -i http://localhost:3000/health
curl -i http://localhost:3000/api/tasks/non-existent-id
```
- **Planned Observable Result:** Server outputs structured JSON log entries containing `level`, `reqId`, `method`, `url`, `status`, and `responseTimeMs`. Client receives sanitized JSON without internal stack traces.

---

### DEMO-5.3: Production Incident Response Drill
- **Category:** `[EXPLICIT SLIDE DRILL]`
- **Slide Reference:** `SLOT 5` Slide 15 ("LIVE INCIDENT DRILL") & Slides 12–14
- **Learning Objective:** Demonstrate incident triage (Mitigate First -> Investigate Root Cause -> Fix -> Postmortem) using operational runbook.
- **Starting State:** Planned `checkpoint/slot-05-incident` (Simulated outage branch)
- **Key Files [PLANNED]:** `docs/runbook.md`, `docs/postmortem-drill.md`
- **Prerequisites:** curl, Git
- **Planned Commands:**
```bash
git checkout checkpoint/slot-05-incident
curl -i http://localhost:3000/health  # Returns HTTP 503 (Simulated DB failure)
# Follow runbook: roll back configuration or revert to checkpoint/slot-05-deployed
git checkout checkpoint/slot-05-deployed
curl -i http://localhost:3000/health  # Returns HTTP 200 (Service Restored)
```
- **Planned Observable Result:** Service restored within drill target. Postmortem template records incident timeline, impact, and prevention items.
