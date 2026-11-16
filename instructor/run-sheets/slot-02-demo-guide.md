# Slot 2 Instructor Demo Guide

This guide follows `SLIDE-4HOURS/SLOT 2.pptx` and uses disposable Git worktrees so active instructor files remain untouched.

## Prerequisites

- Node.js 20 or newer and npm.
- Dependencies install successfully with `npm ci`.
- Chromium is installed with `npx playwright install chromium` for the E2E demo.
- Ports 3000 and 5173 are free.
- GitHub CLI authentication and a writable remote are required only for an instructor who chooses to publish a demonstration branch. Local preparation does not require a remote.
- `checkpoint/slot-02-start`, `checkpoint/slot-02-whitespace-red`, and `checkpoint/slot-02-ready` resolve locally.

## Safe Worktree Setup

Run from the main repository:

```powershell
$demoBranch = "demo-slot-02-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$demoPath = Join-Path (Split-Path -Parent (Get-Location)) $demoBranch
if (Test-Path -LiteralPath $demoPath) { throw "Refusing existing path: $demoPath" }
git worktree add -b $demoBranch $demoPath checkpoint/slot-02-start
if ($LASTEXITCODE -ne 0) { throw 'Worktree creation failed.' }
Set-Location -LiteralPath $demoPath
npm ci
```

Never reuse a path, reset an active worktree, or run `git clean` to prepare a demo.

## Demo 1: Controlled Feature Change

**Slide 16: “Live Demo 1: Controlled Feature Change”**
**Duration:** 25 minutes
**Starting checkpoint:** `checkpoint/slot-02-start`

### Requirement and approval

Read `docs/slot-02/controlled-change-plan.md`. Ask the agent to inspect the shared schema, API, web inputs, and tests, then propose a plan without editing. Reject due dates, priority, auth, dependencies unrelated to tests, and component redesigns.

### Commands

```powershell
git status --short
git switch -c feat/demo-title-limit
git diff -- packages/shared apps/api apps/web
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
git diff --check
```

Prepare the PR body from `.github/pull_request_template.md`. Show the acceptance criteria beside the diff. Do not push or create a remote PR unless the instructor has explicit repository authorization.

### Expected result and evidence

- The diff contains title validation, targeted UI attributes, tests, and no due-date implementation.
- The PR template links every criterion to a command or test.
- All local checks pass.

### Recovery

If the plan expands scope, stop before editing and revise it. If an implementation step fails, retain the worktree and inspect `git diff`; do not reset or delete it.

## Demo 2: From Failing Test to Fix

**Slide 25: “Live Demo 2: From Failing Test to Fix”**
**Starting checkpoint:** `checkpoint/slot-02-whitespace-red`

Create a second unique worktree from the red checkpoint. Do not use the red checkpoint for normal development.

```powershell
$redPath = Join-Path (Split-Path -Parent (Get-Location)) "demo-slot-02-red-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
if (Test-Path -LiteralPath $redPath) { throw "Refusing existing path: $redPath" }
git worktree add --detach $redPath checkpoint/slot-02-whitespace-red
Set-Location -LiteralPath $redPath
npm ci
npm test -- --run
```

### Expected RED evidence

The acceptance test for `POST /api/tasks` fails because whitespace becomes an empty string after the minimum-length check. The test also proves the database row count must not change.

Show the root cause in the shared Zod chain. Apply the minimal fix by trimming before checking the minimum length, without editing the test. Then run:

```powershell
npm test
npm run typecheck
git diff --check
```

### Expected GREEN evidence

The shared unit test and API regression pass. The refactor retains one shared title schema rather than duplicating validation.

### Recovery

The red worktree is disposable and detached. If the demonstration goes wrong, retain it for inspection and create another unique detached worktree. Never merge or retag the red state as stable.

## Demo 3: GitHub Actions

**Slide 28: “Live Demo: GitHub Actions”**
**Passing checkpoint:** `checkpoint/slot-02-ready`
**Failing checkpoint:** `checkpoint/slot-02-whitespace-red`

Inspect `.github/workflows/ci.yml` and map each step to the local command. Demonstrate both states locally first:

```powershell
# Passing state
npm ci
npm run db:generate
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e

# Failing state, in the isolated red worktree
npm test
```

If authorized to push a disposable feature branch, show the Actions run and read its logs. A red or green local result is not a GitHub-hosted result. Required checks block merging only after repository branch protection or a ruleset names the workflow as required.

### Recovery

Do not rewrite `main`, force-push, or bypass a required check. Fix the branch, push a new commit if authorized, and let GitHub rerun the workflow.

## Safe Cleanup

Return to the main repository. For each demo path, verify that Git registers it and that it has no uncommitted work. Remove only with `git worktree remove <exact-path>`; if Git refuses, retain the directory for review. Do not force removal.
