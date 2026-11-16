# Independent Technical Audit — Phase P1

**Audit date:** 2026-11-16  
**Decision:** **BLOCKED**

## A. Executive Summary

P1 is committed at `032b75f` and the `checkpoint/slot-01-start` tag resolves to that same commit. The committed source is a sensibly small npm-workspaces React/Express/Prisma SQLite Task Manager with shared Zod validation, and no implemented P2–P5 features were found.

The phase gate is blocked because execution could not be independently reproduced: this audit environment has neither `node` nor `npm` available on PATH. More importantly, the source does not configure an isolated test database or load the root environment for API tests; those tests issue `deleteMany()` against the ordinary Prisma client. The documented controlled-AI-demo reset also uses `git checkout .` and `git clean -fd` in an active worktree, contrary to the approved safety strategy.

## B. Sources Actually Inspected

- Git history, tag/ref resolution, working-tree status, tracked files, and the diff from approved P0.1 commit `efefd71`.
- Root/workspace manifests and lockfile; TypeScript/Vite configuration; `.gitignore` and `.env.example`.
- All implementation source under `apps/api`, `apps/web`, `packages/shared`, and `prisma`, including committed API, schema, and component tests.
- `README.md`, `docs/prd.md`, `docs/requirements.md`, `docs/architecture.md`, `CLAUDE.md`, `AGENTS.md`, the Slot 1 instructor guide, P1 verification report, and curriculum traceability.
- Actual `SLOT 1.pptx` OOXML slide payload. It contains 35 slides.

Actual-path deviations: there is no `instructor/demo-guides` directory; the guide is `instructor/run-sheets/slot-01-demo-guide.md`. There is no `curriculum/slots/slot-01.md`; Slot 1 mapping is in `curriculum/traceability.md` and the lab inventory. The expected P1 files otherwise exist.

## C. Git and Checkpoint Verification

| Check | Result | Evidence |
|---|---|---|
| P1 committed | PASS | `032b75f feat(slot-01): implement Slot 1 baseline Task Manager and documentation` follows `efefd71`. |
| Stable Slot 1 tag | PARTIAL | `checkpoint/slot-01-start` resolves to `032b75f`, the current HEAD. It has not been independently restored and executed from a clean checkout. |
| Unexplained source changes | PASS | `git status --short` reported no tracked/untracked changes. Ignored `.env`, `node_modules`, `dist`, `prisma/dev.db`, and `.vscode` are present as expected. |
| P2–P5 implementation | PASS | Implementation search found no priority, due date, authentication/identity header, ownership, MCP, subagent, Semgrep, PostgreSQL, Pino, deployment, or incident code. |
| Tracked secrets/environment files | PASS | `.env` is ignored; only `.env.example` is tracked and contains local SQLite/port values. |

Normal Git commands work, but emit warnings that the configured global excludes file (`C:\Users\ADMIN/.config/git/ignore`) is unreadable. This did not prevent the Git checks.

`reports/P1-verification.md:177-179` names `ae7555d` as the phase commit. That object exists but is not an ancestor of HEAD; it differs from HEAD only in the verification report. The tag correctly points to `032b75f`, so the report’s recorded phase SHA is inaccurate.

## D. Monorepo Architecture Audit

The root manifest declares three npm workspaces and valid-looking sequencing for build/test/typecheck: shared, API, then web. React/Vite/Tailwind, Express, Prisma/SQLite, and Zod are separately scoped. `@course4/shared` exposes compiled artifacts; API and web use it without a source-level circular dependency. TypeScript configs are proportional and no cloud service is required by source.

The Task Prisma model is limited to `id`, `title`, `completed`, `createdAt`, and `updatedAt`; it is appropriately Slot 1 scoped. SQLite is selected in `prisma/schema.prisma`. Environment values are documented in `.env.example`.

The clean-checkout claim is not independently verified. In particular, `apps/api/src/db.ts:1-3` constructs Prisma without loading an environment file, while `apps/api/tests/api.test.ts:1-4` imports it directly. `dotenv.config()` appears only in `apps/api/src/index.ts`, which tests do not import; no `.env.test`, test `DATABASE_URL`, or API test setup is present.

## E. Slide-to-Source Traceability

Titles below are actual deck titles; several numbers in the request were offset by one.

