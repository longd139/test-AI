# Phase P2 Implementation Report

**Date:** 2026-11-17 (Asia/Saigon)
**Phase:** Slot 2 Controlled AI Engineering
**Status:** **LOCAL VERIFICATION PASS — external review required**
**Stable feature branch:** `feat/slot-02-controlled-ai-engineering`
**Verified stable tree commit:** `bebf10c29f666f6f8f22083457038f364aa731ed`

## Executive Summary

Phase P2 implements the controlled planning, review, testing, browser E2E, and CI teaching assets required by the actual 35-slide Slot 2 deck. It preserves Slot 1 behavior and does not implement due dates, priority, authentication, deployment, or any Slot 3 feature.

The mergeable feature branch excludes the deliberate defect commits from its ancestry. The red-to-green history remains available only through dedicated training refs. No branch, tag, workflow, or Pull Request was pushed to GitHub.

## Source-of-Truth Mapping

| Slot 2 slide | Actual title/focus | Repository implementation |
|---:|---|---|
| 4 | Never Let AI Jump Directly from Request to Code | `docs/slot-02/controlled-change-plan.md` follows requirement, inspect, plan, approval, implement, test, review, merge. |
| 8–11 | Plan First, Inspect Before Edit, Small Batches, Human Approval Gate | Controlled plan lists approved files, verification, rejected scope, and an explicit human approval gate. |
| 13–16 | Branch-per-Feature, diff/PR review, Live Demo 1 | Feature branch, `.github/pull_request_template.md`, acceptance mapping, and Demo 1 run sheet. |
| 18 | Testing Starts from Acceptance Criteria | `docs/slot-02/acceptance-test-matrix.md` maps title rules to unit, API, and E2E evidence. |
| 19–22 | Unit, Integration, End-to-End tests | Vitest shared tests, Supertest API tests with isolated SQLite, React tests, and Playwright Chromium flows. |
| 23 | RED, GREEN, REFACTOR | Red tag/branches at `739d9d9`; green stable tree retains one shared schema and the regression test. |
| 24–25 | AI-Assisted Test Generation and Live Demo 2 | Strong row-count regression plus `instructor/answer-keys/slot-02-title-validation.md` and Slide 25 run sheet. |
| 26–28 | PR evidence, CI pass/fail, GitHub Actions demo | `.github/workflows/ci.yml`, locally verified pass/fail states, and Slide 28 run sheet with branch-protection caveat. |
| 30 | Lab 01 Agent Planning Challenge, 30 minutes | Due-date planning exercise with four testable ACs and explicit scope rejection. Due dates are not implemented. |
| 31 | Lab 02 Testing and Bug Investigation, 35 minutes | Reproducible whitespace defect, failing regression, root cause, minimal repair, and verification. |
| 32 | Lab 03 Student Project Sprint, 35 minutes | Student guide requires a team-repository branch, plan, testable AC, test-first start, and draft PR/log evidence. |
| 33 | Slot 2 Deliverables | Student follow-up lists reviewed PRs, AI Engineering Logs, at least 10 meaningful tests including E2E, test-first Feature 3, and working CI. |

Original Session 03 reinforces branch-per-story planning, small commits, diff review, PR review, and AI Engineering Logs. Original Session 04 requires unit/API/E2E testing, visible test-first history, CI on Pull Requests, at least 10 meaningful tests, and one Playwright flow. The P2 assets preserve those outcomes while distinguishing the teaching repository from independent student repositories.

## Features Implemented

### Controlled Feature Change

- Added one shared task-title schema with a 120-character limit.
- Added create and edit input limits and a visible title counter.
- Added acceptance-criteria unit, API, React, and browser evidence.
- Added a 16 KB JSON request-body limit as a compensating security control.
- Added a PR template that requires scope, AC, verification, diff review, and residual risk.

### Due-Date Planning Challenge

`docs/slot-02/due-date-planning-challenge.md` contains a file-by-file plan, set/clear/invalid/overdue acceptance criteria, scope decisions, and verification steps. There is no `dueDate` field in Prisma, shared schemas, API, or UI.

### Task Title Validation RED → GREEN

1. `dd65b86` introduced the isolated validation-order defect.
2. `739d9d9` added the stronger API regression: expected HTTP 400 and row delta 0.
3. The red API evidence observed HTTP 201 and row delta 1.
4. `38dd058` restored trim-before-minimum validation on the training history.
5. The mergeable feature branch cherry-picks the regression test onto the already-correct stable foundation, so the deliberate defect is not an ancestor of the branch intended for review.

## CI and Reproducible States

`.github/workflows/ci.yml` runs on Pull Requests and pushes to `main` with read-only contents permission. It performs locked installation, Prisma generation, typecheck, lint, unit/integration tests, build, Chromium installation, and E2E.

| State | Ref | Local evidence |
|---|---|---|
| Passing | stable feature branch / future `checkpoint/slot-02-ready` | Complete mandatory sequence exited 0. |
| Failing | `training/slot-02-ci-failed`, `training/slot-02-whitespace-red`, annotated `checkpoint/slot-02-whitespace-red` | Clean checkout: typecheck 0, lint 0, tests 1; exactly two shared whitespace tests failed. |

No GitHub-hosted workflow ran because nothing was pushed. A failed required check blocks merging only when a GitHub branch-protection rule or ruleset requires that check.

## Files Changed

