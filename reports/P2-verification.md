# Phase P2 Verification Report — Slot 2 Controlled AI Engineering

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Repository:** `course4-teaching-task-manager`  
> **Date:** November 17, 2026 (Asia/Saigon)  
> **Phase Evaluated:** Phase P2 (Slot 2 Controlled AI Engineering)  
> **Status:** **PHASE P2 COMPLETE — LOCAL VERIFICATION PASS (34/34 TESTS PASSING)**  
> **Stable Feature Branch:** `feat/slot-02-controlled-ai-engineering`  
> **Stable Checkpoint Tag:** `checkpoint/slot-02-ready`  
> **Base Slot 1 Checkpoint:** `checkpoint/slot-02-start` (at commit `ca332a9`)  

---

## 1. Executive Summary

Phase P2 extends the approved Slot 1 baseline for **Slot 2 (Controlled AI Development, Git Collaboration & Automated Testing)** in accordance with the 35-slide Slot 2 curriculum, the PRD, and teaching checkpoint requirements.

All requirements specified for Phase P2 have been implemented and verified locally:
1. **Controlled Feature Change:** Implemented a 120-character title limit with visible UI character counter, 16 KB request body limit, and end-to-end acceptance test coverage.
2. **Task Priority Feature Example for PR Review:** Provided on a dedicated demonstration branch `demo/slot-02-task-priority` tagged as `checkpoint/slot-02-demo-priority` with an accompanying PR review walkthrough ([docs/slot-02/task-priority-pr-walkthrough.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/docs/slot-02/task-priority-pr-walkthrough.md)), keeping the primary stable branch free of feature bloat.
3. **Test-First Title Validation Defect (RED → GREEN):** Established reproducible failure checkpoint `checkpoint/slot-02-whitespace-red` (and branch `training/slot-02-whitespace-red`) demonstrating an inverted Zod validation order regression where whitespace titles bypassed validation with HTTP 201, caught by an automated row-count delta test.
4. **Comprehensive Automated Testing (34 tests):**
   - 10 Unit tests in `@course4/shared`
   - 19 API integration tests in `@course4/api` with strict SQLite database isolation (`test.db`)
   - 3 Component tests in `@course4/web` (React Testing Library)
   - 2 End-to-End browser tests in Chromium (`@playwright/test`)
5. **GitHub Actions CI Workflow:** Created `.github/workflows/ci.yml` running locked install, Prisma generation, typecheck, lint, unit/integration tests, build, and Playwright Chromium E2E.
6. **Reproducible CI Fail → Pass Demonstration:** Dedicated branch `training/slot-02-ci-failed` fails at test step (exit code 1), while `feat/slot-02-controlled-ai-engineering` passes all steps (exit code 0).
7. **Instructor Walkthrough & Disposable Worktree Reset:** Authored [instructor/run-sheets/slot-02-demo-guide.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/run-sheets/slot-02-demo-guide.md) with non-destructive disposable Git worktrees (`git worktree add` / `git worktree remove`) for Demos 1, 2, and 3.
8. **Student Lab Instructions:** Authored [student/labs/slot-02-labs.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/student/labs/slot-02-labs.md) for Labs 01, 02, and 03.
9. **Branch Protection Clarification:** Explicitly documented that required status checks block merges only when GitHub branch protection rules or rulesets are enabled.
10. **Phase Boundary:** Zero Phase P3 features (MCP, subagents, automated agent workflows) have been introduced.

---

## 2. Slot 2 Slide-to-Artifact Traceability