| Slide | Actual title | Source evidence | Result |
|---:|---|---|---|
| 14 | Meet the Teaching Project | `App.tsx`, `app.ts`, Prisma Task model implement a Task Manager. | PARTIAL — runtime not independently observed. |
| 15 | Frontend / Backend / Tests / Documentation | Separate `apps/web`, `apps/api`, shared package, Prisma, docs and tests exist. | PASS (structure) |
| 16 | LIVE DEMO: Run the Application | Run sheet provides startup/interaction steps; API/frontend source supports them. | PARTIAL — cannot start in audit environment; DB configuration concern. |
| 17 | LIVE DEMO: Controlled AI Change | Run sheet defines inspect → plan → approve → diff → verify for optional description; no priority/deadline baseline. | PARTIAL — reset instructions are unsafe and needs a live coding agent. |
| 21 | From Business Need to Requirement | `docs/prd.md` defines task-title rule and FRs. | PASS |
| 22 | Functional Requirements | PRD and API route set cover list/create/toggle; source supports persistence design. | PARTIAL — unexecuted. |
| 23 | Acceptance Criteria | Given/When/Then criteria and shared Zod/API validation exist. | PARTIAL — no independent test run. |
| 24 | Requirement Traceability | `docs/prd.md:107-115` maps requirement → slide → endpoint → test. | PASS |
| 26 | PRD, CLAUDE.md & AGENTS.md | All three documents exist and establish Slot 1 constraints. | PASS |
| 27 | From Specification to Running App | README/run sheet define setup; source implements stack. | PARTIAL — startup unverified. |
| 29 | LAB 01: Prompt Engineering | Traceability and lab inventory define planned prompt/assumption/verification work. | PASS (documentation) |
| 30 | LAB 02: AI Business Analyst | PRD plus curriculum documentation support requirements/AC activity. | PASS (documentation) |
| 31 | LAB 03: Project Kickoff | Curriculum specifies a separate student repository and teams of 4–5. | PASS (documentation) |
| 34 | Prepare for Slot 2 | AGENTS/CLAUDE/shared schema explicitly defer priority, deadlines, auth, and later features. | PASS |

No visual-only alignment is asserted; this table is based on actual slide text and source inspection.

## F. Functional API Audit

Static source review finds the following intended behaviour:

- `GET /api/tasks` lists persisted tasks; `POST` creates valid tasks (201).
- Zod trims titles and rejects empty/whitespace values in the API, independent of client validation (`app.ts:48-67`, shared schema `:23-28`).
- `PATCH` supports valid edits and both `completed: true` and `completed: false`; it validates bad titles and returns 404 for missing tasks (`app.ts:70-95`).
- `GET/PATCH/DELETE` perform a prior lookup and return 404 for missing IDs.
- The database-backed Prisma calls provide intended persistence across requests/restarts.

The committed API tests cover valid create, empty/whitespace rejection, edit, complete, invalid edit, missing PATCH/DELETE, and health. They do **not** explicitly test reopening a completed task (`completed: false`), persistence after restart/fresh Prisma process, malformed JSON, or a GET for a nonexistent task. Those behaviours cannot be marked observed without runtime execution.

## G. Frontend Behavior Audit

`TaskForm` trims client input and shows an accessible validation alert; API calls are isolated in `api/client.ts`; `TaskItem` supports edit, delete, complete, and pending-again checkbox actions; errors from updates/deletes are surfaced through `alert`. `TaskList` supplies an empty state and completion count. Backend validation still exists, so the client does not replace server validation.

Frontend component tests are mock-based and cover rendering/list/disabled whitespace submission only. No browser, API-proxy integration, keyboard-edit interaction, backend-error UI, or true end-to-end test was run in this audit.

## H. Test Execution Results

| Command | Result | Evidence / limitation |
|---|---|---|
| `git status --short` | PASS | No changes reported (with unreadable-global-ignore warnings). |
| `git branch --show-current` | PASS | `main`. |
| `git log -10 --oneline` | PASS | P1 commit follows P0.1. |
| `git tag --list` | PASS | `checkpoint/slot-01-start`. |
| `git show --stat HEAD` | PASS | Shows P1 implementation/documents. |
| `node --version` | BLOCKED | PowerShell: `node` is not recognized. |
| `npm --version` | BLOCKED | PowerShell: `npm` is not recognized. |
| `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` | NOT RUN / BLOCKED | Node/npm unavailable; dependencies were not installed or changed. |
| Startup/API/browser/database checks | NOT RUN / BLOCKED | No Node runtime and no safe isolated test DB configuration. |

Antigravity’s reported 24/24 test result is not independent evidence. It is also insufficient to show an isolated database test run, because the committed test source deletes rows through the normal client.

## I. Security Findings

P1 is correctly single-user: no `X-User-Id`, auth middleware, ownership, or user schema exists. Zod protects title fields, Prisma parameterization avoids direct SQL construction, React text rendering avoids direct HTML injection, and no secret is tracked.

`apps/api/src/app.ts:16-18` returns `String(err)` from a failed database health check. This may disclose filesystem, connection, or driver details. `app.ts:8` enables unrestricted CORS; it is tolerable for a local teaching baseline but should be made explicit/local-only before later deployment. Neither is a critical Slot 1 vulnerability.

## J. Instructor Demo Reproducibility

Demo A has a clear documented setup and source coverage, but it is not independently reproducible in this audit environment and its reset operates on the ordinary configured SQLite database.

Demo B has a bounded, appropriate Slot 1 example (`description`, not priority/deadline) and documents inspect, plan, approval, diff, and verification. A live agent interaction remains unverified by nature. Its recovery sequence is unsafe: `instructor/run-sheets/slot-01-demo-guide.md:125-126` runs `git checkout .` and `git clean -fd` inside the active worktree. That can discard edits and untracked instructional/student files, and conflicts with the worktree-first checkpoint strategy.