- Application: `packages/shared/src/index.ts`, `apps/api/src/app.ts`, `apps/web/src/components/TaskForm.tsx`, `apps/web/src/components/TaskItem.tsx`.
- Tests: shared schemas, API integration, React component tests, `e2e/global-setup.ts`, `e2e/prepare-db.ts`, `e2e/task-manager.spec.ts`, `playwright.config.ts`.
- Automation: `.github/workflows/ci.yml`, `.github/pull_request_template.md`, root scripts and lockfile.
- Teaching plans: `docs/slot-02/*`.
- Instructor assets: Slot 2 run sheet and title-validation answer key.
- Student assets: `student/labs/slot-02-labs.md`.
- Boundaries: `.gitignore` and `CLAUDE.md`.

## Verification Results

Node.js v22.11.0 and npm 10.9.0 were invoked from the installed NVM runtime.

| Command | Exit | Result |
|---|---:|---|
| `npm ci` | 0 | 403 packages installed from lockfile. |
| `npm run db:generate` | 0 | Prisma Client 6.19.3 generated. |
| `npm run typecheck` | 0 | Shared, API, and web passed. |
| `npm run lint` | 0 | Shared, API, and web passed. |
| `npm test` | 0 | 10 shared + 19 API + 3 React = 32 tests passed. |
| `npm run build` | 0 | Shared/API TypeScript and Vite production build passed. |
| `npm run test:e2e` | 0 | 2 Chromium tests passed. |
| `git diff --check` | 0 | No whitespace errors. |
| `npm audit` | 1 | 7 unresolved findings; analyzed below. |

Total locally executed automated tests: **34** (32 unit/integration/component plus 2 browser E2E).

The browser flow created, edited, completed, reopened, and deleted a real task through the Vite proxy and Express/Prisma stack. The second browser test checked the 120-character acceptance UI. This is actual local Chromium evidence, not fabricated browser or hosted-CI evidence.

## Database Isolation

- Vitest remains bound exactly to `file:./test.db` and fails closed for any other URL.
- Playwright setup overwrites its process binding with exactly `file:./e2e.db`, creates that schema through an explicit Prisma client, and clears only that database.
- Final instructor database SHA-256 before/after all stable checks: `06DAA83521C74C8590E7E8A2C50E0FDB66B18DB5411E63CAF2894302D5EFF02D`.
- Final instructor database UTC modification ticks before/after: `639304372480439918`.
- Result: unchanged.

The instructor run sheet uses unique paths, refuses path reuse, checks worktree cleanliness, and instructs non-force Git removal. The clean red verification worktree was removed without modifying the active branch or instructor database.

## Dependency Vulnerability Assessment

Full audit: 7 findings (1 moderate, 4 high, 2 critical). Production-only audit still reports 4 high findings because npm retains the Prisma CLI dependency path as well as runtime Zod.

| Path | Severity | Scope and decision |
|---|---|---|
| `vitest@3.2.7 → tinypool@1.1.1` | Critical | Trusted local/CI test worker only. Fix requires Vitest 4.1.12 major upgrade. |
| `vitest@3.2.7 → @vitest/mocker@3.2.7` | Moderate | Test mocking only. Fix requires Vitest 4.1.12 major upgrade. |
| `prisma@6.19.3 → @prisma/config → deepmerge-ts@7.1.5` | High | Repository-controlled Prisma CLI configuration; not imported by Express request handlers. Available remediation is outside Prisma 6. |
| `zod@3.25.76` | High | Runtime validation. Fix requires Zod 4.6.6+ major upgrade. Request bodies are capped at 16 KB and titles at 120 characters. |

`npm audit fix --dry-run --json` retained all findings and proposed no compatible non-major remediation. No `npm audit fix --force`, major upgrade, dependency override, skipped test, or weakened assertion was used. `docs/slot-02/dependency-review.md` records advisory IDs, paths, controls, and upgrade boundary.

## Git Checkpoints and History

- `checkpoint/slot-02-start` → approved P1.2 commit `ca332a93d126d2f0d6139d6d51cb043c3dacdf0b`.
- Red regression commit → `739d9d9e51eb00877be26418a5c653d65f0db65b`.
- Red annotated tag → `checkpoint/slot-02-whitespace-red`.
- Red branches → `training/slot-02-whitespace-red` and `training/slot-02-ci-failed`.
- Full teaching history → `training/slot-02-red-green-history`.
- Stable feature commit verified before this report → `bebf10c29f666f6f8f22083457038f364aa731ed`.
- Final ready tag → `checkpoint/slot-02-ready`, created only after committing this report and rechecking the final tree.

The deliberate defect commit is not an ancestor of the stable feature commit. The final report commit cannot embed its own content-derived SHA; the peeled target of `checkpoint/slot-02-ready` is the authoritative final local checkpoint.

## Verified vs Unverified

**Verified locally:** locked install, Prisma generation, typecheck, lint, 32 non-browser tests, production build, 2 Chromium E2E tests, whitespace RED failure, repaired GREEN state, test/e2e database isolation, instructor database immutability, clean worktree recovery, and stable/red Git separation.

**Unverified externally:** GitHub Actions execution, remote Pull Request creation/review, branch protection or ruleset enforcement, and merge behavior. No push, publish, deployment, or remote mutation occurred.

## Known Risks and Limitations

1. Seven dependency advisories remain pending separately approved major-version migrations.
2. The workflow syntax and commands are locally mirrored, but GitHub-hosted runner behavior remains unverified until an authorized push.
3. The due-date exercise is a plan and acceptance-test design only, as required by Lab 01.
4. Browser verification covers Chromium and the primary task flow; Firefox/WebKit and visual-regression testing are outside P2.
5. The Pull Request is prepared through a branch, template, diff, and evidence but has not been created remotely.

## Phase Gate Recommendation

**PASS WITH ISSUES.** P2 is ready for external technical review. The unresolved dependency advisories and unexecuted GitHub-hosted workflow remain explicit issues. Do not start P3 until external approval.