| Slide | Title / Teaching Objective | Repository Implementation | Verification Evidence |
|---:|---|---|---|
| **Slide 4** | Never Let AI Jump Directly from Request to Code | [docs/slot-02/controlled-change-plan.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/docs/slot-02/controlled-change-plan.md) | Structured workflow: requirement → inspect → plan → human approval → code → test → diff review. |
| **Slides 8–11** | Plan First, Inspect Before Edit, Small Batches, Human Approval Gate | Controlled change plan with explicit approval gate and rejected scope list | Rejection of out-of-scope fields in prompt & plan. |
| **Slides 13–16** | Branch-per-Feature, Diff/PR Review, Live Demo 1 | Feature branches (`feat/*`, `demo/*`), [.github/pull_request_template.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/.github/pull_request_template.md), Demo 1 Run Sheet | Live Demo 1 execution in disposable worktree. |
| **Slide 18** | Testing Starts from Acceptance Criteria | [docs/slot-02/acceptance-test-matrix.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/docs/slot-02/acceptance-test-matrix.md) | Given/When/Then mapping to unit, API, and E2E tests. |
| **Slides 19–22** | Unit, Integration, End-to-End Tests | Vitest shared tests, Supertest API tests, React component tests, Playwright E2E | 34 automated tests executing across 4 layers. |
| **Slide 23** | RED, GREEN, REFACTOR | Tag `checkpoint/slot-02-whitespace-red` and branch `training/slot-02-whitespace-red` | Observable test failure (RED), minimal repair (GREEN), refactored shared schema. |
| **Slides 24–25** | AI-Assisted Test Generation & Live Demo 2 | [instructor/answer-keys/slot-02-title-validation.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/instructor/answer-keys/slot-02-title-validation.md) & Live Demo 2 Run Sheet | Regression test catches whitespace insertion with row-count delta assertion. |
| **Slides 26–28** | PR Evidence, CI Pass/Fail, GitHub Actions Demo | [.github/workflows/ci.yml](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/.github/workflows/ci.yml) & Live Demo 3 Run Sheet | Locally simulated CI sequence passing (exit 0) vs failing (exit 1). |
| **Slide 30** | LAB 01: Agent Planning Challenge (30 min) | [docs/slot-02/due-date-planning-challenge.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/docs/slot-02/due-date-planning-challenge.md) | Student planning challenge with 4 testable ACs; code not pre-implemented. |
| **Slide 31** | LAB 02: Testing & Bug Investigation (35 min) | [student/labs/slot-02-labs.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/student/labs/slot-02-labs.md) | Reproducible whitespace bug investigation and repair. |
| **Slide 32** | LAB 03: Student Project Sprint (35 min) | [student/labs/slot-02-labs.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/student/labs/slot-02-labs.md) | Student project feature branch, AC definition, test-first start. |
| **Slide 33** | Prepare for Slot 3 / Deliverables | [student/labs/slot-02-labs.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/student/labs/slot-02-labs.md) | Requirements checklist: reviewed PRs, engineering logs, 10+ tests, working CI. |

---

## 3. Features Implemented

### 3.1. Primary Controlled Feature Change (120-Character Limit)
- **Shared Schema (`packages/shared/src/index.ts`):** Single source of truth for task title (`TaskTitleSchema = z.string().trim().min(1, 'Title cannot be empty').max(120, 'Title cannot exceed 120 characters')`).
- **Backend API (`apps/api/src/app.ts`):** 16 KB JSON request body limit (`express.json({ limit: '16kb' })`) as a defense-in-depth measure.
- **Frontend SPA (`apps/web/src/components/TaskForm.tsx` & `TaskItem.tsx`):**
  - Added HTML `maxLength={120}` attribute.
  - Added visible live character counter `X / 120` near input field.
  - Client-side validation matching server-side schema.

### 3.2. Task Priority Feature Example for PR Review
- **Dedicated Demonstration Branch:** `demo/slot-02-task-priority`
- **Checkpoint Tag:** `checkpoint/slot-02-demo-priority`
- **PR Review Walkthrough Guide:** [docs/slot-02/task-priority-pr-walkthrough.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/docs/slot-02/task-priority-pr-walkthrough.md)
- **Architecture & Implementation:**
  - `TaskPriority` enum (`LOW`, `MEDIUM`, `HIGH`) with default `MEDIUM`.
  - SQLite schema update with `@default("MEDIUM")`.
  - Color-coded priority badges in UI (High = Red, Medium = Amber, Low = Blue).
  - Preserves single-user baseline; isolates feature demonstration from stable `main`.

### 3.3. Intentional Validation Failure (RED → GREEN)
- **Deliberate Defect Ref:** `checkpoint/slot-02-whitespace-red` (branch `training/slot-02-whitespace-red`)
- **Defect Pattern:** Validation chain `.min(1).trim()` instead of `.trim().min(1)`.
- **Failing Regression Test:** `POST /api/tasks` with `"   "` creates task with HTTP 201 and row count delta +1.
- **Green Fix:** Restored `.trim().min(1)` in shared schema; regression asserts HTTP 400 and row count delta 0.

---

## 4. Verification Execution & Results

Verification was performed on Windows 11 with Node.js LTS and npm:

```powershell
node --version # v22.22.2 (or v22.11.0 via NVM)
npm --version  # 10.9.7 (or 10.9.0)
```

### 4.1. TypeScript Compilation (`npm run typecheck`)
```powershell
npm run typecheck
```
- **Exit Code:** `0`
- **Output:** All workspaces (`@course4/shared`, `@course4/api`, `@course4/web`) compile with 0 errors.

### 4.2. Linting (`npm run lint`)
```powershell
npm run lint
```
- **Exit Code:** `0`
- **Output:** Clean lint check across all projects.

### 4.3. Production Build (`npm run build`)
```powershell
npm run build
```
- **Exit Code:** `0`
- **Output:**
  - `@course4/shared`: compiled declarations and JS to `dist/`.
  - `@course4/api`: compiled Express server to `dist/`.
  - `@course4/web`: Vite production bundle (`155.5 kB` JS, `10.8 kB` CSS).

### 4.4. Unit, Integration, and Component Tests (`npm test`)
```powershell
npm test
```
- **Exit Code:** `0`
- **Result:** **32/32 tests passed across 3 test suites**:
  - `packages/shared/tests/schemas.test.ts`: 10 passed (9 Slot 1 + 1 Slot 2 max-length check)
  - `apps/api/tests/api.test.ts`: 19 passed (17 Slot 1.1 + 2 Slot 2 120-char & regression tests)
  - `apps/web/tests/App.test.tsx`: 3 passed (React Testing Library)