## K. Student Lab Readiness

The curriculum maps Lab 01 to a controlled prompt with assumptions/verification, Lab 02 to three functional requirements and three acceptance criteria, and Lab 03 to a separate student project repository, team of 4–5, problem statement, and PRD draft. The teaching Task Manager is not positioned as the final student project. Documentation readiness is PASS; operational readiness remains dependent on resolving the execution/database findings.

## L. Findings Table

| ID | Severity | File:line | Evidence / reproduction | Recommended correction |
|---|---|---|---|---|
| P1-01 | BLOCKER | `apps/api/src/db.ts:1-3`; `apps/api/tests/api.test.ts:7-15`; `apps/api/src/index.ts:1-2` | Tests import `app`/`db`, but only server entrypoint loads dotenv. No test environment or test DB exists; each test calls `prisma.task.deleteMany()` against whichever `DATABASE_URL` the process receives. `node`/`npm` are unavailable here, so this could not be executed, but source proves tests are not isolated. | Add a test setup that sets a dedicated SQLite `DATABASE_URL` before Prisma import, initializes its schema, and prevents test execution against the instructor DB. Load the intended environment deterministically for API startup. |
| P1-02 | HIGH | `instructor/run-sheets/slot-01-demo-guide.md:122-127` | Demo B tells instructors to execute `git checkout .` and `git clean -fd` in the active worktree. This can irreversibly discard changes/untracked files. | Replace with the approved disposable-worktree flow; if an in-place reset is retained, use a tested guarded script with dry-run, dirty-state abort, explicit force, and optional stash. |
| P1-03 | MEDIUM | `reports/P1-verification.md:8,21,97-162,177-179` | Report asserts 100% verification/24 passing tests and names phase commit `ae7555d`, but the actual tagged HEAD is `032b75f`; `ae7555d` is not an ancestor of HEAD. Independent runtime verification is blocked. | Correct the recorded SHA and distinguish author-reported execution from independently reproducible verification; attach a clean test-environment procedure/output. |
| P1-04 | MEDIUM | `apps/api/src/app.ts:16-18` | On health DB failure, raw `String(err)` is returned to clients. | Log server detail and return a fixed sanitized 503 message. |
| P1-05 | LOW | `README.md:96,101-102`; `instructor/run-sheets/slot-01-demo-guide.md:102-105` | README uses a machine-specific `file:///` link and cites non-existent `apps/api/src/routes/tasks.ts` / `packages/shared/src/schemas/task.ts`; actual paths are `app.ts` and `shared/src/index.ts`. | Use relative links and correct the paths; align the run-sheet “three files” language with its stated four files plus tests. |
| P1-06 | LOW | `apps/api/tests/api.test.ts:77-86`; `apps/web/tests/App.test.tsx:13-69` | No test explicitly verifies reopening to pending, persisted data after restart, or real frontend/API behaviour. | Add isolated API persistence/reopen tests and later an actual browser/API integration test; do not claim E2E coverage before it exists. |

## M. Coverage Summary

| Area | Status |
|---|---|
| Committed P1 source and Slot 1 tag | PASS |
| 35-slide count / 157-map continuity | PASS |
| Slot 1 scope / no later-slot implementation | PASS |
| Static CRUD and backend validation design | PARTIAL |
| Frontend design and mock component coverage | PARTIAL |
| Clean startup, build, lint, typecheck, tests | BLOCKED |
| Test database and reset safety | FAIL |
| Demo A/B operational reproducibility | PARTIAL / FAIL for safe reset |
| Critical security | PASS; one medium error-disclosure issue |

## N. Phase Gate Decision

**BLOCKED.** A stable tag exists, but test/database isolation and non-destructive demo recovery are mandatory for an instructor teaching repository. Runtime build/test/startup evidence was also not independently reproducible in the present environment.

## O. Exact Required Corrections Before P2

1. Create and document a dedicated test SQLite database; set it before Prisma is imported, initialize schema safely, and prove tests never mutate the instructor database.
2. Replace Demo B’s destructive cleanup with disposable worktrees or a tested guarded reset workflow.
3. Run and retain reproducible clean-checkout evidence for `typecheck`, `lint`, all tests, build, seed/reset, API CRUD (including reopen/persistence), and frontend-to-API startup.
4. Correct the P1 verification SHA and qualify its execution claims.
5. Sanitize health-check failure responses and correct stale README/run-sheet paths.

## P. Explicitly Unverified Items

- `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, Prisma generation/push/reset, and all runtime/API/browser outcomes; Node/npm are unavailable on PATH and no installation was authorized.
- Database initialization and clean-checkout checkpoint restoration.
- Actual browser rendering, proxy communication, persistence after process restart, and live-agent Demo B behaviour.
- Dependency vulnerability scan, cloud deployment, CI execution, and any future-slot planned assets.