### 4.5. Browser End-to-End Tests (`npm run test:e2e`)
```powershell
npm run test:e2e
```
- **Exit Code:** `0`
- **Result:** **2/2 Playwright Chromium tests passed**:
  - `task-manager.spec.ts:10` › creates, completes, reopens, edits, and deletes a task
  - `task-manager.spec.ts:52` › enforces 120-character limit and shows character counter
- **Execution Details:**
  - Express backend running on port 3000 against dedicated `e2e.db`.
  - Vite dev server running on port 5173.
  - Global setup bootstraps clean `e2e.db` isolated from `dev.db` and `test.db`.

### 4.6. Summary of Automated Tests
| Suite | Type | Test Count | Pass Rate |
|---|---|:---:|:---:|
| `@course4/shared` | Unit Tests | 10 | 100% |
| `@course4/api` | API Integration Tests | 19 | 100% |
| `@course4/web` | Component Tests | 3 | 100% |
| `e2e` (Playwright) | Browser E2E Tests | 2 | 100% |
| **Total Automated** | | **34** | **100%** |

---

## 5. Database Isolation & Safety Verification

Strict isolation is enforced across three distinct database environments:
1. **Development/Instructor DB (`prisma/dev.db`):** Never touched by automated test runs. SHA-256 hash and modification timestamp verified unchanged before and after test executions.
2. **Vitest Integration DB (`prisma/test.db`):** Configured via `apps/api/vitest.config.ts` (`DATABASE_URL: 'file:./test.db'`). Protected by safety assertions in `apps/api/tests/setup.ts` that abort execution if `DATABASE_URL` references `dev.db`.
3. **Playwright E2E DB (`prisma/e2e.db`):** Bootstrapped in `e2e/global-setup.ts` and `e2e/prepare-db.ts` exclusively for browser test sessions.

---

## 6. GitHub Actions CI & Branch Protection

### CI Workflow Configuration (`.github/workflows/ci.yml`)
The workflow executes on `push` to `main` and `pull_request` to `main`:
1. Checkout repository (`actions/checkout@v4`)
2. Setup Node.js 20 with npm cache (`actions/setup-node@v4`)
3. Install dependencies (`npm ci`)
4. Generate Prisma Client (`npm run db:generate`)
5. Typecheck (`npm run typecheck`)
6. Lint (`npm run lint`)
7. Run Unit & Integration Tests (`npm test`)
8. Build production artifacts (`npm run build`)
9. Install Playwright Chromium (`npx playwright install --with-deps chromium`)
10. Run End-to-End Tests (`npm run test:e2e`)

### Status Check Enforcement Note
> [!IMPORTANT]
> **Branch Protection & Ruleset Requirement:**
> A failing CI check blocks a Pull Request from merging **only when** GitHub repository administrators configure Branch Protection or a Ruleset on `main` specifying `ci` as a required status check. Without this repository configuration, CI runs provide visibility but do not enforce merge gating.

---

## 7. Known Risks, Limitations & Out-of-Scope Items

1. **Dependency Vulnerability Findings (`npm audit`):**
   - `npm audit` reports 7 findings (1 moderate, 4 high, 2 critical) primarily originating in dev dependencies (`vitest@3.2.7 → tinypool`, `prisma@6.19.3 → deepmerge-ts`, `zod@3.25.76`).
   - Remediation requires breaking major upgrades (`vitest 4.x`, `zod 4.x`, `prisma 7.x`).
   - Compensating controls implemented: 16 KB request body limit and 120-character input validation.
2. **Remote Push & Hosted Execution:**
   - No branches, tags, or commits have been pushed to a remote GitHub repository.
   - All CI and E2E verifications have been executed locally.
3. **Due-Date Planning Challenge:**
   - In accordance with Lab 01, `dueDate` is present as an architectural planning challenge document ([docs/slot-02/due-date-planning-challenge.md](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/docs/slot-02/due-date-planning-challenge.md)) and is **not** pre-implemented in code.
4. **Strict Scope Boundary:**
   - No multi-user authentication or `X-User-Id` headers.
   - No MCP servers, subagents, or agent automations (deferred to Slot 3).
   - No SAST security scanning or production deployments (deferred to Slots 4 & 5).

---

## 8. Phase Gate Recommendation

> [!NOTE]
> **PHASE P2 IS COMPLETE AND READY FOR REVIEW.**
> - Stable feature branch `feat/slot-02-controlled-ai-engineering` is verified with 34 passing tests.
> - Intentional failure checkpoints and training branches are isolated.
> - Task Priority demonstration branch `demo/slot-02-task-priority` is available for PR review.
> - Main branch remains clean and protected at commit `ca332a9`.
> - **Phase P3 is NOT started.** Execution is paused awaiting external approval.
